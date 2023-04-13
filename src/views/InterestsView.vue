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
                 :value="(e1/4)*100"
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
                  outlined
                  class="rounded-xl"
                  chips
                  :items="levels"
                  multiple
                  item-text="name"
                  item-value="id"
                  :rules="[(v) => !!v || 'School is required']"
                                required
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
                        v-for="(level, i) in levels"
                        :key="i"
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
                    <v-layout row wrap justify-center class="item-box" >
                      <v-item
                        v-slot="{ active, toggle }"
                        v-for="(board, i) in boards"
                        :key="i"
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
              <div>
                <v-item-group multiple v-model="userIntrestData.subject_ids">
                  <v-container>
                    <v-layout row wrap justify-space-around class="item-box">
                      <v-item
                        v-slot="{ active, toggle }"
                        v-for="(subject, i) in subjects"
                        :key="i"
                      >
                        <v-card
                   
                          class="d-flex align-center ma-2 rouded-xl "
                          width="145px"
                          height="158px"
                          :class="active ? 'selected-box ' : ''"
  
                          @click="toggle"
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
          @click="goTo(e1)"
        >
          {{  e1 == 4 ? 'save' : 'next'}}
        </v-btn>
      </div>
    </v-card>
  </template>

<script>

  import SchoolController from "@/controllers/SchoolController";
  import BoardController from "@/controllers/BoardController";
  import LevelController from "@/controllers/LevelController";
  import SubjectController from "@/controllers/SubjectController";
  import UserIntrestController from '@/controllers/UserIntrestController'; 
  
  export default {
    name: "InterestsView",
    data() {
      return {
        e1: 1,
        subjects: [],
        schools: [],
        boards: [],
        levels: [],
       userIntrestData:  {
      "level_ids": [],
      "school_ids": [],
      "board_ids": [],
      "subject_ids": []
      }
      };
    },
    methods: {
  
      goTo(step) {
        switch (step) {
          case 1:
             if (this.$refs.step1.validate()) {
              this.e1 = 2;
              console.log("step",this.e1);
            }
  
            break;
          case 2:
            // if (this.$refs.step1.validate())
            console.log("step2");
            this.e1 = 3;       
            console.log("step",this.e1);
            break;
          case 3:
              this.e1 = 4
              console.log("step",this.e1);
            
            
            break;
            case 4:
            console.log("step4")
           this.createUserIntrest();
            // if (this.$refs.step1.validate())
            console.log("router step");
            this.$router.push('/');
            
            
            break;
          
  
  
          default:
           
        }},
     async createUserIntrest(){
      console.log('userInterst',this.userIntrestData);
     const response =  await UserIntrestController.createUserIntrest(this.userIntrestData);
     console.log(response);
  
      },
      async getSubjects() {
        const response = await SubjectController.getSubject();
  
        this.subjects = response.data.data.rows;
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
    },
    created() {
      this.getLevel();
      this.getSubjects();
      this.getBoards();
      this.getSchool();
    },
  };
  </script>
       