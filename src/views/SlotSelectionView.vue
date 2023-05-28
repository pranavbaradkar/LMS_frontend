<template>
  <div class="surface">
    <navBar></navBar>

    <v-card
      color="surface"
      :height="getHeight - 100 + 'px'"
      depressed
      elevation="0"
    >
      <v-row class="mb-n0">
        <v-col class="pa-0">
          <v-row class="mb-0 pb-0 background-up">
            <v-col cols="6" >
              <div style="position: relative; width: 100%; height: 100%">
                <v-img
                  :height="getHeight + 22 + 'px'"
                  width="100%"
                  style="position: absolute; top: -100; z-index: 5"
                  src="@/assets/premain-background.svg"
                ></v-img>
                <v-row style="z-index: 10; position: relative; width: 75%">
                  <v-col style="margin-top: 112px">
                    <div class="ml-8" style="margin-bottom: 20px">
                      <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>
                    </div>
                    <div style="font-size: 39px" class="font-weight-bold ml-8">
                      Slot Selection
                    </div>
                    <div
                      style="font-size: 14px; color: #000; width: 80%"
                      class="ml-8"
                    >
                      Choose any slot and so we can schedule you mains test
                      accordingly
                    </div>
                    <v-img
                      width="320"
                      height="290"
                      style="z-index: 4; margin-top: 30px; margin-left: 39px"
                      src="@/assets/Calendar-leftside.svg"
                    ></v-img>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="5" style="margin-top: 84px; margin-right: 20px">
              <div class="position-relative">
                <v-card
                  :height="getHeight - 200 + 'px'"
                  id="myScroll"
                  elevation="0"
                  style="overflow-x: hidden"
                  class="pa-5"
                  depressed
                  outlined
                >
                  <div class="mb-4"
                  v-for="(day, index) in dateRange"
                  :key="index"
                  >
                    <div class="h6 pb-3">{{ day }}</div>
                    <div class="d-flex flex-wrap" 
                  >
                      <v-card
                          v-for="(time, slotIndex) in slotTiming"
                        :key="`${slotIndex}-time`"
                        class="d-flex align-center flex-column rounded-md justify-center border-with-margin"
                        :class="(slotIndex == timeSlotIndex && dateRangeIndex == index) ? 'active-item' : ''"
                        height="45"
                        width="113"
                        elevation="0"
                        outlined
                        @click="selectItem(slotIndex, index)"
                      >
                        <p class="mb-0 subtitle-2">{{ time }}</p>
                      </v-card>
                    
                    </div>
                  </div>
                  
                </v-card>
                <v-btn :disabled="isLoading"  variant="tonal" elevation="0" block height="48px" class="w-100 submit-btn white--text confirm" @click="confirmSlot">Confirm</v-btn>
              </div>
             
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar
      v-model="error"
      :timeout="timeout"
    >
    Something went wrong in data store.
    </v-snackbar>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import moment from 'moment'
import navBar from "@/components/navBar.vue"
import AssessmentController from "../controllers/AssessmentController";

export default {
  name: "RegistrationView",
  mixins: [validationMixin],
  validations: {
  
  },
  components: {
    navBar
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      dateRange: [],
      timeout: 2000,
      error: false,
      isLoading: false,
      timeSlotIndex: null,
      dateRangeIndex: null,
      slotTiming: ["10:00 am","12:00 pm","01:00 am","03:00 am","06:00 am"]
    }
  },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    selectItem(slotIndex, index) {
      this.timeSlotIndex = slotIndex;
      this.dateRangeIndex = index;
    },
    generateSlot() {
      let totalDay = 7; 
      for(var i = 1; i <= totalDay; i++) {
        let date = moment().day(i).format("Do MMM, YY");
        this.dateRange.push(date);
      }
    },
    async confirmSlot() {
      this.isLoading = true;
      if(this.dateRange[this.dateRangeIndex] && this.slotTiming[this.timeSlotIndex]) {
        let date = this.dateRange[this.dateRangeIndex]+" "+this.slotTiming[this.timeSlotIndex];
        let datefinal = moment(date, "Do MMM, YY hh:mm a").format("YYYY-MM-DD hh:mm:ss");
        console.log(datefinal);
        

        const assessmentId = this.$route.params.id;
        let response = await AssessmentController.postSetupMainsAssessment({
          slot: datefinal,
        }, assessmentId);
        
        if(response.status == 200)  {
          this.$router.push(`/assessment/${assessmentId}/mains/setup`);
        } else {
          this.isLoading = false;
          this.error = true
        }
        

      } else {
        this.isLoading = false;
      }
    }
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
   this.generateSlot();
  },
};
</script>
<style scoped>
.registration-stepper-header.v-stepper__header {
  box-shadow: none;
  margin-left: 140px;
  margin-right: 140px;
  margin-bottom: 0px;
}
.registration-stepper.v-sheet.v-stepper:not(.v-sheet--) {
  box-shadow: none;
}
.border-with-margin {
  margin-right: 20px;
  margin-bottom: 10px;
  border: 1px solid #277bc0;
}
.active-item {
  border: 1px solid #277bc0;
  background-color: #E9F2F9;
  color: #277BC0;
}
.v-input.date-field
  > .v-input__control
  > .v-input__slot
  > .v-text-field__slot
  > input {
  padding: 0px !important;
  margin-bottom: 16px;
  margin-top: 12px !important;
}

.background-up {
  position: relative;
  top: -40px
}
.v-btn.submit-btn.confirm {
  bottom: -70px;
  width: 100%;
  left: 0px;
}
.position-relative{
   position: relative;
}
</style>
