const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Anchor = getModule(m => m.default?.displayName == 'Anchor', false);

const Settings = require('./components/Settings');
const services = require('./services');

module.exports = class OpenInApp extends Plugin {
   startPlugin() {
      this.patches = [];

      powercord.api.settings.registerSettings(this.entityID, {
         category: this.entityID,
         label: 'Open In App',
         render: Settings
      });

      this.patch('open-in-app-anchor', Anchor, 'default', (args, res) => {
         let link = args[0]?.href?.toLowerCase();

         if (link) {
            for (const service of services) {
               if (this.settings.get(service.name, true) && service.links.some(l => ~link.indexOf(l))) {
                  args[0].href = service.replace(args[0].href);
               }
            }
         }

         return args;
      }, true);

      Anchor.default.displayName = 'Anchor';
   }

   pluginWillUnload() {
      for (const patch of this.patches) uninject(patch);
      powercord.api.settings.unregisterSettings(this.entityID);
   }

   patch(...args) {
      if (!args || !args[0] || typeof args[0] !== 'string') return;
      if (!this.patches) this.patches = [];
      this.patches.push(args[0]);
      return inject(...args);
   }
};
