<template>
  <!-- author: suraj -->
  <div id="app" class="myBackground">
    <v-app-bar color="transparent" elevation="0" absolute height="120">
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.svg" width="16rem" contain></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>
    <v-row align="center" justify="center" style="height: 100vh" dense>
      <v-col
        cols="12"
        lg="12"
        md="12"
        class="fill-height d-flex flex-column justify-center align-center"
      >
        <v-card width="426px" height="auto">
          <div class="text-center pt-8 pl-8 pr-8" v-if="!isGenerateOtpClicked">
            <img src="../assets/icon.svg" width="70px" height="70px" />
            <v-card-title class="justify-center text-h5 font-weight-bold pt-0">
              Login
            </v-card-title>
            <v-card-text class="text-center text-body-1 font-weight-light">
              <span
                >Welcome{{ !vibgyouBool ? " Job Seeker!" : "" }} Please enter
                your credentials to start the journey</span
              >
            </v-card-text>
            <div
              v-if="usingPhone && !vibgyouBool"
              class="text--disabled text-start font-weight-regular pb-1"
            >
              Phone Number
            </div>
            <div
              v-if="!usingPhone"
              class="text--disabled text-start font-weight-regular pb-1"
            >
              Email Id
            </div>

            <div
              class="rounded-xl phoneNo mb-4"
              v-if="usingPhone && !vibgyouBool"
            >
              <div class="phoneprefix pl-4" @click="ctList = true">
                <img src="../assets/india.png" height="16px" />
                <div class="pa-1">+91</div>
                <v-icon v-if="!ctList">mdi-chevron-down</v-icon
                ><v-icon v-if="ctList">mdi-chevron-up</v-icon>
                <v-divider vertical inset class="my-2"></v-divider>
              </div>
              <input
                type="text"
                class="myinput"
                placeholder="Phone Number"
                v-model="phoneNumber"
                maxlength="10"
              />
              <div v-if="ctList" id="countrylist">
                <div
                  v-for="index in 5"
                  v-bind:key="index"
                  class="ctNameIcon"
                  @click="selectCountry"
                >
                  <img class="ctimg" src="../assets/india.png" height="16px" />
                  <span class="ctname">India</span>
                  <span class="ctCode">+ 91</span>
                </div>
              </div>
            </div>
            <v-form v-model="valid" v-if="!usingPhone || vibgyouBool">
              <!--<v-text-field v-if="!vibgyouBool" :label="Enter Email Id" placeholder="Enter Email Id" :rules="emailRules" solo outlined
                v-model="email" class="rounded-xl">
              </v-text-field>-->

              <!-- <v-text-field  :label="Enter Your Vibgyor Email Id"  placeholder="Enter Email Id" :rules="emailRules" solo outlined
              v-model="email" class="rounded-xl">
            </v-text-field>  -->
              <span height="40px">
                <v-text-field
                  label="Email address"
                  :suffix="vibgyouBool ? '@vgos.org' : ''"
                  :rules="vibgyouBool ?  vgosRules : emailRules "
                  class="rounded-xl"
                  placeholder="Enter Email Id"
                  v-model="email"
                  solo
                  outlined
                ></v-text-field>
              </span>
            </v-form>
            <v-btn
              v-if="usingPhone"
              color="secondary"
              class="textcolor--text"
              rounded
              large
              width="100%"
              @click="generatePhoneOtp"
              :disabled="phoneNumber.length != 10"
            >
              Generate OTP
            </v-btn>
            <v-btn
              v-else
              color="secondary"
              class="black--text pt-2"
              rounded
              :disabled="!valid"
              large
              width="100%"
              @click="generateOtp"
              disabled:isGenerateOtpClicked
            >
              Generate OTP
            </v-btn>
            <v-card-title class="justify-center primary--text cursor pa-0 ma-0">
              <v-btn
                color="#CAECEF"
                class="textcolor--text mt-4"
                rounded
                large
                v-if="!usingPhone && !vibgyouBool"
                @click="
                  () => {
                    usingPhone = true;
                  }
                "
                width="auto"
                height="36px"
                depressed
                >Login Using Mobile Number
              </v-btn>

              <v-btn
                color="#CAECEF"
                class="textcolor--text mt-4"
                rounded
                large
                width="auto"
                height="36px"
                depressed
                v-if="usingPhone && !vibgyouBool"
                @click="
                  () => {
                    usingPhone = false;
                  }
                "
                >Login Using Email Address</v-btn
              >
            </v-card-title>

            <v-card-text class="pa-0 mt-8 mb-8">
              <span>
                {{
                  !vibgyouBool
                    ? "Already a VIBGYOR Teacher ?"
                    : "Job Seeker at VIBGYOR Schools?"
                }}
              </span>
              <v-btn
                text
                width="100px"
                @click="
                  () => {
                    vibgyouBool = !vibgyouBool;
                    usingPhone = false;
                  }
                "
                class="textcolor--text pl-4"
                >LOGIN HERE</v-btn
              >
            </v-card-text>
          </div>
          <v-card v-else height="100%" elevation="0" class="pa-8">
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
            <v-card-text class="text-center text-body-1"
              ><span
                >Please enter the 6-digit code you have received on your </span
              >{{
                usingPhone ? "mobile number" : "e-mail address"
              }}</v-card-text
            >

            <v-row justify="center">
              <v-col cols="10">
                <v-otp-input
                  length="6"
                  type="number"
                  v-model="otp"
                ></v-otp-input>
                <v-row justify="space-between" class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle class="ma-0 pa-0"
                      >0{{ Math.floor(time / 60) }}:
                      <span v-if="time % 60 < 10">0</span
                      >{{ time % 60 }}</v-card-subtitle
                    >
                  </v-col>
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle class="ma-0 pa-0 text-end">
                      {{ otp.length }}/6</v-card-subtitle
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-text class="text-center">
              <!-- <span
                class="primary--text cursor"
                :disabled="resendBool"
                @click="
                  () => {
                    this.isGenerateOtpClicked = false;
                  }
                "
              >
                RESEND OTP
              </span> -->



              <v-btn
                text
                
                class="textcolor--text pl-4"
                @click="generatePhoneOtp"
                :disabled="resendBool"
                >RESEND OTP</v-btn >




            </v-card-text>
            <v-card-title class="justify-center">
              <v-btn
                color="secondary"
                class="textcolor--text"
                rounded
                large
                width="90%"
                height="40"
                @click="validateOTP"
              >
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
      phoneNumber: "",
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
        (v) => /^[a-zA-Z0-9_-]{3,16}$/.test(
            v
          ) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    selectCountry() {
      this.ctList = false;
    },
    async generateOtp() {
      this.time = 119;
    
        await AuthService.generateOTP({
        email: this.vibgyouBool ?  this.email+"@gmail.com" : this.email,
      });

     
      

      // console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
    },
    async generatePhoneOtp() {
      this.time = 119;
      await AuthService.generateOTP({
        mobile: "+91" + this.phoneNumber,
      });

      // console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
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


        if(this.vibgyouBool){
          res = await AuthService.validateOTP({
          email: this.email +'@gmail.com',
          otp: this.otp,
          debug: false,
        });
        }
        else {
          res = await AuthService.validateOTP({
          email: this.email,
          otp: this.otp,
          debug: false,
        });
        }

        

        // console.log(res)
        if (res.is_profile_created) {
          this.$router.push("/");
        } else {
          this.$router.push("/register");
        }
      } else {
        res = await AuthService.validateOTP({
          mobile: "+91" + this.phoneNumber,
          otp: this.otp,
          debug: false,
        });
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
  computed: {},
  created() {
    if (AuthService.isAuthenticated()) {
      if (this.$route.path !== "/") this.$router.replace("/");
    }
  },
};
</script>
<style >
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
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
}


input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  -webkit-transition: 0.2s;
  transition: 0.2s;

  outline-color: #82d2da;
}
</style>







