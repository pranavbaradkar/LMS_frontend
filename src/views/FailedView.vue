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
export default {
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
     