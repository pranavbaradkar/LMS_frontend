import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
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