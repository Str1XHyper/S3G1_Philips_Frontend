import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
          customProperties: true,
        },
        themes: {
          light: {
            primary: '#aaa',
            secondary: '#F0EDEE',
            dark1: "#403d39",
            dark2: "#252422",
            accent: '#F15025',
            error: '#BF0025',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          },
        }
    }
});
