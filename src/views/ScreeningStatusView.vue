<template>
  <div class="surface">
    <v-app-bar app elevation="0" color="surface" class="justify-start">
      <v-list-item>
        <v-list-item-icon to="/">
          <v-img src="../assets/logo.svg" contain height="64"></v-img>
        </v-list-item-icon>
        <v-list-item-content> </v-list-item-content>
        <v-list-item-action>
          <v-row class="align-center">
            <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>

            <v-card-title class="pl-2" v-if="$store.state.userInfo != null">{{ $store.state.userInfo.first_name }}
              👋</v-card-title>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" text icon>
                  <v-avatar>
                    <v-img src="../assets/user.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <!-- <v-list>
        <v-list-item      
        >
          <v-list-item-title >Log out</v-list-item-title>
        </v-list-item>

      </v-list> -->
              <v-btn @click="logout">logout</v-btn>
            </v-menu>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-app-bar>
    <v-container class="white-background pb-5">
      <div class="text-h6 pb-0 mt-7">My Test</div>
      <v-img width="100%" height="331px" src="../assets/home_banner.png" cover class="mt-4">
        <v-card class="pa-10 d-flex align-center" elevation="0" width="100%" height="100%" variant="outlined"
          color="transparent">
          <div class="white--text text-container">
            <!-- <div class="text-caption">Recommended</div> -->
            <v-btn v-if="assessmentData.screening_status == 'PASSED' && type == 'screening'" elevation="0" height="32px" color="#03C988"
              class="white--text font-weight-regular text-capitalize mb-3" rounded>Passed Screening Test
            </v-btn>
            <!-- for fail screen test -->
            <v-btn v-if="assessmentData.screening_status == 'FAILED'  && type == 'screening'" elevation="0" height="32px" color="#CA5251"
              class="white--text font-weight-regular text-capitalize mb-3" rounded>Screening Test Failed
            </v-btn>


            <!-- <div class="text-caption">Recommended</div> -->
            <v-btn v-if="assessmentData.mains_status == 'PASSED' && type == 'mains'" elevation="0" height="32px" color="#03C988"
              class="white--text font-weight-regular text-capitalize mb-3" rounded>Passed Mains Test
            </v-btn>
            <!-- for fail screen test -->
            <v-btn v-if="assessmentData.mains_status == 'FAILED'  && type == 'mains'" elevation="0" height="32px" color="#CA5251"
              class="white--text font-weight-regular text-capitalize mb-3" rounded>Mains Test Failed
            </v-btn>

            <div class="text-h6 mb-1">{{ assessmentData.name }}</div>
            <p class="mt-1 font-weight-regular">
              {{ assessmentData.instructions }}
            </p>
            <v-btn height="48px" color="#fff" class="blue--text mt-4 me-2" elevation="0" large
              @click="viewResult(assessmentData.id)">
              View Results
            </v-btn>
            <!-- show setup mains button if screen test passed -->
            <v-btn height="48px" color="#277BC0" class="white--text mt-4" elevation="0" large
              v-if="assessmentData.screening_status == 'PASSED' && type == 'screening'"
              @click="setupMains(assessmentData.id)">
              Setup Mains
            </v-btn>

            <v-btn height="48px" color="primary" class="white--text mt-4" large elevation="0" v-if="assessmentData.mains_status == 'PASSED' && type == 'mains' && !isDemoVideoExist"
            @click="startDemoVideo(assessmentData.id)">
              Start Demo Video</v-btn>

          </div>
        </v-card>
      </v-img>
    </v-container>
  </div>
</template>
    
<script>
import "../styles.css";
import AssessmentController from "../controllers/AssessmentController";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";

export default {
  name: "screeningView",
  data() {
    return {
      notificationSMS: false,
      notificationEmail: false,
      assessmentId: null,
      assessmentData: {},
      assessmentConfigData: {},
      identifyUser: {},
      userInfo: {},
      isDemoVideoExist: false,
      type: 'screening'
    };
  },
  mounted() {
    this.$mixpanel.track("ThankyouPageLoaded", {
      screen_name: "ThankyouScreen",
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    
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
    startDemoVideo(id) {
      this.$router.push(`/assessment/${id}/mains/demo`);
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
      let setupMains = await AssessmentController.getSetupMainsAssessment();
      if(setupMains.status == 200 && setupMains.data && setupMains.data.data && setupMains.data.data.demo_link) {
        this.isDemoVideoExist = true;
      }

    },
    viewResult(assessmentId) {
      this.$router.push(`/assessment/${assessmentId}/${this.$route.params.type}/result`);
    },
    setupMains(assessmentId) {
      this.$router.push(`/assessment/${assessmentId}/mains/setup`);
    }
  },
  created() {
    // console.log("userInfo");
    this.getUserInfo();
    const assessmentId = this.$route.params.id;
    this.type = this.$route.params.type;
    // console.log("assessment data", assessment)
    this.assessmentId = assessmentId;
    this.getAssessmentInfo(assessmentId);
  },
};
</script>
     