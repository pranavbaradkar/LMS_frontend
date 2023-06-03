// AuthService.js

import axios from 'axios'
import jwtDecode from 'jwt-decode'

const TOKEN_KEY = 'jwt'
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});
export default {

  generateOTP: async function (data) {


    try {
      console.log("generating otp", data)
      const response = await instance.post('auth/generate-otp', data);
      if (response.data.success) {
        return response.data.success;
      }
    } catch (error) {  
      console.log(error);
      if (error.response.status === 404) {
        alert(error.response.data.error);
        return error.response.success;
        // response.data.error
      } else {
        // handle other errors
        alert(error.response.data.error);

        //console.log('An error occurred:', error.message)
        return error.response.success;
      }
    }

  },
  async verifyOTP(data) {
    try {
      console.log("validate data", data)
      const response = await instance.post('auth/validate-otp', data);
      console.log("varified response",response)
 
      if (response.data.success) {

        return response.data;
      }
    }
    catch (error) {
      alert(error.response.data.error)
    }
  },



  async validateOTP(data) {
    try {
      console.log("validate data", data)
      const response = await instance.post('auth/validate-otp', data);
      console.log("validate response",response);
      if (response.data.success) {
        const token = response.data.token
        localStorage.setItem('USER_DATA', JSON.stringify(response.data))
        localStorage.setItem(TOKEN_KEY, token)
        
        return response.data;

      }
      else{
        return response.data;
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