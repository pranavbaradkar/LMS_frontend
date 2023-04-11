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
              <v-icon>mdi-arrow-left</v-icon>
            </v-col>
            <v-col cols="8">
              <v-progress-linear
                height="25"
                color="secondary"
                class="rounded-xl"
                value="20"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
      <!-- parant card of items ends here -->
      <v-stepper v-model="e1" elevation="0" class="surface">
        <v-stepper-items>
          <!------------------------------------------ STEP 1 ------------------------------------------>
          <v-stepper-content step="1" elevation="0">
            <v-card-title class="d-flex justify-center">
              Which is your preferrerd school?
            </v-card-title>
            <v-container>
              <v-autocomplete
                v-model="selectedSchools"
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
              >
              </v-autocomplete>
            </v-container>
          </v-stepper-content>
          <!------------------------------------------ STEP 2 ------------------------------------------>

          <v-stepper-content step="2" class="pb-0">
            <v-card-title class="d-flex justify-center">
              What level do you (want to) teach?
            </v-card-title>
            <v-card-subtitle class="text-center"
              >Select one or more applicable</v-card-subtitle
            >
            <div id="myScroll">
              <v-item-group multiple v-model="selectedLevels">
                <v-container>
                  <v-layout row wrap justify-space-around>
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(level, i) in levels"
                      :key="i"
                    >
                      <v-card
                        :color="active ? 'secondaryAccent' : ''"
                        class="d-flex align-center ma-2"
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

          <v-stepper-content step="3" class="pb-0">
            <v-card-title class="d-flex justify-center">
              Which board do you want to teach?
            </v-card-title>

            <div id="myScroll">
              <v-item-group v-model="selectedBoards">
                <v-container>
                  <v-layout row wrap justify-space-around>
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(board, i) in boards"
                      :key="i"
                    >
                      <v-card
                        :color="active ? 'secondaryAccent' : ''"
                        class="d-flex align-center ma-2"
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

          <v-stepper-content step="4" class="pb-0">
            <v-card-title class="d-flex justify-center">
              Which Subject(s) do you teach?
            </v-card-title>
            <v-card-subtitle class="text-center"
              >Select maximum 3 subjects</v-card-subtitle
            >
            <div id="myScroll">
              <v-item-group multiple v-model="selectedSubjects">
                <v-container>
                  <v-layout row wrap justify-space-around>
                    <v-item
                      v-slot="{ active, toggle }"
                      v-for="(subject, i) in subjects"
                      :key="i"
                    >
                      <v-card
                        :color="active ? 'secondaryAccent' : ''"
                        class="d-flex align-center ma-2"
                        width="145px"
                        height="158px"
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
        @click="e1 = e1 + 1"
      >
        next
      </v-btn>
    </div>
  </v-card>
</template>
<script>
import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import SubjectController from "@/controllers/SubjectController";

export default {
  name: "RegestrationIntrest",
  data() {
    return {
      e1: 1,
      subjects: [],
      schools: [],
      boards: [],
      levels: [],
      selectedSubjects: [],
      selectedSchools: [],
      selectedBoards: [],
      selectedLevels: [],
    };
  },
  methods: {
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
     