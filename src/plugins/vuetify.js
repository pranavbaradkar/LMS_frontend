import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#005b64',
                secondary: '#82d2da',
                secondPrimary: '#277BC0',
                secondaryAccent:'#caecef',
                secondaryPrimaryAccent: '#D4E5F2',
                //surface: '#faf8ed',
                surface: '#F8FAFC',
                sufaceAccent: '#fbf5f2',
                accent: '#6c367e',
                error: '#b71c1c',
                textcolor: '#005B64',
                answered:'#009051',
                skipped:'#F6E866',
                bookmarked:'#E868E3',
                default: "#EBEBEB",
                textButton:'#174A73'
            },
         
        },
    },
});