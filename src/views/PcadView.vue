<template>
  <div class="surface">
    <v-app-bar color="surface" elevation="0" fixed>
      <v-list-item>
        <v-list-item-icon class="pt-4">
          <v-img src="../assets/logo.svg" contain max-width="16rem"></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>

    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="#db44371f" size="90"
              ><v-icon size="65" color="#DB4437"
                >mdi-trash-can-outline</v-icon
              ></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">
              Are You Sure You Want To Delete This Info ?
            </p>
            <p
              class="text-disabled grey--text text-subtitle-1"
              color="rgba(0, 0, 0, 0.6)"
              disabled
            >
              This action will permanently delete the item . This cannot be
              undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn
                class="black--text"
                color="#0000001a"
                large
                width="157px"
                @click="deleteDialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="primary white--text"
                large
                width="157px"
                @click="removeDataFromSteps()"
                >DELETE</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="otpDialog" max-width="450px" class="center">
      <v-card height="100%" elevation="0" class="pb-8">
        <v-card-title class="justify-center text-h5 font-weight-bold">
          {{ usingPhone ? "Verify Your Phone Number" : "Verify Your Email" }}
        </v-card-title>
        <v-card-text class="text-center text-body-1"
          ><span>Enter 6 Digit Code Sent On</span><br /><span>{{
            usingPhone ? "Your Phone Number" : "Your Email Address"
          }}</span></v-card-text
        >

        <div class="d-flex flex-column pl-8 pr-8">
          <v-otp-input length="6" type="number" v-model="otp"></v-otp-input>
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
        </div>

        <v-card-text class="text-center">
          <v-btn
            class="primary--text cursor"
            on
            text
            elevation="0"
            :disabled="!resendBool"
            @click="usingPhone ? generatePhoneOtp() : generateOtp()"
          >
            RESEND OTP
          </v-btn>
        </v-card-text>
        <v-card-title class="justify-center">
          <v-btn
            color="primary"
            class="textcolor--text"
            large
            width="90%"
            height="40"
            @click="validateOTP"
            :disabled="otp.length != 6"
          >
            VERIFY
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>

    <v-card
      color="surface"
      :height="getHeight - 32 + 'px'"
      depressed
      elevation="0"
    >
      <v-row class="mb-n0">
        <v-col class="pa-0">
          <v-row class="mb-0 pb-0">
            <v-col cols="6">
              <div style="position: relative; width: 100%; height: 100%">
                <v-img
                  :height="getHeight + 22 + 'px'"
                  width="100%"
                  style="position: absolute; top: -100; z-index: 5"
                  src="@/assets/premain-background.svg"
                ></v-img>
                <v-row style="z-index: 10; width: 75%">
                  <v-col style="margin-top: 112px">
                    <div class="ml-8" style="margin-bottom: 20px">
                      <v-icon>mdi-arrow-left</v-icon>
                    </div>
                    <div style="font-size: 39px" class="font-weight-bold ml-8">
                      PCAD
                    </div>
                    <div
                      style="font-size: 14px; color: #000; width: 80%"
                      class="ml-8"
                    >
                      Record a short video of yourself while speaking to the scipit given below 👇 
                    </div>
                    <v-card
                      :height="'400px'"
                      id="myScroll"
                      elevation="0"
                      style="overflow-x: hidden; margin-left: 30px"
                      class="pa-5 mt-2"
                      depressed
                      outlined
                    >
                      <p style="color: #7B7A7B;font-size:22px;line-height: 26px;">Hello, I am &lt;Name&gt; and the account is registered under my email address 
                      &lt;email id&gt;, my date of birth&lt;DD/MM/YY&gt;</p>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="5" style="margin-top: 84px; margin-right: 20px">
              
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import UploadController from "@/controllers/UploadController";
import axios from "axios";
//import ImageInput from "../components/ImageInput.vue";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import "../styles.css";
import AddressController from "@/controllers/AddressController.js";
import PersonalInfoController from "@/controllers/PersonalInfoController.js";
import AcademicsController from "@/controllers/AcademicsController.js";
import ProfessionalController from "@/controllers/ProfessionalController.js";
// import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import GradeController from "@/controllers/GradeController";
import SubjectController from "@/controllers/SubjectController";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import AuthService from "../services/AuthService";

export default {
  name: "RegistrationView",
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  // components: {
  //   ImageInput,
  // },
  data() {
    return {
      e1: 1,
      experience: "Experienced",
      isCurrentlyWorking: false,
      isFetchingLocation: false,
      windowHeight: window.innerHeight,
      phoneVerify: false,
      emailVerify: false,
      country: "",
      state: "",
      district: "",
      cityVillage: "",
      pinCode: "",
      address: "",
      talukTehsil: "",
      avatar: null,
      saving: false,
      saved: false,
      email: "",
      experienceYear: 0,
      experienceMonth: 0,
      rolePosition: "",
      employeeTypeId: 0,
      deleteDialog: false,
      boardId: 0,
      startDate: null,
      otpDialog: false,
      resendBool: false,
      endDate: null,
      expandedPanelIndex: 0,
      countries: [],
      states: [],
      districts: [],
      cities: [],
      talukas: [],
      otp: "",
      time: 119,
      emailBool: false,
      usingPhone: true,
      isCurrentLocation: false,
      preSignedUrl: "",
      selectedFile: [],

      userInfo: {},
      indexValue: null,

      isCreatingUser: false,
      successDialog: false,
      errorDialog: false,
      dobRules: [
        (v) => !!v || "Field is required",
        // (v) =>
        //   /^\d{4}-\d{2}-\d{2}$/.test(v) ||
        //   "Date of Birth must be in YYYY-MM-DD format",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      personalInfo: {
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        dob: "",
        gender: "",
        phone_no: "",
        country_id: -1,
        state_id: -1,
        talukTehsil: -1,
        city_id: -1,
        address: "",
        pincode: 0,
        country_name: "",
        state_name: "",
        city_name: "",
        district_name: "",
        taluka_name: "",
        is_phone_verified: false,
        is_email_verified: false,
      },
      academicQualifications: [
        {
          institution: "",
          programme: "",
          start_date: "",
          end_date: "",
          field_of_study: "",
          extra_carricular_activities: [],
          grade_score: 0,
          grade_type: "",
          achievements: [],
          certificate_url: "",
        },
      ],
      professionalInfos: [
        {
          experience_year: 0,
          experience_month: 0,
          position: "",
          employee_type_id: 0,
          start_date: "",
          end_date: "",
        },
      ],
      employeeType: [
        {
          id: 1,
          name: "Permanent",
        },
        {
          id: 2,
          name: "Contract",
        },
        {
          id: 3,
          name: "Prohibition",
        },
      ],
    };
  },
  methods: {
    onChange() {
      console.log(this.selectedFile[this.expandedPanelIndex]);
      console.log("selelcted file details", this.expandedPanelIndex);
      this.getPreSignedUrl();
    },
    async getPreSignedUrl() {
      const response = await UploadController.getPreSignedUrl({
        context: "user-profiles",
        file_name: this.selectedFile[this.expandedPanelIndex].name,
        mime_type: this.selectedFile[this.expandedPanelIndex].type,
        file_type: "certifcate",
        business_type: "b2c",
        uuid: "123-456-7",
      });
      this.preSignedUrl = response.data.data.signed_request;
      this.academicQualifications[this.expandedPanelIndex].certificate_url =
        response.data.data.url;
      this.uploadToS3();
    },
    async uploadToS3() {
      console.log("Pre-Signed URL: ", this.preSignedUrl);
      const uploadResponse = await UploadController.uploadFile(
        this.preSignedUrl,
        this.selectedFile[this.expandedPanelIndex]
      );
      console.log("Upload Response: ", uploadResponse);
      console.log(this.academicQualifications[this.expandedPanelIndex]);
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
    clearLocation() {
      this.isCurrentLocation = false;
      this.personalInfo.country_name = "";
      this.personalInfo.state_name = "";
      this.personalInfo.district_name = "";
      this.personalInfo.country_id = -1;
      this.personalInfo.state_id = -1;
      this.personalInfo.district_id = -1;
      this.personalInfo.pincode = "";
      this.personalInfo.taluka_name = "";
      this.personalInfo.city_name = "";
      this.personalInfo.address = "";
    },
    async location() {
      this.isFetchingLocation = true;
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.lat = position.coords.latitude; //'26.4838767';
          this.long = position.coords.longitude; //'80.3211793';
          var url = `https://geocode.maps.co/reverse?lat=${this.lat}&lon=${this.long}`;
          const response = await axios.get(url);
          console.log(response);
          if (response.status == 200) {
            this.isCurrentLocation = true;
            this.personalInfo.country_name = response.data.address.country;
            this.personalInfo.state_name = response.data.address.state;
            this.personalInfo.district_name =
              response.data.address.state_district;
            this.personalInfo.pincode = response.data.address.postcode;
            this.personalInfo.taluka_name = response.data.address.county;
            this.personalInfo.city_name = response.data.address.neighbourhood;
            this.personalInfo.address =
              response.data.address.building +
              ", " +
              response.data.address.road;
            this.isFetchingLocation = false;
          }
        },
        (error) => {
          this.isFetchingLocation = false;
          console.log(error);
        }
      );
    },
    removeDataFromSteps() {
      this.deleteDialog = true;
      if (this.e1 == 2) {
        this.academicQualifications.splice(this.indexValue, 1);
      } else if (this.e1 == 3) {
        this.professionalInfos.splice(this.indexValue, 1);
      }
      this.deleteDialog = false;
      this.indexValue = null;
    },
    async goToStep2() {
      console.log("clicked step 2");
      if (this.$refs.step1.validate()) {
        console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await PersonalInfoController.createUserPersonalInfo(
          this.personalInfo
        );
        console.log(response);
        if (response.data.success) {
          this.$mixpanel.track("AcademicsPageLoaded", {
            user_type: this.userInfo.user_type,
            screen_name: "AcademicsScreen",
          });
          this.isCreatingUser = false;
          this.successDialog = true;
          this.e1 = 2;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
          alert(response.data.error);
        }
      } else {
        if (this.$refs.step1.validate()) {
          alert("Please Verify Secondry Contact");
        }
      }
    },
    async goToStep3() {
      if (this.$refs.step2.validate()) {
        // console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await AcademicsController.createUserAcademicsInfo(
          this.academicQualifications
        );
        console.log(response);
        if (response.data.success) {
          this.$mixpanel.track("NextButtonClicked", {
            academics_info: this.academicQualifications,
            screen_name: "AcademicProfileInformationScreen",
          });
          this.$mixpanel.track("ProfessionInfoStepLoaded", {
            user_type: this.userInfo.user_type,
            screen_name: "ProfessionInfoScreen",
          });
          this.isCreatingUser = false;
          this.successDialog = true;
          this.e1 = 3;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
          alert(response.data.error);
        }
      }
    },
    manualClick() {
      document.getElementById("fileInput").click();
    },
    async saveDetails() {
      //console.log("function");
      if (this.$refs.step3.validate()) {
        //console.log("userif conditon");
        this.isCreatingUser = true;
        if (this.isCurrentlyWorking) {
          delete this.professionalInfos[0].end_date;
        }
        const response =
          this.experience == "Fresher"
            ? await ProfessionalController.createUserProfessionalInfo([
                {
                  is_fresher: true,
                },
              ])
            : await ProfessionalController.createUserProfessionalInfo(
                this.professionalInfos
              );
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.$router.replace("/interests");
        } else {
          alert(response.data.error);
          this.isCreatingUser = false;
        }
        console.log(response);
        let mixpanelData = {
          personal_info: this.personalInfo,
        };
        this.academicQualifications.forEach((item, index) => {
          mixpanelData[`academics_info_${index + 1}`] = item;
        });
        this.professionalInfos.forEach((item, index) => {
          mixpanelData[`professional_info_${index + 1}`] = item;
        });
        this.$mixpanel.track("SaveProfileDetailsClicked", mixpanelData);
      }
    },
    async startTest() {
      if (this.$refs.step3.validate()) {
        this.isCreatingUser = true;
        const response =
          await ProfessionalController.createUserProfessionalInfo(
            this.professionalInfos
          );
        // console.log(response);
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.$router.replace("/");
        } else {
          this.isCreatingUser = false;
        }
      }
    },
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      //console.log("User: Registration", this.userInfo);
      if (this.userInfo.is_personal_info_captured) {
        this.e1 = 2;
      }
      this.personalInfo.is_email_verified = this.userInfo.is_email_verified;
      this.personalInfo.is_phone_verified = this.userInfo.is_phone_verified;
      this.personalInfo.email = this.userInfo.email;
      this.personalInfo.phone_no = this.userInfo.phone_no.slice(-10);

      this.personalInfo.first_name = this.userInfo.first_name;
      this.personalInfo.last_name = this.userInfo.last_name;
      this.personalInfo.title = this.userInfo.title;
      this.personalInfo.middle_name = this.userInfo.middle_name;
      this.personalInfo.country_id = this.userInfo.country_id;
      this.personalInfo.gender = this.userInfo.gender;
      this.personalInfo.state_id = this.userInfo.state_id;
      this.personalInfo.address = this.userInfo.address;
      this.personalInfo.city_id = this.userInfo.city_id;
      this.personalInfo.pincode = this.userInfo.pincode;
      this.personalInfo.city_name = this.userInfo.city_name;
      this.personalInfo.taluka_name = this.userInfo.taluka_name;
      this.personalInfo.dob = this.userInfo.dob;
      this.personalInfo.state_id = this.userInfo.state_id;

      this.$mixpanel.track("PersonalInformationStepLoaded", {
        user_type: this.userInfo.user_type,
        screen_name: "PersonalProfileInformationScreen",
      });
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },

    async fetchCountries() {
      const response = await AddressController.getCountries();
      this.countries = response.data.data.rows;

      //console.log(this.countries);
    },
    async fetchStates() {
      const response = await AddressController.getStates(
        this.personalInfo.country_id
      );
      this.states = response.data.data.rows;
      //console.log(this.states);
    },
    async fetchDistricts() {
      //console.log(this.personalInfo.state_id);
      const response = await AddressController.getDistricts(
        this.personalInfo.state_id
      );
      this.districts = response.data.data.rows;

      //console.log(this.districts);
      this.fetchCities();
    },
    async fetchTalukas() {
      const response = await AddressController.getTalukas(
        this.personalInfo.districtId
      );
      this.talukas = response.data.data.rows;

      //console.log(this.talukas);
    },
    async fetchCities() {
      const response = await AddressController.getCities(
        this.personalInfo.state_id,
        this.personalInfo.talukTehsil
      );
      this.cities = response.data.data.rows;

      //console.log(this.cities);
    },
    // async getSchool() {
    //   const response = await SchoolController.getSchool();
    //   console.log("school log",response);
    //   this.schoolData = response.data.data.rows;
    //   //console.log("school log", this.schoolData);
    // },
    async getBoards() {
      const response = await BoardController.getBoards();
      //console.log(response);
      this.boardsData = response.data.data.rows;
      //console.log("board log", this.boardsData);
    },
    async getLevel() {
      const response = await LevelController.getLevel();

      this.tableLevels = response.data.data.rows;
      //console.log("level log", this.tableLevels);
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      this.gradesData = response.data.data.rows;
      //console.log("grades log", this.gradesData);
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();

      this.subjectsData = response.data.data.rows;
      //console.log("subject log", this.subjectsData);
    },

    addAcademicQualification() {
      this.academicQualifications.push({
        institution: "",
        programme: "",
        start_date: "",
        end_date: "",
        field_of_study: "",
        extra_carricular_activities: [],
        grade_score: 0,
        grade_type: "",
        achievements: [],
        certificate_url: "",
      });
      this.expandedPanelIndex = this.academicQualifications.length - 1;
    },
    addProfessionalInfo() {
      this.professionalInfos.push({
        experience_year: 0,
        experience_month: 0,
        position: "",
        employee_type_id: 0,
        start_date: "",
        end_date: "",
      });
      this.expandedPanelIndex = this.professionalInfos.length - 1;
    },
    async generateOtp() {
      this.usingPhone = false;
      this.resendBool = false;
      this.time = 119;

      await AuthService.generateOTP({
        email: this.personalInfo.email,
      });
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
      this.$mixpanel.track("VerifyEmailClicked", {
        email_address: this.personalInfo.email,
        screen_name: "PersonalProfileInformationScreen",
      });

      // console.log("opt send response", response)
    },
    async generatePhoneOtp() {
      this.time = 119;
      this.resendBool = false;
      const response = await AuthService.generateOTP({
        mobile: toString(this.personalInfo.phone_no),
      });

      if (response) {
        this.otpDialog = true;
      }

      this.isGenerateOtpClicked = true;
      this.otpTimmer();
      this.$mixpanel.track("VerifyMobileClicked", {
        phone_number: this.personalInfo.phone_no,
        screen_name: "PersonalProfileInformationScreen",
      });

      // console.log("opt send response", response)
    },

    otpTimmer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.time == 0) {
          clearInterval(this.timer);
          this.resendBool = true;
        } else {
          this.time--;
        }
      }, 1000);
    },
    async validateOTP() {
      var res = null;
      if (!this.usingPhone) {
        res = await AuthService.verifyOTP({
          email: this.personalInfo.email,
          otp: this.otp,
          debug: false,
          user_id: this.userInfo.id,
        });
        this.$mixpanel.track("VerifyOTP", {
          counter_secs_taken: 45,
          otp_status: "Verified",
          screen_name: "EnterOTPEmailScreen",
        });
        this.personalInfo.is_email_verified = res.success;
        this.otpDialog = false;
      } else {
        res = await AuthService.verifyOTP({
          mobile: this.personalInfo.phone_no,
          otp: this.otp,
          debug: false,
          user_id: this.userInfo.id,
        });
        this.$mixpanel.track("VerifyOTP", {
          counter_secs_taken: 45,
          otp_status: "Verified",
          screen_name: "EnterOTPMobileScreen",
        });
        this.personalInfo.is_phone_verified = res.success;
        this.otpDialog = false;
        //console.log("RES VLAUE ", res);
      }

      // this.isGenerateOtpClicked = true;
    },
    openDeleteDiolog(index) {
      this.indexValue = index;
      this.deleteDialog = true;
    },
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    },

    minValueRule() {
      return (value) =>
        parseInt(value) >= 0 || "Value must be greater than or equal to 0";
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  mounted() {
    this.$nextTick(() => {
      console.log("clicked step 2");
      window.addEventListener("resize", this.onResize);
      console.log("clicked step 2");
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.getUserInfo();
    this.fetchCountries();
  },
};
</script>
<style scoped>
.registration-stepper-header.v-stepper__header {
  box-shadow: none;
  margin-left: 140px;
  margin-right: 140px;
  margin-bottom: 0px;
}
.registration-stepper.v-sheet.v-stepper:not(.v-sheet--) {
  box-shadow: none;
}

.v-input.date-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input {
  padding: 0px !important;
  margin-bottom: 16px;
  margin-top: 12px !important;
}
</style>
