<template>
    <div class="surface">
        <v-app-bar app elevation="0" color="surface" class="justify-start">
            <v-list-item>
                <v-list-item-icon to="/">
                    <v-img src="../assets/logo.svg" contain height="64"></v-img>
                </v-list-item-icon>
                <v-list-item-content> </v-list-item-content>
                <v-list-item-action>
                    <v-row class="align-center">
                        <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>

                        <v-card-title class="pl-2" v-if="$store.state.userInfo.first_name != null">{{ $store.state.userInfo.first_name }} 👋</v-card-title>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark v-bind="attrs" v-on="on" text icon>
                                    <v-avatar>
                                        <v-img src="../assets/user.png"></v-img>
                                    </v-avatar>
                                </v-btn>
                            </template>
                            <!-- <v-list>
          <v-list-item      
          >
            <v-list-item-title >Log out</v-list-item-title>
          </v-list-item>
  
        </v-list> -->
                            <v-btn @click="logout">logout</v-btn>
                        </v-menu>
                    </v-row>
                </v-list-item-action>
            </v-list-item>
        </v-app-bar>
        <div class="d-flex m-body m-center">

            <v-card width="55rem" height="auto" class="d-flex flex-column align-center justify-center pa-8 rounded-xl" elevation="0"  >
                <img src="../assets/bgicon.svg" width="200px" height="auto">
                <v-card-title> Thank You for Confirmation</v-card-title>
                <v-card-subtitle class="ma-0 pa-0">
                    <div>Hold your breath, your school HR will announce </div>
               </v-card-subtitle>
                <v-card-subtitle class="ma-0 pa-0">
                 
                   <div> the results once they are published.</div>
                </v-card-subtitle>
                
          
                <div class="d-flex justify-space-between w-100 ma-6" >
                    <v-card width="245" height="54" class="d-flex flex-row m-center m-btn" elevation="0" depressed><v-checkbox></v-checkbox><img class="mr-2" src="../assets/Gmail.svg" width="25px" height="auto">
                    <div class="d-flex flex-column">
                        <div class="c-b-t">Email</div>
                        <div class="c-b-t-m">{{ $store.state.userInfo.email }}</div>
                    </div>
                    </v-card>


                    <v-card width="245" height="54" class="d-flex flex-row m-center m-btn" elevation="0" depressed><v-checkbox></v-checkbox><v-icon class="mr-2" size="25">mdi-message-reply-outline</v-icon>
                    <div class="d-flex flex-column">
                        <div class="c-b-t">SMS</div>
                        <div class="c-b-t-m">{{ $store.state.userInfo.phone_no }}</div>
                    </div>
                    </v-card>

                    <v-card width="245" height="54" class="d-flex flex-row m-center m-btn" elevation="0" depressed border="1"><v-checkbox></v-checkbox><v-icon class="mr-2" size="25">mdi-whatsapp</v-icon>
                    <div class="d-flex flex-column">
                        <div class="c-b-t">WhatsApp</div>
                        <div class="c-b-t-m">{{ $store.state.userInfo.phone_no }}</div>
                    </div>
                    </v-card>
                    
                </div>
                <v-btn
                    color="secondary"
                    class="black--text"
                    rounded
                    large
                    depressed
                    to="/"
                    >confirm</v-btn
                  >

            </v-card>



        </div>

    </div>
</template>
    
<script>
import "../styles.css";



export default {
    name: "HomeView",
    data() {
        return {

        };
    },
    computed: {

    },
    mounted() {

    },

    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {

    },
    created() {
        console.log(this.$store.state.userInfo);
    },
};
</script>
     