import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
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