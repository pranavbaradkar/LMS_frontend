import axios from 'axios'
import AuthService from '../services/AuthService'
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
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