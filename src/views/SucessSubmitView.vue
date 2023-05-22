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
                Thank you for attempting this assessment
              </div>
              <p class="mb-0 thank-you-subtext">
                Hold your breath, your school HR will announce the results once
                they are published.
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
              >Screening Test
            </v-btn>
            <div class="text-h6 mb-1">{{ recommendedAssessment.name }}</div>
            <p class="mt-1 font-weight-regular">
              {{ recommendedAssessment.instructions }}
            </p>
            <div class="mt-1" v-if="assessmentConfigData != null">
              <v-icon class="white--text">mdi-book</v-icon>
              {{ assessmentConfigData.total_no_of_questions }}
              Questions<v-icon class="white--text">mdi-circle-small</v-icon
              ><v-icon class="white--text">mdi-clock</v-icon>
              {{ assessmentConfigData.duration_of_assessment ?  
                formatTime(
                  assessmentConfigData.duration_of_assessment
                ) : formatTime(0)
              }}
              <v-icon class="white--text">mdi-circle-small</v-icon
              ><v-icon class="white--text">mdi-book</v-icon>
              300 Users
            </div>
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
    </v-container>
    <v-dialog v-model="dialog" max-width="400px" color="#fff">
      <v-card fluid elevation="0" class="rounded-xl" color="#fff">
        <div class="test-dialog-header font-weight-bold">
          <p>Get Notified</p>
        </div>
        <div class="ma-5">
          <v-card class="mx-auto mt-3" elevation="0">
            <v-card-text
              class="thank-you-card pa-2 justify-space-between align-center"
            >
              <div class="d-flex flex-row align-center">
                <v-checkbox
                  @click="emailSelected"
                  v-model="notificationEmail"
                ></v-checkbox>
                <v-img
                  max-height="24"
                  max-width="24"
                  class="mr-2"
                  src="../assets/Gmail.png"
                ></v-img>
                <div>
                  <div class="font-weight-bold mb-1">
                    Email
                  </div>
                  <p class="mb-0 thank-you-subtext">
                    {{ $store.state.userInfo.email }}
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto mt-3" elevation="0">
            <v-card-text
              class="thank-you-card pa-2 justify-space-between align-center"
            >
              <div class="d-flex flex-row align-center">
                <v-checkbox
                  @click="messageSelected"
                  v-model="notificationSMS"
                ></v-checkbox>
                <v-img
                  max-height="24"
                  max-width="24"
                  class="mr-2"
                  src="../assets/Message.png"
                ></v-img>
                <div>
                  <div class="font-weight-bold mb-1">
                    SMS
                  </div>
                  <p class="mb-0 thank-you-subtext">
                    {{ $store.state.userInfo.phone_no }}
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto mt-3" elevation="0">
            <v-card-text
              class="thank-you-card pa-2 justify-space-between align-center"
            >
              <div class="d-flex flex-row align-center">
                <v-checkbox
                ></v-checkbox>
                <v-img
                  max-height="24"
                  max-width="24"
                  class="mr-2"
                  src="../assets/Whatsapp.png"
                ></v-img>
                <div>
                  <div class="font-weight-bold mb-1">
                    Whatsapp
                  </div>
                  <p class="mb-0 thank-you-subtext">
                    {{ $store.state.userInfo.phone_no }}
                  </p>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <div class="d-flex justify-end w-100">
            <v-btn
              color="#277BC0"
              depressed
              class="white--text mt-5 mb-5"
              large
              @click="confirm"
              >Confirm</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- <div class="d-flex m-body m-center">
      <v-card
        width="55rem"
        height="auto"
        class="d-flex flex-column align-center justify-center pa-8 rounded-xl"
        elevation="0"
      >
        <img src="../assets/bgicon.svg" width="200px" height="auto" />
        <v-card-title> Thank you for attempting this assessment</v-card-title>
        <v-card-subtitle class="ma-0 pa-0">
          <div>Hold your breath, your school HR will announce</div>
        </v-card-subtitle>
        <v-card-subtitle class="ma-0 pa-0">
          <div>the results once they are published.</div>
        </v-card-subtitle>

        <div class="d-flex justify-center w-100 ma-6">
          <v-card elevation="0">
            <v-card-text class="pl-2 pb-2"
              >Get notified for test results on</v-card-text
            >
            <div class="d-flex justify-center">
              <v-card
                width="245"
                height="54"
                class="d-flex flex-row m-center m-btn ma-2"
                elevation="0"
                depressed
                ><v-checkbox
                  @click="emailSelected"
                  v-model="notificationEmail"
                ></v-checkbox
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
                ><v-checkbox
                  @click="messageSelected"
                  v-model="notificationSMS"
                ></v-checkbox
                ><v-icon class="mr-2" size="25"
                  >mdi-message-reply-outline</v-icon
                >
                <div class="d-flex flex-column">
                  <div class="c-b-t">SMS</div>
                  <div class="c-b-t-m">
                    {{ $store.state.userInfo.phone_no }}
                  </div>
                </div>
              </v-card>
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
    </div> -->
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
      dialog: true,
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
    async getAssessmentInfo (assessmentId) {

      const response2 = await LogedInUserInfo.getUserInfo();
      this.userInfo = response2.data && response2.data.user ? response2.data.user : {};
      this.$store.state.userInfo = this.userInfo;
    
      let response = await AssessmentController.getSingleAssessment(
        assessmentId
      );
      if(response && response.data && response.data.data) {
        this.recommendedAssessment = response.data.data;
        this.assessmentConfigData = this.recommendedAssessment.tests.find(ele=> ele.assessment_type == 'SCREENING');
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

    
  }
};
</script>
     