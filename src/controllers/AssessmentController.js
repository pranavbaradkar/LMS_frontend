import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    startScreening: async function (id) {
        try {
            const response = await instance.post('users/assessments/status', {
                "assessment_id": id,
                "screening_status": "STARTED"
            }, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    updateScreeningStatus: async function (id, type, elapsed_time, answered_question, violations) {
        try {
            const response = await instance.post(`users/log/assessments/${id}/${type}`, {
                "answered_question": answered_question,
                "elapsed_time": elapsed_time,
                "violations": violations
            }, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    startMains: async function (id) {
        try {
            const response = await instance.put('users/assessments/'+id+'/status', {
                "assessment_id": id,
                "mains_status": "STARTED"
            }, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
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