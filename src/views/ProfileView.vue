<template>
  <div class="surface">
    <v-app-bar app elevation="0" color="surface" class="justify-start px-4">
      <v-list-item>
        <v-list-item-icon to="/">
          <v-img
            src="../assets/logo.svg"
            contain
            height="64"
            width="178"
          ></v-img>
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
                
                @click="deleteDialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                class="primary white--text"
                large
                width="157px"
                
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
            color="primary"
            class="textcolor--text"
            
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




    <v-container fluid class="pa-8">
      <v-row>
        <v-col class="py-0">
          <v-icon class="ml-2 mb-1" @click="() => this.$router.replace('/')"
            >mdi-arrow-left</v-icon
          >
        </v-col>
      </v-row>
      <v-tabs vertical class="profile-tab">
        <v-tab class="justify-start">
          Personal Information
        </v-tab>
        <v-tab class="justify-start">
          Academic Info.
        </v-tab>
        <v-tab class="justify-start">
          Professional Information
        </v-tab>
        <v-tab class="justify-start last">
         My Results 
        </v-tab>
        <v-btn color="red" @click="logout" text class="d-flex justify-start px-2 my-0 mb-2">
          Logout
        </v-btn>
        <v-tab-item>
          <v-card
            :height="getHeight - 200 + 'px'"
            id="myScroll"
            elevation="0"
            style="overflow-x: hidden"
            depressed
          >
            <v-form lazy-validation ref="step1">
              <v-card elevation="0">
                <v-row class="py-0 px-8 pt-8">
                  <v-col cols="2" class="py-0"
                    ><v-select
                      v-model="personalInfo.title"
                      label="Title *"
                      :items="['Ms', 'Mrs', 'Mr']"
                      class="c-text-field"
                      :rules="[(v) => !!v || 'Title is required']"
                      required
                    >
                    </v-select
                  ></v-col>
                  <v-col cols="4" class="py-0 c-text-field">
                    <div id="scrollId"></div>
                    <v-text-field
                      v-model="personalInfo.first_name"
                      label="First Name *"
                      :rules="[(v) => !!v || 'First Name is required']"
                      required
                      persistent-counter="10"
                    ></v-text-field></v-col
                  ><v-col cols="3" class="py-0 c-text-field"
                    ><v-text-field
                      v-model="personalInfo.middle_name"
                      label="Middle Name"
                    ></v-text-field></v-col
                  ><v-col cols="3" class="py-0 c-text-field"
                    ><v-text-field
                      v-model="personalInfo.last_name"
                      label="Last Name*"
                      :rules="[(v) => !!v || 'Last Name is required']"
                      required
                    ></v-text-field
                  ></v-col>
                </v-row>
                <v-row class="py-0 px-8">
                  <v-col class="py-0">
                    <v-form v-model="emailBool" class="c-text-field">
                      <v-text-field
                        v-model="personalInfo.email"
                        label="Email Address *"
                        :readonly="personalInfo.is_email_verified"
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

                            <v-row v-if="personalInfo.is_email_verified">
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
                <v-row class="py-0 px-8">
                  <v-col class="py-0 c-text-field">
                    <v-text-field
                      v-model="personalInfo.phone_no"
                      label="Your 10-digit mobile no.*"
                      :readonly="personalInfo.is_phone_verified"
                      @keypress="isNumber($event)"
                      :counter="10"
                      prefix="+91"
                      :type="'text'"
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
                            :disabled="personalInfo.phone_no.length != 10"
                            v-if="!personalInfo.is_phone_verified && usingPhone"
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
                <v-row class="py-0 px-8">
                  <v-col cols="4" class="py-0"
                    ><v-text-field
                      v-model="personalInfo.dob"
                      :max="new Date().toISOString().slice(0, 10)"
                      label="Date of Birth (DDMMYY)*"
                      type="date"
                      :rules="[
                        (v) => !!v || 'Date of Birth is required',
                        (v) => {
                          const firstdate = new Date(v);
                          const today_date = new Date();
                          return (
                            firstdate < today_date || 'Future date not allowed'
                          );
                        },
                        (v) => {
                          const firstdate = new Date(v);
                          const today_date = new Date();
                          const diffTime = Math.abs(firstdate - today_date);
                          const diffDays = Math.ceil(
                            diffTime / (1000 * 60 * 60 * 24 * 365)
                          );
                          return diffDays >= 18 || 'age is less than 18';
                        },
                      ]"
                      required
                    ></v-text-field
                  ></v-col>
                  <v-col cols="3" class="py-0">
                    <v-select
                      v-model="personalInfo.gender"
                      label="Gender*"
                      :items="['FEMALE', 'MALE', 'OTHERS']"
                      :rules="[(v) => !!v || 'Gender is required']"
                      required
                    >
                    </v-select>
                  </v-col>
                </v-row>
                <v-row class="px-8 py-0">
                  <v-col cols="12" class="py-0 c-text-field">
                    <v-text-field
                      v-model="personalInfo.address"
                      label="Address*"
                      counter="100"
                      maxLength="10"
                      required
                      :rules="[(v) => !!v || 'Address is required']"
                      :readonly="isCurrentLocation ? true : false"
                    >
                      <template #append>
                        <div
                          v-if="!isCurrentLocation"
                          class="d-flex align-center"
                        >
                          <v-btn
                            :loading="isFetchingLocation"
                            class="pa-0"
                            color="primary"
                            text
                            @click="location"
                          >
                            <v-icon>mdi-map-marker</v-icon>
                            Location
                          </v-btn>
                        </div>
                        <div v-else class="d-flex align-center">
                          <v-btn
                            class="pa-0"
                            color="primary"
                            text
                            @click="clearLocation"
                          >
                            <v-icon>mdi-restore</v-icon>
                            Reset
                          </v-btn>
                        </div>
                      </template>
                    </v-text-field>
                  </v-col>
                </v-row>
                <div v-if="!isCurrentLocation" class="pt-5 px-8">
                  <v-row class="py-0">
                    <v-col cols="6" class="py-0">
                      <v-select
                        v-model="personalInfo.country_id"
                        :value="country"
                        label="Country *"
                        :items="countries"
                        item-text="country_name"
                        item-value="id"
                        :rules="[
                          (v) => !!v || 'Country name is required',
                          (v) => v > -1 || 'country name is required',
                        ]"
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
                        item-value="id"
                        item-text="state_name"
                        :rules="[
                          (v) => !!v || 'State name is required',
                          (v) => v > -1 || 'State name is required',
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
                        v-model="personalInfo.district_id"
                        :value="district"
                        label="District"
                        :items="districts"
                        item-value="id"
                        item-text="district_name"
                        @change="fetchTalukas"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6" class="py-0">
                      <v-select
                        v-model="personalInfo.city_id"
                        :value="cityVillage"
                        label="City / Village"
                        :items="cities"
                        item-value="id"
                        item-text="city_name"
                      >
                      </v-select>
                    </v-col>
                     </v-row
                  ><v-row class="py-0">
                    <v-col cols="6" class="py-0 c-text-field">
                      <v-text-field
                        v-model="personalInfo.pincode"
                        :value="pinCode"
                        @keypress="isNumber($event)"
                        label="Pin Code *"
                        counter="6"
                        maxLength="6"
                        :rules="[
                          (v) => !!v || 'Pincode is required',
                          (v) => v.length == 6 || 'Pincode must be 6 digit',
                        ]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
                <div v-if="isCurrentLocation" class="pt-5 px-8">
                  <v-row class="py-0">
                    <v-col cols="6" class="py-0 c-text-field">
                      <v-text-field
                        v-model="personalInfo.country_name"
                        label="Country *"
                        readonly
                        :rules="[(v) => !!v || 'Country name is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6" class="py-0 c-text-field">
                      <v-text-field
                        v-model="personalInfo.state_name"
                        readonly
                        label="State *"
                        :rules="[(v) => !!v || 'State name is required']"
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
                        :rules="[(v) => !!v || 'District name is required']"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6" class="py-0 c-text-field">
                      <v-text-field
                        v-model="personalInfo.city_name"
                        readonly
                        label="City / Village"
                        :items="cities"
                      >
                      </v-text-field>
                    </v-col>
                     </v-row
                  ><v-row class="py-0">
                    <v-col cols="6" class="py-0 c-text-field">
                      <v-text-field
                        v-model="personalInfo.pincode"
                        :value="pinCode"
                        @keypress="isNumber($event)"
                        label="Pin Code *"
                        readonly
                        counter="6"
                        maxLength="6"
                        :rules="[
                          (v) => !!v || 'Pincode is required',
                          (v) => v.length == 6 || 'Pincode must be 6 digit',
                        ]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </v-card>
            </v-form>
          </v-card>
          <v-btn
            :loading="isCreatingUser"
            depressed
            color="primary"
            class="float-right white--text mx-8 my-6"
            @click="savePersonal"
          >
            Save
          </v-btn>
        </v-tab-item>
        <v-tab-item>
          <v-card
            :height="getHeight - 200 + 'px'"
            id="myScroll"
            elevation="0"
            style="overflow-x: hidden"
            depressed
          >
            <v-form lazy-validation ref="step2">
              <v-card elevation="0">
                <v-expansion-panels v-model="expandedPanelIndex">
                  <v-expansion-panel
                    v-for="(qualification, index) in academicQualifications"
                    :key="index"
                    elevation="0"
                  >
                    <v-expansion-panel-header>
                      <div
                        class="d-flex flex-column"
                        v-if="
                          expandedPanelIndex != index &&
                          qualification.programme != ''
                        "
                      >
                        <div
                          class="font-weight-regular"
                          v-if="qualification.programme != ''"
                        >
                          {{ index + 1 + ". " + qualification.programme }}
                        </div>
                        <div
                          v-if="qualification.institution != ''"
                          class="text-body-2 grey--text pt-2 pb-2"
                        >
                          {{ qualification.institution }}
                        </div>
                        <div
                          class="text-body-2 grey--text"
                          v-if="qualification.start_date != ''"
                        >
                          {{
                            new Date(qualification.start_date).getFullYear() +
                            " - " +
                            new Date(qualification.end_date).getFullYear()
                          }}
                        </div>
                      </div>
                      <div
                        class="d-flex flex-column"
                        v-if="
                          expandedPanelIndex != index &&
                          qualification.programme == ''
                        "
                      >
                        Add academic programme detail
                      </div>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <v-row class="py-0">
                        <v-col class="py-0 c-text-field"
                          ><v-text-field
                            v-model="qualification.institution"
                            label="School/ College/ University *"
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
                            label="Degree/ Diploma/ Certification *"
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
                        <v-col cols="10" class="py-0 c-text-field"
                          ><v-text-field
                            v-model="qualification.field_of_study"
                            label="Field of Study*"
                            counter="100"
                            maxLength="100"
                            required
                            :rules="[
                              (v) => !!v || 'Field of Study is required',
                            ]"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="2" class="py-0 c-text-field"
                          ><v-text-field
                            v-model="qualification.grade_score"
                            maxLength="4"
                            label="Score"
                            suffix="%"
                            :rules="[
                              (v) => /^[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/.test(v) || 'Score not valid'
                            ]"
                          ></v-text-field
                        ></v-col>
                      </v-row>

                      <v-row class="py-0">
                        <v-col cols="6" class="py-0"
                          ><v-text-field
                            v-model="qualification.start_date"
                            :max="new Date().toISOString().slice(0, 10)"
                            label="Start Date*"
                            type="date"
                            :rules="[
                              (v) => !!v || 'Start Date is required',
                              (v) => {
                                const firstdate = new Date(v);
                                const today_date = new Date();
                                return (
                                  firstdate < today_date ||
                                  'Future date not allowed'
                                );
                              },
                            ]"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6" class="py-0"
                          ><v-text-field
                            v-model="qualification.end_date"
                            :max="new Date().toISOString().slice(0, 10)"
                            label="End Date* (or expected)"
                            type="date"
                            :rules="[
                              (v) => !!v || 'End Date is required',
                              (v) =>
                                qualification.end_date >
                                  qualification.start_date ||
                                'end date should be greater than start date',
                              (v) => {
                                const firstdate = new Date(v);
                                const today_date = new Date();
                                return (
                                  firstdate < today_date ||
                                  'Future date not allowed'
                                );
                              },
                            ]"
                          ></v-text-field
                        ></v-col>
                      </v-row>

                      <v-row class="py-0">
                        <v-col cols="12" class="py-0 c-text-field">
                          <v-text-field
                            label="Extra Curricular Activities"
                            counter="500"
                            maxLength="500"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col cols="12" class="py-0 c-text-field">
                          <v-text-field
                            label="Achievements"
                            counter="500"
                            maxLength="500"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row class="py-0">
                        <v-col cols="12" class="py-0 c-text-field">
                          <!-- <div class="-xl d-flex flex-row justify-space-between align-center" outline style="height:48px; width: 100%; margin-bottom: 8px;padding: 0 24px; border: 1px solid grey; position: relative">
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
                            label="Upload Certificate"
                            id="fileInput"
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
                            @click="openDeleteDiolog(index, 2)"
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
                      class="primary--text unset-capitalize"
                      ><v-icon class="mr-4">mdi-plus-circle-outline</v-icon>Add
                      another Educational Qualification (You might have)</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-form>
          </v-card>
          <v-btn
            :loading="isCreatingUser"
            color="primary"
            depressed
            class="float-right white--text my-6 mx-8 m-btn-p"
            @click="saveAcademic"
          >
            Save
          </v-btn>
        </v-tab-item>
        <v-tab-item>
          <v-card
                :height="getHeight - 300 + 'px'"
                id="myScroll"
                elevation="0"
                depressed
              >
                <v-form lazy-validation ref="step3">
                  <v-card elevation="0" class="mb-8" style="overflow-x: hidden;">
                    <v-card class="pa-0 mb-8" elevation="0">
                      <v-card
                                  width="100%"
                                  elevation="0"
                                  class="mb-2 -xl">
                                    <v-col class="py-0 px-0">
                                      <v-row class="py-0 px-0 ml-2">
                                        <v-col class="py-0 px-0">
                                          <div class="pt-4 ml-1">
                                            Experience
                                          </div>
                                        </v-col>
                                      </v-row>
                                      <v-row class="py-2 px-0 ml-2">
                                        <v-chip-group
                                          v-model="experience"
                                          mandatory
                                          active-class="primary--text">
                                          <v-chip
                                            v-for="(exp,index) in experiences"
                                            :key="index"
                                            class="mr-6"
                                            :value="index"
                                          >
                                            {{ index === 0 ? 'Fresher' : index === 1 ? 'upto 1' : exp.min + '-' + exp.max + ' years' }}
                                          </v-chip>
                                        </v-chip-group>
                                      </v-row>
                                    </v-col> 
                      </v-card>
                      <v-expansion-panels v-if="experience !=0 " v-model="expandedPanelIndex">
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
                                v-if="experience == 0"
                                class="font-weight-regular"
                              >
                                Fresher
                              </div>
                              <div v-if="experience !== 0 && professional.position != ''">
                                <div class="font-weight-regular">
                                  {{ index + 1 + ". " + professional.position }}
                                </div>
                                <div
                                  class="text-body-2 grey--text"
                                 v-if="professional.start_date != '' || professional.isCurrentlyWorking"
                                >
                                  {{
                                    new Date(
                                      professional.start_date
                                    ).getFullYear() +
                                    " - " + 
                                    (professional.end_date != '' ?
                                    new Date(
                                      professional.end_date
                                    ).getFullYear() : 'Present')
                                  }}
                                </div>
                               </div>
                                <div v-if="experience !== 0 && professional.position == ''"  class="font-weight-regular">
                                  Add position details
                                </div>
                            </div>
                            </v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            <div v-if="experience != 0">
                              <v-row class="py-0">
                                <v-col class="py-0 c-text-field"
                                  ><v-text-field
                                    
                                    label="Role/ Position *"
                                    
                                    
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
                                    
                                    item-value="id"
                                    item-text="name"
                                    
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
                                    
                                    item-value="id"
                                    item-text="name"
                                    
                                    v-model="professional.school_id"
                                  >
                                  </v-select
                                ></v-col>
                              </v-row> -->
                              <v-row class="py-0">
                                <v-col class="py-0">
                                  <v-checkbox
                                    class="py-0"
                                    v-model="professional.isCurrentlyWorking"
                                    label="I am currently working on this role / position."
                                  ></v-checkbox>
                                </v-col>
                              </v-row>
                              <v-row class="py-0">
                                <v-col cols="6" class="py-0"
                                  ><v-text-field
                                    
                                    label="Start Date*"
                                    
                                    :max="new Date().toISOString().slice(0, 10)"
                                    
                                    v-model="professional.start_date"
                                    type="date"
                                    :rules="[
                                    (v) => !!v || 'Start Date is required',
                                    (v) => {
                                  const firstdate = new Date(v);
                                  const today_date = new Date();
                                  return (
                                    firstdate < today_date ||
                                    'Future date not allowed'
                                  );
                                },
                                  ]"
                                  ></v-text-field
                                ></v-col>
                                <v-col cols="6" class="py-0"
                                  ><v-text-field
                                    :disabled="professional.isCurrentlyWorking"
                                    
                                    label="End Date*"
                                    
                                    :max="new Date().toISOString().slice(0, 10)"
                                    
                                    v-model="professional.end_date"
                                    type="date"
                                    :rules="
                                      !professional.isCurrentlyWorking
                                        ? [(v) => !!v || 'End Date is required',
                                    (v) => professional.end_date > professional.start_date || 'end date should be greater than start date',
                                    (v) => {
                                  const firstdate = new Date(v);
                                  const today_date = new Date();
                                  return (
                                    firstdate < today_date ||
                                    'Future date not allowed'
                                  );
                                },]
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

                            <div v-if="experience == 0">
                              <!-- <v-row class="py-0">
                                <v-col class="py-0">
                                  <v-autocomplete
                                    clearable
                                    deletable-chips
                                    label="Which board do you want to teach?"
                                    
                                    
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
                              v-if="experience != 0 && index != 0"
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
                        <v-col class="mt-4" v-if="experience != 0">
                          <v-btn
                            text
                            @click="addProfessionalInfo"
                            class="primary--text"
                            ><v-icon class="mr-4">mdi-plus-circle-outline</v-icon>Add more
                            professional details(optional)</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-form>
          </v-card>
          <v-btn
            :loading="isCreatingUser"
            depressed
            color="primary"
            class="float-right white--text my-6 mx-8"
            @click="saveDetails"
          >
            Save
          </v-btn>
        </v-tab-item>
        <v-tab-item>
          <div class="slideparent pa-5">
            <div class="text-h6 mb-2">My Results</div>
            <div class="d-flex flex-wrap">
            <div class="mytestcard">
              <v-card
                class="mb-4 movingcard"
                min-width="333"
                max-width="333"
                outlined
                height="360"
                style="margin-right: 8.33px"
              >
                <v-list-item three-line class="mb-0">
                  <v-list-item-avatar
                    tile
                    size="300"
                    height="173"
                    color="grey"
                  ></v-list-item-avatar>
                </v-list-item>
                <v-list-item three-line>
                  <v-list-item-content class="pt-0">
                    <v-list-item-title
                      class="assessment-name mb-0 text-wrap mb-2"
                    >
                      Trained Graduate Teacher Assessment (VGOS)
                    </v-list-item-title>
                    <v-list-item-subtitle class="assessment-instructions">
                      This course will provide you with in-depth knowledge
                      of child development. It will take you through all of
                      the developmental domains.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-expand-transition>
                  <v-card-actions class="mx-2">
                    <v-btn
                      depressed
                      block
                      @click="viewResult(12)"
                      color="#E9F2F9"
                      class="primary--text"
                      height="40"
                      >View Test Result</v-btn
                    >
                  </v-card-actions>
                </v-expand-transition>
              </v-card>
            </div> 
          </div>
          </div>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>
    
<script>
import UploadController from "@/controllers/UploadController";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import "../styles.css";
import AddressController from "@/controllers/AddressController.js";
import PersonalInfoController from "@/controllers/PersonalInfoController.js";
import AcademicsController from "@/controllers/AcademicsController.js";
import ProfessionalController from "@/controllers/ProfessionalController.js";
import BoardController from "@/controllers/BoardController";
import LevelController from "@/controllers/LevelController";
import GradeController from "@/controllers/GradeController";
import SubjectController from "@/controllers/SubjectController";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import AuthService from "../services/AuthService";
import AssessmentController from "@/controllers/AssessmentController";

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
      experience: 0,
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
      allAssessments: [],
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
        district_id: -1,
        talukTehsil: -1,
        city_id: -1,
        address: "",
        pincode: '',
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
      experiences: [
        {
          min: 0,
          max: 0
        },
        {
          min: 0,
          max: 1
        },
        {
          min: 1,
          max: 3
        },
        {
          min: 3,
          max: 5
        },
      ],
      professionalInfos: [
        {
          experience_max: 0,
          experience_min: 0,
          position: "",
          employee_type_id: 0,
          start_date: "",
          end_date: "",
          isCurrentlyWorking: false,
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
      console.log("selelcted file details", this.expandedPanelIndex);
      this.getPreSignedUrl();
    },
    async getAllAssessment() {
      const response = await AssessmentController.getAllAssessment();
      this.allAssessments = response.data.data;
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
    viewResult(assessmentId) {
      this.$router.push(`assessment/${assessmentId}/screening/status`);
    },
    clearLocation() {
      this.isCurrentLocation = false;
      this.personalInfo.country_name = "";
      this.personalInfo.state_name = "";
      this.personalInfo.district_name = "";
      this.personalInfo.country_id = -1;
      this.personalInfo.state_id = -1;
      this.personalInfo.district_id = -1;
      this.personalInfo.pincode = "";
      this.personalInfo.taluka_name = "";
      this.personalInfo.city_name = "";
      this.personalInfo.address = "";
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
            this.personalInfo.pincode = response.data.address.postcode.toString();
            this.personalInfo.taluka_name = response.data.address.county;
            this.personalInfo.city_name = response.data.address.city;
            const address = response.data.display_name.split(", ");
            this.personalInfo.address = address.length >= 2 ? address[0] + ", " + address[1] : address.length >= 1 ? address[0] : this.personalInfo.state_name + ", " + this.personalInfo.pincode;
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
      console.log("e1", this.e1);
      this.deleteDialog = true;
      if (this.e1 == 2) {
        this.academicQualifications.splice(this.indexValue, 1);
      } else if (this.e1 == 3) {
        this.professionalInfos.splice(this.indexValue, 1);
      }
      this.deleteDialog = false;
      this.indexValue = null;
      this.e1 = 1;
    },
    async savePersonal() {
      if (this.$refs.step1.validate()) {
        console.log("userif conditon,", this.personalInfo);
        this.isCreatingUser = true;
        if (this.isCurrentLocation) {
          this.personalInfo.country_id = null;
          this.personalInfo.state_id = null;
          this.personalInfo.district_id = null;
          this.personalInfo.city_id = null;
        }
        const response = await PersonalInfoController.createUserPersonalInfo(
          this.personalInfo
        );
        if (response.data.success) {
          this.$mixpanel.track("AcademicsPageLoaded", {
            user_type: this.userInfo.user_type,
            screen_name: "AcademicsScreen",
          });
          this.isCreatingUser = false;
          this.successDialog = true;
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
          alert(response.data.error);
        }
      } else {
        if (this.$refs.step1.validate()) {
          alert("Please Verify Secondry Contact");
        }
      }
    },
    async saveAcademic() {
      if (this.$refs.step2.validate()) {
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
          this.expandedPanelIndex = 0;
        } else {
          this.isCreatingUser = false;
          alert(response.data.error);
        }
      }
    },
    manualClick() {
      document.getElementById("fileInput").click();
    },
    async saveDetails() {
      //console.log("function");
      if (this.$refs.step3.validate()) {
        //console.log("userif conditon");
        this.isCreatingUser = true;
        const professionalInfos = this.professionalInfos.map((profession) => {
          const newProfession = profession;
          newProfession.experience_max = this.experiences[this.experience].max;
          newProfession.experience_min = this.experiences[this.experience].min;
          if (profession.isCurrentlyWorking) {
            newProfession.end_date = "";
          }
          return newProfession;
        });
        const response =
          this.experience == 0
            ? await ProfessionalController.createUserProfessionalInfo([
                {
                  is_fresher: true,
                },
              ])
            : await ProfessionalController.createUserProfessionalInfo(
                professionalInfos
              );
        if (response.data.success) {
          this.isCreatingUser = false;
          this.successDialog = true;
        } else {
          alert(response.data.error);
          this.isCreatingUser = false;
        }
        console.log(response);
        let mixpanelData = {
          personal_info: this.personalInfo,
        };
        this.academicQualifications.forEach((item, index) => {
          mixpanelData[`academics_info_${index + 1}`] = item;
        });
        professionalInfos.forEach((item, index) => {
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

    async getUserAcademicInfo () {
      const response = await AcademicsController.getUserAcademicInfo();
      if (!response.data.data.length || !response.data.success) {
        return;
      }
      const academinInfo = response.data.data;
      this.academicQualifications = academinInfo.map((item) => {
        return {
        institution: item.institution,
        programme: item.programme,
        start_date: item.start_date,
        end_date: item.end_date,
        field_of_study: item.field_of_study,
        extra_carricular_activities: item.extra_carricular_activities,
        grade_score: item.grade_score,
        grade_type: item.grade_type,
        achievements: item.achievements,
        certificate_url: item.certificate_url,
        }
      })
    },

    async getUserProfessionalInfo () {
      const response = await ProfessionalController.getUserProfessionalInfo();
      if (!response.data.data.length || !response.data.success) {
        return;
      }
      const professionalInfo = response.data.data;
      this.professionalInfos = professionalInfo.map((item) => {
        return {
          experience_max: item.experience_max,
          experience_min: item.experience_min,
          position: item.position,
          employee_type_id: item.employee_type_id,
          start_date: item.start_date,
          end_date: item.end_date,
          isCurrentlyWorking: (item.start_date.length != 0 && item.end_date.length == 0) ? true : false,
        }
      });
      this.experience = this.professionalInfos.length ? this.experiences.findIndex((item) => item.max === this.professionalInfos[0].experience_max) : 1;
    },

    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      //console.log("User: Registration", this.userInfo);
      if (this.userInfo.is_personal_info_captured) {
        this.e1 = 2;
      }
      this.personalInfo.is_email_verified = this.userInfo.is_email_verified;
      this.personalInfo.is_phone_verified = this.userInfo.is_phone_verified;
      this.personalInfo.email = this.userInfo.email;
      this.personalInfo.phone_no = this.userInfo.phone_no.slice(-10);

      this.personalInfo.first_name = this.userInfo.first_name;
      this.personalInfo.last_name = this.userInfo.last_name;
      this.personalInfo.title = this.userInfo.title;
      this.personalInfo.middle_name = this.userInfo.middle_name;
      this.personalInfo.country_id = this.userInfo.country_id;
      this.fetchStates(this.userInfo.country_id);
      this.fetchDistricts(this.userInfo.state_id);
      this.personalInfo.gender = this.userInfo.gender;
      this.personalInfo.state_id = this.userInfo.state_id;
      this.personalInfo.address = this.userInfo.address;
      this.personalInfo.city_id = this.userInfo.city_id;
      this.personalInfo.pincode = this.userInfo.pincode.toString();
      this.personalInfo.city_name = this.userInfo.city_name;
      this.personalInfo.taluka_name = this.userInfo.taluka_name;
      this.personalInfo.dob = this.userInfo.dob;
      this.personalInfo.state_id = this.userInfo.state_id;
      this.personalInfo.district_name = this.userInfo.district_name;
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
    async fetchStates(country_id) {
      const response = await AddressController.getStates(
        country_id ? country_id : this.personalInfo.country_id
      );
      this.states = response.data.data.rows;
      //console.log(this.states);
    },
    async fetchDistricts(state_id) {
      console.log("fetchD", this.personalInfo.state_id);
      const response = await AddressController.getDistricts(
        state_id ? state_id : this.personalInfo.state_id
      );
      this.districts = response.data.data.rows;

      //console.log(this.districts);
      this.fetchCities();
    },
    async fetchTalukas() {
      const response = await AddressController.getTalukas(
        this.personalInfo.district_id
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
        experience_max: 0,
        experience_min: 0,
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
    openDeleteDiolog(index, step) {
      this.indexValue = index;
      this.deleteDialog = true;
      this.e1 = step;
      console.log("step", step);
    },
    logout() {
  AuthService.logout();
  this.$mixpanel.track("UserLoggedOut", {
    session_timeout: false,
    screen_name: "ThankyouScreen",
  });
  this.$mixpanel.reset();
  this.$router.push("/login");
},
   goToProfile () {
    this.$router.push("/Profile");
   }
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
    this.getUserAcademicInfo();
    this.getUserProfessionalInfo();
  },
};
</script>

<style>
.registration-stepper-header.v-stepper__header {
  box-shadow: none;
  margin-left: 140px;
  margin-right: 140px;
  margin-bottom: 0px;
}
.registration-stepper.v-sheet.v-stepper:not(.v-sheet--) {
  box-shadow: none;
}
.v-application .profile-tab .v-tabs-bar {
  flex: 1 0 auto;
  height: min-content;
}

.c-text-field > .v-file-input > .v-input__control > .v-input__slot > .v-text-field__slot > label {
    top: 0px !important;
}
</style>
     