<template>
    <v-card width="100%" height="100%" class="surface">


        <v-container>
            <v-app-bar color="surface" elevation="0" fixed>
                <v-list-item>
                    <v-list-item-icon class="pt-4">
                        <v-img src="../assets/logo.svg" contain max-width="16rem"></v-img>
                    </v-list-item-icon>
                </v-list-item>
            </v-app-bar>
            <!-- parent card of items -->
            <v-card class="mt-14 elevation-0 surface " >
               <v-card-title></v-card-title>
                <v-card-title >
                    <v-row align="center" justify="center" align-content="center">
                        <v-col cols="1">
                            <v-icon >mdi-arrow-left</v-icon>

                        </v-col>
                        <v-col cols="8" >
                            <v-progress-linear height="25" color="secondary" class="rounded-xl" value="20"></v-progress-linear>

                        </v-col>
                    </v-row>

                </v-card-title>
                <v-card-title class="d-flex justify-center">
                    Which level you(want to teach)
                </v-card-title>
                <v-card-subtitle class="d-flex justify-center">
                    Select one or more options as applicable
                </v-card-subtitle>


            </v-card>
            <!-- parant card of items ends here -->
            <v-stepper v-model="e1" elevation="0" class="surface">

                <v-stepper-items >
                    <!------------------------------------------ STEP 1 ------------------------------------------>
                    <v-stepper-content step="1" class="elevation-0 pa-0 ma-0" elevation="0" >
                    <div class="item-box" id="myScroll">
                        <v-layout row wrap justify-center class="surface">

                            <v-card width="145px"
                                class="ma-4 pa-5 d-flex justify-center flex-column align-center elevation-0 rounded-xl "
                                style="border: 1px solid #8080809e;" height="158px" v-for="i in 50" :key="i">
                                <img src="../assets/india.png" width="48px" height="48px">
                                <div class="mt-5">Lower primary</div>
                                <div class="mt-2">(3-6) yrs</div>
                            </v-card>

                        </v-layout>

                    </div> 

                    </v-stepper-content>
                    <!------------------------------------------ STEP 2 ------------------------------------------>

                    <v-stepper-content step="2" v-model="expandedPanelIndex" class="pb-0">

                        <div class="item-box" id="myScroll">
                        <v-layout row wrap justify-center class="surface">

                            <v-card width="145px"
                                class="ma-4 pa-5 d-flex justify-center flex-column align-center elevation-0 rounded-xl "
                                style="border: 1px solid #8080809e;" height="158px" v-for="i in 50" :key="i">
                                <v-checkbox v-model="selectedSujects"  :value="i">
                                </v-checkbox>
                                <img src="../assets/india.png" width="48px" height="48px">
                                <div class="mt-5">Lower primary</div>
                                <div class="mt-2">(3-6) yrs</div>
                            </v-card>

                        </v-layout>

                    </div> 

                    </v-stepper-content>

                    <!------------------------------------------ STEP 3 ------------------------------------------>

                    <v-stepper-content step="3" v-model="expandedPanelIndex" class="pb-0">
                        <div class="item-box" id="myScroll">
                        <v-layout row wrap justify-center class="surface">

                            <v-card width="145px">
                              
                                class="ma-4 pa-5 d-flex justify-center flex-column align-center elevation-0 rounded-xl "
                                style="border: 1px solid #8080809e;" height="158px" v-for="i in 50" :key="i">
                                <img src="../assets/india.png" width="48px" height="48px">
                                <div class="mt-5">Lower primary</div>
                                <div class="mt-2">(3-6) yrs</div>
                            </v-card>

                        </v-layout>

                    </div> 
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>

            

        </v-container>
            <div class="d-flex w-100 justify-center bottom-btn">
                <v-btn color="secondary" class="textcolor--text" rounded large width="300px" @click="e1 = 2">
                    next
                </v-btn>
            </div>

    </v-card>
</template>
<script>



export default {
    name: "RegestrationIntrest",
    data() {
        return {
            e1: 1,
            selectedSujects: [],
        };
    },
    computed: {

    },
    mounted() {

    },

    beforeDestroy() {

    },
    methods: {

    },
    created() {

    },
};
</script>
     