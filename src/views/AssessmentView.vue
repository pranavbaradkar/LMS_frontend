<template>
  <div class="surface">
    <v-container fluid>
      <v-row>
      
        <!-- Left Card -->
        <v-col cols="3">
          <v-card v-if="!isProgressClicked" :height="getHeight" class="pa-4 ma-2 pt-0 rounded-xl">
            <v-card min-height="380" id="circleCard" elevation="0">
              <v-card-title>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <div  v-bind="attrs"
                    v-on="on" class="assessment-name text-h6 font-weight-regular accent--text">
                    {{ assessment.name }}
                    </div>
                  </template>
                <span>{{ assessment.name }}</span>
              </v-tooltip>
              </v-card-title>
              <v-card-subtitle>
                <span class="font-weight-light grey--text">Test Duration:</span>
                <span v-if="assessment.tests != null">
                  {{  formatTime(seconds) }} </span>
              </v-card-subtitle>
              <v-divider class="mx-4 mt-0"></v-divider>
              <v-card-title class="pa-x pt-8 pb-0">
                <v-row justify="space-around">
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15" @click="openProgressList('Answered')"
                      :value=((answeredProgress/questions.length)*100) color="answered
                          ">
                      <h4 class="black--text">{{ answeredProgress }}</h4>
                    </v-progress-circular>
                    <v-card-subtitle class="py-2">ANSWERED</v-card-subtitle>
                  </div>
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15"
                      :value="((skipped.length / questions.length) * 100)" color="skipped"
                      @click="openProgressList('Skipped')">
                      <h4 class="black--text">{{ this.skipped.length }}</h4>
                    </v-progress-circular>
                    <v-card-subtitle class="py-2">SKIPPED</v-card-subtitle>
                  </div>
                </v-row>
              </v-card-title>
              <v-card-title class="justify-center py-0">
                <div class="d-flex flex-column mb-2 align-center">
                  <v-progress-circular :rotate="360" :size="85" :width="15"
                    :value="((bookmarked.length / questions.length) * 100)" color="bookmarked"
                    @click="openProgressList('Bookmark')">
                    <h4 class="black--text">{{ this.bookmarked.length }}</h4>
                  </v-progress-circular>
                  <v-card-subtitle class="py-2">BOOKMARK</v-card-subtitle>
                </div>
              </v-card-title>
            </v-card>
            <v-divider class="mx-4 mt-0"></v-divider>
            <v-container class="py-0 my-0">
              <v-card elevation="0" id="myScroll" :height="getQuestionsListHeight">
                <!-- need to set height of this card for set  good scroll -->
                <v-list-item-group mandatory >
                  <v-list-item class="grey lighten-4 pt-2" v-for="(item, i) in questions" :key="i"
                    @click="questionClicked(item)">
                    <v-list-item-content class="py-0" :id="scrollId + '' + i">
                      <v-list-item-title :class="
                        i == selectedQuestion ? 'primary--text font-weight-regular' : 'font-weight-light'
                      "><v-icon large :color="getColor(item)">mdi-circle-medium</v-icon>
                        <img v-if="i == selectedQuestion" src="../assets/Polygonpoly.png" class="polyicon" />
                        Question {{ i + 1 }}</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-divider class="mt-2 mb-1"></v-divider>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action v-if="bookmarked.includes(item)">
                      <v-icon color="primary">
                        mdi-bookmark
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-card>
            </v-container>
          </v-card>
          <!-- Progress List -->
          <v-card v-else :height="getHeight" id="myScroll" class="pa-4 ma-2 pt-0 rounded-xl"
           >
            <v-card height="auto" id="circleCard" elevation="0">
              <v-card-title class="text-subtitle font-weight-regular accent--text testHead">
                <p class="mb-0">{{ progressListTitle }}</p>
                <v-spacer></v-spacer>
              <v-icon  @click="isProgressClicked = false">mdi-close</v-icon>
              </v-card-title>
              <v-divider class="mx-4 mt-0"></v-divider>
            </v-card>
            <v-divider class="mx-4 mt-0"></v-divider>
            <v-container>
              <v-card elevation="0" id="myScroll" height="auto">
                <v-list-item-group mandatory >
                  <v-list-item class="grey lighten-4 pt-2" v-for="(item, i) in progressList" :key="i" v-on:click="setSelectedQuestionFromProgress(item)"
                    @click="isProgressClicked = false">
                    <v-list-item-content class="py-0">
                      <v-list-item-title :class="
                        i == selectedQuestion ? 'primary--text font-weight-regular' : 'font-weight-light'
                      "><v-icon large :color="getColor(item)">mdi-circle-medium</v-icon>
                        <img v-if="i == selectedQuestion" src="../assets/Polygonpoly.png" class="polyicon" />
                        Question {{ getQuestionIndex(item)+1 }}</v-list-item-title>
                      <v-list-item-subtitle>
                      <v-divider class="mt-2 mb-1"></v-divider>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action v-if="bookmarked.includes(item)">
                      <v-icon color="primary">
                        mdi-bookmark
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-card>
            </v-container>
          </v-card>
        </v-col>
        <!-- Right Card -->
        <v-col cols="9" class="pl-0">
          <v-card v-if="screening.length != 0" :height="getHeight" class="d-flex my-2 mr-2  flex-column rounded-xl">
            <v-card-title @click="confirmExitDialog = true" class="pb-0">
              <v-icon class="cursor">mdi-close</v-icon>
            </v-card-title>
            <v-container class="px-16">
              <!-- Timer -->
              <v-row class="align-center text-align-center px-4 pb-4">
                <v-card class="pa-0" width="70" elevation="0">
                  <v-text-field hide-details="" label="HH" readonly :value=hours outlined rounded
                    class="rounded-xl centered-input timmer "
                    :style="seconds <= 60 ? 'background: linear-gradient(180deg, rgba(255, 59, 48, 0.076) 0%, rgba(255, 59, 48, 0.12) 100%);' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 210, 218, 0.6) 100%)'">
                  </v-text-field>
                </v-card>
                <span class="pa-2">:</span>
                <v-card class="pa-0" width="70" elevation="0">
                  <v-text-field hide-details="" label="MM" readonly :value=mins outlined rounded
                    class="rounded-xl centered-input timmer "
                    :style="seconds <= 60 ? 'background: linear-gradient(180deg, rgba(255, 59, 48, 0.076) 0%, rgba(255, 59, 48, 0.12) 100%);' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 210, 218, 0.6) 100%)'">

                  </v-text-field>
                </v-card>
                <span class="pa-2">:</span>
                <v-card class="pa-0" width="70" elevation="0">
                  <v-text-field hide-details="" label="SS" readonly :value=secs outlined rounded
                    class="rounded-xl centered-input timmer "
                    :style="seconds <= 60 ? 'background: linear-gradient(180deg, rgba(255, 59, 48, 0.076) 0%, rgba(255, 59, 48, 0.12) 100%);' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 210, 218, 0.6) 100%)'">

                  </v-text-field>
                </v-card>
                <v-col cols="2" class="pr-0">
                  <span>Time Left</span>
                </v-col>
                <v-spacer></v-spacer>
                <!-- Submit Button -->
                <v-col cols="4" class="text-end pr-0">
                  <v-btn width="150px" height="48px" rounded color="accent" class="white--text"
                    @click="openTestSummary">SUBMIT</v-btn>
                </v-col>
              </v-row>
              <!-- Progress Bar -->

              <v-progress-linear class="rounded-xl mt-4 mb-4" rounded
                :value="((answeredProgress + skipped.length + bookmarked.length) / questions.length) * 100"
                color="secondary" background-color="grey lighten-2" height="18"></v-progress-linear>
              <v-row justify="space-between" align="center">
                <v-col>
                  <span class="text-caption">Question
                    {{ selectedQuestion + 1 + " of " + questions.length }}</span>
                </v-col>
                <v-col class="text-end" v-if="questions != 0">
                  <v-chip v-if="questions[selectedQuestion].skill.name=='Core Skill'" active text-color="black" class="m-q-chip">{{
                  questions[selectedQuestion].subject.name }}</v-chip>
                  <v-chip v-else active text-color="black" class="m-q-chip">{{
                    questions[selectedQuestion].skill.name }}</v-chip>
                </v-col>
              </v-row>
              <v-card class="my-card pa-0 mt-4 rounded-xl" elevation="0" color="grey lighten-4" id="myScroll">
                <v-card height="auto" elevation="0" color="grey lighten-4">
                  <v-card-title v-if="questions[selectedQuestion] != null"> <div v-html="questions[selectedQuestion].statement"></div>
                  </v-card-title>
                </v-card>
              </v-card>
            </v-container>

            <v-container class="px-16 option-box">
              <!-- Question Block -->

              <!-- <v-spacer></v-spacer> -->
              <!-- Options Card -->
              <v-card class="option-card mt-8 rounded-xl w-100 float-bottom " elevation="0">
                <v-card height="auto" color="sufaceAccent w-100" elevation="0">
                  <v-card-title v-if="questions[selectedQuestion] != null"
                    class="d-flex w-100 pa-1 flex-row justify-space-around">
              
                    <!-- <v-btn class="ma-2 option-width" min-height="50px"  v-for="(option, index) in questions[selectedQuestion].question_options"  :key="index"
                      :color="questions[selectedQuestion].myAnswer == option.option_key ? 'secondaryAccent' : ''"
                      
                         @click="
    setOption(
      questions[selectedQuestion].question_options[index]
    )
  ">
              <div class="w-100"  v-html="option.option_value"></div>     
                    </v-btn> -->

                      <div class="ma-2 option-width overflow-hidden white" 
                      v-for="(option, index) in questions[selectedQuestion].question_options" :key="index"
                @click="
                        setOption(
                          questions[selectedQuestion].question_options[index]
                        )
                      ">
                      <div class="w-100 d-flex justify-center cursor sub-text-option" :class="questions[selectedQuestion].myAnswer == option.option_key ? 'secondaryAccent' : ''"  v-html="option.option_value "></div>
                    </div>
          
                    

                    <!-- <v-btn class="ma-2 option-width" min-height="50px"
                      :color="questions[selectedQuestion].myAnswer == option.option_key ? 'secondaryAccent' : ''" v-for="(option, index) in questions[selectedQuestion]
                        .question_options" :key="index" @click="
                          setOption(
                            questions[selectedQuestion].question_options[index]
                          )
                        ">
                      {{ option.option_value }}
                    </v-btn> -->

                  </v-card-title>
                </v-card>
              </v-card>

            </v-container>

            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-card elevation="0" class="px-12">
              <v-container>
                <v-card-title><v-row class="d-flex flex-row justify-space-between">
                    <div>
                      <v-btn rounded color="primary" @click="previous" width="120px" height="36px" outlined
                        :disabled="selectedQuestion == 0">
                        Previous
                      </v-btn>

                      <v-btn :disabled="questions[this.selectedQuestion].myAnswer==null" v-if="selectedQuestion == questions.length - 1" rounded
                        color="secondary" @click="summaryDialog = true" height="36px" class="ml-8 black--text mr-0">
                        Proceed & View Summary
                      </v-btn>
                      <v-btn v-else rounded color="secondary" :disabled="questions[this.selectedQuestion].myAnswer==null" @click="next" width="120px"
                        height="36px" class="ml-8 mr-0 black--text">
                        NEXT
                      </v-btn>
                    </div>


                    <div>
                      <v-tooltip bottom v-if="!bookmarked.includes(questions[selectedQuestion])">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn large text color="primary" class="ml-0" :disabled="isTimeUp" v-bind="attrs" v-on="on"
                            @click="bookmarkQuestion(questions[selectedQuestion])">
                            <v-icon class="pr-2" right> mdi-bookmark-outline </v-icon>
                            BOOKMARK
                          </v-btn>
                        </template>
                        <span>Bookmark this question to revisit it later</span>
                      </v-tooltip>

                      <v-btn v-else large text color="primary" @click="bookmarkQuestion(questions[selectedQuestion])"
                        :disabled="isTimeUp">
                        <v-icon class="pr-2" right> mdi-bookmark </v-icon>
                        REMOVE BOOKMARK
                      </v-btn>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn text large color="primary" v-bind="attrs" v-on="on" :disabled="isTimeUp"
                            @click="skipQuestion(questions[selectedQuestion])">
                            >> SKIP
                          </v-btn>
                        </template>
                        <span>Skip this question if you do not know the answer</span>
                      </v-tooltip>
                    </div>
                  </v-row></v-card-title>
              </v-container>
            </v-card>
          </v-card>
          <v-card v-else class="d-flex flex-column justify-center align-center my-2 mr-2 rounded-xl" :height="getHeight">
            <v-card-title>
              No Questions Data Found!
            </v-card-title>
            <v-card-title @click="$router.back()" class="pb-0">
              <v-btn rounded color="secondary" class="black--text" width="250">Return To Home</v-btn>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">Assessment Submitted Successfully</p>
            <v-btn class="primary" large width="157px" rounded @click="() => {
              successDialog = false;
            }">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Test Summary Dialog -->
    <v-dialog v-model="summaryDialog" fullscreen persistent>
      <v-container fluid>
        <v-row>
          <!-- Left Card -->
          <v-col cols="3">
            <v-card :height="getHeight" id="myScroll" class="pa-4 ma-2 pt-0 rounded-xl">
              <v-card height="auto" id="circleCard" elevation="0">
                <v-card-title class="text-subtitle font-weight-regular accent--text testHead">
                  <p>{{ assessment.name }}</p>
                  <span></span>
                </v-card-title>
                <v-card-subtitle>
                  <span class="font-weight-light grey--text">Test Duration:</span>
                  <span v-if="assessment.tests != null">
                    {{ formatTime(seconds) }}</span>
                </v-card-subtitle>
                <v-divider class="mx-4 mt-0"></v-divider>

              </v-card>
              <v-divider class="mx-4 mt-0"></v-divider>
              <v-container>
                <v-card elevation="0" id="myScroll" height="auto">
                  <v-list-item-group mandatory>
                    <v-list-item class="grey lighten-4 pt-2" v-for="(item, i) in questions" :key="i"
                      @click="onClickSummaryQuestionBox(i)">
                      <v-list-item-content class="py-0" :id="scrollId + '' + i">
                        <v-list-item-title :class="
                          i == selectedQuestion ? 'primary--text font-weight-regular' : 'font-weight-light'
                        "><v-icon large :color="getColor(item)">mdi-circle-medium</v-icon>
                          <img v-if="i == selectedQuestion" src="../assets/Polygonpoly.png" class="polyicon" />
                          Question {{ i + 1 }}</v-list-item-title>

                        <v-list-item-subtitle>
                          <v-divider class="mt-2 mb-1"></v-divider>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action v-if="bookmarked.includes(item)">
                        <v-icon color="primary">
                          mdi-bookmark
                        </v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-card>
              </v-container>
            </v-card>

          </v-col>
          <!-- Right Card -->
          <v-col cols="9" class="pl-0">
            <v-card :height="getHeight" class="d-flex my-2 mr-2  flex-column rounded-xl">
              <v-card-title v-if="seconds != 0" @click="summaryDialog = false" class="pb-0">
                <v-icon>mdi-close</v-icon>
              </v-card-title>
              <v-card-title v-else class="pb-0 mt-4">

              </v-card-title>
              <!-- Progress Bar -->
              <v-container class="px-16">
                <v-row class="align-center text-align-center px-2 pb-4">
                  <v-card class="pa-0" width="70" elevation="0">
                    <v-text-field hide-details="" label="HH" readonly :value=hours outlined rounded
                      class="rounded-xl centered-input timmer "
                      :style="seconds <= 60 ? 'background: linear-gradient(180deg, rgba(255, 59, 48, 0.076) 0%, rgba(255, 59, 48, 0.12) 100%);' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 210, 218, 0.6) 100%)'">

                    </v-text-field>
                  </v-card>
                  <span class="pa-2">:</span>
                  <v-card class="pa-0" width="70" elevation="0">
                    <v-text-field hide-details="" label="MM" readonly :value=mins outlined rounded
                      class="rounded-xl centered-input timmer"
                      :style="seconds <= 60 ? 'background: linear-gradient(180deg, rgba(255, 59, 48, 0.076) 0%, rgba(255, 59, 48, 0.12) 100%);' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 210, 218, 0.6) 100%)'">

                    </v-text-field>
                  </v-card>
                  <span class="pa-2">:</span>
                  <v-card class="pa-0" width="70" elevation="0">
                    <v-text-field hide-details="" label="SS" readonly :value=secs outlined rounded
                      class="rounded-xl centered-input timmer "
                      :style="seconds <= 60 ? 'background: linear-gradient(180deg, rgba(255, 59, 48, 0.076) 0%, rgba(255, 59, 48, 0.12) 100%);' : 'background: linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(130, 210, 218, 0.6) 100%)'">

                    </v-text-field>
                  </v-card>
                  <v-col cols="2" class="pr-0">
                    <span>Time Left</span>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>

                <v-row justify="space-between" align="center">
                  <v-col>
                    <span class="text-h6">Screening Test Summary
                    </span>
                  </v-col>
                  <v-col class="text-end">
                    <v-chip class="ma-2 grey lighten-3"><v-icon large
                        color="answered">mdi-circle-medium</v-icon>Answered</v-chip>
                    <v-chip class="ma-2 grey lighten-3"><v-icon large
                        color="skipped">mdi-circle-medium</v-icon>Skipped</v-chip>
                    <v-chip class="ma-2 grey lighten-3"><v-icon large
                        color="bookmarked">mdi-circle-medium</v-icon>Bookmarked</v-chip>
                  </v-col>
                </v-row>

                <v-card width="100%" color="grey lighten-2" height="18" class="rounded-xl d-flex flex-row mt-4 mb-2"
                  elevation="0">

                  <v-card color="answered" height="18" :width="((answeredProgress / questions.length) * 100) + '%'"
                    elevation="0" class="rounded-xl"></v-card>


                  <v-card color="skipped" height="18" :width="((skipped.length / questions.length) * 100) + '%'"
                    elevation="0" class="rounded-xl"></v-card>
                  <v-card color="bookmarked" height="18" :width="((bookmarked.length / questions.length) * 100) + '%'"
                    elevation="0" class="rounded-xl"></v-card>
                </v-card>
              </v-container>
              <v-container class="px-16" id="myScroll">
                <!-- Summary Questions Card -->
                <v-layout row wrap justify-center>

                  <v-card v-for="(question, index) in questions" :key="index" @click="onClickSummaryQuestionBox(index)"
                    :class="'text-center ma-2 rounded-lg' + getColorClass(question)" width="70px" height="54"
                    elevation="4" outlined>
                    <v-card-text class="text-body-1 font-weight-bold px-1">
                      Q {{ index + 1 }}

                    </v-card-text>
                  </v-card>
                </v-layout>


              </v-container>

              <v-spacer></v-spacer>
              <v-divider></v-divider>
              <v-card elevation="0" class="my-4">

                <v-card-title>
                  <v-row justify="center">
                    <v-btn color="accent" width="249px" height="48px" rounded x-large @click="submitAssessment">CONFIRM
                      SUBMISSION</v-btn>
                  </v-row>
                </v-card-title>

              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="error" size="96">mdi-close-circle-outline</v-icon>
            <p class="text-h5 py-4">{{ errorMessage }}</p>
            <v-btn depressed class="black--text" color="secondary" large width="157px" rounded
              @click="errorDialog = false">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Exit Confirmation Dialog -->
    <v-dialog v-model="confirmExitDialog" width="358px" persistent>
      <v-card>
        <v-container>
          <v-card-text class="text-center">
            <!-- <v-icon color="error" size="96">mdi-close-circle-outline</v-icon> -->
            <p class="text-h5 mb-0">Are you sure you want to quit?</p>
            <v-card-subtitle>
              We will not be able to save your progress if you quit.
            </v-card-subtitle>
            <v-row justify="end" class="ma-2">
              <v-btn depressed class="black--text" color="primary" large text rounded
                @click="confirmExitDialog = false">NO</v-btn><v-btn depressed class="primary--text" color="secondary"
                large rounded @click="$router.back()">YES</v-btn>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import "../styles.css";
import AssessmentsController from "../controllers/AssessmentsController";
import AssessmentController from "../controllers/AssessmentController";
import Vue from "vue";
export default {
  name: "AssessmentView",
  data() {
    return {
      testType: "",
      assessmentId: "",
      confirmExitDialog: false,
      errorDialog: false,
      errorMessage: "Failed",
      hours: "00",
      mins: "00",
      secs: "00",
      seconds: 800,
      lastAnswerTime: null,
      timerId: null,
      isProgressClicked: false,
      summaryDialog: false,
      successDialog: false,
      windowHeight: window.innerHeight,
      selectedQuestion: 0,
      progressListTitle: "",
      power: 25,
      screening: [],
      assessment: {},
      questions: [],
      progressList: [],
      option_selected: "",
      response: {},
      bookmarked: [],
      skipped: [],
      answeredProgress: 0,
      skippedProgress: 0,
      bookmarkedProgress: 0,
      scrollId: "scrollId",
      counter: 0,
    };
  },
  computed: {
    isTimeUp() {
      return this.seconds <= 0;
    },
    getHeight() {
      //console.log("Height =", window.innerHeight);
      //console.log("Width =", window.innerWidth);
      return this.windowHeight - 40 + "px";
    },
    getQuestionsListHeight() {
      return this.windowHeight - 440 + "px";
    },
  },
  mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);

    this.startTimer();

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    window.removeEventListener("resize", this.onResize);
    this.stopTimer();
    this.$mixpanel.track("AssessmentClosed", {
      assessment_id: this.assessment.id,
      assessment_name: this.assessment.name,
      questions_qnswered: this.answeredProgress,
      questions_bookmarked: this.bookmarked,
      questions_skipped: this.skipped,
      total_time_spent_in_sec:
        this.assessment.tests[0].duration_of_assessment * 60 - this.seconds,
      screen_name: "AssessmentScreen",
      assessment_type: this.testType,
      assessment_level: this.assessment.tests[1].level.name,
    });
  },

  methods: {
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
    setSelectedQuestionFromProgress(item) {
      this.selectedQuestion = this.getQuestionIndex(item);
      this.scrollMethod("scrollId" + this.selectedQuestion);
    },
    getQuestionIndex(question) {
      return this.questions.indexOf(question);
    },
    onClickSummaryQuestionBox(index) {
      if (
        this.questions[index].myAnswer ||
        this.skipped.includes(this.questions[index])
      ) {
        this.selectedQuestion = index;
        this.summaryDialog = false;
        this.scrollMethod("scrollId" + this.selectedQuestion);
      }
    },
    getColorClass(question) {
      if (this.bookmarked.includes(question)) {
        return " bookmarked-border";
      } else if (this.skipped.includes(question)) {
        return " skipped-border";
      } else if (question.myAnswer != null) {
        return " answered-border";
      } else {
        return "";
      }
    },
    scrollMethod(data) {
      //console.log("scroll view",data)
      // document.getElementById(data).scrollIntoView()

      const element = document.getElementById(data);

      element.scrollIntoView();
    },

    openTestSummary() {
      this.summaryDialog = true;
      this.$mixpanel.track("TestSummaryLoaded", {
        assessment_id: this.assessment.id,
        assessment_name: this.assessment.name,
        screen_name: "TestSummaryScreen",
      });
    },
    startTimer() {
      this.interval = setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    updateTime() {
      if (this.seconds <= 0) {
        this.summaryDialog = true;
        clearInterval(this.interval);
        return;
      }

      this.seconds -= 1;

      const remainingHours = Math.floor(this.seconds / 3600);
      const remainingMinutes = Math.floor((this.seconds % 3600) / 60);
      const remainingSeconds = this.seconds % 60;

      this.hours = this.pad(remainingHours);
      this.mins = this.pad(remainingMinutes);
      this.secs = this.pad(remainingSeconds);
    },
    pad(value) {
      return value < 10 ? "0" + value : value;
    },
    stopTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
    },
    openProgressList(type) {
      this.isProgressClicked = true;
      switch (type) {
        case "Answered":
          this.progressListTitle = "Answered Questions";
          this.progressList = this.questions.filter(
            (question) => question.myAnswer != null
          );
          break;
        case "Skipped":
          this.progressListTitle = "Skipped Questions";

          this.progressList = this.skipped;
          break;
        case "Bookmark":
          this.progressListTitle = "Bookmarked Questions";

          this.progressList = this.bookmarked;
          break;
        default:
          break;
      }
    },
    getColor(item) {
      if (this.skipped.includes(item)) {
        return "skipped";
      } else if (item.myAnswer != null) {
        return "answered";
      }
    },
    bookmarkQuestion(question) {
      if (!this.bookmarked.includes(question)) {
        this.bookmarked.push(question);
        this.$mixpanel.track("QuestionBookmarked", {
          question_id: this.selectedQuestion.id,
          screen_name: "AssessmentScreen",
        });
        //console.log(this.questions[this.selectedQuestion]);
        // if (this.skipped.includes(question)) {
        //   let index = this.bookmarked.indexOf(question);
        //   this.skipped.splice(index, 1);

        // }
      } else {
        let index = this.bookmarked.indexOf(question);
        this.bookmarked.splice(index, 1);
        this.$mixpanel.track("BookmarkRemoved", {
          question_id: this.selectedQuestion.id,
          screen_name: "AssessmentScreen",
        });
      }
    },
    updateProgress() {
      this.answeredProgress = 0;
      this.questions.forEach((question) => {
        if (question.myAnswer != null) {
          this.answeredProgress++;
        }
      });
    },
    async submitAssessment() {
      this.questions.forEach((question) => {
        if (question.myAnswer != null) {
          Vue.set(this.response, question.id, question.myAnswer);
        }
      });
      const response = await AssessmentsController.submitAssessment(
        this.assessment.id,
        {
          response_json: this.response,
        }
      );
      this.$mixpanel.track("SubmitButtonClicked", {
        assessment_id: this.assessment.id,
        questions_answered: {
          count: this.answeredProgress,
          question_id: this.questions.filter((item) => item.myAnswer != null),
        },
        question_bookmarked: {
          count: this.bookmarked,
          question_id: this.bookmarked,
        },
        questions_skipped: {
          count: this.skipped,
          question_id: this.skipped,
        },
        questions_not_answered: {
          count: this.questions.length - this.answeredProgress,
          question_id: this.questions.filter((item) => item.myAnswer == null),
        },
        counter_sec: this.seconds,
        total_time_spent_in_sec:
          this.assessment.tests[0].duration_of_assessment * 60 - this.seconds,
        screen_name: "AssessmentScreen",
      });
      //console.log(response);
      if (response.data.success) {
        // this.successDialog = true;
        this.$store.state.assessmentId = this.assessment.id;
        this.$router.replace({
          path: "/success",
          query: { assessment: JSON.stringify(this.assessment) },
        });
      } else {
        this.$router.replace({
          path: "/failed",
          query: { assessment: JSON.stringify(this.assessment) },
        });
      }
    },
    setOption(option) {
      if (!this.isTimeUp) {
        if (
          this.questions[this.selectedQuestion].myAnswer == option.option_key
        ) {
          this.questions[this.selectedQuestion].myAnswer = null;
          this.updateProgress();
        } else {
          this.questions[this.selectedQuestion].myAnswer = option.option_key;
          //console.log(this.questions[this.selectedQuestion]);
          if (this.skipped.includes(this.questions[this.selectedQuestion])) {
            let index = this.bookmarked.indexOf(
              this.questions[this.selectedQuestion]
            );
            this.skipped.splice(index, 1);
          }
          this.updateProgress();
          this.$mixpanel.track("AnswerGiven", {
            question_id: this.selectedQuestion.id,
            option_selected:
              this.questions[this.selectedQuestion].myAnswer == null
                ? "NA"
                : this.questions[this.selectedQuestion].myAnswer,
            screen_name: "AssessmentScreen",
          });
        }
      }
    },
    skipQuestion(question) {
      if (!this.skipped.includes(question)) {
        this.skipped.push(question);
        //console.log(this.questions[this.selectedQuestion]);
        this.questions[this.selectedQuestion].myAnswer = null;
        this.updateProgress();
      }
      if (this.selectedQuestion + 1 != this.questions.length) {
        this.next();
      }
    },

    next() {
      this.$mixpanel.track("NextButtonClicked", {
        question_id: this.selectedQuestion.id,
        question_number_in_view: this.selectedQuestion + 1,
        question_bookmarked: this.bookmarked.includes(
          this.questions[this.selectedQuestion]
        ),
        option_selected:
          this.questions[this.selectedQuestion].myAnswer == null
            ? "NA"
            : this.questions[this.selectedQuestion].myAnswer,
        screen_name: "AssessmentScreen",
        time_taken_in_sec: this.lastAnswerTime - this.seconds,
        difficulty_level: this.questions[this.selectedQuestion].difficulty_level,
        skill: this.questions[this.selectedQuestion].skill.name,
        Subject: this.questions[this.selectedQuestion].subject,
      });
      this.lastAnswerTime = this.seconds;
      this.selectedQuestion = this.selectedQuestion + 1;
      this.scrollMethod("scrollId" + this.selectedQuestion);
    },
    previous() {
      this.$mixpanel.track("PreviousButtonClicked", {
        question_id: this.selectedQuestion.id,
        question_number_in_view: this.selectedQuestion + 1,
        question_bookmarked: this.bookmarked.includes(
          this.questions[this.selectedQuestion]
        ),
        option_selected:
          this.questions[this.selectedQuestion].myAnswer == null
            ? "NA"
            : this.questions[this.selectedQuestion].myAnswer,
        screen_name: "AssessmentScreen",
        time_taken_in_sec: this.lastAnswerTime - this.seconds,
      });

      this.selectedQuestion = this.selectedQuestion - 1;
      this.scrollMethod("scrollId" + this.selectedQuestion);
    },
    questionClicked(item) {
      if (item.myAnswer || this.skipped.includes(item)) {
        this.selectedQuestion = this.questions.indexOf(item);
        this.scrollMethod("scrollId" + this.selectedQuestion);
        this.$mixpanel.track("QuestionListClicked", {
        question_id: this.selectedQuestion.id,
        question_number_in_view: this.selectedQuestion + 1,
        question_bookmarked: this.bookmarked.includes(
          this.questions[this.selectedQuestion]
        ),
        screen_name: "AssessmentScreen",
      });
      }
      
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    async getAssessmentInfo() {
      var response;
      if (this.testType == "Screening") {
        response = await AssessmentsController.getScreeningQuestions(
          this.assessmentId
        );
      } else {
        response = await AssessmentsController.getMainsQuestions(
          this.assessmentId
        );
      }

      if (response.data.success) {
        this.screening = response.data.data;
        this.screening.forEach((element) => {
          this.questions.push(...element.questions);
        });
        console.log("screening: ", this.screening);
      } else {
        this.errorDialog = true;
        this.errorMessage = response.data.error;
      }
      const response2 = await AssessmentController.getSingleAssessment(
        this.assessmentId
      );
      if (response2.data.success) {
        this.assessment = response2.data.data;
        console.log("assessmentinfo", this.assessment);
        if (this.testType == "Screening") {
          this.seconds = this.assessment.tests[0].duration_of_assessment;
        } else {
          this.seconds = this.assessment.tests[1].duration_of_assessment;
        }
        
        this.lastAnswerTime = this.seconds;
    this.changeTestStatus();

      } else {
        this.errorDialog = true;
        this.errorMessage = response2.data.error;
      }
    },
    handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
      const confirmationMessage =
        "Are you sure you want to leave? Your unsaved changes will be lost.";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    },
    async changeTestStatus() {
      if (this.testType == "Screening") {
        this.$mixpanel.track("AssessmentLoaded", {
          assessment_id: this.assessment.id,
          assessment_name: this.assessment.name,
          screen_name: "AssessmentScreen",
          assessment_type: this.testType,
          assessment_level: this.assessment.tests[0].level.name,
        });
        console.log("Screening started");
        const response = await AssessmentController.startScreening(
          this.assessmentId
        );
        console.log(response);
      } else {
        this.$mixpanel.track("AssessmentLoaded", {
          assessment_id: this.assessment.id,
          assessment_name: this.assessment.name,
          screen_name: "AssessmentScreen",
          assessment_type: this.testType,
          assessment_level: this.assessment.tests[1].level.name,
        });
        console.log("Mains started");
        const response = await AssessmentController.startMains(
          this.assessmentId
        );
        console.log(response);
      }
    },
  },

  created() {
    this.assessmentId = this.$route.query.id;
    this.testType = this.$route.query.test;
    // console.log(this.assessmentId);
    this.getAssessmentInfo();
  },
};
</script>
<style scoped>
.v-list-item {
  min-height: 32px;
}

.answered-border {
  border-color: #009051;
  border-width: 2px;
}

.skipped-border {
  border-color: #f6e866;
  border-width: 2px;
}

.bookmarked-border {
  border-color: #e868e3;
  border-width: 2px;
}

/* .my-card {
  height: calc(100vh - 700px) !important;
} */

.option-card {
  border: 0.5px solid rgba(0, 0, 0, 0.26);
}

.submitButton {
  position: fixed;
  bottom: 50px;
}
</style>