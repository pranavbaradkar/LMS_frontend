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
                Mains Setup Compeletd
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
          <div class="white--text text-container">
            <!-- <div class="text-caption">Recommended</div> -->
            <v-btn
              elevation="0"
              height="32px"
              color="#FFF0CC"
              class="orange--text font-weight-regular text-capitalize mb-3"
              rounded
              >Yet to Start Mains
            </v-btn>
            <div class="text-h6 mb-1">Primary Teacher Assessment (VGOS)</div>
            <p class="mt-1 font-weight-regular">
              This test will assess the user in all the below-mentioned sections
              based on the preferences of the level and subjects selected by the
              candidate. The candidate who clears this assessment will be
              eligible for the next step of the process.
            </p>
            <!-- show setup mains button if screen test passed -->
            <v-btn
              height="48px"
              color="#277BC0"
              class="white--text mt-4 me-2"
              elevation="0"
              large
            >
              Start PACD
            </v-btn>
            <v-btn
              height="48px"
              color="#DADADA"
              class="gray--text mt-4"
              elevation="0"
              large
            >
              Start Mains Test
            </v-btn>
          </div>
        </v-card>
      </v-img>
      <v-row>
        <v-col cols="3">
          <v-card
            class="mx-auto mt-3"
            elevation="0"
            style="border: 1px solid #dadada"
          >
            <v-list style="background-color: #f8fafc">
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item v-for="(item, i) in items" :key="i">
                  <v-list-item-content class="pb-0 pt-2">
                    <div class="pb-3">
                      <p
                        v-text="item.text"
                        class="mb-0 caption"
                        style="
                          font-size: 14px;
                          line-height: 16px;
                          letter-spacing: 0.02em;
                        "
                      ></p>
                      <v-list-item-title
                        v-text="item.value"
                        class="subtitle-2"
                        style="
                          font-size: 18px;
                          line-height: 21px;
                          letter-spacing: 0.02em;
                        "
                      ></v-list-item-title>
                    </div>
                    <v-divider style="flex: 1 1 1px"></v-divider>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9" class="pt-5">
          <div>
            <p>Main Instructions</p>
          </div>
          <div class="mx-5 mt-5">
            <div class="d-flex flex-row align-start mb-5">
              <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
              <p class="mb-0 font-weight-regular assesment-instruction">
                This assessment consists a total of
                {{ noOfQuestions }} questions
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
                A timer that keeps ticking at the top indicates how much time
                you have to answer a question
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
          </div>
          <div>
            <p>Main Instructions</p>
            <div class="d-flex">
              <v-img
                max-width="162px"
                max-height="137px"
                src="../assets/holebanner.jpeg"
                cover
                class="rounded-lg me-5"
              ></v-img>
              <div class="pb-3">
                <v-list-item-title
                  class="subtitle-2 mb-1"
                  style="
                    font-size: 18px;
                    line-height: 21px;
                    letter-spacing: 0.02em;
                  "
                  >Vibgyor High</v-list-item-title
                >
                <p
                  class="mb-0 caption"
                  style="
                    font-size: 14px;
                    line-height: 16px;
                    letter-spacing: 0.02em;
                  "
                >
                  Motilal Nagar - 1, Srirang Sabde Marg, Off Link Road, Goregaon
                  West, Mumbai, Maharashtra 400104
                </p>
                <div class="ml-2 mt-2">
                  <v-list-item class="pa-0 pt-2 pb-2">
                      <v-icon size="20" color="#277bc0" class="me-2">mdi-link-variant</v-icon>
                    <a href="#" class="text-decoration-none subtitle-2">COPY LINK</a>
                  </v-list-item>

                  <v-list-item class="pa-0">
                      <v-icon size="20" color="#277bc0" class="me-2">mdi-open-in-new</v-icon>
                    <a href="#" class="text-decoration-none subtitle-2">OPEN MAPS</a>
                  </v-list-item>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
    
<script>
import "../styles.css";
import AssessmentController from "../controllers/AssessmentController";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
export default {
  name: "HomeView",
  data() {
    return {
      notificationSMS: false,
      notificationEmail: false,
      assessmentId: null,
      recommendedAssessment: {},
      assessmentConfigData: {},
      selectedItem: 1,
      items: [
        { text: "Mode", value: "At School" },
        { text: "Date ", value: "18/05/2023" },
        { text: "Time", value: "12:00 - 01:00 PM" },
        { text: "Room No.", value: "204" },
        { text: "Computer No.", value: "20" },
      ],
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
      AuthService.logout();
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
    async getAssessmentInfo(assessmentId) {
      const response2 = await LogedInUserInfo.getUserInfo();
      this.userInfo =
        response2.data && response2.data.user ? response2.data.user : {};
      this.$store.state.userInfo = this.userInfo;

      let response = await AssessmentController.getSingleAssessment(
        assessmentId
      );
      if (response && response.data && response.data.data) {
        this.recommendedAssessment = response.data.data;
        this.assessmentConfigData = this.recommendedAssessment.tests.find(
          (ele) => ele.assessment_type == "SCREENING"
        );
        console.log(this.recommendedAssessment);
      }
    },
  },
  created() {
    // console.log("userInfo");
    const assessmentId = this.$route.query.assessmentId;
    const assessmentName = this.$route.query.assessmentName;

    // console.log("assessment data", assessment)
    this.assessmentId = assessmentId;
    this.getAssessmentInfo(assessmentId);
    // console.log('assessment id',this.assessmentId)
    this.$mixpanel.track("SubmissionSucceeded", {
      assessment_id: assessmentId,
      assessment_name: assessmentName,
      screen_name: "SubmissionSucceededScreen",
    });
  },
};
</script>
     