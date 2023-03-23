<template>
  <div class="surface">
    <v-container fluid>
      <v-row>
        <!-- Left Card -->
        <v-col cols="3">
          <v-card :height="getHeight" id="myScroll" class="pa-4 pt-0">
            <v-card height="auto" id="circleCard" elevation="0">
              <v-card-title
                class="text-subtitle font-weight-regular accent--text testHead"
              >
                <p>{{ assessment.name }}</p>
                <span></span>
              </v-card-title>
              <v-card-subtitle>
                <span class="font-weight-light grey--text">Test Duration:</span>
                <span v-if="assessment.tests != null">
                  {{ assessment.tests[0].duration_of_assessment }} minutes</span
                >
              </v-card-subtitle>

              <v-divider class="mx-4 mt-0"></v-divider>
              <v-card-title class="pa-x pt-8 pb-0">
                <v-row justify="space-around">
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular
                      :rotate="360"
                      :size="85"
                      :width="15"
                      :value=((answeredProgress/questions.length)*100)
                      color="primary"
                    >
                      {{ answeredProgress }}
                    </v-progress-circular>
                    <v-card-subtitle class="py-2">ANSWERED</v-card-subtitle>
                  </div>
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular
                      :rotate="360"
                      :size="85"
                      :width="15"
                      :value="10"
                      color="primary"
                    >
                      10
                    </v-progress-circular>
                    <v-card-subtitle class="py-2">SKIPPED</v-card-subtitle>
                  </div>
                </v-row>
              </v-card-title>
              <v-card-title class="justify-center py-0">
                <div class="d-flex flex-column mb-6 align-center">
                  <v-progress-circular
                    :rotate="360"
                    :size="85"
                    :width="15"
                    :value="((bookmarked.length/questions.length)*100)"
                    color="primary"
                  >
                    {{ this.bookmarked.length }}
                  </v-progress-circular>
                  <v-card-subtitle class="py-2">BOOKMARK</v-card-subtitle>
                </div>
              </v-card-title>
            </v-card>
            <v-divider class="mx-4 mt-0"></v-divider>
            <v-container>
              <v-card elevation="0" id="myScroll" height="auto">
                <v-list-item-group mandatory v-model="selectedQuestion">
                  <v-list-item
                    class="grey lighten-4 pt-2"
                    v-for="(item, i) in questions"
                    :key="i"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-title
                        :class="
                          i == selectedQuestion ? 'secondary--text' : 'text'
                        "
                        ><v-icon
                          large
                          :color="item.myAnswer!=null ? 'green' : 'primary'"
                          >mdi-circle-medium</v-icon
                        >
                        <img
                          v-if="i == selectedQuestion"
                          src="../assets/Polygonpoly.png"
                          class="polyicon"
                        />
                        Question {{ i + 1 }}</v-list-item-title
                      >
                      
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
          <v-card :height="getHeight" class="d-flex flex-column">
            <v-card-title @click="$router.push('/')">
              <v-icon>mdi-close</v-icon>
            </v-card-title>
            <v-container class="px-16">
              <v-row class="pb-0 align-center text-align-center">
                <v-col cols="1" class="pa-0">
                  <v-text-field
                    label="HH"
                    readonly
                  
                    value="00"
                    outlined
                    rounded
                    class="rounded-xl centered-input mygredient"
                  >
                  </v-text-field>
                </v-col>
                <span class="pa-2 mb-5">:</span>
                <v-col cols="1" class="pa-0">
                  <v-text-field
                    label="MM"
                    value="04"
                    outlined
                    rounded
                    class="rounded-xl centered-input mygredient"
                  ></v-text-field>
                </v-col>
                <span class="pa-2 mb-5">:</span>
                <v-col cols="1" class="pa-0">
                  <v-text-field
                    label="SS"
                    value="59"
                    outlined
                    rounded
                    class="rounded-xl centered-input mygredient"
                  ></v-text-field>
                </v-col>
                <v-col cols="1" class="pr-0">
                  <span>Time Left</span>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="4" class="text-end">
                  <v-btn
                    width="150px"
                    large
                    rounded
                    color="accent"
                    class="white--text"
                    @click="submitAssessment"
                    >SUBMIT</v-btn
                  >
                </v-col>
              </v-row>

              <v-progress-linear
                class="rounded-xl"
                rounded
                :value="((selectedQuestion + 1) / questions.length) * 100"
                color="primary"
                height="25"
              ></v-progress-linear>
              <v-row justify="space-between" class="pt-2">
                <v-col>
                  <span class="text-caption"
                    >Question
                    {{ selectedQuestion + 1 + " of " + questions.length }}</span
                  >
                </v-col>
                <v-col class="text-end" v-if="questions != 0">
                  <v-chip
                    outlined
                    active
                    text-color="black"
                    color="primary"
                    active-class="secondary"
                    >{{ questions[selectedQuestion].skill.name }}</v-chip
                  >
                </v-col>
              </v-row>
            </v-container>
            <v-container class="px-16" id="myScroll">
              <v-card
                height="auto"
                color="grey lighten-4"
                elevation="0"
                class="mt-8"
                min-height="200px"
              >
                <v-card-title v-if="questions[selectedQuestion] != null"
                  >{{ questions[selectedQuestion].statement }}
                </v-card-title>
              </v-card>
              <v-card height="auto" color="surface" elevation="0" class="mt-8">
                <v-card-title>
                  <v-row v-if="questions[selectedQuestion] != null">
                    <v-btn
                      class="ma-auto my-2 text-wrap"
                      min-height="50px"
                      height="auto"
                      :color="questions[selectedQuestion].myAnswer==option.option_key ?'primary':'' "
                      v-for="(option, index) in questions[selectedQuestion]
                        .question_options"
                      :key="index"
                      @click="
                        setOption(
                          questions[selectedQuestion].question_options[index]
                        )
                      "
                    >
                      {{ option.option_value }}
                    </v-btn>
                  </v-row>
                </v-card-title>
              </v-card>
            </v-container>

            <v-spacer></v-spacer>
            <v-card elevation="0" class="px-12">
              <v-container>
                <v-card-title
                  ><v-row>
                    <v-btn
                      rounded
                      color="primary"
                      @click="previous"
                      width="100"
                      outlined
                      :disabled="selectedQuestion == 0"
                    >
                      Previous
                    </v-btn>

                    <v-btn
                      rounded
                      color="secondary"
                      :disabled="selectedQuestion == questions.length - 1"
                      @click="next"
                      width="100"
                      class="ml-8 black--text"
                    >
                      NEXT
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="!bookmarked.includes(questions[selectedQuestion])" large text color="primary" @click="bookmarkQuestion(questions[selectedQuestion])" >
                      <v-icon class="pr-2" right> mdi-bookmark-outline </v-icon>
                      BOOKMARK THIS QUESTION
                    </v-btn>
                    <v-btn v-else large text color="primary" @click="bookmarkQuestion(questions[selectedQuestion])" >
                      <v-icon class="pr-2" right> mdi-bookmark-outline </v-icon>
                      REMOVE BOOKMARK
                    </v-btn>
                  </v-row></v-card-title
                >
              </v-container>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="successDialog" max-width="366px" persistent>
      <v-card>
        <v-container fluid class="pa-8">
          <v-card-text class="text-center">
            <v-icon color="success" size="96">mdi-check-circle-outline</v-icon>
            <p class="text-h5 py-4">Assessment Submitted Successfully</p>
            <v-btn class="primary" large width="157px" rounded @click="()=>{
              successDialog = false;
              $router.push('/');
            }">OK</v-btn>
          </v-card-text>
        </v-container>
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
      successDialog: false,
      windowHeight: window.innerHeight,
      selectedQuestion: 0,
      power: 25,
      screening: [],
      assessment: {},
      questions: [],
      response: {},
      bookmarked: [],
      answeredProgress: 0,
      skippedProgress: 0,
      bookmarkedProgress: 0,
    };
  },
  computed: {
    getHeight() {
      return this.windowHeight - 30 + "px";
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
    bookmarkQuestion(question) {
      if (!this.bookmarked.includes(question)) {
        this.bookmarked.push(question);
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
      if(response.data.success){
        this.successDialog=true;
      }
    },
    setOption(option) {
      this.questions[this.selectedQuestion].myAnswer = option.option_key;
      console.log(this.questions[this.selectedQuestion]);
      this.updateProgress();
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
      console.log("response: ", this.assessment);
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
</style>