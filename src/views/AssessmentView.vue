<template>
  <div class="surface">
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
                  {{ assessment.tests[0].duration_of_assessment }} minutes</span>
              </v-card-subtitle>

              <v-divider class="mx-4 mt-0"></v-divider>
              <v-card-title class="pa-x pt-8 pb-0">
                <v-row justify="space-around">
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15"
                      :value=((answeredProgress/questions.length)*100) color="answered
                        ">
                      <h4 class="black--text">{{answeredProgress }}</h4>
                    </v-progress-circular>
                    <v-card-subtitle class="py-2">ANSWERED</v-card-subtitle>
                  </div>
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15"  :value="((skipped.length / questions.length) * 100)" color="skipped" >
                      <h4 class="black--text">{{ this.skipped.length }}</h4>

                    </v-progress-circular>
                    <v-card-subtitle class="py-2">SKIPPED</v-card-subtitle>
                  </div>
                </v-row>
              </v-card-title>
              <v-card-title class="justify-center py-0">
                <div class="d-flex flex-column mb-6 align-center">
                  <v-progress-circular :rotate="360" :size="85" :width="15"
                    :value="((bookmarked.length / questions.length) * 100)" color="bookmarked">
                    <h4 class="black--text">{{ this.bookmarked.length }}</h4>

                  </v-progress-circular>
                  <v-card-subtitle class="py-2">BOOKMARK</v-card-subtitle>
                </div>
              </v-card-title>
            </v-card>
            <v-divider class="mx-4 mt-0"></v-divider>
            <v-container>
              <v-card elevation="0" id="myScroll" height="auto">
                <v-list-item-group mandatory v-model="selectedQuestion">
                  <v-list-item class="grey lighten-4 pt-2" v-for="(item, i) in questions" :key="i">
                    <v-list-item-content class="py-0">
                      <v-list-item-title :class="
                        i == selectedQuestion ? 'primary--text font-weight-regular' : 'font-weight-light'
                      "><v-icon large :color="getColor(item)">mdi-circle-medium</v-icon>
                        <img v-if="i == selectedQuestion" src="../assets/Polygonpoly.png" class="polyicon" />
                        Question {{ i + 1 }}</v-list-item-title>

                      <v-divider class="mt-2 mb-1"></v-divider>
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
            <v-card-title @click="$router.push('/')" class="pb-0">
              <v-icon>mdi-close</v-icon>
            </v-card-title>
            <v-container class="px-16">
              <v-row class="align-center text-align-center px-2 pb-8">
                <v-card class="pa-0" width="70" elevation="0">
                  <v-text-field hide-details="" label="HH" readonly value="00" outlined rounded
                    class="rounded-xl centered-input mygredient">
                  </v-text-field>
                </v-card>
                <span class="pa-2 mb-5">:</span>
                <v-card class="pa-0" width="70" elevation="0">
                  <v-text-field hide-details="" label="MM" readonly value="00" outlined rounded
                    class="rounded-xl centered-input mygredient">
                  </v-text-field>
                </v-card>
                <span class="pa-2 mb-5">:</span>
                <v-card class="pa-0" width="70" elevation="0">
                  <v-text-field hide-details="" label="SS" readonly value="00" outlined rounded
                    class="rounded-xl centered-input mygredient">
                  </v-text-field>
                </v-card>
                <v-col cols="2" class="pr-0">
                  <span>Time Left</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4" class="text-end">
                  <v-btn width="150px" height="48px" rounded color="accent" class="white--text"
                    @click=" summaryDialog = true;">SUBMIT</v-btn>
                </v-col>
              </v-row>

              <v-progress-linear class="rounded-xl mt-4 mb-6" rounded
                :value="((answeredProgress+skipped.length+bookmarked.length)/ questions.length) * 100" color="secondary" background-color="grey lighten-2"
                height="25"></v-progress-linear>
              <v-row justify="space-between" class="pt-2">
                <v-col>
                  <span class="text-caption">Question
                    {{ selectedQuestion + 1 + " of " + questions.length }}</span>
                </v-col>
                <v-col class="text-end" v-if="questions != 0">
                  <v-chip outlined active text-color="black" color="primary" active-class="secondary">{{
                    questions[selectedQuestion].skill.name }}</v-chip>
                </v-col>
              </v-row>
            </v-container>

            <v-container class="px-16 " id="myScroll">
              <v-card class="my-card pa-0 mt-2 rounded-xl" elevation="0">
                <v-card height="auto" elevation="0"  color="grey lighten-4" min-height="192px">
                 <v-card-title v-if="questions[selectedQuestion] != null">{{ questions[selectedQuestion].statement }}
                  </v-card-title>
              </v-card>
            </v-card>

              <v-card height="auto" color="surface" elevation="0" class="mt-8 rounded-xl">
                <v-card-title>
                  <v-row v-if="questions[selectedQuestion] != null" justify="center">
                    <v-btn class="ma-2 text-wrap" min-height="50px" height="auto"
                      :color="questions[selectedQuestion].myAnswer == option.option_key ? 'secondaryAccent' : ''" v-for="(option, index) in questions[selectedQuestion]
                        .question_options" :key="index" @click="
                          setOption(
                            questions[selectedQuestion].question_options[index]
                          )
                        ">
                      {{ option.option_value }}
                    </v-btn>
                  </v-row>
                </v-card-title>
              </v-card>
            </v-container>

            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-card elevation="0" class="px-12 mb-2 mt-4">
              <v-container>
                <v-card-title><v-row>
                    <v-btn rounded color="primary" @click="previous" width="120px" height="36px" outlined
                      :disabled="selectedQuestion == 0">
                      Previous
                    </v-btn>

                    <v-btn rounded color="secondary" :disabled="selectedQuestion == questions.length - 1" @click="next"
                      width="120px" height="36px" class="ml-8 black--text">
                      NEXT
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="!bookmarked.includes(questions[selectedQuestion])" large text color="primary"
                      @click="bookmarkQuestion(questions[selectedQuestion])">
                      <v-icon class="pr-2" right> mdi-bookmark-outline </v-icon>
                      BOOKMARK
                    </v-btn>
                    <v-btn v-else large text color="primary" @click="bookmarkQuestion(questions[selectedQuestion])">
                      <v-icon class="pr-2" right> mdi-bookmark-outline </v-icon>
                      REMOVE BOOKMARK
                    </v-btn>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn text large color="primary" v-bind="attrs" v-on="on" @click="skipQuestion(questions[selectedQuestion])">
                          >> SKIP
                        </v-btn>
                      </template>
                      <span>Skip this question if you do not know the answer</span>
                    </v-tooltip>
                  </v-row></v-card-title>
              </v-container>
            </v-card>
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
              $router.push('/');
            }">OK</v-btn>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- Test Summary Dialog -->
    <v-dialog v-model="summaryDialog" fullscreen persistent>
      <v-card>
        <v-card>
          <v-card-title>Test Summary</v-card-title>
          <v-card-subtitle>{{ assessment.name }}</v-card-subtitle>
        </v-card>

          <v-row justify="center">
            <v-col cols="4" >
              <v-card-text class="text-center">
                <v-card-title class="justify-center py-0">
                <div class="d-flex flex-column mb-6 align-center">
                  <v-progress-circular :rotate="360" :size="120" :width="15"
                      :value=((answeredProgress/questions.length)*100) color="answered
                        ">
                      <h4 class="black--text">{{answeredProgress }}</h4>
                    </v-progress-circular>
                    <v-card-subtitle class="py-2">ANSWERED</v-card-subtitle>
                </div>
              </v-card-title>
            <v-card-title class="pa-x pt-8 pb-0">
                <v-row justify="space-around">
                  <div class="d-flex flex-column mb-6 align-center">



                    <v-progress-circular :rotate="360" :size="85" :width="15"
                    :value="((bookmarked.length / questions.length) * 100)" color="bookmarked">
                    <h4 class="black--text">{{ this.bookmarked.length }}</h4>

                  </v-progress-circular>
                  <v-card-subtitle class="py-2">BOOKMARK</v-card-subtitle>



                    
                  </div>
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15"  :value="((skipped.length / questions.length) * 100)" color="skipped" >
                      <h4 class="black--text">{{ this.skipped.length }}</h4>

                    </v-progress-circular>
                    <v-card-subtitle class="py-2">SKIPPED</v-card-subtitle>
                  </div>
                </v-row>
              </v-card-title>
              
          </v-card-text>
     
          
            </v-col>
          </v-row>
          
     
          <v-card elevation="0" width="100%" class="submitButton text-center">
           <v-btn color="secondary" class="black--text" width="249px" rounded x-large @click="submitAssessment">SUBMIT</v-btn>

         </v-card>
    
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import "../styles.css";
import AssessmentsController from "../controllers/AssessmentsController";
import RecommendedAssessmentController from "../controllers/RecommendedAssessmentController";
import Vue from "vue";
export default {
  name: "AssessmentView",
  data() {
    return {
      summaryDialog: false,
      successDialog: false,
      windowHeight: window.innerHeight,
      selectedQuestion: 0,
      power: 25,
      screening: [],
      assessment: {},
      questions: [],
      response: {},
      bookmarked: [],
      skipped: [],
      answeredProgress: 0,
      skippedProgress: 0,
      bookmarkedProgress: 0,
    };
  },
  computed: {
    getHeight() {
      return this.windowHeight - 40 + "px";
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
    getColor(item) {
      if (this.bookmarked.includes(item)) {
        return "bookmarked";
      } else if (this.skipped.includes(item)) {
        return "skipped";
      } else if (item.myAnswer != null) {
        return "answered";
      }
    },
    bookmarkQuestion(question) {
      if (!this.bookmarked.includes(question)) {
        this.bookmarked.push(question);
        console.log(this.questions[this.selectedQuestion]);
        if (this.skipped.includes(question)) {
          let index = this.bookmarked.indexOf(question);
          this.skipped.splice(index, 1);
        }
      } else {
        let index = this.bookmarked.indexOf(question);
        this.bookmarked.splice(index, 1);
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
      console.log(response);
      if (response.data.success) {
        this.successDialog = true;
      }
    },
    setOption(option) {
      this.questions[this.selectedQuestion].myAnswer = option.option_key;
      console.log(this.questions[this.selectedQuestion]);
      if (this.skipped.includes(this.questions[this.selectedQuestion])) {
        let index = this.bookmarked.indexOf(
          this.questions[this.selectedQuestion]
        );
        this.skipped.splice(index, 1);
      }
      this.updateProgress();
    },
    skipQuestion(question) {
      if (!this.skipped.includes(question)) {
        this.skipped.push(question);
        this.next();
        console.log(this.questions[this.selectedQuestion]);
      }
    },
    next() {
      this.selectedQuestion = this.selectedQuestion + 1;
    },
    previous() {
      this.selectedQuestion = this.selectedQuestion - 1;
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    async getAssessmentInfo() {
      const response = await AssessmentsController.getSingleAssessment();
      const response2 =
        await RecommendedAssessmentController.getRecommendedAssessment();
      this.assessment = response2.data.data;
      this.screening = response.data.data;
      this.screening.forEach((element) => {
        this.questions.push(...element.questions);
      });
      //console.log("response: ", this.assessment);
    },
  },
  created() {
    this.getAssessmentInfo();
  },
};
</script>
<style scoped>
.v-list-item {
  min-height: 32px;
}
.my-card {
  border: 1px solid rgba(175, 175, 175, 0.342);
}
.submitButton{
  position:fixed;
  bottom: 50px;
}
</style>