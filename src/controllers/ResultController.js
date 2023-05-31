import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getResults: async function () {
        try {
            const response = await instance.get('all/assessments/result')
            return response;
        } catch (error) {
            return error.response;
        }
    },

}