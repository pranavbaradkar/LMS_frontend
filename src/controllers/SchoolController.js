import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://lmsbackend-dev.knoggles.ai/api/v1/'
});


export default {
    getSchool: async function () {
        try {
            const response = await instance.get('meta/schools')
            return response;
        } catch (error) {
            return error.response;
        }
    },




}