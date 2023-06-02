import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getRecommendedAssessment: async function (debug, params) {
        
        try {
            const response = await instance.get('users/recommended-assessment'+debug ,{
                headers: {
                    'Authorization': AuthService.getToken()
                },
                params: params
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
   
}