import AuthService from '@/services/AuthService';
import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getPADCScript: async function () {
        try {
            const response = await instance.get('users/padc/script', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

    getPADVScript: async function () {
        try {
            const response = await instance.get('users/padv/script', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },

}