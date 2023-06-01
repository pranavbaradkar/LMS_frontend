<template>
  <div class="surface">
    <navBar></navBar>
    <v-container class="white-background pb-5">
      <v-card class="mx-auto mt-3" elevation="0">
        <v-card-text
          class="thank-you-card d-flex flex-row justify-space-between align-center"
        >
          <div class="d-flex flex-row align-center">
            <div class="me-5 rounded pa-4 text-center white">
              <v-icon class="rounded" height="82" width="82" color="#35D4A0"
                >mdi-check-circle</v-icon
              >
            </div>
            <div>
              <div class="font-weight-bold thank-you-text">
                Demo Video Submitted
              </div>
              <p class="mb-0 thank-you-subtext">
                We will shortly reach out to you with the mains test details 
              </p>
            </div>
          </div>
          <div class="d-flex flex-row">
            <v-icon class="blue--text me-4">mdi-check</v-icon>
            <div class="font-weight-regular thank-you-notified blue--text">
              Will Get Notified
            </div>
          </div>
        </v-card-text>
      </v-card>

      <div class="text-h6 pb-0 mt-7">My Test</div>
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
              >Demo Video Submitted
            </v-btn>
            <div class="text-h6 mb-1">{{ recommendedAssessment.name }}</div>
            <p class="mt-1 font-weight-regular">
              {{ recommendedAssessment.instructions }}
            </p>
          </div>
          
        </v-card>
      </v-img>
    </v-container>
  </div>
</template>
    
<script>
import "../styles.css";
import navBar from "@/components/navBar.vue"
import AssessmentController from "../controllers/AssessmentController";
export default {
  name: "HomeView",
  components: {
    navBar,
  },
  data() {
    return {
      notificationSMS: false,
      notificationEmail: false,
      assessmentId: null,
      dialog: false,
      recommendedAssessment: {},
      assessmentConfigData: {}
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
    confirm() {
      this.$mixpanel.track("SubmissionSucceeded", {
        notification_sms: this.notificationSMS,
        screen_name: "ThankyouScreen",
      });
      this.$mixpanel.track("SubmissionSucceeded", {
        notification_email: this.notificationEmail,
        screen_name: "ThankyouScreen",
      });
      this.dialog = false;
      // this.$router.push({
      //   path: "/report",
      //   query: { id: this.assessmentId },
      // });
    },
    formatTime(seconds) {
      const totalMs = seconds * 1000;
      const result = new Date(totalMs).toISOString().slice(11, 19);
      return result;
    },
    logout() {
      this.$mixpanel.track("UserLoggedOut", {
        session_timeout: false,
        screen_name: "ThankyouScreen",
      });
      this.$mixpanel.reset();
      this.$router.push("/login");
    },
    messageSelected() {
      this.$mixpanel.track("NotificationOptionsSelected", {
        method: "Message",
        phone_number: this.$store.state.userInfo.phone_no,
      });
    },
    emailSelected() {
      this.$mixpanel.track("NotificationOptionsSelected", {
        method: "Email",
        email_id: this.$store.state.userInfo.email,
      });
    },
    async getAssessmentInfo (assessmentId) {
       let response = await AssessmentController.getSingleAssessment(
        assessmentId
      );
      if(response && response.data && response.data.data) {
        this.recommendedAssessment = response.data.data;
        this.assessmentConfigData = this.recommendedAssessment.tests.find(ele=> ele.assessment_type == 'MAINS');
        console.log(this.recommendedAssessment);
      }
    },
  },
  created() {
    // console.log("userInfo");
    const assessmentId = this.$route.params.id;
    // console.log("assessment data", assessment)
    this.assessmentId = assessmentId;
    this.getAssessmentInfo(assessmentId);
    
  }
};
</script>
     