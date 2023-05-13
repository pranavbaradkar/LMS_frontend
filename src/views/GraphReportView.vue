<template>
    <div class="pa-2 w-100">
        <v-card height="95vh" width="100%">
            <v-card width="100%" height="52px" class="d-flex flex-row pa-2 align-center">
                <v-icon>mdi-close</v-icon>
                <div class="ml-4">National Level Teacher Assessment Report</div>
            </v-card>
            <v-card-title>Your Assessment Report</v-card-title>
            <v-card-subtitle>Lorem ipsum dolor sit amet consectetur. Volutpat suspendisse diam odio in interdum
                ut.</v-card-subtitle>
            <v-row class="ma-4">
                <v-col>
                    <v-card height="200px" width="100%" outlined></v-card>
                </v-col>
                <v-col>
                    <v-card height="200px" width="100%" outlined></v-card>
                </v-col>
                <v-col>
                    <v-card height="auto" width="100%"  class=" elevation-0">
                        <v-card-title class="mt-0 pl-0 pt-0">Share Report</v-card-title>
                        <v-card-subtitle class="pl-0">Get you test report </v-card-subtitle>

                        <v-text-field
                            placeholder="Your email address"
                            outlined prepend-inner-icon="mdi-email-outline" append-outer-icon="mdi-send"
                            dense
                            class="rounded-xl"
                        ></v-text-field>
                        <v-btn width="100%" height="40px" class="rounded-xl" outlined>
                            <v-icon class="mr-2">
                                mdi-email-outline
                            </v-icon> Download Report
                        </v-btn>
                        <v-btn width="100%" height="40px" class="rounded-xl mt-2" outlined>
                            <v-icon class="mr-2">
                                mdi-whatsapp
                            </v-icon> Share on Whatsapp
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

        </v-card>
    </div>
</template>
    
<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";


export default {
    name: "GraphReportView",

    data() {
        return {


            e1: 1,
            userInfo: {},

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


    },

};
</script>
     