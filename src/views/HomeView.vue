<template>
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

            <v-card-title class="pl-2" v-if="userInfo!=null"
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
    <v-container>
      <v-card
        color="surface"
        class="mx-auto"
        elevation="0"
        width="100%"
        :height="getHeight"
        variant="outlined"
      >
        <div class="text-h6 mb-1 text-center">Test Selection</div>
        <v-list-item-subtitle class="text-center grey--text"
          >Let's start your profile, connect to people you know, and engage with
          <br />them on topics you care about.</v-list-item-subtitle
        >

        <v-img
          width="100%"
          height="320px"
          src="../assets/holebanner.jpeg"
          cover
          class="mt-4"
        >
          <v-card
            class="pa-10"
            elevation="0"
            width="100%"
            height="100%"
            variant="outlined"
            color="#0f0d0d57"
          >
            <div class="white--text" v-if="recommendedAssessment!=null">
              <div class="text-caption">Recommended</div>

              <div class="text-h4 mb-1">{{ recommendedAssessment.name }}</div>
              <v-list-item-subtitle class="mt-4"
                >{{ recommendedAssessment.instructions }}</v-list-item-subtitle
              >
              <div class="mt-4">
                <v-icon class="white--text">mdi-book</v-icon> {{ recommendedAssessment.tests[0].total_no_of_questions }}
                Questions<v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-clock</v-icon> 60 mins
                <v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-book</v-icon>
                300 Users
              </div>

              <v-dialog v-model="dialog" height="90%" width="40vw">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="secondary"
                    class="black--text mt-8"
                    rounded
                    large
                    v-bind="attrs"
                    v-on="on"
                    >START TEST</v-btn
                  >
                </template>

                <div id="mycard">
                  <v-card width="700" elevation="0">
                    <div class="text-h6 mb-1 text-center pt-8">
                      Test Instruction
                    </div>
                    <v-card-subtitle class="pt-2 grey--text text-center"
                      >Primary Teacher Assessment(VGOS)</v-card-subtitle
                    >
                    <v-list dense>
                      <v-list-item-group>
                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-card-subtitle class="pt-2 text-start"
                              >This assessment consists a total of 11
                              questions</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-card-subtitle class="pt-2 text-start"
                              >The test assesses you in 4 different areas as can
                              be seen in the progress-bar at the
                              top</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-card-subtitle class="pt-2 text-start"
                              >You get a maximum of 60s to answer a question in
                              this test</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content class="pt-0 pb-0">
                            <v-card-subtitle class="pt-2 text-start"
                              >A timer that keeps ticking at the top indicates
                              how much time you have to answer a
                              question</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content class="pt-0 pb-0">
                            <v-card-subtitle class="pt-2 text-start"
                              >There is no negative making, some questions may
                              have more than one correct answer</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content class="pt-0 pb-0">
                            <v-card-subtitle class="pt-2 text-start"
                              >Upon the assessment completion, not only the
                              score but a detailed report is
                              generated</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>

                  <v-card elevation="0" align="center" width="100%">
                    <v-btn
                      color="secondary"
                      class="black--text mb-16"
                      rounded
                      large
                      @click="dialog = false"
                      to="/assessment"
                      >START TEST</v-btn
                    >
                  </v-card>
                </div>
              </v-dialog>
            </div>
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
            <v-slide-item v-for="assessment in allAssessments" :key="assessment.id">
              <div class="mytestcard">
                <v-card
                  class="mx-auto mr-3 mb-4 movingcard"
                  min-width="344"
                  max-width="344"
                  outlined
                  height="180"

                >
                  <v-list-item three-line>
                    <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                    ></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="text-h7 mb-0 text-wrap">
                        {{ assessment.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ assessment.instructions }}
                        </v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-expand-transition>
                    <v-card-actions>
                      <v-btn
                        block
                        color="secondary"
                        class="black--text"
                        rounded
                        to="/assessment"
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
    </v-container>
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
      mouseHover: null,
      tab: null,
      model: null,
      dialog: false,
      windowHeight: window.innerHeight,
      userInfo: {},
      allAssessments: [],
      recommendedAssessment:{},
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
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    logout() {
      AuthService.logout();
      this.$router.push("/login");
    },
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      this.$store.state.userInfo=this.userInfo;
    },
    async getAllAssessment() {
      const response = await AssessmentController.getAllAssessment();
      this.allAssessments = response.data.data;
      
    },
    async getRecommendedAssessment() {
      const response = await RecommendedAssessmentController.getRecommendedAssessment();
      console.log("response", response);
      if(response.status==401){
        AuthService.logout();
      }
      this.recommendedAssessment = response.data.data;
      console.log("data" ,this.recommendedAssessment);
    },
  },
  created() {
    this.getUserInfo();
    this.getAllAssessment();
    this.getRecommendedAssessment();
  },
};
</script>
   