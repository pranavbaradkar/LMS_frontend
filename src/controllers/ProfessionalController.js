import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
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