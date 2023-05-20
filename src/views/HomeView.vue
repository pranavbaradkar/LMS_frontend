<template>
  <div class="surface">
    <v-app-bar app elevation="0" color="surface" class="justify-start">
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.svg" contain height="64"></v-img>
        </v-list-item-icon>
        <v-list-item-content> </v-list-item-content>
        <v-list-item-action>
          <v-row class="align-center">
            <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>

            <v-card-title class="pl-2" v-if="userInfo != null"
              >{{ userInfo.first_name }} 👋</v-card-title
            >
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" text icon>
                  <v-avatar>
                    <v-img src="../assets/user.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <v-btn @click="logout">logout</v-btn>
            </v-menu>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-app-bar>
    <v-container>
      <v-card
        color="surface"
        class="mx-auto"
        elevation="0"
        width="100%"
        :height="getHeight"
        variant="outlined"
        v-if="allAssessments.length != 0 || recommendedAssessment != {}"
      >
        <div class="text-h6 mb-1 text-center">Test Selection</div>
        <v-list-item-subtitle class="text-center grey--text"
          >Let's start your profile, connect to people you know, and engage with
          <br />them on topics you care about.</v-list-item-subtitle
        >

        <v-img
          width="100%"
          height="320px"
          src="../assets/holebanner.jpeg"
          cover
          class="mt-4"
        >
          <v-card
            class="pa-10"
            elevation="0"
            width="100%"
            height="100%"
            variant="outlined"
            color="#0f0d0d57"
          >
            <div class="white--text" v-if="recommendedAssessment != null">
              <div class="text-caption">Recommended</div>

              <div class="text-h4 mb-1">{{ recommendedAssessment.name }}</div>
              <p class="mt-4">{{ recommendedAssessment.instructions }}</p>
              <div class="mt-4" v-if="recommendedAssessment.tests != null">
                <v-icon class="white--text">mdi-book</v-icon>
                {{ recommendedAssessment.tests[0].total_no_of_questions }}
                Questions<v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-clock</v-icon>
                {{
                  formatTime(
                    recommendedAssessment.tests[0].duration_of_assessment
                  )
                }}
                <v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-book</v-icon>
                300 Users
              </div>
              <v-btn
                height="48px"
                color="secondary"
                class="primary--text mt-8"
                rounded
                large
                @click="recommendedTestViewEvent"
                >TAKE TEST</v-btn
              >
            </div>
          </v-card>
        </v-img>
        <div class="text-h6 py-4">
          Other Tests
          <div class="">
            <button @click="checkActiveStream">Check Camera Activity</button>
            <p>{{ camera_id }}</p>
            <button @click="captureImage">Capture Image</button>
            <video ref="kvideoElement" autoplay></video>
            <canvas ref="canvasElement"></canvas>
            <img :src="capturedImageUrl" alt="Captured Image" v-if="capturedImageUrl" />
          </div>
          <div class="">
            Video element
            <video ref="videoElement" id="videoElement" width="360" height="180" autoplay></video>
          </div>
        </div>

        <div class="slideparent">
          <v-slide-group
            v-model="model"
            class="pa-0 ma-0 surface"
            center-active
            show-arrows
          >
            <v-slide-item
              v-for="assessment in allAssessments"
              :key="assessment.id"
            >
              <div class="mytestcard">
                <v-card
                  class="mb-4 movingcard"
                  min-width="344"
                  max-width="344"
                  outlined
                  height="180"
                  style="margin-right: 8.33px"
                >
                  <v-list-item three-line>
                    <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                    ></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="text-h7 mb-0 text-wrap">
                        {{ assessment.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ assessment.instructions }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-expand-transition>
                    <v-card-actions class="mx-2">
                      <v-btn
                        depressed
                        block
                        color="secondaryAccent"
                        class="primary--text"
                        rounded
                        @click="otherTestViewEvent(assessment.id)"
                        >TAKE TEST</v-btn
                      >
                    </v-card-actions>
                  </v-expand-transition>
                </v-card>
              </div>
            </v-slide-item>
          </v-slide-group>
        </div>
      </v-card>
      <v-card
        v-else
        color="surface"
        class="mx-auto d-flex align-center justify-center"
        elevation="0"
        width="100%"
        :height="getHeight"
        variant="outlined"
      >
        <v-card-title class="d-flex align-center">
          No Assessments Found!
        </v-card-title>
      </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="461px" color="#FBF5F2">
      <v-card fluid elevation="0" class="rounded-xl" color="#FBF5F2">
        <v-btn class="i-close-btn" icon @click="closeDialog"
          ><v-icon>mdi-close</v-icon></v-btn
        >

        <v-stepper
          v-model="e1"
          class="rounded-lg transparent elevation-0 pt-8"
          color="#FBF5F2"
        >
          <v-stepper-header class="text-subtitle-2 elevation-0">
            <v-stepper-step :complete="e1 > 1" step="1">
              SCREENING TEST
            </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              MAINS TEST
            </v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <!------------------------------------------ STEP 1 ------------------------------------------>
            <v-stepper-content step="1" class="pt-0">
              <div class="d-flex flex-column">
                <div class="subtitle-2 text--secondary">
                  {{ selectedAssessment.name }}
                </div>
                <div class="Subtitle-1 my-2">Screening Test</div>
                <div class="d-flex flex-row text-secondry">
                  <div class="d-flex flex-row text--secondary">
                    <v-icon>mdi-note-text-outline</v-icon>
                    <div class="m-2 mr-2">
                      {{ noOfQuestions }}
                      Questions
                    </div>
                    <v-icon>mdi-circle-small</v-icon>
                  </div>
                  <div class="d-flex flex-row text--secondary">
                    <v-icon>mdi-clock-outline</v-icon>
                    <div class="m-2 mr-2">
                      {{ formatTime(duration) }}
                    </div>

                    <v-icon>mdi-circle-small</v-icon>
                  </div>
                  <div class="d-flex flex-row text--secondary">
                    <v-icon>mdi-map-marker-radius-outline</v-icon>
                    <div class="m-2 mr-2">Online</div>
                  </div>
                </div>
                <div class="Subtitle-1 pt-5">Sections</div>
                <div class="w-100">
                  <!-- <v-chip-group> -->
                  <v-chip
                    v-for="(item, index) in selectedAssessment.skills"
                    :key="index"
                    class="ma-2"
                    color="secondaryAccent primary--text"
                    >{{ item }}</v-chip
                  >
                  <!-- </v-chip-group> -->
                </div>
                <v-card-title class="pl-0">Instructions</v-card-title>

                <p class="text--secondary">
                  {{ selectedAssessment.instructions }}
                </p>
              </div>
              <div class="d-flex justify-center w-100">
                <v-btn
                  color="secondary"
                  class="primary--text mt-10 mb-12"
                  rounded
                  large
                  @click="startTest"
                  >START TEST</v-btn
                >
                <v-btn
                  color="secondary"
                  class="primary--text mt-10 mb-12"
                  rounded
                  large
                  @click="endTest"
                  >EXIT TEST</v-btn
                >
              </div>
            </v-stepper-content>
            <!------------------------------------------ STEP 2 ------------------------------------------>

            <v-stepper-content step="2" class="pt-0">
              <div class="d-flex flex-column">
                <div class="subtitle-2 text--secondary">
                  {{ selectedAssessment.name }}
                </div>
                <div class="Subtitle-1 my-2">Mains Test</div>
                <div class="d-flex flex-row text-secondry">
                  <div class="d-flex flex-row text--secondary">
                    <v-icon>mdi-note-text-outline</v-icon>
                    <div class="m-2 mr-2">
                      {{ noOfQuestions }}
                      Questions
                    </div>
                    <v-icon>mdi-circle-small</v-icon>
                  </div>
                  <div class="d-flex flex-row text--secondary">
                    <v-icon>mdi-clock-outline</v-icon>
                    <div class="m-2 mr-2">
                      {{ formatTime(duration) }}
                    </div>

                    <v-icon>mdi-circle-small</v-icon>
                  </div>
                  <div class="d-flex flex-row text--secondary">
                    <v-icon>mdi-map-marker-radius-outline</v-icon>
                    <div class="m-2 mr-2">Online</div>
                  </div>
                </div>
                <div class="Subtitle-1 pt-5">Sections</div>
                <div class="w-100">
                  <!-- <v-chip-group> -->
                  <v-chip
                    v-for="(item, index) in selectedAssessment.skills"
                    :key="index"
                    class="ma-2"
                    color="secondaryAccent primary--text"
                    >{{ item }}</v-chip
                  >
                  <!-- </v-chip-group> -->
                </div>
                <v-card-title class="pl-0">Instructions</v-card-title>

                <p class="text--secondary">
                  {{ selectedAssessment.instructions }}
                </p>
              </div>
              <div class="d-flex justify-center w-100">
                <v-btn
                  color="secondary"
                  class="primary--text mt-10 mb-12"
                  rounded
                  large
                  @click="startTest"
                  >START TEST</v-btn
                >
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import AssessmentController from "@/controllers/AssessmentController";
import RecommendedAssessmentController from "@/controllers/RecommendedAssessmentController";

export default {
  name: "HomeView",

  data() {
    return {
      selectedAssessment: {},
      mouseHover: null,
      tab: null,
      model: null,
      dialog: false,
      windowHeight: window.innerHeight,
      userInfo: {},
      allAssessments: [],
      recommendedAssessment: {},
      duration: 0,
      noOfQuestions: 0,

      e1: 1,
      testType: "Screening",
      camera_id: null,
      cam_stream: null,
      mic_stream: null,
      capturedImageUrl: null,
      video_container: document.getElementById('videoElement'),
      mediaRecorder: null,
      socket: null,
      chunks: []
    };
  },
  computed: {
    getHeight() {
      return this.windowHeight - 90;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.$mixpanel.track("InstructionPageClosed", {
        assessment_id: this.selectedAssessment.id,
        assessment_name: this.selectedAssessment.name,
        screen_name: "RecommendedTestScreen",
        assessment_level: this.selectedAssessment.tests[this.e1 - 1].level.name,
      });
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      //const remainingSeconds = seconds % 60;
      if (hours == 0) {
        return String(minutes).padStart(2, "0") + " minutes";
      } else {
        return (
          String(hours).padStart(2, "0") +
          " hours and " +
          String(minutes).padStart(2, "0") +
          " minutes"
        );
      }
    },
    // startRecommendedTest() {
    //   this.dialog = false;
    //   this.$mixpanel.track("StartTestClicked", {
    //     assessment_id: this.recommendedAssessment.id,
    //     assessment_name: this.recommendedAssessment.name,
    //     source: "instruction_page/recommendation_page",
    //     screen_name: "RecommendedTestScreen",
    //   });
    //   this.$router.push("/assessment");
    // },

    startTest() {
      this.dialog = false;
      this.$mixpanel.track("StartTestClicked", {
        assessment_id: this.selectedAssessment.id,
        assessment_name: this.selectedAssessment.name,
        source: "instruction_page/recommendation_page",
        screen_name: "RecommendedTestScreen",
        assessment_type: this.selectedAssessment.tests[this.e1-1].assessment_type,
        assessment_level:
          this.selectedAssessment.tests[this.e1 - 1].level.name,
      });

      // console.log('selected',this.selectedAssessment);
      // this.$router.push({
      //   path: "/assessment",
      //   query: { id: this.selectedAssessment.id, test: this.testType },
      // });
      let assessmentUrl = this.$router.resolve({
        path: '/assessment',
        query: { id: this.selectedAssessment.id, test: this.testType }
      }).href;
      // let windowSize = "width="+window.outerWidth+", height="+window.outerHeight;
      // window.open(assessmentUrl,"_blank",windowSize);
      window.open(assessmentUrl,"_blank");
    },
    endTest(){
      this.stopCamera();
      this.stopMic();
    },
    async checkMedia(){
      // Check if the browser supports the necessary APIs
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      this.mic_stream = await this.checkMicrophone();
      this.cam_stream = await this.checkCamera();
      console.log("current status of cam and mic", this.cam_stream, this.mic_stream);

      this.$refs.kvideoElement.srcObject = this.cam_stream;

        // Continuously check media status when device changes
        navigator.mediaDevices.ondevicechange = (event) => {
          // checkMediaStatus();
          console.log("event triggered", event);
        };
      } else {
        console.log('Browser does not support mediaDevices API.');
      }
    },
    async checkMicrophone() {
      return new Promise((resolve, reject)=> {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {          
          // Stop accessing the camera
          stream.getTracks().forEach(function(track) {
            // Camera access is allowed
            console.log("Microphone is switched on.", track);
            // this.microphoneStatus = track.label+' Switched On';
            resolve(stream);
          });
        })
        .catch(function(error) {
          // Camera access is denied or an  occurred
          alert("Microphone is switched off or access is denied.");
          reject(error);
        });
      });
    },
    async checkCamera(){
      return new Promise((resolve, reject)=>{
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
          // Stop accessing the camera
          stream.getTracks().forEach(function(track) {
            // Camera access is allowed
            console.log("Camera is switched on.", track);
            resolve(stream);
          });
        })
        .catch(function(error) {
          // Camera access is denied or an  occurred
          alert("Camera is switched off or access is denied.", error);
          reject(error);
        });
      });
    },
    checkActiveStream(){
      this.cam_stream.getTracks().forEach((track) => { this.camera_id = track.id; });
      console.log("Acive stream ", this.cam_stream.getTracks());
    },
    stopMic() {
      if (this.mic_stream) {
        const tracks = this.mic_stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    },
    stopCamera() {
      if (this.cam_stream) {
        const tracks = this.cam_stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    },
    captureImage() {
      const videoElement = this.$refs.kvideoElement;
      const canvasElement = this.$refs.canvasElement;
      const context = canvasElement.getContext('2d');

      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      this.capturedImageUrl = canvasElement.toDataURL();
    },
    recommendedTestViewEvent() {
      // this.checkMedia();
      this.selectedAssessment = this.recommendedAssessment;
      console.log("selected assessment", this.selectedAssessment);
      if (this.selectedAssessment.screening_status == "PENDING" || this.selectedAssessment.screening_status == "STARTED") {
        this.testType = "Screening";
        this.e1 = 1;
      } else if (
        this.selectedAssessment.screening_status != "PENDING" && this.selectedAssessment.screening_status != "STARTED" &&
        (this.selectedAssessment.mains_status == "PENDING" || this.selectedAssessment.mains_status == "STARTED")
      ) {
        this.testType = "Mains";
        this.e1 = 2;
      } else {
        this.$router.push({
          path: "/report",
          query: { id: this.selectedAssessment.id },
        });
      }
      this.duration =
        this.selectedAssessment.tests[this.e1 - 1].duration_of_assessment;
      this.noOfQuestions =
        this.selectedAssessment.tests[this.e1 - 1].total_no_of_questions;
      this.dialog = true;
      this.$mixpanel.track("RecommendedViewTestClicked", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        screen_name: "RecommendedTestScreen",
        assessment_level:
          this.recommendedAssessment.tests[this.e1 - 1].level.name,
      });
      this.$mixpanel.track("InstructionsModalLoaded", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        screen_name: "AssessmentInstructionsScreen",
        assessment_level:
          this.recommendedAssessment.tests[this.e1 - 1].level.name,
      });
    },
    async otherTestViewEvent(id) {
      const response = await AssessmentController.getSingleAssessment(id);
      if (response.data.success) {
        this.selectedAssessment = response.data.data;

        this.duration = this.selectedAssessment.tests[0].duration_of_assessment;
        this.noOfQuestions =
          this.selectedAssessment.tests[0].total_no_of_questions;
        this.dialog = true;
        this.$mixpanel.track("OtherViewTestClicked", {
          assessment_id: this.selectedAssessment.id,
          assessment_name: this.selectedAssessment.name,
          screen_name: "RecommendedTestScreen",
          assessment_level:
            this.selectedAssessment.tests[this.e1 - 1].level.name,
        });
        this.$mixpanel.track("InstructionsModalLoaded", {
          assessment_id: this.selectedAssessment.id,
          assessment_name: this.selectedAssessment.name,
          screen_name: "AssessmentInstructionsScreen",
          assessment_level:
            this.selectedAssessment.tests[this.e1 - 1].level.name,
        });
        console.log(this.selectedAssessment);
      } else {
        alert("Something went wrong!");
      }
    },

    onResize() {
      this.windowHeight = window.innerHeight;
    },
    logout() {
      AuthService.logout();
      this.$mixpanel.track("UserLoggedOut", {
        session_timeout: false,
        screen_name: "ThankyouScreen",
      });
      this.$mixpanel.reset();
      this.$router.push("/login");
    },
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      this.$store.state.userInfo = this.userInfo;
      console.log(this.userInfo);
      if (!this.userInfo.is_personal_info_captured) {
        console.log("Routing to Register");
        this.$router.replace("/register");
      } else if (!this.userInfo.is_interest_captured) {
        console.log("Routing to Interests");

        this.$router.replace("/interests");
      }
      this.identifyUser();
    },
    identifyUser() {
      const userId = this.userInfo.id;
      const userName = this.userInfo.first_name + " " + this.userInfo.last_name;
      const userEmail = this.userInfo.email;
      const userPhone = this.userInfo.phone_no;
      // Identify the user
      this.$mixpanel.identify(userId);

      // Set user properties
      this.$mixpanel.people.set({
        $name: userName,
        $email: userEmail,
        $phone: userPhone,
      });
    },
    async getAllAssessment() {
      const response = await AssessmentController.getAllAssessment();
      this.allAssessments = response.data.data;
      //console.log(this.allAssessments);
      this.getRecommendedAssessment();
    },
    async getRecommendedAssessment() {
      const response =
        await RecommendedAssessmentController.getRecommendedAssessment("");
      //console.log("response", response);
      this.$mixpanel.track("RecommendationScreenLoaded", {
        screen_name: "RecommendationScreen",
      });
      if (response.status == 401) {
        AuthService.logout();
      }
      if (response.status == 404) {
        const response2 =
          await RecommendedAssessmentController.getRecommendedAssessment(
            "?debug=284"
          );
        this.recommendedAssessment = response2.data.data;
        console.log(this.recommendedAssessment);
        this.allAssessments = this.allAssessments.filter(function (item) {
          return item.id !== response.data.data.id;
        });
      } else {
        this.recommendedAssessment = response.data.data;
        console.log("reco", this.recommendedAssessment);

        this.allAssessments = this.allAssessments.filter(function (item) {
          return item.id !== response.data.data.id;
        });
      }
      if (this.recommendedAssessment.screening_status == "PENDING" || this.recommendedAssessment.screening_status == "STARTED") {
        this.testType = "Screening";
        this.e1 = 1;
      } else if (
        this.recommendedAssessment.screening_status != "PENDING" && this.recommendedAssessment.screening_status != "STARTED" &&
        (this.recommendedAssessment.mains_status == "PENDING" || this.recommendedAssessment.mains_status == "STARTED")
      ) {
        this.testType = "Mains";
        this.e1 = 2;
      } else {
        this.$router.push({
          path: "/report",
          query: { id: this.recommendedAssessment.id },
        });
      }
      //console.log("data", this.recommendedAssessment);
    },
  },
  created() {
    this.getUserInfo();
    this.getAllAssessment();
    //this.getRecommendedAssessment();
  },
};
</script>
   