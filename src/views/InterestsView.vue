<template>
  <v-card width="100%" height="100%" class="surface">
    <v-container>
      <v-app-bar color="surface" elevation="0" fixed>
        <v-list-item>
          <v-list-item-icon class="pt-4">
            <v-img src="../assets/logo.svg" contain max-width="16rem"></v-img>
          </v-list-item-icon>
        </v-list-item>
      </v-app-bar>
      <!-- parent card of items -->
      <v-card class="mt-14 elevation-0 surface">
        <v-card-title></v-card-title>
        <v-card-title>
          <v-row align="center" justify="center" align-content="center">
            <v-col cols="1">
              <v-icon v-if="e1 != 1" @click="e1--">mdi-arrow-left</v-icon>
            </v-col>
            <v-col cols="8">
              <v-progress-linear
                height="25"
                color="secondary"
                class="rounded-xl"
                :value="(e1 / 4) * 100"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <!-- parant card of items ends here -->
      <v-stepper v-model="e1" elevation="0" class="surface">
        <v-stepper-items>
          <!------------------------------------------ STEP 1 ------------------------------------------>
          <v-stepper-content step="1" elevation="0" class="pt-0 pb-0">
            <v-form lazy-validation ref="step1">
              <v-card-title class="d-flex justify-center">
                Which is your preferrerd school?
              </v-card-title>
              <v-container>
                <v-autocomplete
                
                  v-model="userIntrestData.school_ids"
                  clearable
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
              </v-container>
            </v-form>
          </v-stepper-content>
          <!------------------------------------------ STEP 2 ------------------------------------------>

          <v-stepper-content step="2" class="pb-0 pt-0">
            <v-card-title class="d-flex justify-center">
              What level do you (want to) teach?
            </v-card-title>
            <v-card-subtitle class="text-center"
              >Select one or more applicable</v-card-subtitle
            >
            <div id="myScroll">
              <v-item-group multiple v-model="userIntrestData.level_ids">
                <v-container>
                  <v-layout row wrap justify-center class="item-box">
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(level,i) in levels"

                      :key="i"
                      :value="level.id"
                    >
                      <v-card
                        :class="active ? 'selected-box ' : ''"
                        class="d-flex align-center ma-2 rouded-xl"
                        width="145px"
                        height="158px"
                        @click="toggle"
                      >
                        <v-col align-self="center">
                          <v-card-text> </v-card-text>
                          <p class="text-center">
                            {{ level.name }}
                          </p>
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
            <v-card-title class="d-flex justify-center">
              Which board do you want to teach?
            </v-card-title>

            <div id="myScroll">
              <v-item-group v-model="userIntrestData.board_ids" multiple>
                <v-container>
                  <v-layout row wrap justify-center class="item-box">
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
                          <v-card-text>
                            <v-img :src="board.logo"></v-img>
                          </v-card-text>
                          <p class="text-center">
                            {{ board.name }}
                          </p>
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
            <v-card-title class="d-flex justify-center">
              Which Subject(s) do you teach?
            </v-card-title>
            <v-card-subtitle class="text-center"
              >Select maximum 3 subjects</v-card-subtitle
            >
            <v-slide-group
    
      show-arrows
   
    >
  
  

    <v-slide-item
    v-for="(sub, index) in Array.from(new Set(subjectCategoryNames)) " :key="index"
        v-slot="{ active, toggle }"
      >
      <div @click="setVmodel(sub)">
        <v-btn
          class="mx-2"
          :input-value="active"
          active-class="m-q-chip"
          depressed
          rounded
         id="all"
          @click="toggle"         
        >
        
          {{ sub }}
        
       
        </v-btn>
      </div>
      </v-slide-item>
            <v-chip-group
       
        column
        multiple
      >
       
        
      </v-chip-group>
    </v-slide-group>
            <div>
              <v-item-group multiple v-model="userIntrestData.subject_ids"  max="3">
                <v-container>
                  <v-layout row wrap justify-center class="item-box">
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(subject, i) in subjects"
                      :key="i"
                      :value="subject.id"
                    >
                      <v-card  
                        class="d-flex align-center ma-2 rouded-xl"
                        width="145px"
                        height="158px"
                        :class="active ? 'selected-box ' : ''"
                        @click="toggle"
                        v-if="selectedSubject == subject.subject_category.name || selectedSubject == 'all'"
                    
                      >
                        <v-col align-self="center">
                          <v-card-text> </v-card-text>
                          <p class="text-center">
                            {{ subject.name }}
                          </p>
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
    </v-container>
    <div class="d-flex w-100 justify-center bottom-btn">
      <v-btn
        color="secondary"
        class="textcolor--text"
        rounded
        large
        width="300px"
        :disabled="  (e1 == 1 && (userIntrestData.school_ids.length  ==0 ))  || (e1 == 2 && (userIntrestData.level_ids.length == 0 ))  ||  (e1 == 3 && (userIntrestData.board_ids.length == 0)) || (e1 == 4 && (userIntrestData.subject_ids.length == 0)) "
        
        @click="goTo(e1)"
      >
        {{ e1 == 4 ? "save" : "next" }}
      </v-btn>
    </div>
  </v-card>
</template>

<script>
import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import SubjectController from "@/controllers/SubjectController";
import UserIntrestController from "@/controllers/UserIntrestController";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";

export default {
  name: "InterestsView",
  data() {
    return {
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
  methods: {

    setVmodel(data){
        this.selectedSubject = data;
    },
    async goTo(step) {
      switch (step) {
        case 1:
          if (this.userIntrestData.school_ids.length != 0) {       
            this.e1 = 2;
            console.log("step", this.e1);
          }
          else {
            alert('Please Select at least one school')
          }

          break;
        case 2:
          // if (this.$refs.step1.validate())
          console.log("step2");
          if (this.userIntrestData.level_ids.length != 0) {
            this.e1 = 3;         
          }
          else {
            alert('Please Select at least one level')
          }
          
          break;
        case 3:
        if (this.userIntrestData.board_ids.length != 0) {    
          
          

          // if(this.userIntrestData.board_ids.length > 3){
          //   alert("Maxi")
          // }
          this.e1 = 4;
          console.log("step", this.e1);
        }
        else {
          alert('Please Select at least one one board')
        }
          break;
        case 4:
          console.log("step4");
          if( this.userIntrestData.subject_ids.length != 0){
            const res = await this.createUserIntrest();
            console.log(res);
            if(res.data.success) {
              this.$router.replace("/");
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
      console.log("userInterst", this.userIntrestData);
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
      //console.log("subject log", this.subjectsData);
    },
    async getSchool() {
      const response = await SchoolController.getSchool();
      // console.log(response);
      this.schools = response.data.data.rows;
      //console.log("school log", this.schoolData);
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
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      console.log("User: ", this.userInfo);
      if(this.userInfo.is_interest_captured){
        this.$router.replace('/');
      }
      this.personalInfo.is_email_verified = this.userInfo.is_email_verified;
      this.personalInfo.is_phone_verified = this.userInfo.is_phone_verified;
      this.personalInfo.email = this.userInfo.email;
      this.personalInfo.phone_no = this.userInfo.phone_no.slice(-10);
      this.$mixpanel.track("PersonalInformationStepLoaded", {
      user_type: this.userInfo.user_type,
      screen_name: "PersonalProfileInformationScreen",
    });
    },
  },
  mounted() {

  
   setTimeout(()=> {
    document.getElementById('schoolBox').click()
    document.getElementById('all').click();
      }
      ,1000);

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
       