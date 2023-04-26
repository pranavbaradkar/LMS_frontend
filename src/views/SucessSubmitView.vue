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

            <v-card-title class="pl-2" v-if="$store.state.userInfo != null"
              >{{ $store.state.userInfo.first_name }} 👋</v-card-title
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
        class="d-flex flex-column align-center justify-center pa-8 rounded-xl"
        elevation="0"
      >
        <img src="../assets/bgicon.svg" width="200px" height="auto" />
        <v-card-title> Thank You for Confirmation</v-card-title>
        <v-card-subtitle class="ma-0 pa-0">
          <div>Hold your breath, your school HR will announce</div>
        </v-card-subtitle>
        <v-card-subtitle class="ma-0 pa-0">
          <div>the results once they are published.</div>
        </v-card-subtitle>

        <div class="d-flex justify-center w-100 ma-6">
          <v-card
            width="245"
            height="54"
            class="d-flex flex-row m-center m-btn ma-2"
            elevation="0"
            depressed
            ><v-checkbox v-model="notificationEmail"></v-checkbox
            ><img
              class="mr-2"
              src="../assets/Gmail.svg"
              width="25px"
              height="auto"
            />
            <div class="d-flex flex-column">
              <div class="c-b-t">Email</div>
              <div class="c-b-t-m">{{ $store.state.userInfo.email }}</div>
            </div>
          </v-card>

          <v-card
            width="245"
            height="54"
            class="d-flex flex-row m-center m-btn ma-2"
            elevation="0"
            depressed
            ><v-checkbox v-model="notificationSMS"></v-checkbox
            ><v-icon class="mr-2" size="25">mdi-message-reply-outline</v-icon>
            <div class="d-flex flex-column">
              <div class="c-b-t">SMS</div>
              <div class="c-b-t-m">{{ $store.state.userInfo.phone_no }}</div>
            </div>
          </v-card>
        </div>
        <v-btn
          color="secondary"
          class="black--text"
          rounded
          large
          depressed
         
          @click="confirm"
          >confirm</v-btn
        >
      </v-card>
    </div>
  </div>
</template>
    
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
export default {
  name: "HomeView",
  data() {
    return {
      notificationSMS: false,
      notificationEmail: false,
      assessmentId: null,
    };
  },
  computed: {},
  mounted() {},

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
      this.$router.push({
        path: "/report",
        query: { id: this.assessmentId},
      });
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
    // console.log("userInfo");
    const assessment = JSON.parse(this.$route.query.assessment);
    // console.log("assessment data", assessment)

    this.assessmentId = assessment.id
    // console.log('assessment id',this.assessmentId)
    this.$mixpanel.track("SubmissionSucceeded", {
      assessment_id: assessment.id,
      assessment_name: assessment.name,
      screen_name: "SubmissionSucceededScreen",
    });
  },
};
</script>
     