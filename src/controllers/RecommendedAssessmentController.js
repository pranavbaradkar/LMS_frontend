import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: 'https://lmsbackend-dev.knoggles.ai/api/v1/'
});

export default {
    getRecommendedAssessment: async function (debug) {
        
        try {
            const response = await instance.get('users/recommended-assessment'+debug ,{
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