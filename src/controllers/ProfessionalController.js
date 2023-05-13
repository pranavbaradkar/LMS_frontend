import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    createUserProfessionalInfo: async function (formData) {
        try {
            const response = await instance.post('users/bulk/professional-infos', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            console.log(response)
            return response;
        } catch (error) {
            return error.response;
        }
    },
}