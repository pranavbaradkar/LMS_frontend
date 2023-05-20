<template height="80">
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
    <v-container class="white-background">
      <!-- :height="getHeight" -->
      <v-card
        color="surface"
        class="mx-auto"
        elevation="0"
        width="100%"
        variant="outlined"
        v-if="allAssessments.length != 0 || recommendedAssessment != {}"
      >
        <v-row align="start" no-gutters>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">School</p>
              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  Vibgyor High (Malad East)
                </p>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="#277BC0"
                      v-bind="attrs"
                      v-on="on"
                    >
                      +3
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="n in 5" :key="n" link>
                      <v-list-item-title
                        v-text="'Item ' + n"
                      ></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">Level</p>
              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  Lower Primary , Upper Primary
                </p>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="#277BC0"
                      v-bind="attrs"
                      v-on="on"
                    >
                      +3
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="n in 5" :key="n" link>
                      <v-list-item-title
                        v-text="'Item ' + n"
                      ></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">Board</p>
              <p class="font-weight-medium school-value">State Board</p>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">Subject’s</p>
              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  Hindi , French , Physics
                </p>
                <v-menu transition="slide-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      fab
                      dark
                      small
                      color="#277BC0"
                      v-bind="attrs"
                      v-on="on"
                    >
                      +3
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item v-for="n in 5" :key="n" link>
                      <v-list-item-title
                        v-text="'Item ' + n"
                      ></v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>
          <v-col-1 class="home-edit-icon align-self-center">
            <v-img width="20px" src="../assets/home_edit_icon.png"></v-img>
          </v-col-1>
        </v-row>
        <v-divider></v-divider>
        <!-- <div class="text-h6 mb-1 text-center">Test Selection</div>
        <v-list-item-subtitle class="text-center grey--text"
          >Let's start your profile, connect to people you know, and engage with
          <br />them on topics you care about.</v-list-item-subtitle
        > -->

        <div class="text-h6 py-1">Recommended For You</div>

        <v-img
          width="100%"
          height="331px"
          src="../assets/home_banner.png"
          cover
          class="mt-4"
        >
          <v-card
            class="pa-10 d-flex align-center"
            elevation="0"
            width="100%"
            height="100%"
            variant="outlined"
            color="transparent"
          >
            <div
              class="white--text text-container"
              v-if="recommendedAssessment != null"
            >
              <!-- <div class="text-caption">Recommended</div> -->
              <v-btn
                elevation="0"
                height="32px"
                color="#FFF0CC"
                class="orange--text font-weight-regular text-capitalize mb-3"
                rounded
                >Screening Test
              </v-btn>
              <div class="text-h6 mb-1">{{ recommendedAssessment.name }}</div>
              <p class="mt-1 font-weight-regular">
                {{ recommendedAssessment.instructions }}
              </p>
              <div class="mt-1" v-if="recommendedAssessment.tests != null">
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
                color="#277BC0"
                class="white--text"
                large
                @click="recommendedTestViewEvent"
                >START TEST</v-btn
              >
            </div>
            <!-- <div class="white--text" v-if="recommendedAssessment != null">
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
                color="#277BC0"
                class="primary--text mt-8"
                rounded
                large
                @click="recommendedTestViewEvent"
                >VIEW TEST</v-btn
              >
            </div> -->
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
                  class="mb-4 movingcard"
                  min-width="333"
                  max-width="333"
                  outlined
                  height="360"
                  style="margin-right: 8.33px"
                >
                  <v-list-item three-line class="mb-0">
                    <v-list-item-avatar
                      tile
                      size="300"
                      height="173"
                      color="grey"
                    ></v-list-item-avatar>
                  </v-list-item>
                  <v-list-item three-line>
                    <v-list-item-content class="pt-0">
                      <v-list-item-title
                        class="assessment-name mb-0 text-wrap mb-2"
                      >
                        {{ assessment.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="assessment-instructions">
                        {{ assessment.instructions }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-expand-transition>
                    <v-card-actions class="mx-2">
                      <v-btn
                        depressed
                        block
                        color="#E9F2F9"
                        class="primary--text"
                        height="40"
                        @click="otherTestViewEvent(assessment.id)"
                        >START TEST</v-btn
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
    <v-dialog v-model="dialog" max-width="365px" color="#fff">
      <v-card fluid elevation="0" class="rounded-xl" color="#fff">
        <div class="test-dialog-header">
          <p>Instructions</p>
        </div>
        <div class="ma-5">
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              This assessment consists a total of {{ noOfQuestions }} questions
            </p>
          </div>
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              The test assesses you in 7 different areas as can be seen in the
              progress-bar at the top
            </p>
          </div>
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              You get a maximum of 60s to answer a question in this test
            </p>
          </div>
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              A timer that keeps ticking at the top indicates how much time you
              have to answer a question
            </p>
          </div>
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              There is no negative marking, some questions may have more than
              one correct answer
            </p>
          </div>
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              Upon the assessment completion, you will be notified with your
              result.
            </p>
          </div>
          <div class="d-flex justify-end w-100">
            <v-btn
              color="#DADADA"
              depressed
              class="black--text mt-5 mb-5 me-2"
              large
              @click="closeDialog"
              >Cancel</v-btn
            >
            <v-btn
              color="#277BC0"
              depressed
              class="white--text mt-5 mb-5"
              large
              @click="startTest"
              >START TEST</v-btn
            >
          </div>
        </div>
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
        assessment_type:
          this.selectedAssessment.tests[this.e1 - 1].assessment_type,
        assessment_level: this.selectedAssessment.tests[this.e1 - 1].level.name,
      });

      // console.log('selected',this.selectedAssessment);
      this.$router.push({
        path: "/assessment",
        query: { id: this.selectedAssessment.id, test: this.testType },
      });
    },
    recommendedTestViewEvent() {
      this.selectedAssessment = this.recommendedAssessment;
      console.log("selected assessment", this.selectedAssessment);
      if (
        this.selectedAssessment.screening_status == "PENDING" ||
        this.selectedAssessment.screening_status == "STARTED"
      ) {
        this.testType = "Screening";
        this.e1 = 1;
      } else if (
        this.selectedAssessment.screening_status != "PENDING" &&
        this.selectedAssessment.screening_status != "STARTED" &&
        (this.selectedAssessment.mains_status == "PENDING" ||
          this.selectedAssessment.mains_status == "STARTED")
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
      if (
        this.recommendedAssessment.screening_status == "PENDING" ||
        this.recommendedAssessment.screening_status == "STARTED"
      ) {
        this.testType = "Screening";
        this.e1 = 1;
      } else if (
        this.recommendedAssessment.screening_status != "PENDING" &&
        this.recommendedAssessment.screening_status != "STARTED" &&
        (this.recommendedAssessment.mains_status == "PENDING" ||
          this.recommendedAssessment.mains_status == "STARTED")
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
   