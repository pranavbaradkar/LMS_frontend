<template>
    <div class="surfae">
        <v-app-bar app elevation="0" color="surface" class="justify-start">
            <v-list-item>
                <v-list-item-icon>
                    <v-img src="../assets/logo.svg" contain height="64"></v-img>
                </v-list-item-icon>
                <v-list-item-content> </v-list-item-content>
                <v-list-item-action>
                    <v-row class="align-center">
                        <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>

                        <v-card-title class="pl-2" v-if="userInfo != null">{{ userInfo.first_name }} 👋</v-card-title>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark v-bind="attrs" v-on="on" text icon>
                                    <v-avatar>
                                        <v-img src="../assets/user.png"></v-img>
                                    </v-avatar>
                                </v-btn>
                            </template>
                            <v-btn @click="logout">logout</v-btn>
                        </v-menu>
                    </v-row>
                </v-list-item-action>
            </v-list-item>
        </v-app-bar>



        <v-container>
            <div class="w-100 ">
                <div class="ma-2">
                    <span class="cursor blue--text">Test Selection</span>
                    <v-icon class="blue--text">mdi-chevron-right</v-icon>

                    <select @change="() => { }">
                        <option>{{selectedAssessment.name}} </option>
                        <option>{{selectedAssessment.name}}</option>
                    </select>
                </div>

            </div>
            <v-card height="auto" width="100%" class="rounded-xl d-flex flex-column justify-space-between overflow-hidden">
                <div class="d-flex flex-column">
                    <v-img width="100%" height="28vh" src="../assets/holebanner.jpeg" cover>
                        <v-card class="white--text d-flex justify-center flex-column" elevation="0" width="80%"
                            height="100%" variant="outlined" color="#0f0d0d57">
                            <v-card-title>
                                {{selectedAssessment.name}}
                            </v-card-title>
                            <v-card-subtitle class=" white--text mt-2">
                                {{selectedAssessment.instructions}}
                            </v-card-subtitle>
                        </v-card>
                    </v-img>
                    <v-stepper v-model="e1" class="rounded-lg transparent elevation-0 pt-0" color="#FBF5F2">
                        <v-stepper-header class="text-subtitle-2 elevation-0">
                            <v-stepper-step :complete="e1 > 1" step="1">
                                SCREENING TEST
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">
                                MAINS TEST
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step step="3"> DEMO VIDEO </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step step="3"> INTERVIEW </v-stepper-step>



                        </v-stepper-header>


                        <v-stepper-items>
                            <!------------------------------------------ STEP 1 ------------------------------------------>
                            <v-stepper-content step="1" class="ma-0 pa-0">
                                <v-card class=" pa-2 ma-5" height="auto" outlined>
                                    <v-row height="100px" class="">
                                        <v-col>
                                            <v-card height="50px" width="100%"
                                                class="elevation-0  d-flex justify-space-between">
                                                <div class="d-flex flex-column">
                                                    <div class="text--secondary"> <v-icon size="20"
                                                            class="mr-2 ">mdi-clipboard-list-outline</v-icon>Questions</div>
                                                    <div>{{noOfQuestions}}</div>
                                                </div>
                                                <v-divider vertical></v-divider>
                                            </v-card>
                                        </v-col>
                                        <v-col>
                                            <v-card height="50px" width="100%"
                                                class="elevation-0  d-flex justify-space-between">
                                                <div class="d-flex flex-column">
                                                    <div class="text--secondary"> <v-icon size="20" class="mr-2">mdi-clock-outline</v-icon>Durations
                                                    </div>
                                                    <div>{{ duration }} Sec</div>
                                                </div>
                                                <v-divider vertical></v-divider>
                                            </v-card>
                                        </v-col>

                                        <v-col>
                                            <v-card height="50px" width="100%"
                                                class="elevation-0 d-flex justify-space-between">
                                                <div class="d-flex flex-column">
                                                    <div class="text--secondary"> <v-icon size="20"
                                                            class="mr-2">mdi-chart-pie-outline</v-icon>Section</div>
                                                    <div>{{ section }}</div>
                                                </div>
                                                <v-divider vertical></v-divider>
                                            </v-card>
                                        </v-col>

                                        <v-col>
                                            <v-card height="50px" width="100%"
                                                class="elevation-0  d-flex justify-space-between">
                                                <div class="d-flex flex-column">
                                                    <div class="text--secondary"> <v-icon size="20"
                                                            class="mr-2">mdi-map-marker-radius-outline</v-icon>Location
                                                    </div>
                                                    <div>Online</div>
                                                </div>
                                            </v-card>
                                        </v-col>

                                    </v-row>
                                </v-card>

                                <div class="w-100 d-flex flex-column ml-5">
                                    <div class="mb-2">Sections</div>
                                    <div class='d-flex w-100 flex-wrap pr-5'>
                                        <v-chip  v-for="(item, index) in selectedAssessment.skills"
                                        :key="index"
                                        class="mr-2 primary--text" color="#82D2DA42">
                                        {{ item }}
                                        </v-chip>
                                    </div>

                                </div>

                            </v-stepper-content>
                            <!------------------------------------------ STEP 2 ------------------------------------------>

                            <v-stepper-content step="2" class="ma-0 pa-0">
                                <v-row height="100px" class="pl-5">
                                    <v-col cols="3" sm="3" md="3">
                                        <v-card height="50px" width="100%"
                                            class="elevation-0  d-flex justify-space-between">
                                            <div class="d-flex flex-column">
                                                <div class="text--secondary">Mode</div>
                                                <div>At School</div>
                                            </div>
                                            <v-divider vertical></v-divider>

                                        </v-card>


                                    </v-col>

                                    <v-col>
                                        <v-card height="50px" width="100%"
                                            class="elevation-0  d-flex justify-space-between">
                                            <div class="d-flex flex-column">
                                                <div class="text--secondary"> Date </div>
                                                <div>18/04/2023</div>
                                            </div>
                                            <v-divider vertical></v-divider>

                                        </v-card>

                                    </v-col>
                                    <v-col>
                                        <v-card height="50px" width="100%" class="elevation-0 d-flex justify-space-between">
                                            <div class="d-flex flex-column">
                                                <div class="text--secondary">Time</div>
                                                <div>01:00 - 03:00 PM</div>
                                            </div>
                                            <v-divider vertical></v-divider>

                                        </v-card>
                                    </v-col>
                                    <v-col>
                                        <v-card height="50px" width="100%"
                                            class="elevation-0  d-flex justify-space-between">
                                            <div class="d-flex flex-column">
                                                <div class="text--secondary"> Room No.</div>
                                                <div>204</div>
                                            </div>

                                            <v-divider vertical></v-divider>
                                        </v-card>
                                    </v-col>
                                    <v-col>
                                        <v-card height="50px" width="100%"
                                            class="elevation-0  d-flex justify-space-between">
                                            <div class="d-flex flex-column">
                                                <div class="text--secondary"> Computer No.</div>
                                                <div>204</div>
                                            </div>


                                        </v-card>
                                    </v-col>
                                </v-row>

                                <div class="w-100 d-flex flex-column ml-5 mb-4 mt-4">
                                    <div class="mb-2">School Address</div>
                                    <div class='d-flex w-100 flex-row'>
                                        <v-card width="150px" height="150px">

                                        </v-card>
                                        <div class="d-flex flex-column ml-4">
                                            <div class="text-body-1">Vibgyor High</div>
                                            <div class="text-body-2 text--secondary mt-2">Motilal Nagar - 1, Srirang Sabde
                                                Marg, Off Link Road, Goregaon West, Mumbai, Maharashtra 400104</div>
                                            <div class="secondary--text text-body-2 font-weight-medium mt-2"><v-icon
                                                    class="secondary--text">mdi-link-variant</v-icon>COPY LINK</div>
                                            <div class="secondary--text text-body-2 font-weight-medium mt-2"><v-icon
                                                    class="secondary--text">mdi-open-in-new</v-icon>OPEN MAPS</div>

                                        </div>
                                    </div>

                                </div>

                            </v-stepper-content>


                        </v-stepper-items>
                    </v-stepper>


                </div>







                <div class="float-bottom ma-5">
                    <span class="text--secondary"> Status: </span><span class="font-weight-medium">Screening Passed
                    </span><v-btn rounded large color="secondary" class="primary--text ml-2" elevation="0">VIEW
                        RESULT</v-btn>
                </div>

            </v-card>
        </v-container>
    </div>
</template>
    
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
import AssessmentController from "@/controllers/AssessmentController";


export default {
    name: "ReportView",

    data() {
        return {


            e1: 1,
            userInfo: {},
            selectedAssessment:{},
            duration: 0,
            noOfQuestions: 0,
            section:0,

        };
    },
    computed: {

    },
    mounted() {

    },

    beforeDestroy() {

    },
    methods: {
        async getUserInfo() {
            const response = await LogedInUserInfo.getUserInfo();
            this.userInfo = response.data.user;
            this.$store.state.userInfo = this.userInfo;
            console.log(this.userInfo);
            if (!this.userInfo.is_profile_created) {
                this.$router.replace('/register');
            }
            if (!this.userInfo.is_interest_captured) {
                this.$router.replace('/interests');

            }
            this.identifyUser();
        },
    async currentAssessmentDetails(id) {
      const response = await AssessmentController.getSingleAssessment(id);
      if (response.data.success) {
        this.selectedAssessment = response.data.data;
        this.duration = this.selectedAssessment.tests[0].duration_of_assessment;
        this.noOfQuestions =this.selectedAssessment.tests[0].total_no_of_questions;
        this.section=this.selectedAssessment.skills.length
        // this.dialog = true;
        console.log(response)
        console.log(this.selectedAssessment);
      } else {
        alert("Something went wrong!");
      }
    },
        identifyUser() {
            const userId = this.userInfo.id;
            const userName = this.userInfo.first_name + " " + this.userInfo.last_name;
            const userEmail = this.userInfo.email;
            const userPhone = this.userInfo.phone_no;
            // Identify the user
            this.$mixpanel.identify(userId);

            // Set user properties
            this.$mixpanel.people.set({
                $name: userName,
                $email: userEmail,
                $phone: userPhone,
            });
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
    },
    created() {
        this.getUserInfo();
        this.currentAssessmentDetails(201);


    },

};
</script>
     