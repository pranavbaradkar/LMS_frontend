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
      console.log("generating otp", data)
      const response = await instance.post('auth/generate-otp', data);
      console.log(response);
      if (response.data.success) {
        return response.data.success;
      }
    } catch (error) {
      if (error.response.status === 404) {
        return error.response.success;
      } else {
        // handle other errors
        //console.log('An error occurred:', error.message)
        return error.response.success;
      }
    }

  },
  async verifyOTP(data) {
    try {
      console.log("validate data", data)
      const response = await instance.post('auth/validate-otp', data);
      console.log(response);
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
      console.log(response);
      if (response.data.success) {
        const token = response.data.token
        localStorage.setItem('USER_DATA', response.data)
        localStorage.setItem(TOKEN_KEY, token)
        this.$mixpanel.track("VerifyOTP", {
          "counter_secs_taken": 45,
          "otp_status": "Verified",
          "screen_name": "EnterOTPScreen"
        });
        return response.data;

      }
    }
    catch (error) {
      this.$mixpanel.track("VerifyOTP", {
        "counter_secs_taken": 45,
        "otp_status": "Incorrect",
        "screen_name": "EnterOTPScreen"
      });
      alert(error.response.data.error)
    }
  },

  logout: function () {
    localStorage.removeItem(TOKEN_KEY)
    this.$mixpanel.track("UserLoggedOut", {
      "session_timeout": false,
      "screen_name": "ThankyouScreen"
    });
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