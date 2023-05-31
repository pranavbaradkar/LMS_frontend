<template height="80">
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

            <v-card-title class="pl-2" v-if="userInfo != null"
              >{{ userInfo.first_name }} 👋</v-card-title
            > 
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="goToProfile" text icon>
                  <v-avatar>
                    <v-img src="../assets/user.png"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
            </v-menu>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-app-bar>
    <v-container class="white-background">
      <!-- :height="getHeight" -->
      <v-card
        color="surface"
        class="mx-auto"
        elevation="0"
        width="100%"
        variant="outlined"
        v-if="allAssessments && allAssessments.length != 0 || recommendedAssessment != {}"
      >
        <v-row align="start" no-gutters v-if="isEdit == false">
          <v-col v-if="userInterests.schools.length > 0">
            <v-sheet class="ma-2">
              <p class="school-label">School</p>
              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  {{ userInterests.schools && userInterests.schools[0] ? userInterests.schools[0].name : 'N/A' }}
                </p>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      v-bind="attrs"
                      v-on="on"
                      v-if="(userInterests.schools.length - 1) > 0" 
                      class="mx-2" fab dark small 
                      color="#277BC0"> + {{ (userInterests.schools.length) - 1 }} 
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in userInterests.schools"
                      :key="index"
                    >
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>
          <v-col v-if="userInterests.levels && userInterests.levels.length > 0">
            <v-sheet class="ma-2">
              <p class="school-label">Level</p>
              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  {{ userInterests.levels && userInterests.levels[0] ? userInterests.levels[0].name : 'N/A' }}
                </p>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      v-bind="attrs"
                      v-on="on"
                      v-if="userInterests.levels.length - 1 > 0" 
                      class="mx-2" fab dark small 
                      color="#277BC0"> + {{ userInterests.levels.length - 1 }} 
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in userInterests.levels"
                      :key="index"
                    >
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>
          
          <v-col v-if="userInterests.boards.length > 0">
            <v-sheet class="ma-2">
              <p class="school-label">Board</p>

              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  {{ userInterests.boards && userInterests.boards[0] ? userInterests.boards[0].name : 'N/A' }}
                </p>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      v-bind="attrs"
                      v-on="on"
                      v-if="userInterests.boards.length - 1 > 0" 
                      class="mx-2" fab dark small 
                      color="#277BC0"> + {{ userInterests.boards.length - 1 }} 
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in userInterests.boards"
                      :key="index"
                    >
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>

          <v-col v-if="userInterests.subjects.length > 0">
            <v-sheet class="ma-2">
              <p class="school-label">Subject’s</p>
              <div class="d-flex align-center">
                <p class="font-weight-medium school-value mb-0">
                  {{ userInterests.subjects && userInterests.subjects[0] ? userInterests.subjects[0].name : 'N/A' }}
                </p>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                      v-bind="attrs"
                      v-on="on"
                      v-if="userInterests.subjects.length - 1 > 0" 
                      class="mx-2" fab dark small 
                      color="#277BC0"> + {{ userInterests.subjects.length - 1 }} 
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in userInterests.subjects"
                      :key="index"
                    >
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-sheet>
          </v-col>
          <v-col-1 class="home-edit-icon align-self-center">
            <v-btn
              class="mx-2 black--text"
              fab
              dark
              small
              color="transparent"
              @click="toggleEdit"
            >
              <v-icon> mdi-pencil </v-icon>
            </v-btn>
          </v-col-1>
        </v-row>

        <v-row align="start" no-gutters v-if="isEdit == true">
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">School</p>
              <div class="d-flex align-center">
                <v-select
                  v-model="schoolSelected"
                  :items="schools"
                  item-text="name"
                  item-value="id"
                  :menu-props="{ maxHeight: '400' }"
                  multiple
                  persistent-hint
                ></v-select>
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">Level</p>
              <div class="d-flex align-center">
                <v-select
                  v-model="levelSelected"
                  :items="levels"
                  item-text="name"
                  item-value="id"
                  :menu-props="{ maxHeight: '400' }"
                  multiple
                  persistent-hint
                ></v-select>
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">Board</p>
              <v-select
                v-model="boardSelected"
                :items="boards"
                item-text="name"
                item-value="id"
                :menu-props="{ maxHeight: '400' }"
                multiple
                persistent-hint
              ></v-select>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="ma-2">
              <p class="school-label">Subject’s</p>
              <div class="d-flex align-center">
                <v-select
                  v-model="subjectSelected"
                  :items="subjects"
                  item-text="name"
                  item-value="id"
                  :menu-props="{ maxHeight: '400' }"
                  multiple
                  persistent-hint
                ></v-select>
              </div>
            </v-sheet>
          </v-col>
          <v-col-1 class="align-self-center">
            <v-btn
              class="mx-2 primary--text"
              fab
              dark
              small
              color="#E9F2F9"
              @click="createUserIntrest"
            >
              <v-icon dark> mdi-check </v-icon>
            </v-btn>
          </v-col-1>
        </v-row>

        <v-divider></v-divider>
        <!-- <div class="text-h6 mb-1 text-center">Test Selection</div>
        <v-list-item-subtitle class="text-center grey--text"
          >Let's start your profile, connect to people you know, and engage with
          <br />them on topics you care about.</v-list-item-subtitle
        > -->

        <div class="text-h6 py-1">Recommended For You</div>

        <v-img
          width="100%"
          height="327px"
          src="../assets/home_banner.svg"
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
              <div class="mt-1" v-if="recommendedAssessment.tests != null">
                <v-icon class="white--text">mdi-book</v-icon>
                {{ recommendedAssessment && recommendedAssessment.tests[0].total_no_of_questions }}
                Questions<v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-clock</v-icon>
                {{
                  (recommendedAssessment.tests && recommendedAssessment.tests[0].duration_of_assessment) &&
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
                class="white--text mt-4"
                large
                @click="recommendedTestViewEvent"
                >START TEST</v-btn
              >
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
            <v-slide-item
              v-for="assessment in allAssessments"
              :key="assessment.id"
            >
              <div class="mytestcard">
                <v-card
                  class="mb-4 movingcard"
                  min-width="333"
                  max-width="333"
                  outlined
                  height="360"
                  style="margin-right: 8.33px"
                >
                  <v-list-item three-line class="mb-0">
                    <v-list-item-avatar
                      tile
                      size="300"
                      height="173"
                      color="grey"
                    ></v-list-item-avatar>
                  </v-list-item>
                  <v-list-item three-line>
                    <v-list-item-content class="pt-0">
                      <v-list-item-title
                        class="assessment-name mb-0 text-wrap mb-2"
                      >
                        {{ assessment.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle class="assessment-instructions">
                        {{ assessment.instructions }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-expand-transition>
                    <v-card-actions class="mx-2">
                      <v-btn
                        depressed
                        block
                        color="#E9F2F9"
                        class="primary--text"
                        height="40"
                        @click="otherTestViewEvent(assessment.id)"
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
      <v-card
        v-else
        color="surface"
        class="mx-auto d-flex align-center justify-center"
        elevation="0"
        width="100%"
        :height="getHeight"
        variant="outlined"
      >
        <v-card-title class="d-flex align-center">
          No Assessments Found!
        </v-card-title>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog" max-width="365px" color="#fff">
      <v-card fluid elevation="0" class="rounded-xl" color="#fff">
        <div class="test-dialog-header">
          <p>Instructions</p>
        </div>
        <div class="mx-5 mt-5">
          <div class="d-flex flex-row align-start mb-5">
            <v-icon size="6" class="me-2 mt-1">mdi-circle</v-icon>
            <p class="mb-0 font-weight-regular assesment-instruction">
              This assessment consists a total of {{ noOfQuestions }} questions
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
              A timer that keeps ticking at the top indicates how much time you
              have to answer a question
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
          <div class="d-flex justify-end w-100">
            <v-btn
              color="#DADADA"
              depressed
              class="black--text mt-5 mb-5 me-2"
              large
              @click="closeDialog"
              >Cancel</v-btn
            >
            <v-btn
              color="#277BC0"
              depressed
              class="white--text mt-5 mb-5"
              large
              @click="startTest"
              >START TEST</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import UserIntrestController from "@/controllers/UserIntrestController";
import AssessmentController from "@/controllers/AssessmentController";
import RecommendedAssessmentController from "@/controllers/RecommendedAssessmentController";
import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import SubjectController from "@/controllers/SubjectController";

export default {
  name: "HomeView",

  data() {
    return {
      selectedAssessment: {},
      mouseHover: null,
      tab: null,
      model: null,
      dialog: false,
      windowHeight: window.innerHeight,
      userInfo: {},
      allAssessments: [],
      recommendedAssessment: {},
      duration: 0,
      noOfQuestions: 0,
      userInterests: {
        boards: [],
        schools: [],
        levels: [],
        subjects: []
      },
      userInterestsEdit: [],
      schoolSelected: [],
      levelSelected: [],
      boardSelected: [],
      subjectSelected: [],
      subjects: [],
      schools: [],
      boards: [],
      levels: [],
      isEdit: false,
      e1: 1,
      testType: "Screening",
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
    toggleEdit() {
      if (this.isEdit == true) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
    },
    editSubmit() {
      this.isEdit = false;
      // this.schoolSelected = [];
      // this.levelSelected = [];
      // this.boardSelected = [];
      // this.subjectSelected = [];
    },
    closeDialog() {
      this.dialog = false;
      this.$mixpanel.track("InstructionPageClosed", {
        assessment_id: this.selectedAssessment.id,
        assessment_name: this.selectedAssessment.name,
        screen_name: "RecommendedTestScreen",
        assessment_level: this.selectedAssessment.tests[this.e1 - 1].level.name,
      });
    },
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
    // startRecommendedTest() {
    //   this.dialog = false;
    //   this.$mixpanel.track("StartTestClicked", {
    //     assessment_id: this.recommendedAssessment.id,
    //     assessment_name: this.recommendedAssessment.name,
    //     source: "instruction_page/recommendation_page",
    //     screen_name: "RecommendedTestScreen",
    //   });
    //   this.$router.push("/assessment");
    // },

    startTest() {
      this.dialog = false;
      this.$mixpanel.track("StartTestClicked", {
        assessment_id: this.selectedAssessment.id,
        assessment_name: this.selectedAssessment.name,
        source: "instruction_page/recommendation_page",
        screen_name: "RecommendedTestScreen",
        assessment_type:
          this.selectedAssessment.tests[this.e1 - 1].assessment_type,
        assessment_level: this.selectedAssessment.tests[this.e1 - 1].level.name,
      });

      // console.log('selected',this.selectedAssessment);
      // this.$router.push({
      //   path: "/assessment",
      //   query: { id: this.selectedAssessment.id, test: this.testType },
      // });
      let url = `/#/assessment?id=${this.selectedAssessment.id}&test=${this.testType}`;
      this.Full_W_P(url);
    },
    Full_W_P(url) {
      let params  = 'width='+screen.width;
      params += ', height='+screen.height;
      params += ', top=0, left=0'
      params += ', fullscreen=yes';
      params += ', minimizable=no';
      params += ', directories=no';
      params += ', location=no';
      params += ', menubar=no';
      params += ', resizable=no';
      params += ', scrollbars=yes';
      params += ', status=no';
      params += ', toolbar=no';


      let newwin = window.open(url,'FullWindowAll', params);
      if (window.focus) {newwin.focus()}
      return false;
    },
    recommendedTestViewEvent() {
      this.selectedAssessment = this.recommendedAssessment;
      let selectedTest = this.selectedAssessment.tests.filter(ele => ele.assessment_type == 'SCREENING');


      if (
        this.selectedAssessment.screening_status == "PENDING" ||
        this.selectedAssessment.screening_status == "STARTED"
      ) {
        this.testType = "Screening";
        this.e1 = 1;
      } else if (
        this.selectedAssessment.screening_status != "PENDING" &&
        this.selectedAssessment.screening_status != "STARTED" &&
        (this.selectedAssessment.mains_status == "PENDING" ||
          this.selectedAssessment.mains_status == "STARTED")
      ) {
        this.testType = "Mains";
        this.e1 = 2;
      } else {
        this.$router.push({
          path: "/report",
          query: { id: this.selectedAssessment.id },
        });
      }
      this.duration = selectedTest.duration_of_assessment;
      this.noOfQuestions = selectedTest.total_no_of_questions;
      this.dialog = true;
      this.$mixpanel.track("RecommendedViewTestClicked", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        screen_name: "RecommendedTestScreen",
        assessment_level:
          this.recommendedAssessment.tests[this.e1 - 1].level.name,
      });
      this.$mixpanel.track("InstructionsModalLoaded", {
        assessment_id: this.recommendedAssessment.id,
        assessment_name: this.recommendedAssessment.name,
        screen_name: "AssessmentInstructionsScreen",
        assessment_level:
          this.recommendedAssessment.tests[this.e1 - 1].level.name,
      });
    },
    async otherTestViewEvent(id) {
      const response = await AssessmentController.getSingleAssessment(id);
      if (response.data.success) {
        this.selectedAssessment = response.data.data;
        let selectedTest = this.selectedAssessment.tests.filter(ele => ele.assessment_type == 'SCREENING');

        this.duration = selectedTest.duration_of_assessment;
        this.noOfQuestions =
          selectedTest.total_no_of_questions;
        this.dialog = true;
        this.$mixpanel.track("OtherViewTestClicked", {
          assessment_id: this.selectedAssessment.id,
          assessment_name: this.selectedAssessment.name,
          screen_name: "RecommendedTestScreen",
          assessment_level:
            selectedTest.level.name,
        });
        this.$mixpanel.track("InstructionsModalLoaded", {
          assessment_id: this.selectedAssessment.id,
          assessment_name: this.selectedAssessment.name,
          screen_name: "AssessmentInstructionsScreen",
          assessment_level:
            selectedTest.level.name,
        });
        console.log(this.selectedAssessment);
      } else {
        alert("Something went wrong!");
      }
    },

    onResize() {
      this.windowHeight = window.innerHeight;
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
    goToProfile () {
    this.$router.push("/Profile");
   },
    async getSchool() {
      const response = await SchoolController.getSchool();
      // console.log(response);
      this.schools = response.data.data.rows;
      //console.log("school log", this.schoolData);
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();

      this.subjects = response.data.data.rows;

      this.subjectCategoryNames = this.subjects.map(
        (item) => item.subject_category.name
      );

      this.subjectCategoryNames = ["all"].concat(this.subjectCategoryNames);
      //console.log("subject log", this.subjectsData);
    },
    async createUserIntrest() {
      let data = {
        "level_ids": this.levelSelected,
        "school_ids": this.schoolSelected,
        "board_ids": this.boardSelected,
        "subject_ids": this.subjectSelected
      }
      console.log("userInterst", this.userIntrestData);
      const response = await UserIntrestController.createUserIntrest(
        data
      );
      this.isEdit = false;
      this.getUserInterests();
      this.getUserInterestEdit();   
      return response;
    },
    async getBoards() {
      const response = await BoardController.getBoards();
      //console.log(response);
      this.boards = response.data.data.rows;
      console.log("board log", this.boards);
    },
    async getLevel() {
      const response = await LevelController.getLevel();

      this.levels = response.data.data.rows;
      //console.log("level log", this.levels);
    },
    async getUserInterests() {
      const response = await UserIntrestController.getUserInterests();

      this.userInterests = response.data.data;
      console.log("userInterests log", this.userInterests);
    },
    async getUserInterestEdit() {
      const response = await UserIntrestController.getUserInterestsForEdit();

      this.userInterestsEdit = response.data.data;
      this.boardSelected = this.userInterestsEdit.board_ids;
      this.subjectSelected = this.userInterestsEdit.subject_ids;
      this.levelSelected = this.userInterestsEdit.level_ids;
      this.schoolSelected = this.userInterestsEdit.school_ids;
      //console.log("userInterests log", this.userInterests);
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
      this.identifyUser();
    },
    identifyUser() {
      const userId = this.userInfo.id;
      const userName = this.userInfo.first_name + " " + this.userInfo.last_name;
      const userEmail = this.userInfo.email;
      const userPhone = this.userInfo.phone_no;
      // Identify the user
      this.$mixpanel.identify(userId);

      // Set user properties
      this.$mixpanel.people.set({
        $name: userName,
        $email: userEmail,
        $phone: userPhone,
      });
    },
    async getAllAssessment() {
      const response = await AssessmentController.getAllAssessment({type: 'SCREENING'});
      this.allAssessments = response.data.data;
      //console.log(this.allAssessments);
      this.getRecommendedAssessment();
    },
    async getRecommendedAssessment() {

      var setupMains = await AssessmentController.getSetupMainsAssessment();

      const response =
        await RecommendedAssessmentController.getRecommendedAssessment("", {type: 'SCREENING'});
      //console.log("response", response);
      this.$mixpanel.track("RecommendationScreenLoaded", {
        screen_name: "RecommendationScreen",
      });
      if (response.status == 401) {
        AuthService.logout();
      }
      if (response.status == 404) {
        const response2 =
          await RecommendedAssessmentController.getRecommendedAssessment(
            "?debug=203", {type: 'SCREENING'}
          );
        this.recommendedAssessment = response2.data ? response2.data.data : null;
        console.log(this.recommendedAssessment);
        this.allAssessments = response2.data.data ? this.allAssessments.filter(function (item) {
          return item.id !== response2.data.data.id;
        }) : this.allAssessments;
      } else {
        this.recommendedAssessment = response.data && response.data.data ?  response.data.data : null;
        console.log("reco", this.recommendedAssessment);

        this.allAssessments = response.data && response.data.data ? this.allAssessments.filter(function (item) {
          return item.id !== response.data.data.id;
        }) : this.allAssessments;
      }
      if (
        this.recommendedAssessment && (this.recommendedAssessment.screening_status == "PENDING" ||
        this.recommendedAssessment.screening_status == "STARTED")
      ) {
        this.testType = "Screening";
        this.e1 = 1;
      } else if(this.recommendedAssessment && (this.recommendedAssessment.mains_status == "FAILED" ||
        this.recommendedAssessment.mains_status == "PASSED")) {
        this.$router.push({
          path: `/assessment/${this.recommendedAssessment.id}/mains/status`,
          query: {},
        });
      } else if ( this.recommendedAssessment && (this.recommendedAssessment.screening_status == "FAILED" ||
        this.recommendedAssessment.screening_status == "PASSED")) {
          if(setupMains.status == 200) {
            if(setupMains.data.data && (response.data.data.slot == null || response.data.data.video_link == null)) {
              this.$router.push(`/assessment/mains/setup`);
            } else {
              this.$router.push({
                path: `/assessment/${this.recommendedAssessment.id}/screening/status`,
                query: {},
              });
            }
          }  else {
            this.$router.push({
              path: `/assessment/${this.recommendedAssessment.id}/screening/status`,
              query: {},
            });
          }
      } 

      // else if (
      //   this.recommendedAssessment && this.recommendedAssessment.screening_status != "PENDING" &&
      //   this.recommendedAssessment.screening_status != "STARTED" &&
      //   (this.recommendedAssessment && this.recommendedAssessment.mains_status == "PENDING" ||
      //     this.recommendedAssessment.mains_status == "STARTED")
      // ) {
      //   this.testType = "Mains";
      //   this.e1 = 2;
      // }

      //console.log("data", this.recommendedAssessment);
    }
  },
  created() {
    this.getUserInfo();
    this.getAllAssessment();
    this.getLevel();
    this.getSubjects();
    this.getBoards();
    this.getSchool();
    this.getUserInterests();
    this.getUserInterestEdit();
    //this.getRecommendedAssessment();
  },
};
</script>
   