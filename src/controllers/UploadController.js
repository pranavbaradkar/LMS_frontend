import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});

export default {
    getPreSignedUrl: async function (requestData) {
        try {
            const response = await instance.post('s3/put-object-url', requestData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    uploadFile: async function (preSignedUrl, file) {
        try {
            const response = await axios.put(preSignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    }
}