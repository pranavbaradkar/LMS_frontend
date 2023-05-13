import axios from 'axios'
import AuthService from '../services/AuthService'
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    createUserIntrest: async function (data) {
        try {
            const response = await instance.post('users/teaching-interests',data, {
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