<template>
  <div class="surface">
    <v-app-bar color="surface" elevation="0" fixed>
      <v-list-item>
        <v-list-item-icon class="pt-4">
          <v-img src="../assets/logo.svg" contain max-width="16rem"></v-img>
        </v-list-item-icon>
      </v-list-item>
    </v-app-bar>

    <v-dialog v-model="deleteDialog" max-width="366px" persistent>
      <v-card fluid>
        <v-container fluid class="pa-0">
          <v-card-text class="text-center">
            <v-avatar color="#db44371f" size="90"
              ><v-icon size="65" color="#DB4437"
                >mdi-trash-can-outline</v-icon
              ></v-avatar
            >

            <p class="text-h5 pt-4 pb-0">
              Are Sure you want to delete this Info ?
            </p>
            <p
              class="text-disabled grey--text text-subtitle-1"
              color="rgba(0, 0, 0, 0.6)"
              disabled
            >
              This action will permanently delete the item . This cannot be
              undone
            </p>

            <div class="d-flex justify-space-between" fluid>
              <v-btn
                class="black--text"
                color="#0000001a"
                large
                width="157px"
                rounded
                @click="deleteDialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="secondary textcolor--text"
                large
                width="157px"
                rounded
                @click="removeDataFromSteps()"
                >DELETE</v-btn
              >
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="otpDialog" max-width="450px" class="center">
      <v-card height="100%" elevation="0" class="pb-8">
        <v-card-title class="justify-center text-h5 font-weight-bold">
          {{ usingPhone ? "Verify Your Phone Number" : "Verify Your Email" }}
        </v-card-title>
        <v-card-text class="text-center text-body-1"
          ><span>Enter 6 Digit Code Sent On</span><br /><span>{{
            usingPhone ? "Your Phone Number" : "Your Email Address"
          }}</span></v-card-text
        >

        <div class="d-flex flex-column pl-8 pr-8">
          <v-otp-input length="6" type="number" v-model="otp"></v-otp-input>
          <v-row justify="space-between" class="ma-0 pa-0">
            <v-col class="ma-0 pa-0">
              <v-card-subtitle class="ma-0 pa-0"
                >0{{ Math.floor(time / 60) }}:
                <span v-if="time % 60 < 10">0</span
                >{{ time % 60 }}</v-card-subtitle
              >
            </v-col>
            <v-col class="ma-0 pa-0">
              <v-card-subtitle class="ma-0 pa-0 text-end">
                {{ otp.length }}/6</v-card-subtitle
              >
            </v-col>
          </v-row>
        </div>

        <v-card-text class="text-center">
          <v-btn
            class="primary--text cursor"
            on
            text
            elevation="0"
            :disabled="!resendBool"
            @click="usingPhone ? generatePhoneOtp() : generateOtp()"
          >
            RESEND OTP
          </v-btn>
        </v-card-text>
        <v-card-title class="justify-center">
          <v-btn
            color="secondary"
            class="textcolor--text"
            rounded
            large
            width="90%"
            height="40"
            @click="validateOTP"
          >
            VERIFY
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>

    <v-card
      color="surface"
      :height="getHeight - 64 + 'px'"
      depressed
      elevation="0"
    >
      <v-card-title class="justify-center mt-10"> Welcome </v-card-title>
      <v-card-subtitle class="text-center"
        ><span
          >Let's start your profile, connect to people you know, and engage
          with</span
        ><br /><span>them on topics you care about.</span></v-card-subtitle
      >
      <v-container>
        <v-stepper v-model="e1" class="rounded-lg">
          <v-stepper-header class="text-subtitle-2 secondaryAccent rounded-lg">
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
                            <v-avatar
                              color="#82D2DA"
                              size="30"
                              class="camerabtn"
                            >
                              <v-icon size="25px" class="text--color">
                                mdi-camera-outline
                              </v-icon>
                            </v-avatar>
                          </div>
                        </image-input> </v-card-title
                      ><v-card-subtitle class="text-center"
                        >**Allowed File Types:jpeg, jpg, png**</v-card-subtitle
                      >
                    </v-col>
                    <v-col cols="10">
                      <v-card
                        :height="getHeight - 350 + 'px'"
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
                              :rules="[v => !!v || 'Title is required']"
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
                              :rules="[v => !!v || 'First Name is required']"
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
                              :rules="[v => !!v || 'Last Name is required']"
                              required
                            ></v-text-field
                          ></v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col class="py-0">
                            <v-form v-model="emailBool">
                              <v-text-field
                                v-model="personalInfo.email"
                                outlined
                                label="Email Address *"
                                rounded
                                :readonly="personalInfo.is_email_verified"
                                class="rounded-xl"
                                :rules="[v => !!v || 'Email Address is required']"
                                required
                                @keydown.enter.prevent="submit"
                              >
                                <template #append>
                                  <div>
                                    <v-btn
                                      on
                                      text
                                      class="mb-4"
                                      max-height="35"
                                      :disabled="!emailBool"
                                      v-if="!personalInfo.is_email_verified"
                                      btn-text-transform="lowercase"
                                      @click="generateOtp(), (otpDialog = true)"
                                    >
                                      Verify
                                    </v-btn>

                                    <v-row
                                      v-if="personalInfo.is_email_verified"
                                    >
                                      <v-col class="px-0">
                                        <v-img
                                          src="../assets/verifiedIcon.png"
                                          contain
                                          max-width="18"
                                        ></v-img>
                                      </v-col>
                                      <v-col class="px-0">
                                        <p color="“primary”" on text>
                                          Verified
                                        </p>
                                      </v-col>
                                    </v-row>
                                  </div>
                                </template></v-text-field
                              >
                            </v-form>
                          </v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col class="py-0">
                            <v-text-field
                              v-model="personalInfo.phone_no"
                              label="Your 10-digit mobile no."
                              outlined
                              :readonly="personalInfo.is_phone_verified"
                              rounded
                              class="rounded-xl"
                              @keypress="isNumber($event)"
                              counter="10"
                              prefix="+91"
                              :type="
                                !personalInfo.is_phone_verified
                                  ? 'number'
                                  : 'text'
                              "
                             
                              :rules="[
                                v => !!v || 'Mobile number is required',
                                (v) =>
                                  (v && v.length >= 10 && v.length <= 10) ||
                                  'Mobile number must be 10 digit',
                              ]"
                              required
                            >
                              <template #append>
                                <div class="px-0 py-0">
                                  <v-btn
                                    on
                                    text
                                    max-height="35"
                                    class="mb-4"
                                    :disabled="
                                      personalInfo.phone_no.length != 10
                                    "
                                    v-if="
                                      !personalInfo.is_phone_verified &&
                                      usingPhone
                                    "
                                    @click="
                                      generatePhoneOtp(), (otpDialog = true)
                                    "
                                  >
                                    verify
                                  </v-btn>

                                  <v-row v-if="personalInfo.is_phone_verified">
                                    <v-col class="px-0">
                                      <v-img
                                        src="../assets/verifiedIcon.png"
                                        contain
                                        max-width="18"
                                      ></v-img>
                                    </v-col>

                                    <v-col class="px-0">
                                      <p color="“primary”" on text>Verified</p>
                                    </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-text-field>
                          </v-col>
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
                              :rules="[v => !!v || 'Date of Birth is required']"
                              required
                            ></v-text-field
                          ></v-col>
                          <v-col cols="2" class="py-0">
                            <v-select
                              v-model="personalInfo.gender"
                              label="Gender*"
                              :items="['FEMALE', 'MALE', 'OTHERS']"
                              outlined
                              class="rounded-xl"
                              :rules="[v => !!v || 'Gender is required']"
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
                              :rules="[v => !!v || 'Country name is required']"
                              required
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
                              :rules="[v => !!v || 'State name is required']"
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
                              :rules="[v => !!v || 'District name is required']"
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
                              :rules="[v => !!v || 'City / Village name is required']"
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
                              @keypress="isNumber($event)"
                              label="Pin Code *"
                              rounded
                              class="rounded-xl"
                              :rules="[
                                v => !!v || 'Pincode is required',
                                (v) =>
                                  (v && v.length >= 6 && v.length <= 6) ||
                                  'Pincode must be 6 digit',
                              ]"
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
                    <v-divider></v-divider>
                    <v-card-title>
                      <v-btn
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

            <v-stepper-content
              step="2"
              v-model="expandedPanelIndex"
              class="pb-0"
            >
              <v-card
                :height="getHeight - 350 + 'px'"
                id="myScroll"
                elevation="0"
                depressed
              >
                <v-form lazy-validation ref="step2">
                  <v-card elevation="0">
                    <v-card class="pa-4" elevation="0">
                      <v-expansion-panels v-model="expandedPanelIndex">
                        <v-expansion-panel
                          v-for="(
                            qualification, index
                          ) in academicQualifications"
                          :key="index"
                          elevation="0"
                        >
                          <v-expansion-panel-header>
                            <div
                              class="d-flex flex-column"
                              v-if="expandedPanelIndex != index"
                            >
                              <div class="font-weight-regular">
                                {{ index + 1 + ". " + qualification.programme }}
                              </div>
                              <div class="text-body-2 grey--text pt-2 pb-2">
                                {{ qualification.institution }}
                              </div>
                              <div class="text-body-2 grey--text">
                                {{
                                  new Date(
                                    qualification.start_date
                                  ).getFullYear() +
                                  " - " +
                                  new Date(qualification.end_date).getFullYear()
                                }}
                              </div>
                            </div>
                          </v-expansion-panel-header>

                          <v-expansion-panel-content>
                            <v-row class="py-0">
                              <v-col class="py-0"
                                ><v-text-field
                                  v-model="qualification.institution"
                                  outlined
                                  label="School/ College/ University *"
                                  rounded
                                  class="rounded-xl"
                                  :rules="[v => !!v || 'School/ College/ University name is required']"
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
                                  :rules="[v => !!v || 'Degree/ Diploma/ Certification name is required']"
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
                                  :rules="[v => !!v || 'Start Date is required']"
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
                                  :rules="[v => !!v || 'End Date is required']"
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
                            <v-row v-if="index != 0">
                              <v-col cols="12" class="d-flex justify-end">
                                <v-btn
                                  @click="
                                    (index) => {
                                      indexValue = index;
                                      deleteDialog = true;
                                    }
                                  "
                                  text
                                  class="d-flex justify-end red--text"
                                  >Remove</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>

                      <v-row>
                        <v-col class="mt-4">
                          <v-btn
                            text
                            @click="addAcademicQualification"
                            class="textcolor--text"
                            ><v-icon>mdi-plus-circle-outline</v-icon>Add
                            Educational Qualification (optional)</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-form>
              </v-card>
              <v-divider class="mt-2"></v-divider>
              <v-btn rounded outlined class="mx-4 my-4" @click="e1 = 1">
                BACK
              </v-btn>
              <v-btn
                rounded
                color="secondary"
                class="black--text my-4"
                @click="goToStep3"
              >
                NEXT
              </v-btn>
            </v-stepper-content>

            <!------------------------------------------ STEP 3 ------------------------------------------>

            <v-stepper-content
              step="3"
              v-model="expandedPanelIndex"
              class="pb-0"
            >
              <v-card
                :height="getHeight - 350 + 'px'"
                id="myScroll"
                elevation="0"
                depressed
              >
                <v-form lazy-validation ref="step3">
                  <v-card elevation="0" class="mb-8">
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
                              <v-col class="py-0">
                                <v-card
                                  width="100%"
                                  elevation="0"
                                  class="mb-10 rounded-xl"
                                  outlined
                                  ><v-radio-group
                                    mandatory
                                    row
                                    v-model="experience"
                                    :rules="[v => !!v || 'Please select one']"
                                    required
                                  >
                                    <v-col class="py-0">
                                      <v-row class="py-0 px-0 ml-2">
                                        <v-radio
                                          class="mb-8 py-0"
                                          label="I have"
                                          value="Experienced"
                                        >
                                        </v-radio>

                                        <v-col
                                          cols="1 center"
                                          class="py-0 px-0"
                                        >
                                          <v-text-field
                                            type="number"
                                            outlined
                                            @keypress="isNumber($event)"
                                            class="rounded-xl"
                                            v-model="
                                              professional.experience_year
                                            "
                                          >
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="1 center" class="py-0 px-0"
                                          ><div class="pt-4 ml-4">
                                            Years
                                          </div></v-col
                                        >
                                        <v-col cols="1" class="py-0 px-0">
                                          <v-text-field
                                            type="number"
                                            @keypress="isNumber($event)"
                                            outlined
                                            class="rounded-xl"
                                            v-model="
                                              professional.experience_month
                                            "
                                          >
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="4 center" class="py-0 px-0"
                                          ><div class="pt-4 ml-4">
                                            Months of experiences
                                          </div></v-col
                                        >
                                      </v-row>
                                      <v-row class="pb-4 ml-2">
                                        <v-radio
                                          label="Fresher"
                                          value="Fresher"
                                        >
                                        </v-radio
                                      ></v-row>
                                    </v-col> </v-radio-group
                                ></v-card>
                              </v-col>
                            </v-row>
                            <div v-if="experience == 'Experienced'">
                              <v-row class="py-0">
                                <v-col class="py-0"
                                  ><v-text-field
                                    outlined
                                    label="Role/ Position *"
                                    rounded
                                    class="rounded-xl"
                                    counter="100"
                                    maxLength="100"
                                    :rules="[v => !!v || 'Role/ Position name is required']"
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
                                    :items="schoolData"
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
                                    :rules="[v => !!v || 'Start Date is required']"
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
                                    :rules="[v => !!v || 'End Date is required']"
                                    ></v-text-field
                                ></v-col>
                              </v-row>
                              <v-row class="py-0">
                                <v-col class="py-0">
                                  <v-select
                                    label="Board"
                                    :items="boardsData"
                                    item-text="name"
                                    item-value="id"
                                    outlined
                                    class="rounded-xl"
                                    v-model="professional.board_id"
                                  >
                                  </v-select>
                                </v-col> </v-row
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
                                <v-col class="py-0">
                                  <v-autocomplete
                                    clearable
                                    deletable-chips
                                    label="Grades"
                                    outlined
                                    class="rounded-xl"
                                    chips
                                    :items="gradesData"
                                    multiple
                                    item-text="name"
                                    item-value="id"
                                  >
                                  </v-autocomplete>
                                </v-col> </v-row
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
                                    :items="subjectsData"
                                    multiple
                                    item-text="name"
                                    item-value="id"
                                  >
                                  </v-autocomplete>
                                </v-col>
                              </v-row>
                            </div>

                            <div v-if="experience != 'Experienced'">
                              <v-row class="py-0">
                                <v-col class="py-0">
                                  <v-autocomplete
                                    clearable
                                    deletable-chips
                                    label="Which board do you want to teach?"
                                    outlined
                                    class="rounded-xl"
                                    chips
                                    :items="boardsData"
                                    item-text="name"
                                    item-value="id"
                                    multiple
                                  >
                                  </v-autocomplete>
                                </v-col> </v-row
                              ><v-row class="py-0">
                                <v-col class="py-0">
                                  <v-autocomplete
                                    clearable
                                    deletable-chips
                                    label="Which level do you want to teach?"
                                    outlined
                                    class="rounded-xl"
                                    chips
                                    :items="tableLevels"
                                    multiple
                                    item-text="name"
                                    item-value="id"
                                  >
                                  </v-autocomplete>
                                </v-col>
                              </v-row>

                              <v-row class="py-0">
                                <v-col class="py-0">
                                  <v-autocomplete
                                    clearable
                                    deletable-chips
                                    label="Which subject do you want to teach?"
                                    outlined
                                    class="rounded-xl"
                                    chips
                                    :items="subjectsData"
                                    multiple
                                    item-text="name"
                                    item-value="id"
                                  >
                                  </v-autocomplete>
                                </v-col>
                              </v-row>
                            </div>
                            <v-row
                              v-if="experience == 'Experienced' && index != 0"
                            >
                              <v-col cols="12" class="d-flex justify-end">
                                <v-btn
                                  @click="
                                    (index) => {
                                      indexValue = index;
                                      deleteDialog = true;
                                    }
                                  "
                                  text
                                  class="d-flex justify-end red--text"
                                  >Remove</v-btn
                                >
                              </v-col>
                            </v-row>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                      <v-row>
                        <v-col class="mt-4" v-if="experience == 'Experienced'">
                          <v-btn
                            text
                            @click="addProfessionalInfo"
                            class="textcolor--text"
                            ><v-icon>mdi-plus-circle-outline</v-icon>Add more
                            professional details(optional)</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-form>
              </v-card>

              <v-container>
                <v-divider></v-divider>
                <v-row class="mt-0">
                  <v-btn rounded outlined class="ma-4" @click="e1 = 2">
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
                  <!-- <v-btn
                    rounded
                    color="secondary"
                    class="black--text ma-4"
                    @click="startTest"
                    depressed
                  >
                    PROCEED TO ASSESSMENT
                  </v-btn> -->
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
import AuthService from "../services/AuthService";

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
      phoneVerify: false,
      emailVerify: false,
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
      deleteDialog: false,
      boardId: 0,
      startDate: null,
      otpDialog: false,
      resendBool: false,
      endDate: null,
      expandedPanelIndex: 0,
      countries: [],
      states: [],
      districts: [],
      cities: [],
      talukas: [],
      schoolData: "",
      otp: "",
      time: 119,
      emailBool: false,
      usingPhone: true,

      tableLevels: [],

      subjectsData: [],

      searchSubject: "",
      searchLevels: "",
      searchBoards: "",
      boardsData: "",
      userInfo: {},
      indexValue: null,

      isCreatingUser: false,
      successDialog: false,
      errorDialog: false,
      dobRules: [
        (v) => !!v || "Field is required",
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
        is_phone_verified: false,
        is_email_verified: false,
      },
      academicQualifications: [
        {
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
        },
      ],
      professionalInfos: [
        {
          experience_year: 0,
          experience_month: 0,
          position: "",
          employee_type_id: 0,
          board_id: 0,
          start_date: "",
          end_date: "",
          level_ids: "40,41,49",
          // level_ids: [],
          grade_ids: "91",
          subject_ids: "68,69,70",
          // subject_ids: [],
          school_id: 0,
          other_name: "",
          deleteIndex: null,
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
    };
  },
  methods: {
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    async location() {
      this.isFetchingLocation = true;
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.lat = position.coords.latitude; //'26.4838767';
          this.long = position.coords.longitude; //'80.3211793';
          var url = `https://geocode.maps.co/reverse?lat=${this.lat}&lon=${this.long}`;
          const response = await axios.get(url);
          // console.log(response.data.address);
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
    removeDataFromSteps() {
      this.deleteDialog = true;
      if (this.e1 == 2) {
        this.academicQualifications.splice(this.indexValue, 1);
      } else if (this.e1 == 3) {
        this.professionalInfos.splice(this.indexValue, 1);
      }
      this.deleteDialog = false;
      this.indexValue = null;
    },
    async goToStep2() {
      if (this.$refs.step1.validate()) {
        // console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await PersonalInfoController.createUserPersonalInfo(
          this.personalInfo
        );
        // console.log(response);
        if (response.data.success) {
          this.$mixpanel.track("AcademicsPageLoaded", {
            user_type: "job_seeker",
            screen_name: "AcademicsScreen",
          });
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
        // console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await AcademicsController.createUserAcademicsInfo(
          this.academicQualifications
        );
        // console.log(response);
        if (response.data.success) {
          this.$mixpanel.track("NextButtonClicked", {
            academics_info: this.academicQualifications,
            screen_name: "AcademicProfileInformationScreen",
          });
          this.$mixpanel.track("ProfessionInfoStepLoaded", {
            user_type: "job_seeker",
            screen_name: "ProfessionInfoScreen",
          });
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
        this.$mixpanel.track("SaveProfileDetailsClicked", {
          personal_info: this.personalInfo,
          academics_info: this.academicQualifications,
          professional_info: this.professionalInfos,
          screen_name: "ProfileProfessionalInfoScreen",
        });
        // this.professionalInfos.forEach((object)=>{
        //       object.level_ids.join(", ");
        //       object.level_ids = JSON.stringify(object.level_ids)
        //       object.level_ids = object.level_ids.replace('[', '')
        //       object.level_ids = object.level_ids.replace(']', '')

        //       object.subject_ids.join(", ");
        //       object.subject_ids = JSON.stringify(object.subject_ids)
        //       object.subject_ids = object.subject_ids.replace('[', '')
        //       object.subject_ids = object.subject_ids.replace(']', '')

        //       object.grade_ids.join(", ");
        //       object.grade_ids = JSON.stringify(object.grade_ids)
        //       object.grade_ids = object.grade_ids.replace('[', '')
        //       object.grade_ids = object.grade_ids.replace(']', '')

        //       object.board_id.join(", ");
        //       object.board_id = JSON.stringify(object.board_id)
        //       object.board_id = object.board_id.replace('[', '')
        //       object.board_id = object.board_id.replace(']', '')

        // })

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
        // console.log(response);
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
      this.personalInfo.is_email_verified = this.userInfo.is_email_verified;
      this.personalInfo.is_phone_verified = this.userInfo.is_phone_verified;
      this.personalInfo.email = this.userInfo.email;
      this.personalInfo.phone_no = this.userInfo.phone_no.slice(-10);
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
      this.countries.reverse();

      //console.log(this.countries);
    },
    async fetchStates() {
      const response = await AddressController.getStates(
        this.personalInfo.country_id
      );
      this.states = response.data.data.rows;
      this.states.reverse();
      //console.log(this.states);
    },
    async fetchDistricts() {
      const response = await AddressController.getDistricts(
        this.personalInfo.state_id
      );
      this.districts = response.data.data.rows;
      this.district.reverse();

      //console.log(this.districts);
      this.fetchCities();
    },
    async fetchTalukas() {
      const response = await AddressController.getTalukas(
        this.personalInfo.districtId
      );
      this.talukas = response.data.data.rows;
      this.talukas.reverse();

      //console.log(this.talukas);
    },
    async fetchCities() {
      const response = await AddressController.getCities(
        this.personalInfo.state_id
      );
      this.cities = response.data.data.rows;
      this.cities.reverse();

      //console.log(this.cities);
    },
    async getSchool() {
      const response = await SchoolController.getSchool();
      // console.log(response);
      this.schoolData = response.data.data.rows;
    },
    async getBoards() {
      const response = await BoardController.getBoards();
      // console.log(response);
      this.boardsData = response.data.data.rows;
      console.log("board log", this.boardsData);
    },
    async getLevel() {
      const response = await LevelController.getLevel();
      this.tableLevels = response.data.data.rows;
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      // console.log(response);
      this.gradesData = response.data.data.rows;
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();
      this.subjectsData = response.data.data.rows;
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
    async generateOtp() {
      this.usingPhone = false;
      this.resendBool = false;
      this.time = 119;

      await AuthService.generateOTP({
        email: this.personalInfo.email,
      });
      this.$mixpanel.track("VerifyEmailClicked", {
        email_address: this.personalInfo.email,
        screen_name: "PersonalProfileInformationScreen",
      });

      // console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
    },
    async generatePhoneOtp() {
      this.time = 119;
      this.resendBool = false;
      await AuthService.generateOTP({
        mobile: "+91" + this.personalInfo.phone_no,
      });
      this.$mixpanel.track("VerifyMobileClicked", {
        phone_number: this.personalInfo.phone_no,
        screen_name: "PersonalProfileInformationScreen",
      });

      // console.log("opt send response", response)
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
    },

    otpTimmer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.time == 0) {
          clearInterval(this.timer);
          this.resendBool = true;
        } else {
          this.time--;
        }
      }, 1000);
    },
    async validateOTP() {
      var res = null;
      if (!this.usingPhone) {
        res = await AuthService.verifyOTP({
          email: this.personalInfo.email,
          otp: this.otp,
          debug: false,
        });
        this.$mixpanel.track("VerifyOTP", {
          counter_secs_taken: 45,
          otp_status: "Verified",
          screen_name: "EnterOTPEmailScreen",
        });
        this.personalInfo.is_email_verified = res.success;
        this.otpDialog = false;
      } else {
        res = await AuthService.verifyOTP({
          mobile: "+91" + this.personalInfo.phone_no,
          otp: this.otp,
          debug: false,
        });
        this.$mixpanel.track("VerifyOTP", {
          counter_secs_taken: 45,
          otp_status: "Verified",
          screen_name: "EnterOTPMobileScreen",
        });
        this.personalInfo.is_phone_verified = res.success;
        this.otpDialog = false;
        console.log("RES VLAUE ", res);
      }

      // this.isGenerateOtpClicked = true;
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

    filteredBoard() {
      if (this.searchBoards) {
        const regex = new RegExp(this.searchBoards);
        return this.boardsData.filter((boardData) =>
          regex.test(boardData.name)
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
    this.$mixpanel.track("PersonalInformationStepLoaded", {
      user_type: "job_seeker",
      screen_name: "PersonalProfileInformationScreen",
    });
    this.getUserInfo();
    this.getLevel();
    this.getGrades();
    this.getSubjects();
    this.fetchCountries();
    this.getBoards();
  },
};
</script>