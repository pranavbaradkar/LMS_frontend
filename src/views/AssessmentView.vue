<template>
  <div class="surface">
    <v-container fluid>
      <v-row>
      







        <!-- Left Card -->
        <v-col cols="3" class="p-0 pe-0 ps-0 col-23">
          <v-card v-if="!isProgressClicked"  variant="tonal" class="left-container elevation-0 surface"  :height="getHeight">
            <v-card-title class="pb-0 question-title" ><span>{{ assessment.name }}</span></v-card-title>
            <v-card-title class="question-heading">Question Listing</v-card-title>

            <div class="legend-flag">
              <div class="legend-contain">
                <span class="icon answered-bg me-2"></span>
                <span class="label">Answered</span>
              </div>
              <div class="legend-contain">
                <span class="icon skipped-bg  me-2"></span>
                <span class="label">Skipped</span>
              </div>
              <div class="legend-contain">
                <span class="icon bookmark-bg  me-2"></span>
                <span class="label">Bookmark</span>
              </div>
            </div>


            <!-- <v-card min-height="280" id="circleCard" elevation="0">
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
                  {{  formatTime(durationOfAssessment) }} </span>
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
                    <v-card-subtitle class="py-2 font-size-13">ANSWERED</v-card-subtitle>
                  </div>
                  <div class="d-flex flex-column mb-6 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15"
                      :value="((skipped.length / questions.length) * 100)" color="skipped"
                      @click="openProgressList('Skipped')">
                      <h4 class="black--text">{{ this.skipped.length }}</h4>
                    </v-progress-circular>
                    <v-card-subtitle class="py-2 font-size-13">SKIPPED</v-card-subtitle>
                  </div>
                  <div class="d-flex flex-column mb-2 align-center">
                    <v-progress-circular :rotate="360" :size="85" :width="15"
                      :value="((bookmarked.length / questions.length) * 100)" color="bookmarked"
                      @click="openProgressList('Bookmark')">
                      <h4 class="black--text">{{ this.bookmarked.length }}</h4>
                    </v-progress-circular>
                    <v-card-subtitle class="py-2 font-size-13">BOOKMARK</v-card-subtitle>
                  </div>
                </v-row>
              </v-card-title>
            </v-card> -->
           
            <v-container class="py-0 my-0 scroll-y"  >
              <v-card elevation="0" class="surface" :height="getLeftHeight" :minHeight="getLeftHeight">
                <!-- need to set height of this card for set  good scroll -->
                <v-list-item-group mandatory v-model="selectedQuestion" class="d-flex flex-wrap justify-content-between" >
                  
                  <v-list-item  v-for="(item, i) in questions" :key="i"
                    class="question-selection-box me-2 mt-3 lighten-4 pt-2 pb-2"
                    :class="`${getColorBg(item)} ${i == selectedQuestion ? 'v-item--active v-list-item--active' : ''}`"
                    @click="questionClicked(item)">
                    
                    <v-list-item-content class="py-0" :id="scrollId + '' + i">
                      <v-list-item-title :border="false" class="question-box-font text-center" :class="
                        `${i == selectedQuestion ? 'primary--text' : ''}`
                      ">
                        <!-- <v-icon large :color="getColor(item)">mdi-circle-medium</v-icon>
                        <img v-if="i == selectedQuestion" src="../assets/Polygonpoly.png" class="polyicon" /> -->
                        Q{{ i + 1 }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <!-- <v-list-item-action v-if="bookmarked.includes(item)">
                      <v-icon color="primary">
                        mdi-bookmark
                      </v-icon>
                    </v-list-item-action> -->
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

                  <v-list-item class="question-selection-box grey lighten-4 pt-2" v-for="(item, i) in progressList" :key="i" v-on:click="setSelectedQuestionFromProgress(item)"
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
        <v-col cols="7" class="pl-0 col-55 pe-0" elevation="0" >

          <v-card v-if="screening.length != 0" :height="getHeight" elevation="0" class="d-flex my-0 mr-2 me-0  border-with-color flex-column rounded">
           
            <v-card class="mx-3 my-3  border-with-color"  elevation="0" color="grey lighten-4">
              <div class="d-flex align-center pt-2 px-3" justify="space-between" align="center" >
                <v-col class="py-0  px-0 text-left">
                  <span class="text-caption ">Question
                    {{ selectedQuestion + 1 + " of " + questions.length }}</span>
                </v-col>
                <v-col class="text-end  px-0 py-0" v-if="questions != 0">
                  <v-chip v-if="questions[selectedQuestion].skill.name=='Core Skill'" active text-color="white" class="m-q-chip fs-12">{{
                  questions[selectedQuestion].subject.name }}</v-chip>
                  <v-chip v-else active text-color="black" class="m-q-chip fs-12">{{
                    questions[selectedQuestion].skill.name }}</v-chip>
                </v-col>
              </div>
              <v-card  elevation="0" class="px-2 py-2 mt-0 maincontainer-question" :height="questionsListHeight" color="grey lighten-4" id="myScroll">
                <div class="my-card pa-0 question-details"  color="grey lighten-4" >
                  <v-card height="auto" min-height="247" class="p-0 px-0" elevation="0" color="grey lighten-4" >
                    <v-card-title class="pt-1 pl-1 px-0" v-if="questions[selectedQuestion] != null"> 
                      <div class="application-statement" v-html="questions[selectedQuestion].statement"></div>
                    </v-card-title>
                    <v-card-subtitle  class="px-0">
                      <video id="video-option" v-if="questions[selectedQuestion].mime_type.includes('video')"  height="180"  controls controlsList="nodownload nofullscreen" disablePictureInPicture>
                      <source :src=questions[selectedQuestion].s3_asset_urls :type="questions[selectedQuestion].mime_type" >
                      Your browser does not support the video tag.
                      </video>
                      <audio id="audio-option" v-if="questions[selectedQuestion].mime_type.includes('audio')"  controls controlsList="nodownload nofullscreen">
                      <source :src=questions[selectedQuestion].s3_asset_urls  :type="questions[selectedQuestion].mime_type">
                      Your browser does not support the audio tag.
                      </audio>

                        <v-img  class="mt-4" v-if="questions[selectedQuestion].mime_type.includes('image')" :src=questions[selectedQuestion].s3_asset_urls  alt="Girl in a jacket" width="300" height="200">
                          <v-btn icon rounded @click="zoomOutFun(questions[selectedQuestion].s3_asset_urls)" class="zoom-out rounded-xl" >
                                <v-icon size="20px"> mdi-arrow-expand </v-icon>
                              </v-btn>
                        </v-img>
                    </v-card-subtitle>
                  </v-card>
                </div>
              </v-card>

            </v-card>
            <div id="optionHeight">
              <v-container class="px-0 option-box">
                <!-- Question Block -->

                <!-- <v-spacer></v-spacer> -->
                <!-- Options Card -->
                <v-card v-if="questions[selectedQuestion].question_type != 'MATCH_THE_FOLLOWING'" class="option-card mt-0 rounded w-100 float-bottom px-3" elevation="0" >
                  <v-card height="auto"  elevation="0" color="grey lighten-4" class="border-with-color">
                    <v-card-title v-if="questions[selectedQuestion] != null" 
                      class="d-flex w-100 px-2 py-0 flex-row justify-space-around"
                      :class="questions[selectedQuestion].question_options[0].option_type == 'TEXT' ? 'flex-column' : ''"
                      >
                      <v-radio-group v-if="this.questions[this.selectedQuestion].question_type != 'MULTIPLE_CHOICE'"  class="w-100 radioGroup" inline v-model="questions[selectedQuestion].myAnswer" >
                        <v-card elevation="0" height="auto"   class="overflow-hidden white my-1 mx-1 border-with-color has-selected" 
                              v-for="(option, index) in questions[selectedQuestion].question_options" :key="index"
                              :class="questions[selectedQuestion].question_options[index].option_type == 'TEXT' ? 'w-100' : 'option-width'"
                                >                                
                                <v-card @click="
                                        setOption(
                                          questions[selectedQuestion].question_options[index]
                                        )
                                      " elevation="0" height="50px" width="100%" v-if="option.option_type=='TEXT'" class="px-4 w-100 d-flex justify-start cursor sub-text-option" :class="questions[selectedQuestion].myAnswer == option.option_key || (Array.isArray(questions[selectedQuestion].myAnswer) && questions[selectedQuestion].myAnswer.indexOf(option.option_key) >= 0) ? 'secondaryPrimaryAccent' : ''" >
                                    
                                      <v-radio readonly class="my-0" :value="questions[selectedQuestion].question_options[index].option_key"></v-radio> <div class="application-statement" v-html="option.option_value"></div>
                                </v-card>
                                <v-card elevation="0"  height="100%" width="100%"  v-else-if="option.option_type =='IMAGE'" class="px-4 w-100 d-flex justify-start cursor sub-text-option" :class="questions[selectedQuestion].myAnswer == option.option_key || (Array.isArray(questions[selectedQuestion].myAnswer) && questions[selectedQuestion].myAnswer.indexOf(option.option_key) >= 0) ? 'secondaryPrimaryAccent' : '' ">
                                  <div class="option-left" @click="
                                        setOption(
                                          questions[selectedQuestion].question_options[index]
                                        )
                                      ">
                                      <v-radio readonly class="my-0 image-radio" :value="questions[selectedQuestion].question_options[index].option_key" ></v-radio> <img  class="my-2" height="80px" width="auto" type="image" :src="option.option_value" alt="Image not found">
                                  </div>
                                  
                                    <v-btn @click="zoomOutFun(option.option_value)" class="zoom-out" icon>
                                      <v-icon size="20px"> mdi-arrow-expand </v-icon>
                                    </v-btn>
                                </v-card>
                        </v-card>
                      </v-radio-group>

                      <v-card elevation="0" height="auto" v-else class="overflow-hidden white my-1 mx-1 border-with-color has-selected" 
                              v-for="(option, index) in questions[selectedQuestion].question_options" :key="index"
                              :class="questions[selectedQuestion].question_options[index].option_type == 'TEXT' ? 'w-100' : 'option-width'"
                                >
                                
                                <v-card @click="
                                        setOption(
                                          questions[selectedQuestion].question_options[index]
                                        )
                                      " elevation="0" height="50px" width="100%" v-if="option.option_type=='TEXT'" class="px-4 w-100 d-flex justify-start cursor sub-text-option" :class="questions[selectedQuestion].myAnswer == option.option_key || (Array.isArray(questions[selectedQuestion].myAnswer) && questions[selectedQuestion].myAnswer.indexOf(option.option_key) >= 0) ? 'secondaryPrimaryAccent' : ''" >
                                    
                                      <v-checkbox readonly :input-value="questions[selectedQuestion].myAnswer == option.option_key || (Array.isArray(questions[selectedQuestion].myAnswer) && questions[selectedQuestion].myAnswer.indexOf(option.option_key) >= 0)"></v-checkbox> <div class="application-statement" v-html="option.option_value"></div>
                                </v-card>
                                <v-card elevation="0"  height="100%" width="100%"  v-else-if="option.option_type =='IMAGE'" class="px-4 w-100 d-flex justify-start cursor sub-text-option" :class="questions[selectedQuestion].myAnswer == option.option_key || (Array.isArray(questions[selectedQuestion].myAnswer) && questions[selectedQuestion].myAnswer.indexOf(option.option_key) >= 0) ? 'secondaryPrimaryAccent' : '' ">
                                  <div class="option-left" @click="
                                        setOption(
                                          questions[selectedQuestion].question_options[index]
                                        )
                                      ">
                                      <v-checkbox readonly class="image-radio" :input-value="questions[selectedQuestion].myAnswer == option.option_key || (Array.isArray(questions[selectedQuestion].myAnswer) && questions[selectedQuestion].myAnswer.indexOf(option.option_key) >= 0)"></v-checkbox> <img  class="my-2" height="80px" width="auto" type="image" :src="option.option_value" alt="Image not found">
                                  </div>
                                  
                                    <v-btn @click="zoomOutFun(option.option_value)" class="zoom-out" icon>
                                      <v-icon size="20px"> mdi-arrow-expand </v-icon>
                                    </v-btn>
                                </v-card>
                      </v-card>
                    </v-card-title>
                  </v-card>
                </v-card>

                <v-card v-if="questions[selectedQuestion].question_type == 'MATCH_THE_FOLLOWING'" class="option-card mt-0 rounded w-100 float-bottom px-3" elevation="0" >
                  <v-card height="auto"  elevation="0" color="grey lighten-4" class="border-with-color">
                  <v-card-title>
                  <v-row>
                    <v-col cols="4" class="pa-2">
                      <v-card elevation="0" :style="{'background-color': ifOptionSelected(option) ? mtfQuestions.mathOptionColors[bColorIndex(option)]: ''}" @click="selectMtfKey(questions[selectedQuestion].question_options[index])" v-for="(option, index) in questions[selectedQuestion].question_options" :key="index" class="mb-2 d-flex justify-center pa-2 border-with-color">
                        <div style="font-size: 16px">{{ option.option_value }}</div>
                      </v-card>
                    </v-col>
                    <v-col cols="7" class="pa-2">
                      <v-card
                      :style="{'background-color': ifAnswerSelected(answer) ? mtfQuestions.mathOptionColors[findIndexOfValue(answer.answer_key)]: ''}"
                      @click="setOption(
                                        questions[selectedQuestion].question_mtf_answers[index]
                                      )" 
                      v-for="(answer, index) in questions[selectedQuestion].question_mtf_answers" :key="index" class="mb-2 d-flex justify-center pa-2 border-with-color">
                      <div style="font-size: 16px">{{ answer.answer_value }}</div>
                      </v-card>
                    </v-col>
                    <v-col cols="1" class="pt-0 d-flex flex-row justify-center align-end">
                      <v-btn fab small class="mb-0" elevation="0" @click="resetMTF">
                        <v-icon>
                          mdi-restore
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-title>
                </v-card>
                </v-card>

              </v-container>
              
              <v-card elevation="0" class="px-2">
                <v-container class="px-0 py-0">
                  <v-card-title><v-row class="d-flex flex-row justify-space-between">
                      <div>
                        <v-btn color="default" @click="previous"  elevation="0"  width="120px" height="36px"
                          :disabled="selectedQuestion == 0" class="icon-space">
                          <v-icon
                            size="small"
                            start
                          >mdi-arrow-left</v-icon>
                          Previous
                        </v-btn>

                        <v-btn :disabled="
                        !(
        (!this.isObject(this.questions[this.selectedQuestion].myAnswer) && this.questions[this.selectedQuestion].myAnswer != null)
        || this.bookmarked.includes(this.questions[this.selectedQuestion]) 
        || (this.isObject(this.questions[this.selectedQuestion].myAnswer) && Object.keys(this.questions[this.selectedQuestion].myAnswer).length === this.questions[this.selectedQuestion].question_options.length)
        )" 
                        v-if="selectedQuestion == questions.length - 1"
                          color="secondPrimary" @click="confirmSubmission = true" height="36px" class="ml-4 white--text mr-0">
                          Proceed & Submit
                        </v-btn>
                        <v-btn v-else color="secondPrimary" elevation="0" :disabled=" 
                        !(
        (!this.isObject(this.questions[this.selectedQuestion].myAnswer) && this.questions[this.selectedQuestion].myAnswer != null)
        || this.bookmarked.includes(this.questions[this.selectedQuestion]) 
        || (this.isObject(this.questions[this.selectedQuestion].myAnswer) && Object.keys(this.questions[this.selectedQuestion].myAnswer).length === this.questions[this.selectedQuestion].question_options.length)
        )" 
                          @click="next"  width="120px"
                          height="36px" class="ml-4 mr-0 white--text icon-space">
                         
                          NEXT   <v-icon
                            size="small"
                            start
                          >mdi-arrow-right</v-icon>
                        </v-btn>
                      </div>


                      <div>
                        <v-tooltip bottom v-if="!bookmarked.includes(questions[selectedQuestion])">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn large text color="primary"  class="ml-0" :disabled="isTimeUp" v-bind="attrs" v-on="on"
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
                            <v-btn text large color="textButton" v-bind="attrs" v-on="on" :disabled="isTimeUp"
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
            </div>
          </v-card>

          <v-card v-else class="d-flex flex-column justify-center align-center my-2 mr-2 rounded-xl" :height="getHeight">
            <v-card-title>
              No Questions Data Found!
            </v-card-title>
            <v-card-title @click="$router.back()" class="pb-0">
              <v-btn rounded color="primary" class="black--text" width="250">Return To Home</v-btn>
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="2" class="p-0 col-22 right-container">
          <!-- <v-row class="d-flex px-4 py-4"> -->
            <!-- <v-col class="px-0 py-0"> -->
              <v-btn variant="tonal" height="48" elevation="0" block class="white--text exit-text font-size-14" @click="confirmExitDialog = true">Exit Test</v-btn>

              <!-- Timer -->
              <v-row cols="12" :border="1" class="align-center text-align-center mt-4 px-3 pb-4 ">

              <v-card class="d-flex align-center w-100 pa-0 timer border rounded timer-border" elevation="0">
                <div class="pr-1">Timer</div>
                <div class="time hour pr-2"><span class="pe-1 text-h4">{{ hours }}</span><span class="text-subtitle-1">hh</span></div>
                <div class="time min pr-2"><span class="pe-1 text-h4">{{ mins }}</span><span class="text-subtitle-1">mm</span></div>
                <div class="time sec"><span class="pe-1 text-h4 ">{{ secs }}</span><span class="text-subtitle-1">ss</span></div>
              </v-card>


              <div class="procting" >
                <video id="videoElement" class="rounded" autoplay></video>
              </div>

              <!-- Submit Button -->

              </v-row>
            <!-- </v-col> -->

            <v-btn  variant="tonal" elevation="0" block height="48px" class="w-100 submit-btn white--text" @click="confirmSubmission = true">Submit Test</v-btn>
            <!-- Progress Bar -->
          <!-- </v-row> -->
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
            <v-card :height="getHeight" id="myScroll" class="pa-4 ma-2 pt-0 rounded-xl left-container">
              <v-card height="auto" id="circleCard" elevation="0">
                <v-card-title class="text-subtitle font-weight-regular accent--text testHead">
                  <p>{{ assessment.name }}</p>
                  <span></span>
                </v-card-title>
                <v-card-subtitle>
                  <span class="font-weight-light grey--text">Test Duration:</span>
                  <span v-if="assessment.tests != null">
                    {{ formatTime(durationOfAssessment) }}</span>
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
            <v-card :height="getHeight" class="d-flex my-2 mr-2  flex-column rounded-xl ">
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
                    <v-btn color="accent" width="249px" height="48px" rounded x-large @click="submitAssessment">CONFIRM SUBMISSION</v-btn>
                  </v-row>
                </v-card-title>

              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
    <v-dialog v-model="zoomOutBool" max-width="600px"  persistent>
      <v-card>
        <v-container fluid >
          <v-card-text class="text-center">
            <v-btn class="zoom-out" icon @click="zoomOutBool = false"><v-icon>mdi-close</v-icon></v-btn>
            <input  height="350px" width="350px" type="image" :src="zoomOutImageUrl" alt="Image not found">
          </v-card-text>
        </v-container>
      </v-card>
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
            <p class="text-h5 mb-5"><strong>Are you sure you want to quit?</strong></p>
          
            <div class="d-flex justify-space-between w-100">
              <v-btn
                color="#DADADA"
                depressed
                class="black--text mt-5 mb-5 me-2 w-50"
                large
                @click="confirmExitDialog = false"
                >NO</v-btn
              >
              <v-btn
                color="#277BC0"
                depressed
                class="white--text mt-5 mb-5 w-50"
                large
                @click="$router.back()"
                >YES</v-btn
              >
            </div>

          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirmSubmission" width="358px" persistent>
      <v-card>
        <v-container>
          <v-card-text class="text-center">
            <!-- <v-icon color="error" size="96">mdi-close-circle-outline</v-icon> -->
            <p class="text-h5 mb-0"><strong>Are you sure, you want to submit your assessment.</strong></p>
            <div class="d-flex justify-space-between w-100">
              <v-btn
                color="#DADADA"
                depressed
                class="black--text mt-5 mb-5 me-2 w-50"
                large
                @click="confirmSubmission = false"
                >NO</v-btn
              >
              <v-btn
                color="#277BC0"
                depressed
                class="white--text mt-5 mb-5 w-50"
                large
                @click="submitAssessment"
                >YES</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="genericDialog" width="450px" persistent>
      <v-card>
        <v-container>
          <v-card-text class="text-center">
            <!-- <v-icon color="error" size="96">mdi-close-circle-outline</v-icon> -->
            <p class="text-h6 mb-0">Candidate can't switch the tab or minimize, use copy and paste, ESC and other voilation activtity during exam.</p>
            <div class="d-flex justify-space-between w-100">
              <div
                class="black--text mt-5 mb-5 me-2 w-50"
                ></div
              >
              <v-btn
                color="#277BC0"
                depressed
                class="white--text mt-5 mb-5 me-2 w-50"
                large
                @click="genericDialog = false"
                >Continue</v-btn
              >
            </div>
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
import "./style/assessment-view.css";
export default {
  name: "AssessmentView",
  data() {
    return {
      assetType: "",
      testType: "",
      assessmentId: "",
      confirmExitDialog: false,
      confirmSubmission: false,
      genericDialog: false,
      errorDialog: false,
      errorMessage: "Failed",
      hours: "00",
      mins: "00",
      secs: "00",
      seconds: 800,
      durationOfAssessment:0,
      lastAnswerTime: null,
      timerId: null,
      isProgressClicked: false,
      summaryDialog: false,
      successDialog: false,
      windowHeight: window.innerHeight,
      optionHeight: 270,
      questionsListHeight: "270px",
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
      zoomOutBool: false,
      zoomOutImageUrl: "",
      mtfQuestions: {
        mathOptionColors: ['#FBA6A1','#F7E6A7','#9FE3CD','#A3DEFF'],
        selectedOption: null,
        colorIndex: 0,
        selectedAnswer: null,
      },

      mediaStream: null,
      mediaRecorder: null,
      socket: null,
      chunks: [],
      rec_status: 'idle',
      tab_status: null,
      violations: 0

    };
  },
  computed: {
    isTimeUp() {
      return this.seconds <= 0;
    },
    getHeight() {
      //console.log("Height =", window.innerHeight);
      //console.log("Width =", window.innerWidth);
      return this.windowHeight - 25 + "px";
    },
    getLeftHeight() {
      //console.log("Height =", window.innerHeight);
      //console.log("Width =", window.innerWidth);
      return this.windowHeight - 170 + "px";
    },
    
    // getQuestionsListHeight() {
    //   return (this.windowHeight-25) - (this.optionHeight) + "px";
    // },
  },
  watch: {
    // whenever question changes, this function will run
    selectedQuestion() {
      this.lastAnswerTime = this.seconds;
      console.log(this.selectedQuestion);
    },
  },
  mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    document.addEventListener('keydown',  this.handleKeyPress);

    ['focus'].forEach(event => { window.addEventListener(event, this.handleTabBlurFocus); });
    ['copy','paste'].forEach(event => { window.addEventListener(event, this.handleCopyPaste); });

    this.startTimer();

    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    setTimeout(() => {
      this.onResize();
    }, 300);
  },

  destroyed() {
    this.setLog();
  },
  async beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    document.removeEventListener("keydown", this.handleKeyPress);
    ['focus'].forEach(event => { window.removeEventListener(event, this.handleTabBlurFocus); });
    ['copy','paste'].forEach(event => { window.removeEventListener(event, this.handleCopyPaste); });
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
    await this.setLog();
  },

  methods: {
    handleTabBlurFocus(event){
      this.violations++;
      console.warn("User ", event.type, " on current Tab");
      this.genericDialog = true;
    },
    handleCopyPaste(event){
      this.violations++;
      this.genericDialog = true;
      console.log("testet");
      event.preventDefault();
      
    },
    handleKeyPress(event){
     if (event.key === 'Escape') {
        //if esc key was not pressed in combination with ctrl or alt or shift
        const isNotCombinedKey = !(event.ctrlKey || event.altKey || event.shiftKey);
        if (isNotCombinedKey) {
          this.violations++;
          this.genericDialog = true;
        }
      }
    },
    checkUserAgent() {
      const userAgent = navigator.userAgent;
      const match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i);
      if (match) {
        console.log(`The browser is ${match[1]} ${match[2]}`);
        if(match[1].toLocaleLowerCase() != 'chrome') {
          alert('Please use Chrome Browser to give test');
        }
      } else {
        console.log(`The browser's name and version could not be found.`);
      }
    },
    getVideoElement(){
      return document.getElementById('videoElement');
    },
    verifyCameraStream() {
      this.mediaStream.getTracks().forEach((track) => { 
        this.camera_id = track.id; 
        if(track.readyState != "live") {
          alert("Camera Stream Stopped");
        }
      });     
      console.log("Acive stream ", this.mediaStream.getTracks());
    },
    cameraMedia(){
      // Check if MediaRecorder API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('MediaRecorder API is not supported in this browser.');
        //return;
      }
      // Start capturing video frames
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {    
          this.mediaStream = stream;
          this.getVideoElement().srcObject = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              this.chunks.push(event.data);
              console.log(this.chunks);
              // socket.send(event.data);
            }
          };
        this.mediaRecorder.start();
      })
      .catch((error) => {
        alert('Error accessing the camera:', error);
      });
    },
    stopRecording() {
      // console.log("camera stop triggered");
      let t = new Date();
      this.rec_status = "recording stopped at "+ t.getSeconds();
      // Stop capturing video frames
      this.mediaRecorder.stop();
      this.chunks = [];
      // videoElement.srcObject.getTracks().forEach((track) => track.stop());
      this.mediaRecorder.start();
      //socket.close();
    },
    getAssetType(assetDataType) {
      if (assetDataType != null) {
        console.log(assetDataType);
        const [type] = assetDataType.split("/");
        console.log("declared type", type);
        return type;
      } else {
        return "";
      }
    },
    zoomOutFun(zoomOutImageUrl) {
      this.zoomOutBool = true;
      this.zoomOutImageUrl = zoomOutImageUrl;
      console.log("fun callled");
    },
    formatTime(seconds) {
      // const hours = Math.floor(seconds / 3600);
      // const minutes = Math.floor((seconds % 3600) / 60);
      // //const remainingSeconds = seconds % 60;
      // if (hours == 0) {
      //   return String(minutes).padStart(2, "0") + " minutes";
      // } else {
      //   return (
      //     String(hours).padStart(2, "0") +
      //     " hours and " +
      //     String(minutes).padStart(2, "0") +
      //     " minutes"
      //   );
      // }
      const totalMs = seconds * 1000;
      const result = new Date(totalMs).toISOString().slice(11, 19);
      return result;
    },
    setSelectedQuestionFromProgress(item) {
      if(this.isTimeUp) {
        return false;
      }
      this.selectedQuestion = this.getQuestionIndex(item);
      this.scrollMethod("scrollId" + this.selectedQuestion);
    },
    getQuestionIndex(question) {
      return this.questions.indexOf(question);
    },
    onClickSummaryQuestionBox(index) {
      if(this.isTimeUp) {
        return false;
      }
      if (
        this.questions[index].myAnswer ||
        this.skipped.includes(this.questions[index]) || this.bookmarked.includes(this.questions[index])
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

      let questionD = document.querySelector('.question-details');
      questionD.scrollTop = 0;
      
    },

    openTestSummary() {
      this.summaryDialog = true;
      this.pauseMedia();
      this.$mixpanel.track("TestSummaryLoaded", {
        assessment_id: this.assessment.id,
        assessment_name: this.assessment.name,
        screen_name: "TestSummaryScreen",
      });
    },
    startTimer() {
      this.seconds = 80;
      this.interval = setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    updateTime() {
      if (this.seconds <= 0) {
        this.genericDialog = true;
        this.pauseMedia();
        clearInterval(this.interval);
        return;
      }
      
      //console.log(this.seconds);

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
      if(this.isTimeUp) {
        return false;
      }
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
    getColorBg(item) {
      if (this.bookmarked.includes(item)) {
        return "bookmark-bg";
      } if (this.skipped.includes(item)) {
        return "skipped-bg";
      } else if (item.myAnswer != null) {
        return "answered-bg";
      } else {
        return "grey-dark"
      }
    },
    handleBookmark(question) {
      if (!this.bookmarked.includes(question)) {
        this.bookmarked.push(question);
        this.$mixpanel.track("QuestionBookmarked", {
          question_id: this.selectedQuestion.id,
          screen_name: "AssessmentScreen",
        });
        if (this.skipped.includes(question)) {
          let index = this.bookmarked.indexOf(question);
          this.skipped.splice(index, 1);

        }
      } else {
        let index = this.bookmarked.indexOf(question);
        this.bookmarked.splice(index, 1);
        this.$mixpanel.track("BookmarkRemoved", {
          question_id: this.selectedQuestion.id,
          screen_name: "AssessmentScreen",
        });
      }
    },
    bookmarkQuestion(question) {
      if (question.myAnswer != null) {
        this.questions[this.getQuestionIndex(question)].myAnswer = null;
        this.updateProgress();
        this.handleBookmark(question);
      }
      else {
        this.handleBookmark(question);
      }
      setTimeout(() => {
        this.onResize();
      }, 500);
    },
    updateProgress() {
      this.answeredProgress = 0;
      this.questions.forEach((question) => {
        if (question.myAnswer != null) {
          this.answeredProgress++;
          if (this.bookmarked.includes(question)) {
            let index = this.bookmarked.indexOf(question);
            this.bookmarked.splice(index, 1);
          }
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
      this.sendAnswerGivenEvent();
      //console.log(response);
      if (response.data.success) {
        // this.successDialog = true;
        this.$store.state.assessmentId = this.assessment.id;
        this.$router.replace({
          path: "/success",
          query: { assessmentId: this.assessment.id, assessmentName: this.assessment.name },
        });
      } else {
        this.$router.replace({
          path: "/failed",
          query: { assessmentId: this.assessment.id, assessmentName: this.assessment.name, response: this.response },
        });
      }
    },
  
  isKey (optionKey) {
    if (this.isObject(this.questions[this.selectedQuestion].myAnswer)) {
      const keyarray =  Object.keys(this.questions[this.selectedQuestion].myAnswer);
      return keyarray.includes(optionKey);
    }
    return false;
  },

  findIndex (optionKey) {
    if (this.isObject(this.questions[this.selectedQuestion].myAnswer)) {
      const keyarray =  Object.keys(this.questions[this.selectedQuestion].myAnswer);
      return keyarray.indexOf(optionKey);
    }
    return 0;
  },
  ifOptionSelected (option) {
    console.log("is selected");
    return (this.mtfQuestions.selectedOption === option.option_key || this.isKey(option.option_key)) 
  },

  bColorIndex(option) {
    const cIndex = this.findIndex(option.option_key);
    return cIndex == -1 ? this.mtfQuestions.colorIndex : cIndex;
  },

  findIndexOfValue (answerKey) {
    if (this.isObject(this.questions[this.selectedQuestion].myAnswer)) {
      const valuearray =  Object.values(this.questions[this.selectedQuestion].myAnswer);
      return valuearray.indexOf(answerKey);
    }
    return 0;
  },

  ifAnswerSelected (answer) {
    if (this.isObject(this.questions[this.selectedQuestion].myAnswer)) {
    const valueArray = Object.values(this.questions[this.selectedQuestion].myAnswer);
    if (valueArray.includes(answer.answer_key)) {
      return true;
    }
    return false;
    }
    return false;
  },

  isObject(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );},

    selectMtfKey (option) {
      if (!this.isKey(option.option_key)) {
      this.mtfQuestions.selectedAnswer = null;
      this.mtfQuestions.selectedOption = option.option_key;

      }
    },

    resetMTF () {
      this.questions[this.selectedQuestion].myAnswer = null;
      this.mtfQuestions.colorIndex = 0;
      this.mtfQuestions.selectedAnswer = null;
      this.mtfQuestions.selectedOption = null;
      this.updateProgress();
    },

    setOption(option) {
      console.log(this.questions[this.selectedQuestion]);
      if (!this.isTimeUp) {

        if(this.questions[this.selectedQuestion].question_type == 'MULTIPLE_CHOICE' && !Array.isArray(this.questions[this.selectedQuestion].myAnswer)) {
          this.questions[this.selectedQuestion].myAnswer = [];
        }
        if(this.questions[this.selectedQuestion].question_type == 'MATCH_THE_FOLLOWING' && !this.isObject(this.questions[this.selectedQuestion].myAnswer)) {
          this.questions[this.selectedQuestion].myAnswer = {};
        }
        if (this.mtfQuestions.selectedOption === null && this.isObject(this.questions[this.selectedQuestion].myAnswer)) return;

        if (this.mtfQuestions.selectedOption !== null && this.isObject(this.questions[this.selectedQuestion].myAnswer)) {
           if (this.ifAnswerSelected(option)) return;
           this.questions[this.selectedQuestion].myAnswer[this.mtfQuestions.selectedOption] = option.answer_key;
           if (Object.keys(this.questions[this.selectedQuestion].myAnswer).length === this.questions[this.selectedQuestion].question_options.length) {
            this.updateProgress();
           }
           if (this.mtfQuestions.selectedAnswer == null) {
            this.mtfQuestions.colorIndex = this.mtfQuestions.colorIndex+1;
           }
           this.mtfQuestions.selectedAnswer = option.answer_key;
           console.log(this.questions[this.selectedQuestion].myAnswer);
           return;
          }

        
        if (
          this.questions[this.selectedQuestion].myAnswer == option.option_key || (Array.isArray(this.questions[this.selectedQuestion].myAnswer) && this.questions[this.selectedQuestion].myAnswer.indexOf(option.option_key) >= 0)
        ) {

          if(this.questions[this.selectedQuestion].question_type == 'MULTIPLE_CHOICE') {
            let indexOfQuestion = this.questions[this.selectedQuestion].myAnswer.findIndex(ele => ele == option.option_key);
            if (indexOfQuestion > -1) { // only splice array when item is found
              this.questions[this.selectedQuestion].myAnswer.splice(indexOfQuestion, 1); // 2nd parameter means remove one item only
            }
          } else {
            this.questions[this.selectedQuestion].myAnswer = null;
          }
          this.updateProgress();
        } else {
          
          if(this.questions[this.selectedQuestion].question_type == 'MULTIPLE_CHOICE') {
            this.questions[this.selectedQuestion].myAnswer.push(option.option_key);
          } else {
            this.questions[this.selectedQuestion].myAnswer = option.option_key;
          }

          if (this.questions[this.selectedQuestion].timeTaken == null) {
            this.questions[this.selectedQuestion].timeTaken =
              this.lastAnswerTime - this.seconds;
          } else {
            this.questions[this.selectedQuestion].timeTaken +=
              this.lastAnswerTime - this.seconds;
          }
          console.log(this.questions[this.selectedQuestion].timeTaken);
          //console.log(this.questions[this.selectedQuestion]);
          if (this.skipped.includes(this.questions[this.selectedQuestion])) {
            let index = this.bookmarked.indexOf(
              this.questions[this.selectedQuestion]
            );
            this.skipped.splice(index, 1);
          }
          this.updateProgress();
        }
      }
      
    },
    skipQuestion(question) {
      if (!this.skipped.includes(question) && !this.bookmarked.includes(question)) {
        this.skipped.push(question);
        //console.log(this.questions[this.selectedQuestion]);

        this.questions[this.selectedQuestion].myAnswer = null;
        this.updateProgress();
      }
      if (this.selectedQuestion + 1 != this.questions.length) {
        this.next();
      }
      setTimeout(() => {
        this.onResize();
      }, 300);
    },

    async next () {
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
        difficulty_level:
          this.questions[this.selectedQuestion].difficulty_level,
        skill: this.questions[this.selectedQuestion].skill.name,
        Subject: this.questions[this.selectedQuestion].subject,
        // is_answer_correct: this.questions[this.selectedQuestion].is_correct,
      });
      this.selectedQuestion = this.selectedQuestion + 1;
      this.scrollMethod("scrollId" + this.selectedQuestion);

      await this.setLog();
      
      setTimeout(() => {
        this.onResize();
      }, 100);
    },
    async setLog() {
      let response = {}
      this.questions.forEach((question) => {
        if (question.myAnswer != null) {
          Vue.set(response, question.id, question.myAnswer);
        }
      });
      let assessmentData = this.assessment.tests.find(ele=> ele.assessment_type == this.testType.toLocaleUpperCase());
      await AssessmentController.updateScreeningStatus(
        this.assessment.id, 
        this.testType.toLocaleLowerCase(),
        (assessmentData.duration_of_assessment - this.seconds),
        response,
        this.violations
      );
    },
    previous() {
      if (this.isTimeUp) {
        return false;
      }
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
      });

      this.selectedQuestion = this.selectedQuestion - 1;
      this.scrollMethod("scrollId" + this.selectedQuestion);
      setTimeout(() => {
        this.onResize();
      }, 100);
    },
    questionClicked(item) {
     
      if(this.isTimeUp) {
        return false;
      }
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
      setTimeout(() => {
        this.onResize();
      }, 100);
      
    },
    sendAnswerGivenEvent() {
      this.questions
        .filter((item) => item.myAnswer != null)
        .forEach((question) => {
          this.$mixpanel.track("AnswerGiven", {
            question_id: question.id,
            option_selected: question.myAnswer,
            is_answer_correct: question.question_options.find(
              (option) => option.option_key == question.myAnswer
            ).is_correct,
            difficulty_level:
              question.difficulty_level,
            screen_name: "AssessmentScreen",
            time_taken_in_sec: question.timeTaken,
          });
        });
    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.optionHeight = document.getElementById('optionHeight') ? document.getElementById('optionHeight').clientHeight + 80 : 270;
      // console.log(document.getElementById('optionHeight').clientHeight);

      this.questionsListHeight = (this.windowHeight-25) - (this.optionHeight) + "px";
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

        let assessmentData = this.assessment.tests.find(ele=> ele.assessment_type == this.testType.toLocaleUpperCase());

        this.seconds = assessmentData.duration_of_assessment;
        this.durationOfAssessment = assessmentData.duration_of_assessment ? assessmentData.duration_of_assessment : 0 ;
        if(this.assessment && this.assessment.assessment_log && this.assessment.assessment_log.length > 0) {
          let elapsed_time = this.assessment.assessment_log.elapsed_time;
          this.seconds = this.seconds - elapsed_time;
          let answeredQ = this.assessment.assessment_log && this.assessment.assessment_log.answered_question ? JSON.parse(this.assessment.assessment_log.answered_question) : {};
          let isLastQuestionItem = 0
          this.questions = this.questions.map((question, index) => {
            if(answeredQ[question.id]) {
              question.myAnswer = answeredQ[question.id];
              isLastQuestionItem = index;
            }
            return question;
          });
          this.selectedQuestion = isLastQuestionItem;
          this.updateProgress();
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
      this.setLog();
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
    pauseMedia () {
      const myVideo = document.getElementById("video-option"); 
      const myaudio = document.getElementById("audio-option");
      myaudio && myaudio.pause();
      myVideo && myVideo.pause();
    }
  },

  created() {
    this.assessmentId = this.$route.query.id;
    this.testType = this.$route.query.test;
    // console.log(this.assessmentId);
    this.getAssessmentInfo();

    this.checkUserAgent();
    this.cameraMedia();
    setInterval(() => {
      this.verifyCameraStream();
      this.stopRecording();
    }, 10000);
    setInterval(()=>{
      this.verifyCameraStream();
    }, 10000);

  },
};
</script>
