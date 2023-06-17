<template height="80">
  <div class="surface">
    <nav-bar></nav-bar>
    <v-container class="white-background pa-0" style="width: 100%">
      <!-- :height="getHeight" -->
      <v-card color="surface" class="mx-auto" elevation="0" width="100%" variant="outlined">
        <v-card width="77.1%" class="pa-0" style="position: fixed; z-index: 10; top: 62px;border-bottom-left-radius: 0px; border-bottom-right-radius: 0px">
          <v-card-title style="width: 100%">
            <div class="d-flex flex-row justify-space-between" style="width: 100%">
              <div class="d-flex flex-row justify-center">
                <v-icon class="mr-4" @click="$router.go(-1)">mdi-arrow-left</v-icon>
                <div v-if="type =='screening'">
                  <div style="font-size: 12px;line-height:14px ;">SCREENING RESULT</div>
                  <div>Your Screening Test Report</div>
                </div>
                <div v-if="type =='mains'">
                  <div style="font-size: 12px;line-height:14px ;">MAINS RESULT</div>
                  <div>Your Mains Test Report</div>
                </div>
              </div>
              <div class="d-flex flex-row justify-center">
                <v-icon color="black" class="mr-5">
                  mdi-share-variant-outline
                </v-icon>
                <v-icon color="black">
                  mdi-tray-arrow-down
                </v-icon>
              </div>
            </div>
          </v-card-title>
        </v-card>
        <v-img width="100%" height="auto" src="../assets/home_banner.svg" cover style="margin-top: 76px;min-height: 331px">
          <v-card class="pa-10 d-flex align-center" elevation="0" width="100%" height="100%" variant="outlined"
            color="transparent">
            <div class="white--text text-container">


              <!-- <div class="text-caption">Recommended</div> -->
              <v-btn v-if="assessmentData.screening_status == 'PASSED' && type == 'screening'" elevation="0" height="32px" color="#03C988"
                class="white--text font-weight-regular text-capitalize mb-3" rounded>Passed Screening Test
              </v-btn>
              <!-- for fail screen test -->
              <v-btn v-if="assessmentData.screening_status == 'FAILED' && type == 'screening'" elevation="0" height="32px" color="#CA5251"
                class="white--text font-weight-regular text-capitalize mb-3" rounded>Screening Test Failed
              </v-btn>


              <!-- <div class="text-caption">Recommended</div> -->
              <v-btn v-if="assessmentData.mains_status == 'PASSED' && type == 'mains'" elevation="0" height="32px" color="#03C988"
                class="white--text font-weight-regular text-capitalize mb-3" rounded>Passed Mains Test
              </v-btn>
              <!-- for fail screen test -->
              <v-btn v-if="assessmentData.mains_status == 'FAILED' && type == 'mains'" elevation="0" height="32px" color="#CA5251"
                class="white--text font-weight-regular text-capitalize mb-3" rounded>Mains Test Failed
              </v-btn>


              <div class="mb-1" style="font-size: 28px; line-height: 33px;">{{ assessmentData.name }}</div>
              <p class="mt-1 font-weight-regular" style="font-size: 14px; color: #FAFAFA;">

                {{ assessmentData.instructions }}
              </p>
              <div>
                <!-- <v-btn
                  height="48px"
                  color="#E9F2F9"
                  class="primary--text mt-4 mr-4"
                  large
                  elevation="0"
                  @click="viewResult(12)"
                  >View Result</v-btn
                > -->

                <v-btn height="48px" color="primary" class="white--text mt-4" large elevation="0" v-if="assessmentData.status == 'PASSED' && type == 'screening'"
                @click="setupMains(assessmentData.id)">Setup
                  Mains</v-btn>

                <v-btn height="48px" color="primary" class="white--text mt-4" large elevation="0" v-if="assessmentData.status == 'PASSED' && type == 'mains' && !isDemoVideoExist"
                @click="startDemoVideo(assessmentData.id)">
                  Start Demo Video</v-btn>
              </div>
            </div>
          </v-card>
        </v-img>

        <div v-if="assessmentResult.percentage" class="resultParent d-flex flex-row justify-center mt-4 px-8">
          <v-card elevation="0" height="303" width="298"
            style="background-color: #F8FAFC; border: 1px solid #DADADA; position: relative;" class="mr-4 pa-8 pt-6">
            <Doughnut :options="chartOptions" :data="chartDataPercentage" chart-id="doughnut-chart" width="100%"
              height="100%">
            </Doughnut>
            <div style="top: 50%; left: 50% ;position: absolute; transform: translate(-50%, -50%);"
              class="d-flex justify-center flex-column align-center">
              <div style="font-size: 32px; line-height: 38px; font-weight: 500;">{{ getPercentage }} %</div>
              <div style="font-size: 16px; line-height: 19px; font-weight: 500;">Test Result</div>
            </div>
          </v-card>

          <v-card elevation="0" height="303" width="298" style="background-color: #F8FAFC; border: 1px solid #DADADA"
            class="mr-4 pa-8 pt-6">
            <Doughnut :options="chartOptions" :data="chartDataScore" chart-id="doughnut-chart" width="100%" height="100%">
            </Doughnut>
            <div style="top: 50%; left: 50% ;position: absolute; transform: translate(-50%, -50%);"
              class="d-flex justify-center flex-column align-center">
              <div style="font-size: 32px; line-height: 38px; font-weight: 500;">{{ assessmentResult.dataScore.scored }} / {{ assessmentResult.dataScore.total_score }}</div>
              <div style="font-size: 16px; line-height: 19px; font-weight: 500;">Test Score</div>
            </div>
          </v-card>

          <v-card elevation="0" height="303" width="402" style="border: 1px solid #DADADA" class="pa-4">
            <Bar 
            v-if="chartDataSkills.datasets[0].data.length != 0" 
            :options="chartOptions" :data="chartDataSkills" 
            chart-id="bar-chart" 
            width="100%" 
            height="100%">
            </Bar>
          </v-card>
        </div>

        <v-row class="pa-8">
          <v-col v-for="(item, index) in chartDataSkills.labels" :key="index" cols="4">
            <div style="border: 1px solid #DADADA;"
              :style="{ 'background-color': chartDataSkills.datasets[0].dotBgColor[index] }"
              class="d-flex flex-row justify-space-between align-center pa-4 rounded-xl">
              <div class="d-flex align-center">
                <div style="border-radius: 8px; height: 15px; width: 15px;"
                  :style="{ 'background-color': chartDataSkills.datasets[0].backgroundColor[index] }"></div>
                <div style="font-size: 16px; line-height: 19px; font-weight: 500;" class="ml-2">{{ item }}</div>
              </div>
              <div style="font-size: 32px; line-height: 38px; font-weight: 500;">
                {{assessmentResult.data[index]}}/100
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
    
<script>
import "../styles.css";

import { Doughnut, Bar } from "vue-chartjs";
import AssessmentController from "../controllers/AssessmentController";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import NavBar from '@/components/navBar.vue';
import { APP_NAME } from '@/constant';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);
export default {
  name: "ResultView",
  components: {
    Doughnut, Bar,
    NavBar
  },
  data() {
    return {
      assessmentId: null,
      assessmentData: {},
      assessmentResult: {},
      assessmentConfigData: {},
      identifyUser: {},
      type: '',
      userInfo: {},
      isDemoVideoExist: false,
      chartDataPercentage: {
        // labels: ["", ""],
        datasets: [
          {
            label: 'Skill wise score',
            backgroundColor: ["#277BC0", " #EBEBEB"],
            data: [85, 15],
            circumference: 260,
            rotation: 231,
            cutout: "90%",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },

      },
      chartDataScore: {
        // labels: ["", ""],
        datasets: [
          {
            backgroundColor: ["#277BC0", " #EBEBEB"],
            data: [],
            circumference: 260,
            rotation: 230,
            cutout: "90%",
          },
        ],
      },
      chartDataSkills: {
        labels: [],
        datasets: [
          {
            dotBgColor: [
              "rgba(255, 40, 26, 0.1)",
              " rgba(245, 200, 40, 0.1)",
              ' rgba(16, 185, 129, 0.1)',
              'rgba(26, 173, 255, 0.1)',
              'rgba(26, 98, 255, 0.1)',
              'rgba(129, 26, 255, 0.1)'],
            backgroundColor: ["#FF281A", " #F5C828", '#10B981', '#1AADFF', '#1A62FF', '#811AFF'],
            data: [],
          },
        ],
      },
    }
  },
  computed: {
    getPercentage () {
      const percentage = (this.assessmentResult.dataScore.scored / this.assessmentResult.dataScore.total_score) * 100;

      return percentage.toFixed(1);
    }
  },
  methods: {
    viewResult() {

    },
    backHistory() {

    },
    setupMains() {
      this.$router.push(`/assessment/mains/setup`);
      this.$mixpanel.track("SetUpMainsClicked", {
        user_type: this.userInfo.user_type,
        app_name: APP_NAME,
        assessment_id: this.assessmentData.id,
        assessment_name: this.assessmentData.name,
        screen_name: "ResultScreen",
        assessment_level: this.assessmentData.tests[0].level.name,
        assessment_type: this.assessmentData.tests[0].assessment_type,
        status: this.assessmentData.screening_status
      });
    },
    startDemoVideo(id) {
      this.$mixpanel.track("StartDemoClicked", {
        user_type: this.userInfo.user_type,
        app_name: APP_NAME,
        assessment_id: this.assessmentData.id,
        assessment_name: this.assessmentData.name,
        screen_name: "ResultScreen",
        assessment_level: this.assessmentData.tests[0].level.name,
        assessment_type: this.assessmentData.tests[0].assessment_type,
        status: this.assessmentData.mains_status
      });
      this.$router.push(`/assessment/${id}/mains/demo`);
    },
    formatTime(seconds) {
      const totalMs = seconds * 1000;
      const result = new Date(totalMs).toISOString().slice(11, 19);
      return result;
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
    },
    logout() {
      AuthService.logout();
      this.$mixpanel.track("UserLoggedOut", {
        session_timeout: false,
        screen_name: "ThankyouScreen",
        user_type: this.userInfo.user_type,
        app_name: APP_NAME,
      });
      this.$mixpanel.reset();
      this.$router.push("/login");
    },

    async getAssessmentInfo(assessmentId) {
      let response = await AssessmentController.getSingleAssessment(
        assessmentId
      );

      if (response == 404) {
        this.assessmentData = {};
      } else {
        this.assessmentData = response.data.data;
        console.log(this.assessmentData);
      }

      this.$mixpanel.track("ResultScreenLoaded", {
        user_type: this.userInfo.user_type,
        app_name: APP_NAME,
        assessment_id: this.assessmentData.id,
        assessment_name: this.assessmentData.name,
        screen_name: "ResultScreen",
        assessment_level: this.assessmentData.tests[0].level.name,
        assessment_type: this.assessmentData.tests[0].assessment_type,
        status: this.assessmentData.screening_status ? this.assessmentData.screening_status : this.assessmentData.mains_status
      });

      let setupMains = await AssessmentController.getSetupMainsAssessment();
      if(setupMains.status == 200 && setupMains.data && setupMains.data.data && setupMains.data.data.demo_link) {
        this.isDemoVideoExist = true;
      }

    },


    async getAssesmentResult(assessmentId) {
      let response = await AssessmentController.getAssesmentResult(
        assessmentId
      );

      if (response == 404) {
        this.assessmentResult = {};
      } else {
        this.assessmentResult = response.data.data;
        this.chartDataSkills.labels = this.assessmentResult.labels;
        this.chartDataSkills.datasets[0].data = this.assessmentResult.data;
        this.chartDataScore.datasets[0].data = [this.assessmentResult.dataScore.scored, this.assessmentResult.dataScore.total_score - this.assessmentResult.dataScore.scored];
        console.log( this.chartDataScore.datasets[0].data);
        this.chartDataPercentage.datasets[0].data = [this.getPercentage, 100 - this.getPercentage];
      }
    },
  },
  mounted() {
  },
  created() {
    // console.log("userInfo");
    this.getUserInfo();
    const assessmentId = this.$route.params.id;
    this.type = this.$route.params.type;

    console.log("type", this.type);
    // console.log("assessment data", assessment)
    this.assessmentId = assessmentId;
    this.getAssessmentInfo(assessmentId);
    this.getAssesmentResult(assessmentId);
  }

};
</script>
     