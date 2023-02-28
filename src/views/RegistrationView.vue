<template>
  <div class="surface">
    <v-app-bar color="surface" elevation="0"   fixed>
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.png" contain></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>
    <v-card color="surface" :height="(getHeight-64) + 'px'">
      <v-card-title class="justify-center mt-16"> Welcome </v-card-title >
      <v-card-subtitle class="text-center"
        ><span
          >Let's start your profile, connect to people you know, and engage
          with</span
        ><br /><span>them on topics you care about.</span></v-card-subtitle
      >
      <v-container>
        <v-stepper v-model="e1">
          <v-stepper-header class="text-subtitle-2 secondaryAccent">
            <v-stepper-step :complete="e1 > 1" step="1">
              PERSONAL INFORMATION
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">
              ACADEMICS
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"> PROFESSIONAL INFO </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!------------------------------------------ STEP 1 ------------------------------------------>
            <v-stepper-content step="1">
              <v-card elevation="0" id="myScroll">
                <v-row>
                  <v-col cols="2">
                    <v-card-title class="justify-center">
                      <image-input v-model="avatar">
                        <div slot="activator" class="text-center">
                          <v-icon size="100px" v-if="!avatar" color="primary">
                            mdi-account-circle-outline
                          </v-icon>

                          <v-avatar size="100px" v-ripple v-else>
                            <img :src="avatar.imageURL" alt="avatar" />
                          </v-avatar>
                        </div>
                      </image-input> </v-card-title
                    ><v-card-subtitle class="text-center"
                      >**Allowed File Types:jpeg, jpg, png**</v-card-subtitle
                    >
                  </v-col>
                  <v-col cols="10">
                    <v-card
                      :height="getHeight - 400 + 'px'"
                      class="pa-4"
                      elevation="0"
                    >
                      <v-row class="py-0">
                        <v-col cols="2" class="py-0"
                          ><v-select
                            label="Title *"
                            :items="['Ms', 'Mrs', 'Mr']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select
                        ></v-col>
                        <v-col cols="4" class="py-0"
                          ><v-text-field
                            outlined
                            label="First Name *"
                            rounded
                            class="rounded-xl"
                          ></v-text-field></v-col
                        ><v-col cols="3" class="py-0"
                          ><v-text-field
                            outlined
                            label="Middle Name"
                            rounded
                            class="rounded-xl"
                          ></v-text-field></v-col
                        ><v-col cols="3" class="py-0"
                          ><v-text-field
                            outlined
                            label="Last Name"
                            rounded
                            class="rounded-xl"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col class="py-0"
                          ><v-text-field
                            v-model="email"
                            outlined
                            label="Email Address *"
                            rounded
                            class="rounded-xl"
                            required
                            @keydown.enter.prevent="submit"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                            :error-messages="emailErrors"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col class="py-0"
                          ><v-text-field
                            suffix="Verify"
                            label="Your 10-digit mobile no."
                            outlined
                            rounded
                            class="rounded-xl"
                            counter="10"
                            prefix="+91"
                            type="number"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col cols="4" class="py-0"
                          ><v-text-field
                            outlined
                            label="Date of Birth (DDMMYY)"
                            append-icon="mdi-calendar"
                            rounded
                            class="rounded-xl"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="2" class="py-0">
                          <v-select
                            label="Gender"
                            :items="['Female', 'Male', 'Non-Binary']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row class="py-0 my-0">
                        <v-col cols="2" class="py-0" v-if="!isFetchingLocation"
                          ><v-btn
                            color="primary"
                            large
                            text
                            @click="location"
                          >
                            <v-icon left> mdi-map-marker-outline </v-icon>
                            Current Location
                          </v-btn>
                        </v-col>
                        <v-col cols="1" class="py-0" v-else>
                          <v-progress-circular
                            indeterminate
                            color="primary"
                          ></v-progress-circular>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col cols="6" class="py-0">
                          <v-select
                            v-model="country"
                            :value="country"
                            label="Country *"
                            :items="['India', 'Sri Lanka', 'Nepal']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="6" class="py-0">
                          <v-select
                            v-model="state"
                            :value="state"
                            label="State *"
                            :items="['Delhi', 'Uttar Pradesh', 'Maharashtra']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col cols="6" class="py-0">
                          <v-select
                            v-model="district"
                            :value="district"
                            label="District *"
                            :items="['South Delhi', 'New Delhi', 'Old Delhi']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="6" class="py-0">
                          <v-select
                            v-model="talukTehsil"
                            :value="talukTehsil"
                            label="Taluk / Tehsil *"
                            :items="['Koil', 'Hauz Khas Tehsil', 'Test']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select>
                        </v-col> </v-row
                      ><v-row class="py-0">
                        <v-col cols="6" class="py-0">
                          <v-select
                            v-model="cityVillage"
                            :value="cityVillage"
                            label="City / Village *"
                            :items="['Aligarh', 'City 2', 'City 3']"
                            outlined
                            class="rounded-xl"
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="6" class="py-0">
                          <v-text-field
                            v-model="pinCode"
                            :value="pinCode"
                            outlined
                            label="Pin Code *"
                            rounded
                            class="rounded-xl"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="py-0">
                          <v-text-field
                            outlined
                            label="Address"
                            rounded
                            class="rounded-xl"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>

              <v-card elevation="0">
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="10">
                    <v-card-title
                      ><v-btn rounded color="secondary" class="black--text" @click="e1 = 2">
                        NEXT
                      </v-btn></v-card-title
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-stepper-content>
            <!------------------------------------------ STEP 2 ------------------------------------------>
            <v-stepper-content step="2">
              <v-card elevation="0" id="myScroll">
                <v-card
                  :height="getHeight - 400 + 'px'"
                  class="pa-4"
                  elevation="0"
                >
                  <v-row class="py-0">
                    <v-col class="py-0"
                      ><v-text-field
                        outlined
                        label="School/ College/ University *"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-row class="py-0">
                    <v-col class="py-0"
                      ><v-text-field
                        outlined
                        label="Degree/ Diploma/ Certification *"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col> </v-row
                  ><v-row class="py-0">
                    <v-col class="py-0"
                      ><v-text-field
                        outlined
                        label="Field of Study *"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col>
                  </v-row>

                  <v-row class="py-0">
                    <v-col cols="6" class="py-0"
                      ><v-text-field
                        outlined
                        label="Start Date"
                        append-icon="mdi-calendar"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" class="py-0"
                      ><v-text-field
                        outlined
                        label="End Date"
                        append-icon="mdi-calendar"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col>
                  </v-row>

                  <v-row class="py-0">
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        outlined
                        label="Extra Curricular Activities"
                        rounded
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="py-0">
                    <v-col cols="12" class="py-0">
                      <v-text-field
                        outlined
                        label="Achievements"
                        rounded
                        class="rounded-xl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-btn
                rounded
                outlined
                class="mx-4 my-4"
                color="primary"
                @click="e1 = 1"
              >
                BACK
              </v-btn>
              <v-btn rounded color="secondary" class="black--text" @click="e1 = 3"> NEXT </v-btn>
            </v-stepper-content>
            <!------------------------------------------ STEP 3 ------------------------------------------>
            <v-stepper-content step="3">
              <v-card elevation="0" id="myScroll">
                <v-card
                  :height="getHeight - 400 + 'px'"
                  class="pa-4"
                  elevation="0"
                >
                  <v-row class="py-0">
                    <v-col cols="3" class="py-0"
                      ><v-radio-group mandatory row v-model="experience">
                        <v-radio label="Fresher" value="Fresher"></v-radio>
                        <v-radio label="Experienced" value="Experienced">
                        </v-radio> </v-radio-group
                    ></v-col>
                    <v-col
                      v-if="experience == 'Experienced'"
                      cols="9"
                      class="py-0"
                    >
                      <v-select
                        label="Experience (Years) *"
                        :items="['1', '2', '3', '4', '5+']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select>
                    </v-col>
                  </v-row>
                  <v-row class="py-0">
                    <v-col class="py-0"
                      ><v-text-field
                        outlined
                        label="Role/ Position *"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col> </v-row
                  ><v-row class="py-0">
                    <v-col class="py-0"
                      ><v-select
                        label="Employment Type"
                        :items="['Permanent', 'Contract', 'Prohibition']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select
                    ></v-col>
                  </v-row>

                  <v-row class="py-0">
                    <v-col class="py-0"
                      ><v-select
                        label="School / Institute"
                        :items="['School 1', 'School 2', 'School 3']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select
                    ></v-col>
                  </v-row>
                  <v-row class="py-0">
                    <v-col class="py-0">
                      <v-checkbox
                        class="py-0"
                        v-model="isCurrentlyWorking"
                        label="I am currently working on this role / position."
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                  <v-row class="py-0">
                    <v-col cols="6" class="py-0"
                      ><v-text-field
                        outlined
                        label="Start Date"
                        append-icon="mdi-calendar"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="6" class="py-0"
                      ><v-text-field
                        :disabled="isCurrentlyWorking"
                        outlined
                        label="End Date"
                        append-icon="mdi-calendar"
                        rounded
                        class="rounded-xl"
                      ></v-text-field
                    ></v-col>
                  </v-row>
                  <v-row class="py-0">
                    <v-col class="py-0"
                      ><v-select
                        label="Board"
                        :items="['Board 1', 'Board 2', 'Board 3']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select
                    ></v-col> </v-row
                  ><v-row class="py-0">
                    <v-col class="py-0"
                      ><v-select
                        label="Level"
                        :items="['Level 1', 'Level 2', 'Level 3']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select
                    ></v-col> </v-row
                  ><v-row class="py-0">
                    <v-col class="py-0"
                      ><v-select
                        label="Grade"
                        :items="['Grade 1', 'Grade 2', 'Grade 3']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select
                    ></v-col> </v-row
                  ><v-row class="py-0">
                    <v-col class="py-0"
                      ><v-select
                        label="Subject"
                        :items="['Subject 1', 'Subject 2', 'Subject 3']"
                        outlined
                        class="rounded-xl"
                      >
                      </v-select
                    ></v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-container>
                <v-row>
                <v-btn
                rounded
                outlined
                class="ma-4"
                color="primary"
                @click="e1 = 2"
              >
                BACK
              </v-btn>
              <v-btn rounded depressed color="secondaryAccent" class="primary--text my-4" @click="e1 = 1" to="/home">
                SAVE DETAILS
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn rounded color="secondary" class="black--text ma-4" to="/home">
                START TEST
              </v-btn>
              </v-row>
              </v-container>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import ImageInput from "../components/ImageInput.vue";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import "../styles.css";
export default {
  name: "RegistrationView",
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },
  components: {
    ImageInput,
  },
  data() {
    return {
      e1: 1,
      experience: "Fresher",
      isCurrentlyWorking: false,
      isFetchingLocation: false,
      windowHeight: window.innerHeight,
      country: "",
      state: "",
      district: "",
      cityVillage: "",
      pinCode: "",
      address: "",
      talukTehsil: "",
      avatar: null,
      saving: false,
      saved: false,
      email: "",
    };
  },
  methods: {
    async location() {
      this.isFetchingLocation = true;
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.lat = position.coords.latitude; //'26.4838767';
          this.long = position.coords.longitude; //'80.3211793';
          var url = `https://geocode.maps.co/reverse?lat=${this.lat}&lon=${this.long}`;
          const response = await axios.get(url);
          console.log(response.data.address);
          this.country = response.data.address.country;
          this.state = response.data.address.state;
          this.district = response.data.address.state_district;
          this.pinCode = response.data.address.postcode;
          this.talukTehsil = response.data.address.county;
          this.cityVillage = response.data.address.city;
          this.isFetchingLocation = false;
        },
        (error) => {
          this.isFetchingLocation = false;
          console.log(error);
        }
      );
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
  },
  watch: {
    avatar: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
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
};
</script>