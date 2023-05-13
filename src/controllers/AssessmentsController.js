import axios from 'axios'
import AuthService from '../services/AuthService'
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getScreeningQuestions: async function (id) {
        try {
            const response = await instance.get('assessments/'+id+'/screening/questions-list', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getMainsQuestions: async function (id) {
        try {
            const response = await instance.get('assessments/'+id+'/mains/questions-list', {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    submitAssessment: async function (id,data) {
        try {
            const response = await instance.post('assessments/' + id + '/screening/submit',data, {
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