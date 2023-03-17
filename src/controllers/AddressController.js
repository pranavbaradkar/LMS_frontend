import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});

export default {
    getCountries: async function () {
        try {
            const response = await instance.get('meta/countries')
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getStates: async function (countryId) {
        try {
            const response = await instance.get('meta/states?country_id='+countryId)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getDistricts: async function (stateId) {
        try {
            const response = await instance.get('/meta/districts?state_id='+stateId)
            return response;
        } catch (error) {
            return error.response;
        }
    },
    getTalukas: async function (districtId) {
        try {
            const response = await instance.get('meta/talukas?district_id='+districtId)
            return response;
        } catch (error) {
            return error.response;
        }
    }
    ,
    getCities: async function (stateId) {
        try {
            const response = await instance.get('/meta/cities?state_id='+stateId)
            return response;
        } catch (error) {
            return error.response;
        }
    }
}