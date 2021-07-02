const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');
const services = require('../services');

module.exports = class extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      const { getSetting, updateSetting, toggleSetting } = this.props;

      return services.map(service =>
         <SwitchItem
            value={getSetting(service.name, true)}
            onChange={() => toggleSetting(service.name, true)}
         >
            {service.name}
         </SwitchItem>
      );
   }
};;