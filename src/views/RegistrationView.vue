<template>
  <div class="surface">
    <v-app-bar color="surface" elevation="0" fixed>
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.png" contain></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>

    <v-card color="surface" :height="getHeight - 64 + 'px'" depressed elevation="0">
      <v-card-title class="justify-center mt-10"> Welcome </v-card-title>
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
              <v-form lazy-validation ref="step1">
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
                              v-model="personalInfo.title"
                              label="Title *"
                              :items="['Ms', 'Mrs', 'Mr']"
                              outlined
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                            >
                            </v-select
                          ></v-col>
                          <v-col cols="4" class="py-0"
                            ><v-text-field
                              v-model="personalInfo.first_name"
                              outlined
                              label="First Name *"
                              rounded
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                            ></v-text-field></v-col
                          ><v-col cols="3" class="py-0"
                            ><v-text-field
                              v-model="personalInfo.middle_name"
                              outlined
                              label="Middle Name"
                              rounded
                              class="rounded-xl"
                            ></v-text-field></v-col
                          ><v-col cols="3" class="py-0"
                            ><v-text-field
                              v-model="personalInfo.last_name"
                              outlined
                              label="Last Name"
                              rounded
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                            ></v-text-field
                          ></v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col class="py-0"
                            >
                            <!-- <v-text-field
                              v-model="personalInfo.email"
                              outlined
                              label="Email Address *"
                              rounded
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                              @keydown.enter.prevent="submit"
                              @input="$v.email.$touch()"
                              @blur="$v.email.$touch()"
                              :error-messages="emailErrors"
                            ></v-text-field> -->


                            <v-text-field
                              v-model="personalInfo.email"
                              outlined
                              label="Email Address *"
                              rounded
                              class="rounded-xl"
                              :rules="emailRules"
                              required
                              @keydown.enter.prevent="submit"
                          ></v-text-field>
                        
                        
                        
                        
                        </v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col class="py-0"
                            ><v-text-field
                              v-model="personalInfo.phone_no"
                              suffix="Verify"
                              label="Your 10-digit mobile no."
                              outlined
                              rounded
                              class="rounded-xl"
                              counter="10"
                              prefix="+91"
                              type="number"
                              :rules="[rules.required, (v) => (v && v.length >= 10 && v.length<=10) || 'Mobile number must be 10 digit']"
                              required
                            >{{ userInfo.phone_no }}
                            </v-text-field
                          ></v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col cols="4" class="py-0"
                            ><v-text-field
                              v-model="personalInfo.dob"
                              outlined
                              label="Date of Birth (DDMMYY)*"
                              rounded
                              type="date"
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                            ></v-text-field
                          ></v-col>
                          <v-col cols="2" class="py-0">
                            <v-select
                              v-model="personalInfo.gender"
                              label="Gender*"
                              :items="['FEMALE', 'MALE']"
                              outlined
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row class="py-0 my-0">
                          <v-col
                            cols="2"
                            class="py-0"
                            v-if="!isFetchingLocation"
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
                              v-model="personalInfo.country_id"
                              :value="country"
                              label="Country *"
                              :items="countries"
                              item-value="id"
                              item-text="country_name"
                              outlined
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                              @click="fetchCountries"
                              @change="fetchStates"
                            >
                            </v-select>
                          </v-col>
                          <v-col cols="6" class="py-0">
                            <v-select
                              v-model="personalInfo.state_id"
                              :value="state"
                              label="State *"
                              :items="states"
                              outlined
                              class="rounded-xl"
                              item-value="id"
                              item-text="state_name"
                              :rules="[rules.required]"
                              required
                              @change="fetchDistricts"
                            >
                            </v-select>
                          </v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col cols="6" class="py-0">
                            <v-select
                              v-model="personalInfo.districtId"
                              :value="district"
                              label="District"
                              :items="districts"
                              outlined
                              class="rounded-xl"
                              item-value="id"
                              item-text="district_name"
                              :rules="[rules.required]"
                              @change="fetchTalukas"
                            >
                            </v-select>
                          </v-col>
                          <v-col cols="6" class="py-0">
                            <v-select
                              v-model="personalInfo.talukTehsil"
                              :value="talukTehsil"
                              label="Taluk / Tehsil"
                              :items="talukas"
                              outlined
                              class="rounded-xl"
                              item-value="id"
                              item-text="taluka_name"
                              @change="fetchCities"
                            >
                            </v-select>
                          </v-col> </v-row
                        ><v-row class="py-0">
                          <v-col cols="6" class="py-0">
                            <v-select
                              v-model="personalInfo.city_id"
                              :value="cityVillage"
                              label="City / Village *"
                              :items="cities"
                              outlined
                              class="rounded-xl"
                              :rules="[rules.required]"
                              required
                              item-value="id"
                              item-text="city_name"
                            >
                            </v-select>
                          </v-col>
                          <v-col cols="6" class="py-0">
                            <v-text-field
                              v-model="personalInfo.pincode"
                              :value="pinCode"
                              outlined
                              type="number"
                            
                              label="Pin Code *"
                              rounded
                              class="rounded-xl"
                              :rules="[rules.required, (v) => (v && v.length >= 6 && v.length<=6) || 'Pincode must be 6 digit']"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" class="py-0">
                            <v-text-field
                              v-model="personalInfo.address"
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
              </v-form>

              <v-card elevation="0">
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col cols="10">
                    <v-card-title
                      ><v-btn
                        rounded
                        color="secondary"
                        class="black--text"
                        @click="goToStep2"
                      >
                        NEXT
                      </v-btn></v-card-title
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-stepper-content>
            <!------------------------------------------ STEP 2 ------------------------------------------>

            <v-stepper-content step="2" v-model="expandedPanelIndex">
              <v-form lazy-validation ref="step2">
                <v-card elevation="0">
                  <v-card class="pa-4" elevation="0">
                    <v-expansion-panels v-model="expandedPanelIndex">
                      <v-expansion-panel
                        v-for="(qualification, index) in academicQualifications"
                        :key="index"
                        elevation="0"
                      >
                        <v-expansion-panel-header>{{
                          "Qualification: " + index
                        }}</v-expansion-panel-header>

                        <v-expansion-panel-content>
                          <v-row class="py-0">
                            <v-col class="py-0"
                              ><v-text-field
                                v-model="qualification.institution"
                                outlined
                                label="School/ College/ University *"
                                rounded
                                class="rounded-xl"
                                :rules="[rules.required]"
                                required
                              ></v-text-field
                            ></v-col>
                          </v-row>
                          <v-row class="py-0">
                            <v-col class="py-0"
                              ><v-text-field
                                v-model="qualification.programme"
                                outlined
                                label="Degree/ Diploma/ Certification *"
                                rounded
                                class="rounded-xl"
                                :rules="[rules.required]"
                                required
                              ></v-text-field
                            ></v-col> </v-row
                          ><v-row class="py-0">
                            <v-col class="py-0"
                              ><v-text-field
                                v-model="qualification.field_of_study"
                                outlined
                                label="Field of Study"
                                rounded
                                class="rounded-xl"
                              ></v-text-field
                            ></v-col>
                          </v-row>

                          <v-row class="py-0">
                            <v-col cols="6" class="py-0"
                              ><v-text-field
                                v-model="qualification.start_date"
                                outlined
                                label="Start Date"
                                rounded
                                class="rounded-xl"
                                type="date"
                                :rules="dobRules"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" class="py-0"
                              ><v-text-field
                                v-model="qualification.end_date"
                                outlined
                                label="End Date"
                                rounded
                                class="rounded-xl"
                                type="date"
                                :rules="dobRules"
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
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>

                    <v-row>
                      <v-col class="mt-4">
                        <v-btn text @click="addAcademicQualification"
                          >Add More Qualification</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-form>
              <v-btn
                rounded
                outlined
                class="mx-4 my-4"
                color="primary"
                @click="e1 = 1"
              >
                BACK
              </v-btn>
              <v-btn
                rounded
                color="secondary"
                class="black--text"
                @click="goToStep3"
              >
                NEXT
              </v-btn>
            </v-stepper-content>

            <!-- <v-stepper-content step="2" v-model="expandedPanelIndex">
              <v-form lazy-validation ref="step2">
                <v-card elevation="0" id="myScroll">
                  <v-card
                    :height="getHeight - 400 + 'px'"
                    class="pa-4"
                    elevation="0"
                  >
                    <v-row class="py-0">
                      <v-col class="py-0"
                        ><v-text-field
                          v-model="academicsInfo.institution"
                          outlined
                          label="School/ College/ University *"
                          rounded
                          class="rounded-xl"
                          :rules="[rules.required]"
                          required
                        ></v-text-field
                      ></v-col>
                    </v-row>
                    <v-row class="py-0">
                      <v-col class="py-0"
                        ><v-text-field
                          v-model="academicsInfo.programme"
                          outlined
                          label="Degree/ Diploma/ Certification *"
                          rounded
                          class="rounded-xl"
                          :rules="[rules.required]"
                          required
                        ></v-text-field
                      ></v-col> </v-row
                    ><v-row class="py-0">
                      <v-col class="py-0"
                        ><v-text-field
                          v-model="academicsInfo.fieldOfStudy"
                          outlined
                          label="Field of Study *"
                          rounded
                          class="rounded-xl"
                          :rules="[rules.required]"
                          required
                        ></v-text-field
                      ></v-col>
                    </v-row>

                    <v-row class="py-0">
                      <v-col cols="6" class="py-0"
                        ><v-text-field
                          v-model="academicsInfo.startDate"
                          outlined
                          label="Start Date"
                          append-icon="mdi-calendar"
                          rounded
                          class="rounded-xl"
                        ></v-text-field
                      ></v-col>
                      <v-col cols="6" class="py-0"
                        ><v-text-field
                          v-model="academicsInfo.endDate"
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
                          v-model="academicsInfo.extraCarricularActivities"
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
                          v-model="academicsInfo.achievements"
                          outlined
                          label="Achievements"
                          rounded
                          class="rounded-xl"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-form>

              <v-btn
                rounded
                outlined
                class="mx-4 my-4"
                color="primary"
                @click="e1 = 1"
              >
                BACK
              </v-btn>
              <v-btn
                rounded
                color="secondary"
                class="black--text"
                @click="goToStep3"
              >
                NEXT
              </v-btn>
            </v-stepper-content> -->

            <!------------------------------------------ STEP 3 ------------------------------------------>

            <v-stepper-content step="3" v-model="expandedPanelIndex">
              <v-form lazy-validation ref="step3">
                <v-card elevation="0">
                  <v-card class="pa-4" elevation="0">
                    <v-expansion-panels v-model="expandedPanelIndex">
                      <v-expansion-panel
                        v-for="(professional, index) in professionalInfos"
                        :key="index"
                        elevation="0"
                      >
                        <v-expansion-panel-header>{{
                          "Professional: " + index
                        }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-row class="py-0">
                            <v-col cols="3" class="py-0"
                              ><v-radio-group
                                mandatory
                                row
                                v-model="experience"
                                :rules="[rules.required]"
                                required
                              >
                                <v-radio
                                  label="Fresher"
                                  value="Fresher"
                                ></v-radio>
                                <v-radio
                                  label="Experienced"
                                  value="Experienced"
                                >
                                </v-radio> </v-radio-group
                            ></v-col>
                            <v-col
                              v-if="experience == 'Experienced'"
                              cols="2"
                              class="py-0"
                            >
                              <v-text-field
                                label="Years *"
                                type="number"
                                outlined
                                class="rounded-xl"
                                :rules="[rules.required]"
                                required
                                v-model="professional.experience_year"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col
                              v-if="experience == 'Experienced'"
                              cols="2"
                              class="py-0"
                            >
                              <v-text-field
                                label="Month"
                                type="number"
                                outlined
                                class="rounded-xl"
                                v-model="professional.experience_month"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row class="py-0">
                            <v-col class="py-0"
                              ><v-text-field
                                outlined
                                label="Role/ Position *"
                                rounded
                                class="rounded-xl"
                                counter="100"
                                maxLength="100"
                                :rules="[rules.required]"
                                required
                                v-model="professional.position"
                              ></v-text-field
                            ></v-col> </v-row
                          ><v-row class="py-0">
                            <v-col class="py-0"
                              ><v-select
                                label="Employment Type"
                                :items="employeeType"
                                outlined
                                item-value="id"
                                item-text="name"
                                class="rounded-xl"
                                v-model="professional.employee_type_id"
                              >
                              </v-select
                            ></v-col>
                          </v-row>

                          <v-row class="py-0">
                            <v-col class="py-0"
                              ><v-select
                                label="School / Institute"
                                :items="tableData"
                                outlined
                                item-value="id"
                                item-text="name"
                                class="rounded-xl"
                                v-model="professional.school_id"
                                @click="getSchool"
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
                                rounded
                                class="rounded-xl"
                                v-model="professional.start_date"
                                type="date"
                                :rules="dobRules"
                              ></v-text-field
                            ></v-col>
                            <v-col cols="6" class="py-0"
                              ><v-text-field
                                :disabled="isCurrentlyWorking"
                                outlined
                                label="End Date"
                                rounded
                                class="rounded-xl"
                                v-model="professional.end_date"
                                type="date"
                                :rules="dobRules"
                              ></v-text-field
                            ></v-col>
                          </v-row>
                          <v-row class="py-0">
                            <v-col class="py-0"
                              ><v-select
                                label="Board"
                                :items="tableBoards"
                                item-text="name"
                                item-value="id"
                                outlined
                                class="rounded-xl"
                                v-model="professional.board_id"
                                @click="getBoards"
                              >
                              </v-select
                            ></v-col> </v-row
                          ><v-row class="py-0">
                            <v-col class="py-0">
                              <v-autocomplete
                               
                                clearable
                                deletable-chips
                                label="Level"
                                outlined
                                class="rounded-xl"
                                chips
                                :search-input.sync="searchLevels"
                                :items="tableLevels"
                                multiple

                                item-text="name"
                                item-value="id"
                              >
                              </v-autocomplete>
                            </v-col> </v-row
                          ><v-row class="py-0">
                            <v-col class="py-0"
                              ><v-select
                                label="Grade"
                                :items="tableGrades"
                                outlined
                                item-text="name"
                                item-value="id"
                                class="rounded-xl"
                                
                              >
                              </v-select
                            ></v-col> </v-row
                          ><v-row class="py-0">
                            <v-col class="py-0">
                              <v-autocomplete
                              
                                clearable
                                deletable-chips
                                label="Subject"
                                outlined
                                class="rounded-xl"
                                chips
                                :search-input.sync="searchSubject"
                                :items="subjectData"
                                multiple
                                item-text="name"
                                item-value="id"
                               
                              >
                              </v-autocomplete>
                            </v-col>
                          </v-row>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <v-row>
                      <v-col class="mt-4">
                        <v-btn text @click="addProfessionalInfo"
                          >Add More Qualification</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </v-card>
              </v-form>
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
                  <v-btn
                    rounded
                    depressed
                    color="secondaryAccent"
                    class="primary--text my-4"
                    @click="saveDetails"
                  >
                    SAVE DETAILS
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="secondary"
                    class="black--text ma-4"
                    @click="startTest"
                  >
                    START TEST
                  </v-btn>
                </v-row>
              </v-container>
            </v-stepper-content>

            <!-- <v-stepper-content step="3" v-model="expandedPanelIndex">
              <v-form lazy-validation ref="step3">
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
                          v-model="professionalInfo.experienceYear"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-row class="py-0">
                      <v-col class="py-0"
                        ><v-text-field
                          v-model="professionalInfo.position"
                          outlined
                          label="Role/ Position *"
                          rounded
                          class="rounded-xl"
                          :rules="[rules.required]"
                          required
                        ></v-text-field
                      ></v-col> </v-row
                    ><v-row class="py-0">
                      <v-col class="py-0"
                        ><v-select
                          label="Employment Type"
                          :items="['Permanent', 'Contract', 'Prohibition']"
                          outlined
                          class="rounded-xl"
                          v-model="professionalInfo.employeeTypeId"
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
              </v-form>

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
                  <v-btn
                    rounded
                    depressed
                    color="secondaryAccent"
                    class="primary--text my-4"
                    @click="createUser"
                  >
                    SAVE DETAILS
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    color="secondary"
                    class="black--text ma-4"
                    @click="startTest"
                  >
                    START TEST
                  </v-btn>
                </v-row>
              </v-container>
            </v-stepper-content> -->
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
import AddressController from "@/controllers/AddressController.js";
import PersonalInfoController from "@/controllers/PersonalInfoController.js";
import AcademicsController from "@/controllers/AcademicsController.js";
import ProfessionalController from "@/controllers/ProfessionalController.js";
import SchoolController from "@/controllers/SchoolController";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import GradeController from "@/controllers/GradeController";
import SubjectController from "@/controllers/SubjectController";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";


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
      experienceYear: 0,
      experienceMonth: 0,
      rolePosition: "",
      employeeTypeId: 0,
      boardId: 0,
      startDate: null,
      endDate: null,
      expandedPanelIndex: 0,
      countries: [],
      states: [],
      districts: [],
      cities: [],
      talukas: [],
      schoolData: "",
      tableData: [],
      tableBoards: [],
      tableLevels: [],
      tableGrades: [],
      subjectData: [],
      searchSubject: "",
      searchLevels: "",
      boardData: "",
      userInfo: {},

      isCreatingUser: false,
      successDialog: false,
      errorDialog: false,
      dobRules: [
        (v) => !!v || "Date of Birth is required",
        // (v) =>
        //   /^\d{4}-\d{2}-\d{2}$/.test(v) ||
        //   "Date of Birth must be in YYYY-MM-DD format",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      personalInfo: {
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        dob: "",
        gender: "",
        phone_no: "",
        country_id: 0,
        state_id: 0,
        city_id: 0,
        address: "",
        pincode: 0,
       
      },
      academicQualifications: [
        {
          institution: "",
          programme: "",
          start_date: Date.now(),
          end_date: Date.now(),
          field_of_study: "",
          extra_carricular_activities: [],
          grade_score: 0,
          grade_type: "",
          achievements: [],
          certificate_url: "",
        },
      ],
      professionalInfos: [
        {
          experience_year: 0,
          experience_month: 0,
          position: "",
          employee_type_id: 0,
          board_id: 0,
          start_date: Date.now(),
          end_date: Date.now(),
          level_ids: "1,2,3",
          grade_ids: "1,2,3",
          subject_ids: "1,2,3",
          school_id: 0,
          other_name: "",
        },
      ],
      employeeType: [
        {
          id: 1,
          name: "Permanent",
        },
        {
          id: 2,
          name: "Contract",
        },
        {
          id: 3,
          name: "Prohibition",
        },
      ],
      rules: {
        required: (value) => !!value || "Field is required",
      },
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
    async goToStep2() {
     
      if (this.$refs.step1.validate()) {
        console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await PersonalInfoController.createUserPersonalInfo(
          this.personalInfo
        );
        console.log(response);
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.e1 = 2;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
        }
      }
    },
    async goToStep3() {
     
      if (this.$refs.step2.validate()) {
        console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await AcademicsController.createUserAcademicsInfo(
          this.academicQualifications
        );
        console.log(response);
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.e1 = 3;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
        }
      }
    },
    async saveDetails() {
      console.log("function");
      if (this.$refs.step3.validate()) {
        console.log("userif conditon");
        this.isCreatingUser = true;
        const response =
          await ProfessionalController.createUserProfessionalInfo(
            this.professionalInfos
          );
        console.log(response);
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.$router.push("/");
        } else {
          this.isCreatingUser = false;
        }
      }
    },
    async startTest() {
      if (this.$refs.step3.validate()) {
        this.isCreatingUser = true;
        const response =
          await ProfessionalController.createUserProfessionalInfo(
            this.professionalInfos
          );
        console.log(response);
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.$router.push("/");
        } else {
          this.isCreatingUser = false;
        }
      }
    },
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      console.log(this.userInfo);
      this.personalInfo.email=this.userInfo.email;
      this.personalInfo.phone_no=this.userInfo.phone_no;
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
    async fetchCountries() {
      const response = await AddressController.getCountries();
      this.countries = response.data.data.rows;
      //console.log(this.countries);
    },
    async fetchStates() {
      const response = await AddressController.getStates(
        this.personalInfo.country_id
      );
      this.states = response.data.data.rows;
      //console.log(this.states);
    },
    async fetchDistricts() {
      const response = await AddressController.getDistricts(
        this.personalInfo.state_id
      );
      this.districts = response.data.data.rows;
      //console.log(this.districts);
      this.fetchCities();
    },
    async fetchTalukas() {
      const response = await AddressController.getTalukas(
        this.personalInfo.districtId
      );
      this.talukas = response.data.data.rows;
      //console.log(this.talukas);
    },
    async fetchCities() {
      const response = await AddressController.getCities(
        this.personalInfo.state_id
      );
      this.cities = response.data.data.rows;
      //console.log(this.cities);
    },
    async getSchool() {
      const response = await SchoolController.getSchool();
      console.log(response);
      this.schoolData = response.data.data;
      this.tableData = this.schoolData.rows;
    },
    async getBoards() {
      const response = await BoardController.getBoards();
      console.log(response);
      this.boardData = response.data.data;
      this.tableBoards = this.boardData.rows;
    },
    async getLevel() {
      const response = await LevelController.getLevel();
      this.tableLevels = response.data.data.rows;
      console.log("table data", this.tableData);
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      console.log(response);
      this.gradeData = response.data.data;
      this.tableGrades = this.gradeData.rows;
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      this.subjectData = response.data.data.rows;
    },

    addAcademicQualification() {
      this.academicQualifications.push({
        institution: "",
        programme: "",
        start_date: "",
        end_date: "",
        field_of_study: "",
        extra_carricular_activities: [],
        grade_score: 0,
        grade_type: "",
        achievements: [],
        certificate_url: "",
      });
      this.expandedPanelIndex = this.academicQualifications.length - 1;
    },
    addProfessionalInfo() {
      this.professionalInfos.push({
        experience_year: 0,
        experience_month: 0,
        position: "",
        employee_type_id: 0,
        board_id: 0,
        start_date: "",
        end_date: "",
        level_ids: "",
        grade_ids: "",
        subject_ids: "",
        school_id: 0,
        other_name: "",
      });
      this.expandedPanelIndex = this.professionalInfos.length - 1;
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
    filteredLevel() {
      if (this.searchLevels) {
        const regex = new RegExp(this.searchLevels);
        return this.tableLevels.filter((tableLevels) =>
          regex.test(tableLevels.name)
        );
      } else {
        return this.tableLevels;
      }
    },
    filteredSubject() {
      if (this.searchSubject) {
        const regex = new RegExp(this.searchSubject);
        return this.subject.filter((subject) => regex.test(subject.name));
      } else {
        return this.subject;
      }
    },

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
  created() {
    this.getUserInfo();
    this.getLevel();
   this.getGrades();
   this.getSubjects();
  },
};
</script>