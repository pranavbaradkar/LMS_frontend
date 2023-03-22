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
                <span v-if="assessment.tests!=null"> {{ assessment.tests[0].duration_of_assessment }} minutes</span>
              </v-card-subtitle>

              <v-divider class="mx-4 mt-0"></v-divider>
              <v-card-title class="pa-x pt-8 pb-0">
                <v-row justify="space-around">
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular
                      :rotate="360"
                      :size="85"
                      :width="15"
                      :value="1"
                      color="primary"
                    >
                      01
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
                    :value="50"
                    color="primary"
                  >
                    50
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
                    v-for="(item, i) in screening.questions"
                    :key="i"
                  >
                    <v-list-item-content class="py-0">
                      <v-list-item-title
                      :class="i==selectedQuestion?'secondary--text':'text'"
                        ><v-icon
                          large
                          :color="i == selectedQuestion ? 'green' : 'primary'"
                          >mdi-circle-medium</v-icon
                        >
                       Question {{ i+1}}</v-list-item-title
                      >
                      <v-divider class="mt-2 mb-1"></v-divider>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-card>
            </v-container>
          </v-card>
        </v-col>
        <!-- Right Card -->
        <v-col cols="9" class="pl-0">
          <v-card :height="getHeight" class="d-flex flex-column">
            <v-card-title>
              <v-icon>mdi-close</v-icon>
            </v-card-title>
            <v-container class="px-16">
              <v-row class="pb-0 align-center">
                <v-col cols="1" class="pr-0 pb-0">
                  <v-text-field
                    label="HH"
                    value="00"
                    outlined
                    rounded
                    class="rounded-xl centered-input"
                  ></v-text-field>
                </v-col>
                <span class="pa-2 pr-0">:</span>
                <v-col cols="1" class="pr-0 pb-0">
                  <v-text-field
                    label="MM"
                    value="04"
                    outlined
                    rounded
                    class="rounded-xl centered-input"
                  ></v-text-field>
                </v-col>
                <span class="pa-2 pr-0">:</span>
                <v-col cols="1" class="pr-0 pb-0">
                  <v-text-field
                    label="SS"
                    value="59"
                    outlined
                    rounded
                    class="rounded-xl centered-input"
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
                    >SUBMIT</v-btn
                  >
                </v-col>
              </v-row>

              <v-progress-linear
                class="rounded-xl"
                rounded
                v-model="power"
                color="primary"
                height="25"
              ></v-progress-linear>
              <v-row justify="space-between" class="pt-2">
                <v-col>
                  <span class="text-caption">Question 02 of 11</span>
                </v-col>
                <v-col class="text-end">
                  <v-chip
                    outlined
                    active
                    text-color="black"
                    color="primary"
                    active-class="secondary"
                    >IQ</v-chip
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
              >
                <v-card-title v-if="selectedQuestion!=null"
                  >{{ screening.questions[selectedQuestion].statement }}
                </v-card-title>
              </v-card>
              <v-card height="auto" color="surface" elevation="0" class="mt-8">
                <v-card-title>
                  <v-row v-if="selectedQuestion!=null">
                    <v-btn  class="ma-auto my-2 text-wrap"  min-height="50px" height="auto" v-for="(option,index) in screening.questions[selectedQuestion].question_options" :key="index">

                    
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
                      @click="e1 = 2"
                      width="100"
                      outlined
                    >
                      Previous
                    </v-btn>

                    <v-btn
                      rounded
                      color="secondary"
                 
                      @click="e1 = 2"
                      width="100"
                      class="ml-8 black--text"

                    >
                      NEXT
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn large text color="primary">
                      <v-icon class="pr-2" right> mdi-bookmark-outline </v-icon>
                      BOOKMARK THIS QUESTION
                    </v-btn>
                  </v-row></v-card-title
                >
              </v-container>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import "../styles.css";
import AssessmentsController from "../controllers/AssessmentsController";
import RecommendedAssessmentController from "../controllers/RecommendedAssessmentController";
export default {
  name: "AssessmentView",
  data() {
    return {
      windowHeight: window.innerHeight,
      selectedQuestion: null,
      power: 25,
      screening:{},
      assessment:{},
      questions: [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
        "Question 6",
        "Question 7",
        "Question 8",
        "Question 9",
        "Question 10",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
        "Question 11",
      ],
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
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    async getAssessmentInfo(){
      const response = await AssessmentsController.getSingleAssessment();
      const response2 = await RecommendedAssessmentController.getRecommendedAssessment();
      this.assessment=response2.data.data;
      this.screening=response.data.data[0];
      console.log("response: ", this.screening);
    }
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