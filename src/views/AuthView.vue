<template>
  <!-- author: suraj -->

  <div id="app" class="myBackground">

    <!-- <div class="m-loader d-flex justify-center align-center">   
        <lottie-player src="https://assets4.lottiefiles.com/private_files/lf30_tcux3hw6.json" background="transparent"
          speed="1" style="width: 150px; height: 150px;" loop autoplay></lottie-player>
    </div> -->
    <v-dialog max-width="200px" v-model="sendingOtpDialog">
      <v-card>
        <div class="text-h6 d-flex justify-center">Sending OTP..</div>
      </v-card>
    </v-dialog>
    <v-app-bar color="transparent" elevation="0" absolute height="120">
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.svg" width="16rem" contain></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>
    <v-row align="center" justify="center" style="height: 100vh" dense>
      <v-col cols="12" lg="12" md="12" class="fill-height d-flex flex-row justify-center align-center">
        <v-card v-if="!isGenerateOtpClicked" width="426px" height="516px">
          <div class="text-center pt-12 pl-12 pr-12 pb-9">
            <div class="d-flex justify-center align-center">
              <div class="d-flex justify-center flex-row" style="width: 270px; height: 100% 
              ;">
                <div 
                @click="
                () => {
                  vibgyouBool = true;
                  usingPhone = false;
                  reset()
                }" 
                class="px-6 py-2 left-button" :class="vibgyouBool ? 'active-border' : 'non-active-border'">
                VGOS
              </div>
              <div :class="!vibgyouBool ? 'active-border' : 'non-active-border'" class="px-6 py-2 right-button" @click="
                () => {
                  vibgyouBool = false;
                  usingPhone = false;
                  reset()
                }
              ">
                Job Seeker
              </div>
              </div>
            </div>
            <v-card-title class="justify-center text-h6 font-weight-bold pt-0 mt-9">
              Login
            </v-card-title>
            <v-card-text class="text-center text-body-1 font-weight-light pb-9" style="color: rgba(0, 0, 0, 0.6)">
              <span>Welcome{{ !vibgyouBool ? " Job Seeker!" : " Teachers" }} Please enter
                your credentials to start the journey</span>
            </v-card-text>
            <div v-if="usingPhone && !vibgyouBool" class=" text-start font-weight-regular pb-1" style="color: rgba(0, 0, 0, 0.6)">
              Phone Number
            </div>
            <div v-if="!usingPhone" class=" text-start font-weight-regular pb-1" style="color: rgba(0, 0, 0, 0.6)">
              Email Id
            </div>

            <div class="rounded-xl phoneNo" style="margin-bottom: 30px;" v-if="usingPhone && !vibgyouBool">
              <div @click="(e) => { e.preventDefault }">
                <vue-country-code disabled class="ml-2" :preferredCountries="['in']"
                  @onSelect="onSelect"></vue-country-code>
              </div>
              <span class="mr-2"> +{{ this.dialCode }} </span>
              <input type="text" @keypress="isNumber($event)"  
               class="myinput" placeholder="Phone Number" v-model="phoneNumber" maxlength="10" />
            </div>
            <v-form v-model="valid" v-if="!usingPhone || vibgyouBool">
              <span height="40px">
                <v-text-field v-if="vibgyouBool" label="Email address" suffix="@vgos.org"
                  :rules="vgosRules" class="rounded-xl" placeholder="Enter Email Id"
                  v-model="email" solo outlined @focus="triggerEmailEvent">
                </v-text-field>
                <v-text-field v-else label="Email address"
                  :rules="emailRules" class="rounded-xl" placeholder="Enter Email Id"
                  v-model="email" solo outlined @focus="triggerEmailEvent">
                </v-text-field>
              </span>
            </v-form>
            <v-btn v-if="usingPhone" color="primary" class="white--text" rounded-sm width="100%" height="32" depressed
              @click="generatePhoneOtp" :disabled="phoneNumber.length != 10">
              Send OTP
            </v-btn>
            <v-btn v-else color="primary" class="white--text" rounded-sm :disabled="!valid" width="100%" height="32" depressed
              @click="generateOtp" disabled:isGenerateOtpClicked>
              Send OTP
            </v-btn>
            <v-card-title class="justify-center primary--text cursor pa-0 ma-0 mt-4">
              <v-btn color="#E9F2F9" style="color: #277BC0;" class="mt-4 text-transform-none" rounded-sm v-if="!usingPhone && !vibgyouBool" @click="
                () => {
                  usingPhone = true;
                }
              " width="auto" height="32px" depressed>Login Using Mobile Number
              </v-btn>

              <v-btn v-else-if="!vibgyouBool" color="#E9F2F9" style="color: #277BC0" class="mt-4 text-transform-none" rounded-sm width="auto" height="32px" depressed
                @click="
                  () => {
                    usingPhone = false;
                  }
                ">Login Using Email Address</v-btn>
            </v-card-title>
          </div>
        </v-card>
        <v-card v-else width="426px" height="448px">
          <v-card height="100%" elevation="0" class="pa-8">
            <v-card-title class="ma-0 pa-0">
              <v-icon @click="isGenerateOtpClicked = false" color="black">
                mdi-arrow-left
              </v-icon>
            </v-card-title>
            <v-card-title class="justify-center text-h5 font-weight-bold pt-0">
              {{
                usingPhone ? "Verify Your Phone Number" : "Verify Your Email"
              }}
            </v-card-title>
            <v-card-text class="text-center text-body-1"><span>Enter 6 digit code sent on your
              </span>{{
                usingPhone ? "mobile number" : "e-mail address"
              }}</v-card-text>

            <v-row justify="center">
              <v-col cols="10">
                <v-otp-input length="6" type="number" v-model="otp"></v-otp-input>
                <v-row justify="space-between" class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle :style="{color: Math.floor(time/60) != 0 || time%60 != 0 ? '#03C988': ''}" class="ma-0 pa-0">0{{ Math.floor(time / 60) }}:
                      <span v-if="time % 60 < 10">0</span>{{ time % 60 }}</v-card-subtitle>
                  </v-col>
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle class="ma-0 pa-0 text-end">
                      {{ otp.length }}/6</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-text class="text-center">
              <v-btn  v-if="usingPhone" text class="primary--text pl-4" @click="generatePhoneOtp" :disabled="resendBool">RESEND OTP</v-btn>
              <v-btn v-else text class="pl-4 primary--text"  @click="generateOtp" :disabled="resendBool">RESEND OTP</v-btn>
            </v-card-text>
            <v-card-title class="justify-center">
              <v-btn :disabled="otp.length < 6" color="primary" class="white--text" rounded-sm large width="90%" height="36" @click="validateOTP">
                VERIFY
              </v-btn>
            </v-card-title>
          </v-card>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import "../styles.css";
import AuthService from "../services/AuthService";

export default {
  components: {},
  name: "AuthView",
  data() {
    return {
      isGenerateOtpClicked: false,
      otp: "",
      usingPhone: true,
      resendBool: false,
      vibgyouBool: false,
      countryName: "",
      countryIso2: "",
      dialCode: "",
      phoneNumber: "",
      sendingOtpDialog: false,
      ctList: false,
      email: "",
      time: 119,
      valid: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      vgosRules: [
        (v) => !!v || "E-mail is required",
        (v) => /^[a-zA-Z0-9_.-]{3,25}$/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    reset () {
      this.phone_number = "";
      this.email = "";
    },
    triggerPhoneNumberEvent() {
      this.$mixpanel.track("PhoneNumberFilled", {
        phone_number: this.phoneNumber,
        screen_name: "LoginScreen",
      });
    },
    triggerEmailEvent() {
      this.$mixpanel.track("EmailFilled", {
        email_address: this.email,
        screen_name: "LoginScreen",
      });
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    selectCountry() {
      this.ctList = false;
    },
    async generateOtp() {
      this.time = 119;

      await AuthService.generateOTP({
        email: this.vibgyouBool ? this.email + "@vgos.org" : this.email,
      });
      this.$mixpanel.track("GenerateOTPClicked", {
        email_address: this.email,
        user_type: this.vibgyouBool ? "teacher" : "job_seeker",
        screen_name: "LoginScreen",
      });
      // console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
    },
    onSelect({ name, iso2, dialCode }) {
      this.countryName = name;
      this.countryIso2 = iso2;
      this.dialCode = dialCode;
    },
    async generatePhoneOtp() {
      this.time = 119;
      const status = await AuthService.generateOTP({
        mobile: this.phoneNumber,
      });
      // console.log("otp generate res",response)
      this.$mixpanel.track("GenerateOTPClicked", {
        phone_number: this.phoneNumber,
        user_type: this.vibgyouBool ? "teacher" : "job_seeker",
        screen_name: "LoginScreen",
      });
      // console.log("opt send response", response)
      if (status) {
        this.isGenerateOtpClicked = true;
      }
      this.otpTimmer();
    },
    otpTimmer() {
      clearInterval(this.timer);
      this.resendBool = true;
      this.timer = setInterval(() => {
        if (this.time == 0) {
          clearInterval(this.timer);
          this.resendBool = false;
        } else {
          this.time--;
        }
      }, 1000);
    },
    async validateOTP() {
      var res = null;
      if (!this.usingPhone) {
        if (this.vibgyouBool) {
          res = await AuthService.validateOTP({
            email: this.email + "@vgos.org",
            otp: this.otp,
            debug: false,
            method: 'email',
          });
          if (res.success) {
            this.$mixpanel.track("VerifyOTP", {
              counter_secs_taken: 45,
              otp_status: "Verified",
              screen_name: "EnterOTPScreen",
            });
          } else {
            this.$mixpanel.track("VerifyOTP", {
              counter_secs_taken: 45,
              otp_status: "Incorrect",
              screen_name: "EnterOTPScreen",
            });
          }
        } else {
          res = await AuthService.validateOTP({
            email: this.email,
            otp: this.otp,
            debug: false,
            method: 'email',
          });
          console.log(res, "hjdsbdchj")
          if (res.success) {
            this.$mixpanel.track("VerifyOTP", {
              counter_secs_taken: 45,
              otp_status: "Verified",
              screen_name: "EnterOTPScreen",
            });
          } else {
            this.$mixpanel.track("VerifyOTP", {
              counter_secs_taken: 45,
              otp_status: "Incorrect",
              screen_name: "EnterOTPScreen",
            });
          }
        }

        // console.log(res)
        if (res.is_profile_created || (!res.is_profile_created && res.is_interest_captured)) {
          this.$router.push("/");
        } else {
          this.$router.push("/register");
        }
      } else {
        res = await AuthService.validateOTP({
          mobile: this.phoneNumber,
          otp: this.otp,
          debug: false,
          method: 'phone'
        });
        if (res.success) {
          this.$mixpanel.track("VerifyOTP", {
            counter_secs_taken: 45,
            otp_status: "Verified",
            screen_name: "EnterOTPScreen",
          });
        } else {
          this.$mixpanel.track("VerifyOTP", {
            counter_secs_taken: 45,
            otp_status: "Incorrect",
            screen_name: "EnterOTPScreen",
          });
        }
        // console.log(res)
        if (res.is_profile_created) {
          this.$router.push("/");
        } else {
          this.$router.push("/register");
        }
      }

      // this.isGenerateOtpClicked = true;
    },
  },
  created() {
    if (AuthService.isAuthenticated()) {
      if (this.$route.path !== "/") this.$router.replace("/");
    }
    this.$mixpanel.track("LoginScreenLoaded", {
      app_name: "Smart Staff Selection",
      screen_name: "LoginScreen",
    });
  },
  beforeCreate(){
    this.$mixpanel.track("AppOpened", {
      app_name: "Smart Staff Selection",
      screen_name: "LoginScreen",
    });
  }
};
</script>
<style >
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot {
  box-shadow: unset;
}

/* 
.myBackground {
  background: radial-gradient(
      farthest-side at bottom left,
      rgba(255, 255, 255, 0.89),
      #9592a43d
    ),
    linear-gradient(
      to right,
      transparent,
      #2f8d978a,
      #2f8d97 300px,
      #2f8d9799,
      transparent,
      transparent
    ),
    radial-gradient(
      farthest-side at bottom left,
      rgba(255, 255, 255, 0.89),
      #9592a43d
    ),
    radial-gradient(farthest-corner at bottom right, #a562bb, transparent 400px),
    linear-gradient(#aad5d9eb, white, white, #788c8ed9);
  backdrop-filter: blur(1px);
  z-index: 2;
} */

.myBackground {
  background-image: url("../assets/auth_bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100.5%;
}

.active-border {
  border: 1px solid #277BC0;
  color: #277BC0;
  background-color: #E9F2F9;
}

.non-active-border {
  border: 1px solid rgba(0, 0, 0, 0.6);
}

.left-button {
  width: 50%; 
  font-size: 14px; 
  border-top-left-radius: 16px; 
  border-bottom-left-radius: 16px; 
  border-right: 0.5px solid #277BC0;
  cursor: pointer;
}

.right-button {
  width: 50%; 
  font-size: 14px; 
  border-top-right-radius: 16px; 
  border-bottom-right-radius: 16px; 
  border-left: 0.5px solid #277BC0;
  cursor: pointer;
}


.v-otp-input > .v-input > .v-input__control > .v-input__slot > .v-text-field__slot > input {
  padding: 0px !important;
  margin-bottom: 0px;
}
</style>







