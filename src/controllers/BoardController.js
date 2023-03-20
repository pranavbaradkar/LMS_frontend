import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});
export default {
    getBoards: async function () {
        try {
            const response = await instance.get('meta/boards')
            return response;
        } catch (error) {
            return error.response;
        }
    },

}