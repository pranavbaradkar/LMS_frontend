import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
});

export default {
    getAllGrades: async function () {
        try {
            const response = await instance.get('/meta/grades')
            return response;
        } catch (error) {
            return error.response;
        }
    }
    ,
   


}
