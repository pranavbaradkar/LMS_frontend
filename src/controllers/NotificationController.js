import axios from 'axios'
import AuthService from '../services/AuthService'
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    saveNotificationEndPoint: async function (data) {
        try {
            const response = await instance.post('users/communications',data, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getNotificationEndPoint: async function () {
        try {
            const response = await instance.get('users/communications', {
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