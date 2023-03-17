import axios from 'axios'
import AuthService from '@/services/AuthService';
const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});

export default {
    createUser: async function (formData) {
        
        try {
            const response = await instance.post('/user/update', formData, {
                headers: {
                    'Authorization': AuthService.getToken()
                }
            })
            return response;
        } catch (error) {
            return error.response;
        }
    },
    // getUsers: async function (page, pageSize) {

    //     try {
    //         const response = await instance.post('admin/users/list', {
    //             "page": page,
    //             "pageSize": pageSize,
    //         }, {
    //             headers: {
    //                 'Authorization': AuthService.getToken()
    //             }
    //         })
    //         return response;
    //     } catch (error) {
    //         return error.response;
    //     }
    // },
    // deleteUser : async function (id) {
      
    //     try {
    //         const response = await instance.delete('admin/users/'+id,{
    //             headers: {
    //                 'Authorization': AuthService.getToken()
    //               }
    //         })
    //         return response;
    //     } catch (error) {
    //         return error.response;
    //     }
    // },
}