<template>
  <!-- author: suraj -->
  <div id="app" class="myBackground">
    <v-app-bar color="transparent" elevation="0" absolute height="120">
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.png" contain></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>
    <v-row align="center" justify="center" style="height: 100vh" dense>
      <v-col cols="12" lg="12" md="12" class="fill-height d-flex flex-column justify-center align-center">
        <v-card width="426px" height="auto">
          <div class="text-center pt-3 pl-8 pr-8" v-if="!isGenerateOtpClicked">
            <img src="../assets/icon.png" width="70px" height="70px" />
            <v-card-title class="justify-center text-h5 font-weight-bold pt-0">
              Log In
            </v-card-title>
            <v-card-text class="text-center text-body-1 font-weight-light">
              <span>Welcome! Please Enter Your</span>
              <br />
              <span>Credentials To Continue Your Journey</span>
            </v-card-text>
            <div v-if="usingPhone && !vibgyouBool" class="text--disabled text-start font-weight-regular pb-1">
              Phone Number
            </div>
            <div v-if="!usingPhone" class="text--disabled text-start font-weight-regular pb-1">
              Email Id
            </div>

            <div class="rounded-xl phoneNo mb-8" v-if="usingPhone && !vibgyouBool">
              <div class="phoneprefix pl-4" @click="ctList = true">
                <img src="../assets/india.png" height="16px" />
                <div class="pa-1">+91</div>
                <v-icon v-if="!ctList">mdi-chevron-down</v-icon><v-icon v-if="ctList">mdi-chevron-up</v-icon>
                <v-divider vertical inset class="my-2"></v-divider>
              </div>
              <input type="text" class="myinput" placeholder="Phone Number" v-model="phoneNumber" maxlength="10" />
              <div v-if="ctList" id="countrylist">
                <div v-for="index in 5" v-bind:key="index" class="ctNameIcon" @click="selectCountry">
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
                
                <v-text-field label="Email address" :suffix="vibgyouBool?'@vgos.org':''"  :rules="emailRules" class="rounded-xl"
                   placeholder="Enter Email Id" v-model="email" solo outlined></v-text-field>
              </span>
            </v-form>
            <v-btn v-if="usingPhone" color="secondary" class="textcolor--text" rounded large width="100%" @click="generatePhoneOtp"
              :disabled="phoneNumber.length != 10">
              Generate OTP
            </v-btn>
            <v-btn v-else color="secondary" class="black--text pt-2" rounded :disabled="!valid" large width="100%"
              @click="generateOtp" disabled:isGenerateOtpClicked>
              Generate OTP
            </v-btn>
            <v-card-title class="justify-center primary--text cursor pt-6">
              <v-btn color="#CAECEF" class="textcolor--text" rounded large v-if="!usingPhone && !vibgyouBool"
                @click="() => { usingPhone = true }" width="auto" height="30px">Log In Using Mobile Number </v-btn>

              <v-btn color="#CAECEF" class="textcolor--text" rounded large width="auto" height="30px"
                v-if="usingPhone && !vibgyouBool" @click="() => { usingPhone = false }">Log In Using Email Address</v-btn>
            </v-card-title>

            <v-card-text class="text-center text-body-1 font-weight-light d-inline px-0  ">
              <span> {{ !vibgyouBool ? 'Are You already a VIBGYOR School Teacher ?' : 'Seeking a Teaching Job At VIBGYOR School ? '}} </span>
              <v-card-text @click="() => { vibgyouBool = !vibgyouBool; usingPhone = false }" class="justify-center primary--text cursor d-inlines"><span class="font-weight-medium"
                  >Click Here To Log In</span>
              </v-card-text>
            </v-card-text>
          </div>
          <v-card v-else height="100%" elevation="0">
            <v-card-title>
              <v-icon @click="isGenerateOtpClicked = false" color="black">
                mdi-arrow-left
              </v-icon>
            </v-card-title>
            <v-card-title class="justify-center text-h5 font-weight-bold">
              {{
                usingPhone ? "Verify Your Phone Number" : "Verify Your Email"
              }}
            </v-card-title>
            <v-card-text class="text-center text-body-1"><span>Enter 6 Digit Code Sent On</span><br /><span>{{
              usingPhone ? "Your Phone Number" : "Your Email Address"
            }}</span></v-card-text>



            <v-row justify="center">
              <v-col cols="10">
                <v-otp-input length="6" type="number" v-model="otp"></v-otp-input>
                <v-row justify="space-between" class="ma-0 pa-0">
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle class="ma-0 pa-0">0{{  Math.floor(time / 60) }}: <span v-if="(time%60) < 10">0</span>{{ time%60 }}</v-card-subtitle>
                  </v-col>
                  <v-col class="ma-0 pa-0">
                    <v-card-subtitle class="ma-0 pa-0 text-end">
                      {{ otp.length }}/6</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-card-text class="text-center">
              <span class="primary--text" :disabled="resendBool" @click="generateOtp"> RESEND OTP </span>
            </v-card-text>
            <v-card-title class="justify-center">
              <v-btn color="secondary" class="textcolor--text" rounded large width="90%" height="40" @click="validateOTP">
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
    };
  },
  methods: {
    selectCountry() {
      this.ctList = false;
    },
    generateOtp() {
      this.time = 119;
      const response = AuthService.generateOTP({
        "email": this.email
      });
      

      console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
      this.otpTimmer();

    },
    generatePhoneOtp(){
      this.time = 119;
      const response = AuthService.generateOTP({
    "mobile": "+91"+this.phoneNumber
});
      

      console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
      },
    otpTimmer() {
      this.timer = setInterval(() => {
        if (this.time == 0) {
          clearInterval(this.timer)
          this.resendBool = false;
        }
        else {
          this.time--;
        }
      }, 1000)
    },
    async validateOTP() {
      var res = null;
      if(!this.usingPhone){
      res = await AuthService.validateOTP({
        "email": this.email,
        "otp": this.otp,
        "debug": false
      });
      console.log(res)
      if (res) {

        this.$router.push("/");
      }
    }
      else {
       res = await AuthService.validateOTP({
        "phone": "91"+this.phoneNumber,
        "otp": this.otp,
        "debug": false
      });
      console.log(res)
      if (res) {

        this.$router.push("/");
      }
      }
      

      // this.isGenerateOtpClicked = true;
    },
  },
  computed: {

  },
  created() {

  },
};
</script>
<style >
.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot {
  box-shadow: unset;
}

.myBackground {
  background: radial-gradient(farthest-side at bottom left,
      rgba(255, 255, 255, 0.89),
      #9592a43d),
    linear-gradient(to right,
      transparent,
      #2f8d978a,
      #2f8d97 300px,
      #2f8d9799,
      transparent,
      transparent),
    radial-gradient(farthest-side at bottom left,
      rgba(255, 255, 255, 0.89),
      #9592a43d),
    radial-gradient(farthest-corner at bottom right, #a562bb, transparent 400px),
    linear-gradient(#aad5d9eb, white, white, #788c8ed9);
  backdrop-filter: blur(1px);
  z-index: 2;
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







