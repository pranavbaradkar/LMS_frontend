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
            <v-col cols="6">
              <div style="position: relative; width: 100%; height: 100%">
                <v-img
                  :height="getHeight + 22 + 'px'"
                  width="100%"
                  style="position: absolute; top: -100; z-index: 5"
                  src="@/assets/premain-background.svg"
                ></v-img>
                <v-row style="position: relative; z-index: 10; width: 75%">
                  <v-col style="margin-top: 112px; margin-left: 7%">
                    <div class="ml-8" style="margin-bottom: 20px">
                      <v-icon @click="$router.go(-1)">mdi-arrow-left</v-icon>
                    </div>
                    <div style="font-size: 39px" class="font-weight-bold ml-8">
                      Demo Video
                    </div>
                    <div
                      style="font-size: 14px; color: #000; width: 80%"
                      class="ml-8"
                    >
                      Record a short video of yourself while speaking to the
                      Topic given below 👇
                    </div>
                    <v-card
                      :height="'400px'"
                      elevation="0"
                      style="overflow-x: none; margin-left: 30px"
                      class="pa-5 mt-2 vertical-steps-demo-video"
                      depressed
                      outlined
                    >
                      <p class="mb-0">Topic</p>
                      <p><strong>Demonstrating Newton's Laws of Motion</strong></p>
                      <hr class="border-hr"></hr>
                      <p>Pointers to Cover</p>
                      <v-stepper v-model="e6" vertical>
                        <v-stepper-step step="">
                         <strong>Introduction</strong> (1-2 minutes)
                        </v-stepper-step>

                        <v-stepper-content step="1">
                        </v-stepper-content>

                        <v-stepper-step :complete="e6 > 2" step="">
                          <strong>Newton's First Law: Law of Inertia</strong> (3-4 minutes)
                        </v-stepper-step>

                        <v-stepper-content step="2">
                        </v-stepper-content>

                        <v-stepper-step :complete="e6 > 3" step="">
                          <strong>Newton's Second Law: Force and Acceleration</strong> (4-5 minutes)
                        </v-stepper-step>

                        <v-stepper-content step="3">
                        </v-stepper-content>

                        <v-stepper-step step="">
                          <strong>Newton's Third Law: Action and Reaction</strong> (3-4 minutes)
                        </v-stepper-step>
                        <v-stepper-content step="4">
                        </v-stepper-content>

                        <v-stepper-step step="">
                          <strong>Conclusion and Wrap-up</strong> (1-2 minutes)
                        </v-stepper-step>
                        <v-stepper-content step="4">
                        </v-stepper-content>

                      </v-stepper>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col
              cols="5"
              class="position-relative"
              style="margin-top: 150px; margin-right: 20px"
            >
              <div class="position-relative">
                <video id="video" width="580px" autoplay></video>
                <button id="start">Start</button>
                <button id="stop">
                  <v-icon class="mr-2"> mdi-pause </v-icon>
                  <span class="timer">{{ mins }} : {{ secs }}</span>
                </button>
              </div>
              <v-btn
                variant="tonal"
                elevation="0"
                block
                height="48px"
                class="w-100 submit-btn white--text confirm"
                @click="submitLink"
                :disabled="isLoading || blob==null"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import "../styles.css";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import navBar from "@/components/navBar.vue";
import AssessmentController from "../controllers/AssessmentController";

var video, startBtn, stopBtn, stream, recorder;

export default {
  name: "RegistrationView",
  mixins: [validationMixin],

  validations: {},
  components: {
    navBar,
  },
  data() {
    return {
      windowHeight: window.innerHeight,
      interval: null,
      mins: 0,
      secs: 0,
      seconds: 0,
      e6: null,
      blob: null,
      isLoading: false,
    };
  },
  methods: {
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    startTimer() {
      this.seconds = 0;
      this.timeUpdate();
      this.interval = setInterval(() => {
        this.seconds++;
        this.timeUpdate();
      }, 1000);
    },
    timeUpdate() {
      const remainingMinutes = Math.floor((this.seconds % 3600) / 60);
      const remainingSeconds = this.seconds % 60;

      this.mins = this.pad(remainingMinutes);
      this.secs = this.pad(remainingSeconds);
    },
    requestVideo() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stm) => {
          stream = stm;
          startBtn.removeAttribute("disabled");
          startBtn.style.display = "block";
          video.srcObject = stream;
        })
        .catch((e) => console.error(e));
    },
    startRecording() {
      startBtn.style.display = "none";
      recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });
      this.startTimer();
      recorder.start();
      stopBtn.style.display = "block";
      // stopBtn.removeAttribute('disabled');
      // startBtn.disabled = true;
    },
    stopRecording() {
      recorder.ondataavailable = (e) => {
        this.blob = new Blob([e.data], { type: "video/webm" });
      };
      recorder.stop();
      clearInterval(this.interval);
      // startBtn.removeAttribute('disabled');
      // stopBtn.disabled = true;
    },
    async sendUploadonS3(blob) {
      const formData = new FormData();
      const extension = blob.type.split("/")[1];
      const imageFile = new File([blob], `${Date.now()}.${extension}`, {
        type: blob.type,
      });
      formData.append("image", imageFile);

      // await axios.post(`https://assessments-service.staging.hubblehox.ai/api/v1/s3/video/${userId}`, formData, {
      //   headers: {},
      // });
    },
    pad(value) {
      return value < 10 ? "0" + value : value;
    },
    async submitLink() {
      let blob = this.blob;
      if (this.blob) {
        this.isLoading = true;
        const formData = new FormData();
        const extension = blob.type.split("/")[1];
        const imageFile = new File([blob], `${Date.now()}.${extension}`, {
          type: blob.type,
        });
        formData.append("image", imageFile);
        formData.append("context", "user-profiles");
        formData.append("business_type", "b2c");
        formData.append("post_type", "demo");
        formData.append("file_type", "videos");

        let response = await AssessmentController.uploadS3Video(formData);
        console.log(response);

        if (response.status == 200) {
          // this.$router.push(`/assessment/${assessmentId}/mains/setup`);
          let response2 = await AssessmentController.postSetupMainsAssessment({
            demo_link: response.data.data.url,
          });

          if (
            response2.status == 200 &&
            response2.data &&
            response2.data.data
          ) {
            if (response2.data.data.slot && response2.data.data.demo_link) {
              this.$router.push(`/pre/assessment/mains`);
            }
          } else {
            alert("Something went wrong please contact admin");
            this.isLoading = false;
            this.error = true;
          }

          this.isLoading = false;
        } else {
          alert("Something went wrong please contact admin");
          this.isLoading = false;
          this.error = true;
        }
      }
    },
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    },
  },
  mounted() {
    video = document.getElementById("video");
    startBtn = document.getElementById("start");
    stopBtn = document.getElementById("stop");
    startBtn.onclick = this.startRecording;
    stopBtn.onclick = this.stopRecording;
    // startBtn.disabled = true;
    // stopBtn.disabled = true;
    this.requestVideo();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  created() {
    this.getUserInfo();
  },
};
</script>
<style scoped>
.background-up {
  position: relative;
  top: -40px;
}
.position-relative {
  position: relative;
}
.confirm {
}
.position-relative {
  position: relative;
}
.registration-stepper-header.v-stepper__header {
  box-shadow: none;
  margin-left: 140px;
  margin-right: 140px;
  margin-bottom: 0px;
}
.registration-stepper.v-sheet.v-stepper:not(.v-sheet--) {
  box-shadow: none;
}

#video {
  border-radius: 14px;
}

.timer {
  position: absolute;
  left: 13px;
  width: 91%;
  bottom: 9px;
}

#stop {
  box-sizing: border-box;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
  position: absolute;
  width: 91px;
  height: 32px;
  left: calc(50% - 91px / 2 + 0.5px);
  bottom: 20px;
  background: rgb(0 0 0 / 41%);
  color: #fff;
  border: 1px solid #ffffff;
  border-radius: 50px;
  line-height: 10px;
}

#stop i {
  color: #fff;
  bottom: 6px;
  left: -23px;
}

#start {
  display: none;
  line-height: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;

  position: absolute;
  width: 84px;
  height: 32px;
  left: calc(50% - 84px / 2 + 1px);
  bottom: 20px;

  background: #ff3b30;
  border: 1px solid #ffffff;
  border-radius: 50px;
  color: #fff;
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
.border-hr {
  position: relative;
  width: 110%;
  left: -20px;
  top: -7px;
  border-color: #f2f2f2;
  border-width: 0.4px;
}
</style>
