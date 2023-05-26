<template>
  <v-app-bar app elevation="0" color="surface" class="justify-start px-4">
    <v-list-item>
      <v-list-item-icon to="/">
        <v-img src="../assets/logo.svg" contain height="64" width="178"></v-img>
      </v-list-item-icon>
      <v-list-item-content> </v-list-item-content>
      <v-list-item-action>
        <v-row class="align-center">
          <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>

          <v-card-title class="pl-2" v-if="$store.state.userInfo != null">{{ $store.state.userInfo.first_name }}
            👋</v-card-title>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on" @click="goToProfile" text icon>
                <v-avatar>
                  <v-img src="../assets/user.png"></v-img>
                </v-avatar>
              </v-btn>
            </template>
          </v-menu>
        </v-row>
      </v-list-item-action>
    </v-list-item>
  </v-app-bar>
</template>

<script>
import "../styles.css";
import AuthService from "../services/AuthService";
import LogedInUserInfo from "@/controllers/LogedInUserInfo";
export default {
  name: "navView",

  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$mixpanel.track("UserLoggedOut", {
        session_timeout: false,
        screen_name: "ThankyouScreen",
      });
      this.$mixpanel.reset();
      this.$router.push("/login");
    },
    goToProfile() {
      this.$router.push("/Profile");
    },

    async getUserInfo() {
      const response = await LogedInUserInfo.getUserInfo();
      this.userInfo = response.data.user;
      this.$store.state.userInfo = this.userInfo;
      console.log(this.userInfo);
      if (!this.userInfo.is_personal_info_captured) {
        console.log("Routing to Register");
        this.$router.replace("/register");
      } else if (!this.userInfo.is_interest_captured) {
        console.log("Routing to Interests");

        this.$router.replace("/interests");
      }
    }
  },
  created() {
    this.getUserInfo();
  },

};
</script>