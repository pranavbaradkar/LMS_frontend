import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    startScreening: async function (id, payload) {
        try {
            const response = await instance.post('users/assessments/status',{ ...{ "assessment_id": id }, ...payload} , {
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
    startMains: async function (id, payload) {
        try {
            const response = await instance.post('users/assessments/status', { ...{ "assessment_id": id }, ...payload}, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getAllAssessment: async function ( params = {}) {

        try {
            const response = await instance.get('/users/assessments', {
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

    postSetupMainsAssessment: async function (payload) {
        try {
            const response = await instance.post(`users/assessment_slot`, payload, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    uploadS3Video: async function (payload) {
        try {
            const response = await instance.post(`users/s3/video`, payload, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getSetupMainsAssessment: async function () {
        try {
            const response = await instance.get(`users/assessment_slot`, {
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