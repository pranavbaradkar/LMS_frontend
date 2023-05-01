import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://lmsbackend-dev.knoggles.ai/api/v1/'
});
export default {
    getLevel: async function () {
        try {
            const response = await instance.get('/meta/levels')
            return response;
        } catch (error) {
            return error.response;
        }
    },





}