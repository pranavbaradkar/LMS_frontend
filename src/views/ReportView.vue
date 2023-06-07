<template>
  <div class="surfae">
    <nav-bar></nav-bar>
    <v-container>
      <div class="w-100">
        <div class="my-4">
          <span class="cursor blue--text">Test Selection</span>
          <v-icon class="blue--text">mdi-chevron-right</v-icon>
          <span>{{ selectedAssessment.name }}</span>
        </div>
      </div>
      <v-card
        height="auto"
        width="100%"
        class="rounded-xl d-flex flex-column justify-space-between overflow-hidden"
      >
        <div class="d-flex flex-column">
          <v-img
            width="100%"
            height="28vh"
            src="../assets/holebanner.jpeg"
            cover
          >
            <v-card
              class="white--text d-flex justify-center flex-column"
              elevation="0"
              width="80%"
              height="100%"
              variant="outlined"
              color="#0f0d0d57"
            >
              <v-card-title>
                {{ selectedAssessment.name }}
              </v-card-title>
              <v-card-subtitle class="white--text mt-2">
                {{ selectedAssessment.instructions }}
              </v-card-subtitle>
            </v-card>
          </v-img>
          <v-stepper
            v-model="e1"
            class="rounded-lg transparent elevation-0 pt-0"
            color="#FBF5F2"
          >
            <v-stepper-header class="text-subtitle-2 elevation-0 mt-4">
              <v-stepper-step :complete="e1 > 1" step="1">
                SCREENING TEST
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2">
                MAINS TEST
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> DEMO VIDEO </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step step="4"> INTERVIEW </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <!------------------------------------------ STEP 1 ------------------------------------------>
              <v-stepper-content step="1" class="ma-0 pa-0">
                <v-card class="pa-2 ma-5" height="auto" outlined>
                  <v-row height="100px" class="">
                    <v-col>
                      <v-card
                        height="50px"
                        width="100%"
                        class="elevation-0 d-flex justify-space-between"
                      >
                        <div class="d-flex flex-column mx-2">
                          <div class="text--secondary">
                            <v-icon size="20" class="mr-2"
                              >mdi-clipboard-list-outline</v-icon
                            >Questions
                          </div>
                          <div>{{ noOfQuestions }}</div>
                        </div>
                        <v-divider vertical></v-divider>
                      </v-card>
                    </v-col>
                    <v-col>
                      <v-card
                        height="50px"
                        width="100%"
                        class="elevation-0 d-flex justify-space-between"
                      >
                        <div class="d-flex flex-column">
                          <div class="text--secondary">
                            <v-icon size="20" class="mr-2"
                              >mdi-clock-outline</v-icon
                            >Durations
                          </div>
                          <div>{{ formatTime(duration) }}</div>
                        </div>
                        <v-divider vertical></v-divider>
                      </v-card>
                    </v-col>

                    <v-col>
                      <v-card
                        height="50px"
                        width="100%"
                        class="elevation-0 d-flex justify-space-between"
                      >
                        <div class="d-flex flex-column">
                          <div class="text--secondary">
                            <v-icon size="20" class="mr-2"
                              >mdi-chart-pie-outline</v-icon
                            >Section
                          </div>
                          <div>{{ section }}</div>
                        </div>
                        <v-divider vertical></v-divider>
                      </v-card>
                    </v-col>

                    <v-col>
                      <v-card
                        height="50px"
                        width="100%"
                        class="elevation-0 d-flex justify-space-between"
                      >
                        <div class="d-flex flex-column">
                          <div class="text--secondary">
                            <v-icon size="20" class="mr-2"
                              >mdi-map-marker-radius-outline</v-icon
                            >Location
                          </div>
                          <div>Online</div>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>

                <div class="w-100 d-flex flex-column ml-5">
                  <div class="mb-2">Sections</div>
                  <div class="d-flex w-100 flex-wrap pr-5">
                    <v-chip
                      v-for="(item, index) in selectedAssessment.skills"
                      :key="index"
                      class="mr-2 primary--text"
                      color="#82D2DA42"
                    >
                      {{ item }}
                    </v-chip>
                  </div>
                </div>
                <div class="float-bottom ma-5">
                  <span class="text--secondary"> Status: </span
                  ><span class="font-weight-medium"
                    >{{ this.selectedAssessment.screening_status }}
                  </span>

                  <!-- <v-btn :disabled="this.selectedAssessment.screening_status == 'PENDING'" rounded large color="secondary" class="primary--text ml-2" elevation="0"> VIEW
                        RESULT</v-btn>                   -->
                </div>
              </v-stepper-content>
              <!------------------------------------------ STEP 2 ------------------------------------------>

              <v-stepper-content step="2" class="ma-0 pa-0">
                <v-card class="pa-2 ma-5" height="auto" outlined >
                  <v-row height="100px" class="pl-5">
                  <v-col cols="3" sm="3" md="3">
                    <v-card
                      height="50px"
                      width="100%"
                      class="elevation-0 d-flex justify-space-between"
                    >
                      <div class="d-flex flex-column">
                        <div class="text--secondary">Mode</div>
                        <div>At School</div>
                      </div>
                      <v-divider vertical></v-divider>
                    </v-card>
                  </v-col>

                  <v-col>
                    <v-card
                      height="50px"
                      width="100%"
                      class="elevation-0 d-flex justify-space-between"
                    >
                      <div class="d-flex flex-column">
                        <div class="text--secondary">Date</div>
                        <div>18/04/2023</div>
                      </div>
                      <v-divider vertical></v-divider>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card
                      height="50px"
                      width="100%"
                      class="elevation-0 d-flex justify-space-between"
                    >
                      <div class="d-flex flex-column">
                        <div class="text--secondary">Time</div>
                        <div>01:00 - 03:00 PM</div>
                      </div>
                      <v-divider vertical></v-divider>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card
                      height="50px"
                      width="100%"
                      class="elevation-0 d-flex justify-space-between"
                    >
                      <div class="d-flex flex-column">
                        <div class="text--secondary">Room No.</div>
                        <div>204</div>
                      </div>

                      <v-divider vertical></v-divider>
                    </v-card>
                  </v-col>
                  <v-col>
                    <v-card
                      height="50px"
                      width="100%"
                      class="elevation-0 d-flex justify-space-between"
                    >
                      <div class="d-flex flex-column">
                        <div class="text--secondary">Computer No.</div>
                        <div>204</div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
                </v-card>

                <div class="w-100 d-flex flex-column ml-5 mb-4 mt-4">
                  <div class="mb-2">School Address</div>
                  <div class="d-flex w-100 flex-row">
                    <v-card width="150px" height="150px"> </v-card>
                    <div class="d-flex flex-column ml-4">
                      <div class="text-body-1">Vibgyor High</div>
                      <div class="text-body-2 text--secondary mt-2">
                        Motilal Nagar - 1, Srirang Sabde Marg, Off Link Road,
                        Goregaon West, Mumbai, Maharashtra 400104
                      </div>
                      <div
                        class="secondary--text text-body-2 font-weight-medium mt-2"
                      >
                        <v-icon class="secondary--text">mdi-link-variant</v-icon
                        >COPY LINK
                      </div>
                      <div
                        class="secondary--text text-body-2 font-weight-medium mt-2"
                      >
                        <v-icon class="secondary--text">mdi-open-in-new</v-icon
                        >OPEN MAPS
                      </div>
                    </div>
                  </div>
                </div>
                <div class="float-bottom ma-5">
                  <span class="text--secondary"> Status: </span
                  ><span class="font-weight-medium">Screening Passed </span>
                  <!-- <v-btn rounded large color="secondary" class="primary--text ml-2" elevation="0">VIEW
                        RESULT</v-btn> -->
                </div>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
    
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import AssessmentController from "@/controllers/AssessmentController";
import navBar from '@/components/navBar.vue';

export default {
  components: { navBar },
  name: "ReportView",

  data() {
    return {
      e1: 1,
      userInfo: {},
      selectedAssessment: {},
      duration: 0,
      noOfQuestions: 0,
      section: 0,
    };
  },
  computed: {},
  mounted() {},

  beforeDestroy() {},

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
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      this.$store.state.userInfo = this.userInfo;
      console.log(this.userInfo);
    },
    async currentAssessmentDetails(id) {
      const response = await AssessmentController.getSingleAssessment(id);
      if (response.data.success) {
        this.selectedAssessment = response.data.data;
        console.log("selected assessment", this.selectedAssessment);
        this.duration = this.selectedAssessment.tests[0].duration_of_assessment;
        this.noOfQuestions =
          this.selectedAssessment.tests[0].total_no_of_questions;
        this.section = this.selectedAssessment.skills.length;
        // this.dialog = true;
        console.log(response);
        console.log(this.selectedAssessment);
      } else {
        alert("Something went wrong!");
      }
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
  },
  created() {
    this.getUserInfo();
    console.log("store data", this.$store.state.assessmentId);
    // this.$store.state.assessmentId

    this.currentAssessmentDetails(this.$route.query.id);
  },
};
</script>
     