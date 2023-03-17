// AuthService.js

import axios from 'axios'
import jwtDecode from 'jwt-decode'

const TOKEN_KEY = 'jwt'
const instance = axios.create({
  baseURL: 'https://lmsbackend.knoggles.ai/api/v1/'
});
export default {

  generateOTP: async function (data) {


    try {
      const response = await instance.post('auth/generate-otp', data);
      console.log(response);
      //console.log(response);
      if (response.data.success) {
        // const token = response.data.token
        // localStorage.setItem(TOKEN_KEY, token)
        return response.data.success;
      }
    } catch (error) {
      if (error.response.status === 404) {
        // handle 404 error
        //console.log('Resource not found.')
        return error.response.success;
      } else {
        // handle other errors
        //console.log('An error occurred:', error.message)
        return error.response.success;
      }
    }

  },
  async validateOTP(data) {
    try {
      // console.log("validate data", data)
      const response = await instance.post('auth/validate-otp', data);
      //console.log(response);
      if (response.data.success) {
        const token = response.data.token
        localStorage.setItem(TOKEN_KEY, token)
        return response.data.success;
      }
    }
     catch (error) {      
      alert(error.response.data.error)
    }
  },
  logout: function () {
    localStorage.removeItem(TOKEN_KEY)
  },
  getUser: function () {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      const decoded = jwtDecode(token)
      return decoded.user
    }
    return null
  },
  getToken: function () {
    return localStorage.getItem(TOKEN_KEY)
  },
  isAuthenticated: function () {
    const token = localStorage.getItem(TOKEN_KEY)
    return token && !this.isTokenExpired(token)
  },
  isTokenExpired: function (token) {
    const decoded = jwtDecode(token)
    const expirationDate = new Date(decoded.exp * 1000)
    return expirationDate < new Date()
  }
}
