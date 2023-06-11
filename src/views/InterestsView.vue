<template>
  <v-card width="100%" height="100%" class="surface" depressed elevation="0" style="overflow: hidden;">
      <v-app-bar style="background-color: transparent" elevation="0" fixed>
        <v-list-item>
          <v-list-item-icon class="pt-4">
            <v-img src="../assets/logo.svg" contain max-width="16rem"></v-img>
          </v-list-item-icon>
        </v-list-item>
      </v-app-bar>
      <!-- parent card of items -->
      <v-container fluid class="fill-height ma-0 pa-0" v-if="SetUpPreferencesClicked && !showAIScreen">
      <v-row class="fill-height">
        <v-col cols="6">
          <div style="position: relative; width:100%;">
              <v-img :height="getHeight - 22 + 'px'" width="100%" style="position: absolute; z-index: 5;" src="@/assets/curl-background-1.svg"></v-img>
              <v-row class="ml-16">
                <v-col style="margin-top: 116px" class="pa-0">
                  <v-icon class="ml-7 mb-4" style="z-index: 6;" v-if="e1 != 1" @click="e1--">mdi-arrow-left</v-icon>
                  <div style="font-size: 39px; width: 60%; line-height: 40px" class="font-weight-bold ml-8 mb-8">
                    {{ getContent.heading }}
                  </div>
                  <div v-if="getContent.subHeading" style="font-size: 14px; color: rgba(0, 0, 0, 0.6); width: 80%" class="ml-8">
                    {{ getContent.subHeading }}
                  </div>
                  <v-img v-show="e1 == 1" class="mt-4" width="33vw" height="22vw" style="z-index: 4;" src="@/assets/School.svg"></v-img>
                  <v-img v-show="e1 == 2" class="mt-4" width="28vw" height="22vw" style="z-index: 4;" src="@/assets/Level.svg"></v-img>
                  <v-img v-show="e1 == 3" class="mt-4" width="28vw" height="24vw" style="z-index: 4;" src="@/assets/board.svg"></v-img>
                  <v-img v-show="e1 == 4" class="mt-4" width="26vw" height="24vw" style="z-index: 4;" src="@/assets/Subject.svg"></v-img>
                </v-col>
              </v-row>
            </div>
        </v-col>
        <v-col cols="6" class="justify-space-between d-flex flex-column">
        <v-stepper style="margin-top: 112px" v-model="e1" elevation="0" class="surface">
          <v-progress-linear
                style="width: 80%; margin-left: 10%"
                height="16"
                color="primary"
                class="rounded-xl mb-4"
                :value="(e1 / 4) * 100"
              ></v-progress-linear>
        <v-stepper-items>
          <!------------------------------------------ STEP 1 ------------------------------------------>
          <v-stepper-content step="1" elevation="0" class="pt-0 pb-0">
            <v-form lazy-validation ref="step1">
              <div>
                <v-autocomplete
                  style="max-height: 70%; top: 199px; box-shadow: none"
                  v-model="userIntrestData.school_ids"
                  deletable-chips
                  label="Schools"
                  prepend-inner-icon="mdi-magnify"
                  outlined
                  class="rounded-xl"
                  small-chips
                  :items="schools"
                  multiple
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'School is required']"
                  required
                  id="schoolBox"
                >
                </v-autocomplete>
              </div>
            </v-form>
          </v-stepper-content>
          <!------------------------------------------ STEP 2 ------------------------------------------>

          <v-stepper-content step="2" class="pb-0 pt-0">
            <div id="myScroll" class="d-flex justify-center">
              <v-item-group multiple v-model="userIntrestData.level_ids" style="width: 90%">
                <v-container fluid>
                  <v-layout row wrap justify-center class="item-box" fill-height>
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(level,i) in levels"

                      :key="i"
                      :value="level.id"
                    >
                      <v-card
                        :class="active ? 'selected-box ' : 'non-selected-box'"
                        class="d-flex align-center ma-2 rouded-xl"
                        width="145px"
                        height="158px"
                        @click="toggle"
                      >
            <v-col align-self="center">
            <v-checkbox  :input-value="active" class="mt-2 mb-0"></v-checkbox>
            <v-row>
                <v-col class="d-flex justify-center pa-0 mb-6 mt-1" color="primary">
                    <div style="height: 48px; width: 48px;">
                      <v-img :src="level.icon"></v-img>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex justify-center pa-0 mb-2" style="font-size: 14px; font-weight: 400;">
                    {{ level.name }}
                </v-col>
            </v-row>
                        </v-col>
                      </v-card>
                    </v-item>
                  </v-layout>
                </v-container>
              </v-item-group>
            </div>
          </v-stepper-content>

          <!------------------------------------------ STEP 3 ------------------------------------------>

          <v-stepper-content step="3" class="pb-0 pt-0">
            <div id="myScroll" class="d-flex justify-center">
              <v-item-group v-model="userIntrestData.board_ids" multiple style="width: 60%">
                <v-container>
                  <v-layout row wrap justify-center class="item-box" fill-height>
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(board, i) in boards"
                      :key="i"
                      :value="board.id"
                    >
                      <v-card
                        class="d-flex align-center ma-2 rouded-xl"
                        :class="active ? 'selected-box ' : ''"
                        width="145px"
                        height="158px"
                        @click="toggle"
                      >
                        <v-col align-self="center">
                          <v-checkbox  :input-value="active" class="mt-0 mb-0"></v-checkbox>
            <v-row>
                <v-col class="d-flex justify-center pa-0 mb-6 mt-1" color="primary">
                  <div style="height: 48px; width: 48px;">
                    <v-img :src="board.logo"></v-img>
                  </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex justify-center pa-0 mb-2" style="font-size: 14px; font-weight: 400;">
                    {{ board.name }}
                </v-col>
            </v-row>
                        </v-col>
                      </v-card>
                    </v-item>
                  </v-layout>
                </v-container>
              </v-item-group>
            </div>
          </v-stepper-content>
          <!------------------------------------------ STEP 4 ------------------------------------------>

          <v-stepper-content step="4" class="pb-0 pt-0">
            <v-slide-group
            mandatory
            show-arrows>
            <v-slide-item
    v-for="(sub, index) in Array.from(new Set(subjectCategoryNames)) " :key="index"
        v-slot="{ active, toggle }"
      >
      <div @click="setVmodel(sub)">
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="primary"
          depressed
          rounded
         id="all"
          @click="toggle"         
        >
          {{ sub }}
        </v-btn>
      </div>
      </v-slide-item>
    </v-slide-group>
            <div class="d-flex justify-center mt-6">
              <v-item-group multiple v-model="userIntrestData.subject_ids"  max="3" style="width: 80%">
                <v-container>
                  <v-layout row wrap justify-center class="item-box" style="height: calc(100vh - 300px)">
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(subject, i) in subjects"
                      :key="i"
                      :value="subject.id"
                    >
                      <v-card  
                        class="d-flex align-center ma-2 rouded-xl"
                        width="160px"
                        height="148px"
                        :class="active ? 'selected-box ' : 'non-selected-box'"
                        @click="toggle"
                        v-if="selectedSubject == subject.subject_category.name || selectedSubject == 'all'"
                    
                      >
                        <v-col align-self="center">
                          <v-checkbox readonly  :input-value="active" class="mt-0 mb-0"></v-checkbox>
            <v-row>
                <v-col class="d-flex justify-center pa-0 mb-2 mt-1" color="primary">
                  <div style="height: 48px; width: 48px;">
                    <v-img :src="subject.icon"></v-img>
                  </div>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
                <v-col cols="12" class="d-flex justify-center pa-0 mb-2 align-center" style="font-size: 14px; font-weight: 400;">
                    <div style="align-self: center; text-align: center">{{ subject.name }}</div>
                </v-col>
            </v-row>
                        </v-col>
                      </v-card>
                    </v-item>
                  </v-layout>
                </v-container>
              </v-item-group>
            </div>
          </v-stepper-content>
        </v-stepper-items>
          </v-stepper>
          <div style="align-self: center; width: 80%">
      <v-btn
        color="primary"
        class="white--text"
        style="width: 100%; z-index: 10"
        :disabled="  (e1 == 1 && (userIntrestData.school_ids.length  ==0 ))  || (e1 == 2 && (userIntrestData.level_ids.length == 0 ))  ||  (e1 == 3 && (userIntrestData.board_ids.length == 0)) || (e1 == 4 && (userIntrestData.subject_ids.length == 0)) "
        @click="goTo(e1)"
      >
        {{ e1 == 4 ? "Save" : "Next" }}
      </v-btn>
          </div>
        </v-col>
      </v-row>
      </v-container>
      <v-container fluid class="d-flex justify-center align-center" v-else-if="!SetUpPreferencesClicked && !showAIScreen">
        <v-card rounded style="margin-top: 130px" height="446" width="463" class="pa-8 rounded-xl">
            <div style="height: 150px" class="d-flex justify-center flex-column">
              <!-- <lottie-player src='../assets/Animation/welcome.json' speed="1"  loop autoplay></lottie-player> -->
              <v-img style="align-self: center" src="../assets/welcome.gif" height="150" width="150"></v-img>
            </div>
          <v-card-subtitle>
            <v-row>
              <v-col class="d-flex justify-center flex-column align-center pa-0">
                <div style="font-size: 34px; line-height: 40px; text-align: center" class="font-weight-bold black--text">Welcome to your profile! </div>
                <div style="align-self: center; text-align: center; color: #4D4D4D " class="mt-2">
                  To make the most out of your experience, please take a moment to set your preferences. By doing so, we can tailor our recommendations to your interests and needs. Click the 'Preferences' button to get started
                </div>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-actions class="mt-5 d-flex justify-center">
            <v-btn @click="clickSetUpPreference" style="align-self: center; width: 100%" color="primary">
              Setup Preferences
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
      <v-container fluid class="d-flex surface justify-center align-center" v-else-if="showAIScreen">
        <v-row class="fill-height">
        <v-col cols="7">
          <div style="position: relative; width:100%;">
              <v-img :height="getHeight - 22 + 'px'" width="100%" style="position: absolute; z-index: 0;" src="@/assets/curl-background-2.svg"></v-img>
              <v-row class="d-flex justify-center ml-16">
                <v-col style="margin-top: 132px" class="pa-0">
                  <v-img class="mt-4" width="360" height="360" style="z-index: 1;" src="@/assets/AI-loader.gif"></v-img>
                </v-col>
              </v-row>
            </div>
        </v-col>
        <v-col cols="5" class="justify-space-between d-flex flex-column">
          <div style="margin-top: 48%">
          <div style="font-size: 39px; width: 80%; line-height: 40px" class="font-weight-bold ml-8 mb-2">
            Unleashing AI's Power
          </div>
          <div style="font-size: 14px; color: rgba(0, 0, 0, 0.87); width: 80%" class="ml-8">
            Unlocking AI's potential for unparalleled  recommendation..
          </div>
        </div>
        </v-col>
      </v-row>
      </v-container>
  </v-card>
</template>

<script>
import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import SubjectController from "@/controllers/SubjectController";
import UserIntrestController from "@/controllers/UserIntrestController";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import { APP_NAME } from '@/constant';

export default {
  name: "InterestsView",
  data() {
    return {
      appName: APP_NAME,
      showAIScreen: false,
      SetUpPreferencesClicked: false,
      userInfo: {},
      e1: 1,
      subjects: [],
      schools: [],
      boards: [],
      levels: [],
      selectedSubject: 'all',
      userIntrestData: {
        level_ids: [],
        school_ids: [],
        board_ids: [],
        subject_ids: [],
        subjectCategoryNames: [],
      },
    };
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    },

    getContent() {
      const step = this.e1;
      let heading;
      let subHeading;
      switch (step) {
        case 1:
          heading = 'Which is your preferred school ?';
          break;
        case 2:
          heading = 'What level do you (want to) teach?';
          subHeading='Select one or more options as applicable';
          break;
        case 3:
          heading = 'Which board do you want to teach?';
          break;
        case 4:
          heading = 'Which Subject(s) do you teach?';
          subHeading = 'Select maximum 3 subjects';
          break;
      }
    
      return {heading,subHeading}
    }
  },
  methods: {

    SetUpPreferences () {
      
    },
    setVmodel(data){
        this.selectedSubject = data;
    },
    async goTo(step) {
      switch (step) {
        case 1:
          if (this.userIntrestData.school_ids.length != 0) {       
            this.e1 = 2;
            this.$mixpanel.track("LevelPreferencesLoaded", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen'
      });
      this.$mixpanel.track("SchoolPreferencesSelected", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen',
      selected_schools: this.schools.filter((school) => this.userIntrestData.school_ids.includes(school.id)).map((item) => item.name),
      });
          }
          else {
            alert('Please Select at least one school')
          }

          break;
        case 2:
          // if (this.$refs.step1.validate())
          if (this.userIntrestData.level_ids.length != 0) {
            this.e1 = 3;
            this.$mixpanel.track("LevelPreferencesSelected", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen',
      selected_levels: this.levels.filter((level) => this.userIntrestData.level_ids.includes(level.id)).map((item) => item.name),
      });
            this.$mixpanel.track("BoardPreferencesLoaded", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen'
      });         
          }
          else {
            alert('Please Select at least one level')
          }
          
          break;
        case 3:
        if (this.userIntrestData.board_ids.length != 0) {    
          this.e1 = 4;
          this.$mixpanel.track("BoardPreferencesSelected", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen',
      selected_boards: this.boards.filter((board) => this.userIntrestData.board_ids.includes(board.id)).map((item) => item.name),
      });
          this.$mixpanel.track("SubjectPreferencesLoaded", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen'
      });
        }
        else {
          alert('Please Select at least one one board')
        }
          break;
        case 4:
          if( this.userIntrestData.subject_ids.length != 0){
            const res = await this.createUserIntrest();
            if(res.data.success) {
              this.$mixpanel.track("SubjectPreferencesSelected", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen',
      selected_subjects: this.subjects.filter((subject) => this.userIntrestData.subject_ids.includes(subject.id)).map((item) => item.name),
      });
              this.showAIScreen = true;
              this.SetUpPreferencesClicked = false;
              this.$mixpanel.track("AIScreenLoaded", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen'
      });
              setTimeout(() => {
                this.$router.replace("/");
                console.log("navigating to homescreen")
              }, 3000);
            } else {
              alert(res.data.error)
            }
          }
          else {
          alert('Please Select at least one one subject')
        }
         
          

          break;

        default:
      }
    },
    async createUserIntrest() {
      const response = await UserIntrestController.createUserIntrest(
        this.userIntrestData
      );
      return response;
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();

      this.subjects = response.data.data.rows;

      this.subjectCategoryNames= this.subjects.map(item => item.subject_category.name);
     
      this.subjectCategoryNames = ['all'].concat(this.subjectCategoryNames)
    },
    async getSchool() {
      const response = await SchoolController.getSchool();
      // console.log(response);
      this.schools = response.data.data.rows;
    },
    async getBoards() {
      const response = await BoardController.getBoards();
      //console.log(response);
      this.boards = response.data.data.rows;
    },
    async getLevel() {
      const response = await LevelController.getLevel();

      this.levels = response.data.data.rows;
      //console.log("level log", this.levels);
    },
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      if(this.userInfo.is_interest_captured){
        this.$router.replace('/');
      }
      this.$mixpanel.track("WelcomePageLoaded", {
      user_type: this.userInfo.user_type,
      app_name: this.appName
    });
    },

    clickSetUpPreference () {
      this.SetUpPreferencesClicked = true;
      this.$mixpanel.track("SetUpPreferencesClicked", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'WelcomePageScreen'
      });

      this.$mixpanel.track("SchoolPreferencesLoaded", {
      user_type: this.userInfo.user_type,
      app_name: this.appName,
      screen_name: 'PreferenceScreen'
      });
      setTimeout(() => {
      document.getElementById('schoolBox').click();
    }, 1000);
    }
  },
  mounted() {
  },
  watch: {
    // whenever question changes, this function will run
    selectedSubject() {
     console.log(this.selectedSubject)
    }
  },
  created() {
    this.getUserInfo();
    this.getLevel();
    this.getSubjects();
    this.getBoards();
    this.getSchool();
  },
};
</script>

<style>
.v-menu__content {
    box-shadow: none !important;
    max-height: 55% !important;
}
</style>
       