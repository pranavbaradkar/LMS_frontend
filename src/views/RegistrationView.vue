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
              Are You Sure You Want To Delete This Info ?
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
            :disabled="otp.length != 6"
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
          >Vibgyor Group of Schools offers an opportunity to be part of an
          inspiring and innovative team of educators.</span
        ><br />
        <span
          >Please fill out the profile information to get a personalized
          assessment for the opportunity with us.</span
        ></v-card-subtitle
      >
      <v-container>
        <v-stepper v-model="e1" class="rounded-lg">
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
                <v-card elevation="0" id="myScroll" class="pa-2">
                  <v-row>
                    <!-- <v-col cols="2">
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
                    </v-col> -->
                    <v-col cols="12">
                      <v-card
                        :height="getHeight - 350 + 'px'"
                        class="pa-4"
                        elevation="0"
                      >
                        <v-row class="py-0">
                          <v-col cols="2" class="py-0 c-text-field"
                            ><v-select
                              v-model="personalInfo.title"
                              label="Title *"
                              :items="['Ms', 'Mrs', 'Mr']"
                              outlined
                              class="rounded-xl c-text-field"
                              :rules="[(v) => !!v || 'Title is required']"
                              required
                            >
                            </v-select
                          ></v-col>
                          <v-col cols="4" class="py-0 c-text-field">
                            <div id="scrollId"></div>
                            <v-text-field
                              v-model="personalInfo.first_name"
                              outlined
                              label="First Name *"
                              rounded
                              class="rounded-xl"
                              :rules="[(v) => !!v || 'First Name is required']"
                              required
                              persistent-counter="10"
                            ></v-text-field></v-col
                          ><v-col cols="3" class="py-0 c-text-field"
                            ><v-text-field
                              v-model="personalInfo.middle_name"
                              outlined
                              label="Middle Name"
                              rounded
                              class="rounded-xl"
                            ></v-text-field></v-col
                          ><v-col cols="3" class="py-0 c-text-field"
                            ><v-text-field
                              v-model="personalInfo.last_name"
                              outlined
                              label="Last Name*"
                              rounded
                              class="rounded-xl"
                              :rules="[(v) => !!v || 'Last Name is required']"
                              required
                            ></v-text-field
                          ></v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col class="py-0">
                            <v-form v-model="emailBool" class="c-text-field">
                              <v-text-field
                                v-model="personalInfo.email"
                                outlined
                                label="Email Address *"
                                rounded
                                :readonly="personalInfo.is_email_verified"
                                class="rounded-xl"
                                :rules="emailRules"
                                required
                                @keydown.enter.prevent="submit"
                              >
                                <template #append>
                                  <div class="d-flex align-center n-mt-10">
                                    <v-btn
                                      on
                                      text
                                      :disabled="!emailBool"
                                      v-if="!personalInfo.is_email_verified"
                                      @click="generateOtp(), (otpDialog = true)"
                                    >
                                      Verify
                                    </v-btn>

                                    <v-row
                                      v-if="personalInfo.is_email_verified"
                                    >
                                      <v-col class="px-0 mt-1">
                                        <v-img
                                          src="../assets/verifiedIcon.png"
                                          contain
                                          max-width="24"
                                        ></v-img>
                                      </v-col>
                                      <v-col class="px-0"> </v-col>
                                    </v-row>
                                  </div>
                                </template>
                                ></v-text-field
                              >
                            </v-form>
                          </v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col class="py-0 c-text-field">
                            <v-text-field
                              v-model="personalInfo.phone_no"
                              label="Your 10-digit mobile no.*"
                              outlined
                              :readonly="personalInfo.is_phone_verified"
                              rounded
                              class="rounded-xl"
                              @keypress="isNumber($event)"
                              :counter="10"
                              prefix="+91"
                              :type="
                                !personalInfo.is_phone_verified
                                  ? 'number'
                                  : 'text'
                              "
                              maxLength="10"
                              :rules="[
                                (v) => !!v || 'Mobile number is required',
                                (v) =>
                                  (v && v.length >= 10 && v.length <= 10) ||
                                  'Mobile number must be 10 digit',
                              ]"
                              required
                            >
                              <template #append>
                                <div class="d-flex align-center n-mt-10">
                                  <v-btn
                                    on
                                    text
                                    max-height="35"
                                    :disabled="
                                      personalInfo.phone_no.length != 10
                                    "
                                    v-if="
                                      !personalInfo.is_phone_verified &&
                                      usingPhone
                                    "
                                    @click="generatePhoneOtp()"
                                  >
                                    verify
                                  </v-btn>

                                  <v-row v-if="personalInfo.is_phone_verified">
                                    <v-col class="px-0 mt-1">
                                      <v-img
                                        src="../assets/verifiedIcon.png"
                                        contain
                                        max-width="24"
                                      ></v-img>
                                    </v-col>

                                    <v-col class="px-0"> </v-col>
                                  </v-row>
                                </div>
                              </template>
                            </v-text-field>
                          </v-col>
                        </v-row>
                        <v-row class="py-0">
                          <v-col cols="4" class="py-0 c-text-field"
                            ><v-text-field
                              v-model="personalInfo.dob"
                              outlined
                              label="Date of Birth (DDMMYY)*"
                              rounded
                              type="date"
                              class="rounded-xl"
                              :rules="[
                                (v) => !!v || 'Date of Birth is required',
                              ]"
                              required
                            ></v-text-field
                          ></v-col>
                          <v-col cols="3" class="py-0 c-text-field">
                            <v-select
                              v-model="personalInfo.gender"
                              label="Gender*"
                              :items="['FEMALE', 'MALE', 'OTHERS']"
                              outlined
                              class="rounded-xl"
                              :rules="[(v) => !!v || 'Gender is required']"
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
                        <div v-if="!isCurrentLocation" class="pt-5">
                          <v-row class="py-0">
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-select
                                v-model="personalInfo.country_id"
                                :value="country"
                                label="Country *"
                                :items="countries"
                                item-text="country_name"
                                item-value="id"
                                outlined
                                class="rounded-xl"
                                :rules="[
                                  (v) => !!v || 'Country name is required',
                                ]"
                                required
                                @change="fetchStates"
                              >
                              </v-select>
                            </v-col>
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-select
                                v-model="personalInfo.state_id"
                                :value="state"
                                label="State *"
                                :items="states"
                                outlined
                                class="rounded-xl"
                                item-value="id"
                                item-text="state_name"
                                :rules="[
                                  (v) => !!v || 'State name is required',
                                ]"
                                required
                                @change="fetchDistricts"
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                          <v-row class="py-0">
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-select
                                v-model="personalInfo.districtId"
                                :value="district"
                                label="District"
                                :items="districts"
                                outlined
                                class="rounded-xl"
                                item-value="id"
                                item-text="district_name"
                                @change="fetchTalukas"
                              >
                              </v-select>
                            </v-col>
                            <v-col cols="6" class="py-0 c-text-field">
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
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-select
                                v-model="personalInfo.city_id"
                                :value="cityVillage"
                                label="City / Village"
                                :items="cities"
                                outlined
                                class="rounded-xl"
                                item-value="id"
                                item-text="city_name"
                              >
                              </v-select>
                            </v-col>
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.pincode"
                                :value="pinCode"
                                outlined
                                @keypress="isNumber($event)"
                                label="Pin Code *"
                                rounded
                                counter="6"
                                maxLength="6"
                                class="rounded-xl"
                                :rules="[
                                  (v) => !!v || 'Pincode is required',
                                  (v) =>
                                    (v && v.length != 6) ||
                                    'Pincode must be 6 digit',
                                ]"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.address"
                                outlined
                                label="Address*"
                                counter="100"
                                maxLength="100"
                                rounded
                                class="rounded-xl"
                                required
                                :rules="[
                                  (v) => !!v || 'Address is required',
                                 
                                ]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </div>
                        <div v-if="isCurrentLocation" class="pt-5">
                          <v-row class="py-0">
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.country_name"
                                label="Country *"
                                outlined
                                rounded
                                class="rounded-xl"
                                readonly
                                :rules="[
                                  (v) => !!v || 'Country name is required',
                                ]"
                                required
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.state_name"
                                readonly
                                label="State *"
                                outlined
                                rounded
                                class="rounded-xl"
                                :rules="[
                                  (v) => !!v || 'State name is required',
                                ]"
                                required
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row class="py-0">
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.district_name"
                                label="District"
                                readonly
                                outlined
                                rounded
                                class="rounded-xl"
                                :rules="[
                                  (v) => !!v || 'District name is required',
                                ]"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.taluka_name"
                                label="Taluk / Tehsil"
                                readonly
                                outlined
                                rounded
                                class="rounded-xl"
                              >
                              </v-text-field>
                            </v-col> </v-row
                          ><v-row class="py-0">
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.city_name"
                                readonly
                                label="City / Village"
                                :items="cities"
                                outlined
                                rounded
                                class="rounded-xl"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="6" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.pincode"
                                :value="pinCode"
                                outlined
                                @keypress="isNumber($event)"
                                label="Pin Code *"
                                rounded
                                readonly
                                counter="6"
                                maxLength="6"
                                :rules="[
                                  (v) => !!v || 'Pincode is required',
                                  (v) =>
                                    (v && v.length >= 6 && v.length <= 6) ||
                                    'Pincode must be 6 digit',
                                ]"
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0 c-text-field">
                              <v-text-field
                                v-model="personalInfo.address"
                                outlined
                                label="Address*"
                                counter="100"
                                maxLength="100"
                                rounded
                                class="rounded-xl"
                                :rules="[
                                  (v) => !!v || 'Address is required',
                                 
                                ]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-form>

              <v-card elevation="0">
                <v-row>
                  <v-col cols="12">
                    <v-divider></v-divider>
                    <v-card-title class="mb-2">
                      <v-btn
                        rounded
                        color="secondary"
                        class="black--text mx-1"
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
                              <div
                                class="font-weight-regular"
                                v-if="qualification.programme != undefined"
                              >
                                {{ index + 1 + ". " + qualification.programme }}
                              </div>
                              <div class="text-body-2 grey--text pt-2 pb-2">
                                {{ qualification.institution }}
                              </div>
                              <div
                                class="text-body-2 grey--text"
                                v-if="qualification.start_date != undefined"
                              >
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
                              <v-col class="py-0 c-text-field"
                                ><v-text-field
                                  v-model="qualification.institution"
                                  outlined
                                  label="School/ College/ University *"
                                  rounded
                                  class="rounded-xl"
                                  counter="100"
                                  maxLength="100"
                                  :rules="[
                                    (v) =>
                                      !!v ||
                                      'School/ College/ University name is required',
                                  ]"
                                  required
                                ></v-text-field
                              ></v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col class="py-0 c-text-field"
                                ><v-text-field
                                  v-model="qualification.programme"
                                  outlined
                                  label="Degree/ Diploma/ Certification *"
                                  rounded
                                  class="rounded-xl"
                                  counter="100"
                                  maxLength="100"
                                  :rules="[
                                    (v) =>
                                      !!v ||
                                      'Degree/ Diploma/ Certification name is required',
                                  ]"
                                  required
                                ></v-text-field
                              ></v-col> </v-row
                            ><v-row class="py-0">
                              <v-col class="py-0 c-text-field"
                                ><v-text-field
                                  v-model="qualification.field_of_study"
                                  outlined
                                  label="Field of Study*"
                                  rounded
                                  class="rounded-xl"
                                  counter="100"
                                  maxLength="100"
                                  required
                                  :rules="[
                                    (v) => !!v || 'Field of Study is required',
                                  ]"
                                ></v-text-field
                              ></v-col>
                            </v-row>

                            <v-row class="py-0">
                              <v-col cols="6" class="py-0 c-text-field"
                                ><v-text-field
                                  v-model="qualification.start_date"
                                  outlined
                                  label="Start Date*"
                                  rounded
                                  class="rounded-xl"
                                  type="date"
                                  :rules="[
                                    (v) => !!v || 'Start Date is required',
                                  ]"
                                ></v-text-field
                              ></v-col>
                              <v-col cols="6" class="py-0 c-text-field"
                                ><v-text-field
                                  v-model="qualification.end_date"
                                  outlined
                                  label="End Date* (or expected)"
                                  rounded
                                  class="rounded-xl"
                                  type="date"
                                  :rules="[
                                    (v) => !!v || 'End Date is required',
                                  ]"
                                ></v-text-field
                              ></v-col>
                            </v-row>

                            <v-row class="py-0">
                              <v-col cols="12" class="py-0 c-text-field">
                                <v-text-field
                                  outlined
                                  label="Extra Curricular Activities"
                                  rounded
                                  class="rounded-xl"
                                  counter="500"
                                  maxLength="500"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col cols="12" class="py-0 c-text-field">
                                <v-text-field
                                  outlined
                                  label="Achievements"
                                  rounded
                                  class="rounded-xl"
                                  counter="500"
                                  maxLength="500"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                            <v-row class="py-0">
                              <v-col cols="12" class="py-0 c-text-field">
                                <!-- <div class="rounded-xl d-flex flex-row justify-space-between align-center" outline style="height:48px; width: 100%; margin-bottom: 8px;padding: 0 24px; border: 1px solid grey; position: relative">
                                    <div>
                                      <v-chip v-for="i in 5" :key="i">cetificate.jpg</v-chip>
                                    </div>
                                    <div style="float: right; position: absolute;  right: 12px; width: 124px" class="textcolor--text">
                                      <v-icon>mdi-attachment</v-icon> Attachment
                                      <input type="file" id="myfile" name="myfile"  @change="onChange" style="position: absolute; top:0px; width: 124px; height: 48px;opacity: 0; right: 0px; cursor: pointer">
                                    </div>
                                </div> -->
                                <v-file-input
                                  chips
                                  outlined
                                  rounded
                                  id="fileInput"
                                  class="rounded-xl"
                                  append-inner-icon="mdi-attachment"
                                  @change="onChange"
                                  accept="application/pdf, image/jpeg, image/jpg"
                                  
                                  v-model="selectedFile[expandedPanelIndex]"

                                >
                                  <template #append>
                                    <div
                                      class="d-flex align-center cursor n-mt-10"
                                      @click="manualClick"
                                    >
                                      <v-icon>mdi-attachment</v-icon> Attachment
                                    </div>
                                  </template>
                                </v-file-input>
                              </v-col>
                            </v-row>
                            <v-row v-if="index != 0">
                              <v-col cols="12" class="d-flex justify-end">
                                <v-btn
                                  @click="openDeleteDiolog(index)"
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
                            class="textcolor--text unset-capitalize"
                            ><v-icon>mdi-plus-circle-outline</v-icon>Add another
                            Educational Qualification (You might have)</v-btn
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
                class="black--text my-4 m-btn-p"
                @click="goToStep3"
              >
                NEXT
              </v-btn>
              <v-btn
                class="float-right mx-4 my-4 secondaryAccent primary--text"
                depressed
                rounded
                @click="e1++"
              >
                skip
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
                          <v-expansion-panel-header
                            ><div
                              class="d-flex flex-column"
                              v-if="expandedPanelIndex != index"
                              @click="consolee(professional.end_date)"
                            >
                              <div
                                v-if="experience == 'Fresher'"
                                class="font-weight-regular"
                              >
                                Fresher
                              </div>
                              <div v-else class="font-weight-regular">
                                {{ index + 1 + ". " + professional.position }}
                              </div>
                              <div
                                class="text-body-2 grey--text"
                                v-if="professional.end_date != ''"
                              >
                                {{
                                  new Date(
                                    professional.start_date
                                  ).getFullYear() +
                                  " - " +
                                  new Date(professional.end_date).getFullYear()
                                }}
                              </div>
                            </div></v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            <v-row class="py-0">
                              <v-col class="py-0">
                                <v-card
                                  v-if="index == 0"
                                  width="100%"
                                  elevation="0"
                                  class="mb-10 rounded-xl"
                                  outlined
                                  ><v-radio-group
                                    mandatory
                                    row
                                    v-model="experience"
                                    :rules="[(v) => !!v || 'Please select one']"
                                    required
                                  >
                                    <v-col class="py-0">
                                      <v-row class="py-0 px-0 ml-2">
                                        <v-radio
                                          class="mb-8 py-0"
                                          label="I have"
                                          value="Experienced"
                                          color="accent"
                                        >
                                        </v-radio>

                                        <v-col
                                          cols="1 center"
                                          class="py-0 px-0 c-text-field"
                                        >
                                          <v-text-field
                                            :disabled="
                                              experience != 'Experienced'
                                            "
                                            type="number"
                                            outlined
                                            @keypress="isNumber($event)"
                                            class="rounded-xl"
                                            :rules="[minValueRule]"
                                            v-model="
                                              professional.experience_year
                                            "
                                          >
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="1" class="py-0 px-0"
                                          ><div class="pt-4 ml-1">
                                            Years
                                          </div></v-col
                                        >
                                        <v-col
                                          cols="1"
                                          class="py-0 px-0 c-text-field"
                                        >
                                          <v-text-field
                                            type="number"
                                            :disabled="
                                              experience != 'Experienced'
                                            "
                                            @keypress="isNumber($event)"
                                            :rules="[minValueRule]"
                                            outlined
                                            class="rounded-xl"
                                            v-model="
                                              professional.experience_month
                                            "
                                          >
                                          </v-text-field>
                                        </v-col>
                                        <v-col cols="4 center" class="py-0 px-0"
                                          ><div class="pt-4 ml-1">
                                            Months of experience
                                          </div></v-col
                                        >
                                      </v-row>
                                      <v-row class="pb-4 ml-2">
                                        <v-radio
                                          label="Fresher"
                                          value="Fresher"
                                          color="accent"
                                          @click="
                                            professional.experience_year = 0;
                                            professional.experience_month = 0;
                                          "
                                        >
                                        </v-radio
                                      ></v-row>
                                    </v-col> </v-radio-group
                                ></v-card>
                              </v-col>
                            </v-row>
                            <div v-if="experience == 'Experienced'">
                              <v-row class="py-0">
                                <v-col class="py-0 c-text-field"
                                  ><v-text-field
                                    outlined
                                    label="Role/ Position *"
                                    rounded
                                    class="rounded-xl"
                                    counter="100"
                                    maxLength="100"
                                    required
                                    :rules="[
                                      (v) =>
                                        !!v ||
                                        'Role/ Position name is required'
                                    ]"
                                   
                                    v-model="professional.position"
                                  ></v-text-field
                                ></v-col> </v-row
                              ><v-row class="py-0">
                                <v-col class="py-0 c-text-field"
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

                              <!-- <v-row class="py-0">
                                <v-col class="py-0"
                                  ><v-select
                                    label="School / Institute"
                                    :items="schoolData"
                                    outlined
                                    item-value="id"
                                    item-text="name"
                                    class="rounded-xl"
                                    v-model="professional.school_id"
                                  >
                                  </v-select
                                ></v-col>
                              </v-row> -->
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
                                <v-col cols="6" class="py-0 c-text-field"
                                  ><v-text-field
                                    outlined
                                    label="Start Date*"
                                    rounded
                                    class="rounded-xl"
                                    v-model="professional.start_date"
                                    type="date"
                                    :rules="[
                                      (v) => !!v || 'Start Date is required',
                                    ]"
                                  ></v-text-field
                                ></v-col>
                                <v-col cols="6" class="py-0 c-text-field"
                                  ><v-text-field
                                    :disabled="isCurrentlyWorking"
                                    outlined
                                    label="End Date*"
                                    rounded
                                    class="rounded-xl"
                                    v-model="professional.end_date"
                                    type="date"
                                    :rules="
                                      !isCurrentlyWorking
                                        ? [(v) => !!v || 'End Date is required']
                                        : ''
                                    "
                                  ></v-text-field
                                ></v-col>
                              </v-row>
                              <!-- <v-row class="py-0">
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
                              </v-row> -->
                            </div>

                            <div v-if="experience != 'Experienced'">
                              <!-- <v-row class="py-0">
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
                              </v-row> -->
                            </div>
                            <v-row
                              v-if="experience == 'Experienced' && index != 0"
                            >
                              <v-col cols="12" class="d-flex justify-end">
                                <v-btn
                                  @click="openDeleteDiolog(index)"
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
                    next
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
                  <v-btn
                    class="float-right mx-4 my-4 secondaryAccent primary--text"
                    depressed
                    rounded
                    to="/interests"
                  >
                    skip
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
import UploadController from "@/controllers/UploadController";
import axios from "axios";
//import ImageInput from "../components/ImageInput.vue";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import "../styles.css";
import AddressController from "@/controllers/AddressController.js";
import PersonalInfoController from "@/controllers/PersonalInfoController.js";
import AcademicsController from "@/controllers/AcademicsController.js";
import ProfessionalController from "@/controllers/ProfessionalController.js";
// import SchoolController from "@/controllers/SchoolController";
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
  // components: {
  //   ImageInput,
  // },
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
      otp: "",
      time: 119,
      emailBool: false,
      usingPhone: true,
      isCurrentLocation: false,
      preSignedUrl: "",
      selectedFile: [],

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
        country_id: -1,
        state_id: -1,
        talukTehsil: -1,
        city_id: -1,
        address: "",
        pincode: 0,
        country_name: "",
        state_name: "",
        city_name: "",
        district_name: "",
        taluka_name: "",
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
          start_date: "",
          end_date: "",
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
    onChange() {
      console.log(this.selectedFile[this.expandedPanelIndex]);
      console.log("selelcted file details",this.expandedPanelIndex);
      this.getPreSignedUrl();
      
     
    },
    async getPreSignedUrl() {
      const response = await UploadController.getPreSignedUrl({
        context: "user-profiles",
        file_name: this.selectedFile[this.expandedPanelIndex].name,
        mime_type: this.selectedFile[this.expandedPanelIndex].type,
        file_type: "certifcate",
        business_type: "b2c",
        uuid: "123-456-7",
      });
      this.preSignedUrl = response.data.data.signed_request;
      this.academicQualifications[this.expandedPanelIndex].certificate_url =
        response.data.data.url;
      this.uploadToS3();
    },
    async uploadToS3() {
      console.log("Pre-Signed URL: ", this.preSignedUrl);
      const uploadResponse = await UploadController.uploadFile(
        this.preSignedUrl,
        this.selectedFile[this.expandedPanelIndex]
      );
      console.log("Upload Response: ", uploadResponse);
      console.log(this.academicQualifications[this.expandedPanelIndex]);
    },
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
          console.log(response);
          if (response.status == 200) {
            this.isCurrentLocation = true;
            this.personalInfo.country_name = response.data.address.country;
            this.personalInfo.state_name = response.data.address.state;
            this.personalInfo.district_name =
              response.data.address.state_district;
            this.personalInfo.pincode = response.data.address.postcode;
            this.personalInfo.taluka_name = response.data.address.county;
            this.personalInfo.city_name = response.data.address.neighbourhood;
            this.isFetchingLocation = false;
          }
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
        console.log("userif conditon");
        this.isCreatingUser = true;
        const response = await PersonalInfoController.createUserPersonalInfo(
          this.personalInfo
        );
        console.log(response);
        if (response.data.success) {
          this.$mixpanel.track("AcademicsPageLoaded", {
            user_type: this.userInfo.user_type,
            screen_name: "AcademicsScreen",
          });
          this.isCreatingUser = false;
          this.successDialog = true;
          this.e1 = 2;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
          alert(response.data.error)
        }
      } else {
        if (this.$refs.step1.validate()) {
          alert("Please Verify Secondry Contact");
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
        console.log(response);
        if (response.data.success) {
          this.$mixpanel.track("NextButtonClicked", {
            academics_info: this.academicQualifications,
            screen_name: "AcademicProfileInformationScreen",
          });
          this.$mixpanel.track("ProfessionInfoStepLoaded", {
            user_type: this.userInfo.user_type,
            screen_name: "ProfessionInfoScreen",
          });
          this.isCreatingUser = false;
          this.successDialog = true;
          this.e1 = 3;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
          alert(response.data.error)
        }
      }
    },
    manualClick() {
      document.getElementById("fileInput").click();
    },
    async saveDetails() {
      //console.log("function");
      if (this.$refs.step3.validate()) {
        console.log("userif conditon.........1", this.professionalInfos, this.isCurrentlyWorking);
        this.isCreatingUser = true;
        if(this.isCurrentlyWorking) {
          //console.log('profesional ednd data.........', this.professionalInfos[0].start_date)
          delete this.professionalInfos[0].end_date;
        }

        console.log("userif conditon.........2", this.professionalInfos, this.isCurrentlyWorking);
        const response = this.experience=='Fresher'?  await ProfessionalController.createUserProfessionalInfo(
            [{
              is_fresher:true,
            }]
          )  : await ProfessionalController.createUserProfessionalInfo(
            this.professionalInfos
          );
          
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
          this.$router.replace("/interests");
        } else {
          alert(response.data.error)
          this.isCreatingUser = false;
        }
        console.log(response);
        let mixpanelData = {
          personal_info: this.personalInfo,
        };
        this.academicQualifications.forEach((item, index) => {
          mixpanelData[`academics_info_${index + 1}`] = item;
        });
        this.professionalInfos.forEach((item, index) => {
          mixpanelData[`professional_info_${index + 1}`] = item;
        });
        this.$mixpanel.track("SaveProfileDetailsClicked", mixpanelData);
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
          this.$router.replace("/");
        } else {
          this.isCreatingUser = false;
        }
      }
    },
    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      console.log("User: Registration", this.userInfo);
      if (this.userInfo.is_personal_info_captured) {
        this.e1 = 2;
      }
      this.personalInfo.is_email_verified = this.userInfo.is_email_verified;
      this.personalInfo.is_phone_verified = this.userInfo.is_phone_verified;
      this.personalInfo.email = this.userInfo.email;
      this.personalInfo.first_name = this.userInfo.first_name;
      this.personalInfo.last_name = this.userInfo.last_name;
      this.personalInfo.title = this.userInfo.title;
      this.personalInfo.middle_name = this.userInfo.middle_name;
      this.personalInfo.country_id = this.userInfo.country_id;
      this.personalInfo.gender = this.userInfo.gender;
      this.personalInfo.state_id = this.userInfo.state_id;
      this.personalInfo.phone_no = this.userInfo.phone_no.slice(-10);

      this.personalInfo.address = this.userInfo.address;
      this.personalInfo.city_id = this.userInfo.city_id;
      this.personalInfo.pincode = this.userInfo.pincode;
      this.personalInfo.city_name = this.userInfo.city_name;
      this.personalInfo.taluka_name = this.userInfo.taluka_name;
      this.personalInfo.dob = this.userInfo.dob;
      this.personalInfo.state_id = this.userInfo.state_id;

      this.$mixpanel.track("PersonalInformationStepLoaded", {
        user_type: this.userInfo.user_type,
        screen_name: "PersonalProfileInformationScreen",
      });
    },
    onResize() {
      this.windowHeight = window.innerHeight;
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
      //console.log(this.personalInfo.state_id);
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
        this.personalInfo.state_id,
        this.personalInfo.talukTehsil
      );
      this.cities = response.data.data.rows;

      //console.log(this.cities);
    },
    // async getSchool() {
    //   const response = await SchoolController.getSchool();
    //   console.log("school log",response);
    //   this.schoolData = response.data.data.rows;
    //   //console.log("school log", this.schoolData);
    // },
    async getBoards() {
      const response = await BoardController.getBoards();
      //console.log(response);
      this.boardsData = response.data.data.rows;
      //console.log("board log", this.boardsData);
    },
    async getLevel() {
      const response = await LevelController.getLevel();

      this.tableLevels = response.data.data.rows;
      //console.log("level log", this.tableLevels);
    },
    async getGrades() {
      const response = await GradeController.getAllGrades();
      this.gradesData = response.data.data.rows;
      //console.log("grades log", this.gradesData);
    },
    async getSubjects() {
      const response = await SubjectController.getSubject();

      this.subjectsData = response.data.data.rows;
      //console.log("subject log", this.subjectsData);
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
        start_date: "",
        end_date: "",
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
      this.isGenerateOtpClicked = true;
      this.otpTimmer();
      this.$mixpanel.track("VerifyEmailClicked", {
        email_address: this.personalInfo.email,
        screen_name: "PersonalProfileInformationScreen",
      });

      // console.log("opt send response", response)
    },
    async generatePhoneOtp() {
      this.time = 119;
      this.resendBool = false;
      const response = await AuthService.generateOTP({
        mobile: this.personalInfo.phone_no,
      });

      if (response) {
        this.otpDialog = true;
      }

      this.isGenerateOtpClicked = true;
      this.otpTimmer();
      this.$mixpanel.track("VerifyMobileClicked", {
        phone_number: this.personalInfo.phone_no,
        screen_name: "PersonalProfileInformationScreen",
      });

      // console.log("opt send response", response)
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
          user_id: this.userInfo.id,
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
          mobile: this.personalInfo.phone_no,
          otp: this.otp,
          debug: false,
          user_id: this.userInfo.id,
        });
        this.$mixpanel.track("VerifyOTP", {
          counter_secs_taken: 45,
          otp_status: "Verified",
          screen_name: "EnterOTPMobileScreen",
        });
        this.personalInfo.is_phone_verified = res.success;
        this.otpDialog = false;
        //console.log("RES VLAUE ", res);
      }

      // this.isGenerateOtpClicked = true;
    },
    openDeleteDiolog(index) {
      this.indexValue = index;
      this.deleteDialog = true;
    },
  },
  computed: {
    getHeight() {
      return this.windowHeight;
    },

    minValueRule() {
      return (value) =>
        parseInt(value) >= 0 || "Value must be greater than or equal to 0";
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
    this.fetchCountries();
  },
};
</script>
<style scoped>
</style>
