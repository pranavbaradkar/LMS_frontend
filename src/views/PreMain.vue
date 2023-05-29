<template>
  <div class="surface">
    <navBar></navBar>

    <v-card
      color="surface"
      :height="getHeight-100 + 'px'"
      depressed
      elevation="0"
    >
      <v-row class="mb-n0">
        <v-col class="pa-0">
        <v-row class="mb-0 pb-0 background-up" >
          <v-col cols="6">
            <div style="position: relative; width: 110%; height: 100%;">
              <v-img :height="getHeight + 22 + 'px'" width="100%" style="position: absolute; top: -100; z-index: 5;" src="@/assets/premain-background.svg"></v-img>
               <v-row style="z-index: 10; width: 75%">
                  <v-col style="margin-top: 112px">
                    <div style="font-size: 39px" class="font-weight-bold ml-8">
                      Congratulations on Clearing Screening, Let’s Setup Main’s
                      Test
                    </div>
                    <div
                      style="
                        font-size: 14px;
                        color: #000;
                        width: 80%;
                      "
                      class="ml-8"
                    >
                      Finish your 2 steps to confirm your mains test
                    </div>
                    <v-img
                      width="320"
                      height="290"
                      style="z-index: 4; margin-top: 30px; margin-right: 30px"
                      src="@/assets/premain.svg"
                    ></v-img>
                  </v-col>
                </v-row>
            </div>
          </v-col>
            <v-col cols="6" class="d-flex align-center justify-center">
              <v-card
                class="d-flex align-center flex-column rounded-lg justify-center me-5"
                :class="(selectedType == 'slot' && isDateSelected) && 'active-item'"
                height="200"
                width="185"
                elevation="0"
                outlined
                @click="selectItem('slot')"
              >
                <v-btn 
                  v-if="selectedType == 'slot' && isDateSelected"
                  fab
                  small
                  color="#277BC0"
                  class="item-selected"
                  >
                  <v-icon color="#fff" size="12">mdi-check</v-icon>
                </v-btn>
                <v-img
                  contain
                  width="64px"
                  max-height="64px"
                  style="margin-bottom: 10px"
                  src="@/assets/calendar.svg"
                ></v-img>
                <p class="mb-0 subtitle-2">Slot Selection</p>
                <p class="slotText">{{ this.mainsSetup && this.mainsSetup.slot ? slotMain() : '' }}</p>

              </v-card>
              <v-card
                elevation="0"
                outlined
                class="d-flex align-center flex-column rounded-lg justify-center"
                height="200"
                width="185"
                :class="(selectedType == 'pacd' && isVideoSelected) && 'active-item  '"
                @click="selectItem('pacd')"
              >
                <v-btn 
                  v-if="selectedType == 'pacd' && isVideoSelected"
                  fab
                  small
                  color="#277BC0"
                  class="item-selected"
                  >
                  <v-icon color="#fff" size="12">mdi-check</v-icon>
                </v-btn>
                <v-img
                  contain
                  width="64px"
                  max-height="64px"
                  style="margin-bottom: 20px"
                  src="@/assets/video-call.svg"
                ></v-img>
                <p class="mb-0 subtitle-2">PACD</p>
              </v-card>
            </v-col>
        </v-row>
      </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import navBar from "@/components/navBar.vue"
import moment from 'moment';
import AssessmentController from "../controllers/AssessmentController";
export default {
  name: "RegistrationView",
  mixins: [validationMixin],

  validations: {
  },
  components: {
    navBar,
  },
  data() {
    return {
      selectedType: null, //pacd
      windowHeight: window.innerHeight,
      isDateSelected: false,
      isVideoSelected: false,
      mainsSetup: {}
    };
  },
  methods: {
    selectItem(param) {
      this.selectedType = param;
      if(param == 'slot' && this.isDateSelected == false) {
        this.$router.push(`/assessment/mains/slot`);
      } else if(param == 'pacd' && this.isVideoSelected == false) {
        this.$router.push(`/assessment/mains/pacd`);
      }
    },
    slotMain() {
      return moment(this.mainsSetup.slot, 'YYYY-MM-DDTHH:mm:sssZ').format('Do MMM, YY hh:mm a');
    },
    async getMainsSetup() {
      let response = await AssessmentController.getSetupMainsAssessment();
      if(response.status == 200 && response.data && response.data.data) {

        if(response.data.data && response.data.data.slot && response.data.data.video_link) {
          this.$router.push(`/pre/assessment/mains`);
        }

        this.isDateSelected = response.data.data && response.data.data.slot ? true : false;
        console.log(this.isDateSelected);
        if(this.isDateSelected) {
          this.selectedType = 'slot';
        }

        this.isVideoSelected = response.data.data && response.data.data.video_link ? true : false;
        if(this.isVideoSelected) {
          this.selectedType = 'pacd';
        }

        this.mainsSetup = response.data.data;
      }
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    }
  }, 
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.getMainsSetup();
  },
};
</script>
<style scoped>
    .background-up {
      position: relative;
      top: -40px
    }
    .item-selected {
      position: absolute; top: 10px; left: 10px; width: 20px; height: 20px
    }
    .active-item {
      border: 1px solid #277BC0;
    }

    .slotText {
      width: 50%;
      text-align: center;
      font-size: 13px;
      margin-bottom: 0px;
      position: absolute;
      bottom: 9px;
    }
  
</style>
