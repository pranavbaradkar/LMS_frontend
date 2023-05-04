import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});
export default {
    getSubject: async function () {
        try {
            const response = await instance.get('/meta/subjects')
            return response;
        } catch (error) {
            return error.response;
        }
    },





}