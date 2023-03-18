import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});

export default {
    createUserPersonalInfo: async function (formData) {
        
        try {
            const response = await instance.put('/user/update', formData, {
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