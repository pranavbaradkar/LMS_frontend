import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});

export default {
    getAllAssessment: async function () {

        try {
            const response = await instance.get('/users/assessments', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSingleAssessment: async function (id) {

        try {
            const response = await instance.get('assessments/' + id, {
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