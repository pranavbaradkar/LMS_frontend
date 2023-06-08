<template>
  <div class="surface">
    <nav-bar></nav-bar>
    <div class="d-flex m-body m-center">
      <v-card
        width="55rem"
        height="auto"
        class="d-flex flex-column align-center justify-center pa-8"
        elevation="0"
      >
        <img src="../assets/oh_no.svg" width="200px" height="auto" />
        <div class="text-subtitle-1" text-center>
          <v-card-title class="ma-0 pa-0 mt-4">Oh no!</v-card-title>
        </div>
        <div class="text-subtitle-1" text-center>
          <v-card-title class="ma-0 pa-0">Submission Failed</v-card-title>
        </div>

        <v-card-subtitle class="ma-0 pa-0">
          <div>There was an error submitting</div>
        </v-card-subtitle>
        <v-card-subtitle class="ma-0 pa-0">
          <div>your assessment. Please try again..</div>
        </v-card-subtitle>

        <v-btn
          color="secondary"
          class="black--text mt-8"
          rounded
          large
          depressed 
          @click="resubmit"
          >Resubmit</v-btn
        >
      </v-card>
    </div>
  </div>
</template>
    
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import AssessmentsController from "../controllers/AssessmentsController"
import navBar from "@/components/navBar.vue";
export default 
  {
  components: { navBar },
  name: "FailedView",
  data() {
    return {
      assessmentId:'',
      assessmentName:'',
      response:{}
    };
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    logout() {
      AuthService.logout();

      this.$mixpanel.track("UserLoggedOut", {
        session_timeout: false,
        screen_name: "ThankyouScreen",
      });
      this.$mixpanel.reset();
      this.$router.push("/login");
    },
    async resubmit(){
       await AssessmentsController.submitAssessment(
        this.assessmentId,
        {
          response_json: this.response,
        }
      );
      this.$mixpanel.track("ResubmitClicked",{
      assessment_id: this.assessmentId,
      assessment_name: this.assessmentName,
      screen_name: "SubmissionFailedScreen",
    });
    }
  },
  created() {
    this.assessmentId = this.$route.query.assessmentId;
    this.assessmentName = this.$route.query.assessmentName;
    this.response = JSON.parse(this.$route.query.response);
    this.$mixpanel.track("SubmissionFailed", {
      assessment_id: this.assessmentId,
      assessment_name: this.assessmentName,
      screen_name: "SubmissionFailedScreen",
    });
  },
};
</script>
     