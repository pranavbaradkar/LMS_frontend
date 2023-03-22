import axios from 'axios'
import AuthService from '../services/AuthService'
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});
export default {
    getSingleAssessment: async function () {
        try {
            const response = await instance.get('assessments/92/screening/questions-list',{
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