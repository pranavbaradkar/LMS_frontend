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
        <div class="text-h6 py-4">Other Tests</div>

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
                  class="mx-auto mr-3 mb-4 movingcard"
                  min-width="344"
                  max-width="344"
                  outlined
                  height="180"
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
                    <v-card-actions  class="mx-2">
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
    </v-container>
    <v-dialog v-model="dialog" max-width="461px" color="#FBF5F2">
      <v-card fluid elevation="0" class="rounded-xl" color="#FBF5F2">
        <v-btn class="i-close-btn" icon @click="dialog = false"
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
              </div>
            </v-stepper-content>
            <!------------------------------------------ STEP 2 ------------------------------------------>

            <v-stepper-content step="2" class="pb-0"> </v-stepper-content>
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
    startRecommendedTest() {
      this.dialog = false;
      this.$mixpanel.track("StartTestClicked", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        source: "instruction_page/recommendation_page",
        screen_name: "RecommendedTestScreen",
      });
      this.$router.push("/assessment");
    },
    startTest() {
      this.dialog = false;
      this.$mixpanel.track("StartTestClicked", {
        assessment_id: this.selectedAssessment.id,
        assessment_name: this.selectedAssessment.name,
        source: "instruction_page/recommendation_page",
        screen_name: "RecommendedTestScreen",
      });
      this.$router.push({
        path: "/assessment",
        query: { id: this.selectedAssessment.id },
      });
    },
    recommendedTestViewEvent() {
      this.selectedAssessment = this.recommendedAssessment;
      this.dialog = true;
      console.log(
        this.selectedAssessment
      );
      this.duration = this.selectedAssessment.tests[0].duration_of_assessment;
      this.noOfQuestions =
        this.selectedAssessment.tests[0].total_no_of_questions;
      this.$mixpanel.track("RecommendedViewTestClicked", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        screen_name: "RecommendedTestScreen",
      });
      this.$mixpanel.track("InstructionsModalLoaded", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        screen_name: "AssessmentInstructionsScreen",
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
      //console.log(this.userInfo);
      if(!this.userInfo.is_profile_created){
        this.$router.replace('/register');
      }
      if(!this.userInfo.is_interest_captured){
        this.$router.replace('/interests');

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
        await RecommendedAssessmentController.getRecommendedAssessment('');
      //console.log("response", response);
      this.$mixpanel.track("RecommendationScreenLoaded", {
        screen_name: "RecommendationScreen",
      });
      if (response.status == 401) {
        AuthService.logout();
      }
      if(response.status==404){
        const response2 =
        await RecommendedAssessmentController.getRecommendedAssessment('?debug='+this.allAssessments[0].id);
        this.recommendedAssessment = response2.data.data;
        //console.log(this.allAssessments);
        this.allAssessments=this.allAssessments.filter(function(item) {
            return item.id !== response.data.data.id;
          });
      }
      else{
        this.recommendedAssessment = response.data.data;
        //console.log(this.allAssessments);

        this.allAssessments=this.allAssessments.filter(function(item) {
            return item.id !== response.data.data.id;
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
   