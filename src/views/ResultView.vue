<template height="80">
    <div class="surface">
      <v-app-bar app elevation="0" color="surface" class="justify-start">
        <v-list-item>
          <v-list-item-icon>
            <v-img src="../assets/logo.svg" contain height="64"></v-img>
          </v-list-item-icon>
          <v-list-item-content> </v-list-item-content>
          <v-list-item-action>
            <v-row class="align-center">
              <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>
  
              <v-card-title class="pl-2" v-if="userInfo != null"
                >{{ userInfo.first_name }} 👋</v-card-title
              > 
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
      <v-container class="white-background pa-0" style="width: 75vw">
        <!-- :height="getHeight" -->
        <v-card
          color="surface"
          class="mx-auto"
          elevation="0"
          width="100%"
          variant="outlined"
        >
          <v-card width="75%" class="pa-0" style="position: fixed; z-index: 10; top: 62px">
            <v-card-title  style="width: 100%">
              <div class="d-flex flex-row justify-space-between" style="width: 100%">
                <div class="d-flex flex-row justify-center">
                  <v-icon class="mr-4">mdi-arrow-left</v-icon>
                  <div>
                    <div style="font-size: 12px;line-height:14px ;">SCREENING RESULT</div>
                    <div>Your Screening Test Report</div>
                  </div>
                </div>
                <div class="d-flex flex-row justify-center">
                  <v-icon color="black" class="mr-5">
                    mdi-share-variant-outline
                  </v-icon>
                  <v-icon color="black">
                    mdi-tray-arrow-down
                  </v-icon>
                </div>
              </div>
            </v-card-title>
          </v-card>
          <v-img
            width="100%"
            height="390"
            src="../assets/home_banner.svg"
            cover
            style="margin-top: 76px"
          >
            <v-card
              class="pa-10 d-flex align-center"
              elevation="0"
              width="100%"
              height="100%"
              variant="outlined"
              color="transparent"
            >
              <div
                class="white--text text-container"
              >
                <!-- <div class="text-caption">Recommended</div> -->
                <v-btn
                  style="font-size: 16px;"
                  elevation="0"
                  height="32px"
                  color="#03C988"
                  class="white--text font-weight-regular text-capitalize mb-3"
                  rounded
                  >Passed Screening Test 
                </v-btn>
                <div class="mb-1" style="font-size: 28px; line-height: 33px;">Primary Teacher Assessment (VGOS)</div>
                <p class="mt-1 font-weight-regular" style="font-size: 14px; color: #FAFAFA;">
                    This test will assess the user in all the below-mentioned sections based on the preferences of the level and subjects selected by the candidate. The candidate who clears this assessment will be eligible for the next step of the process.
                </p>
                <div>
                  <v-btn
                  height="48px"
                  color="#E9F2F9"
                  class="primary--text mt-4 mr-4"
                  large
                  elevation="0"
                  @click="viewResult(12)"
                  >View Result</v-btn
                >

                <v-btn
                  height="48px"
                  color="primary"
                  class="white--text mt-4"
                  large
                  elevation="0"
                  @click="() => {}"
                  >Setup Mains</v-btn
                >
                </div>
              </div>
            </v-card>
          </v-img>

          <div class="resultParent d-flex flex-row justify-center mt-4 px-8">
            <v-card elevation="0" height="303" width="298" style="background-color: #F8FAFC; border: 1px solid #DADADA; position: relative;" class="mr-4 pa-8 pt-6">
              <Doughnut
                    :options="chartOptions"
                    :data="chartDataPercentage"
                    chart-id="doughnut-chart"
                    width="100%"
                    height="100%"> 
              </Doughnut>
              <div style="top: 50%; left: 50% ;position: absolute; transform: translate(-50%, -50%);" class="d-flex justify-center flex-column align-center">
                <div style="font-size: 32px; line-height: 38px; font-weight: 500;">85%</div>
                <div style="font-size: 16px; line-height: 19px; font-weight: 500;">Test Result</div>
              </div>
            </v-card>

            <v-card elevation="0" height="303" width="298" style="background-color: #F8FAFC; border: 1px solid #DADADA" class="mr-4 pa-8 pt-6">
              <Doughnut
                    :options="chartOptions"
                    :data="chartDataScore"
                    chart-id="doughnut-chart"
                    width="100%"
                    height="100%"> 
              </Doughnut>
              <div style="top: 50%; left: 50% ;position: absolute; transform: translate(-50%, -50%);" class="d-flex justify-center flex-column align-center">
                <div style="font-size: 32px; line-height: 38px; font-weight: 500;">45 / 60</div>
                <div style="font-size: 16px; line-height: 19px; font-weight: 500;">Test Score</div>
              </div>
            </v-card>

            <v-card elevation="0" height="303" width="402" style="border: 1px solid #DADADA" class="pa-4">
              <Bar
                    :options="chartOptions"
                    :data="chartDataSkills"
                    chart-id="bar-chart"
                    width="100%"
                    height="100%"> 
            </Bar>
             </v-card>
          </div>

          <v-row class="pa-8">
            <v-col v-for="(item,index) in chartDataSkills.labels" :key="index" cols="4">
              <div style="border: 1px solid #DADADA;" :style="{'background-color': chartDataSkills.datasets[0].dotBgColor[index]}" class="d-flex flex-row justify-space-between align-center pa-4 rounded-xl">
                <div class="d-flex align-center">
                  <div style="border-radius: 8px; height: 15px; width: 15px;" :style="{'background-color': chartDataSkills.datasets[0].backgroundColor[index]}"></div>
                  <div style="font-size: 16px; line-height: 19px; font-weight: 500;" class="ml-2">{{ item }}</div>
                </div>
                <div style="font-size: 32px; line-height: 38px; font-weight: 500;">
                  6/10
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
  </template>
    
  <script>
  import "../styles.css";

  import { Doughnut, Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);
  export default {
    name: "ResultView",
    components: {
    Doughnut,Bar
    },
    data () {
      return {
        chartDataPercentage: {
        // labels: ["", ""],
        datasets: [
          { 
            label: 'Skill wise score',
            backgroundColor: ["#277BC0", " #EBEBEB"],
            data: [85, 15],
            circumference: 260,
            rotation: 231,
            cutout: "90%",
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
    legend: {
      display: false
    }
  }
        
      },
      chartDataScore: {
        // labels: ["", ""],
        datasets: [
          {
            backgroundColor: ["#277BC0", " #EBEBEB"],
            data: [45, 15],
            circumference: 260,
            rotation: 230,
            cutout: "90%",
          },
        ],
      },
      chartDataSkills: {
        labels: ["IQ/EQ", "Pedagogy", "English", "Psychometry", "Subject", "Computer"],
        datasets: [
          {
            dotBgColor: [
              "rgba(255, 40, 26, 0.1)", 
              " rgba(245, 200, 40, 0.1)", 
              ' rgba(16, 185, 129, 0.1)',
              'rgba(26, 173, 255, 0.1)',
              'rgba(26, 98, 255, 0.1)', 
              'rgba(129, 26, 255, 0.1)'],
            backgroundColor: ["#FF281A", " #F5C828", '#10B981','#1AADFF','#1A62FF', '#811AFF'],
            data: [20, 35, 50, 60, 100,45, 120],
          },
        ],
      },
      }
    },
    methods: {
      viewResult() {
      
      },
    }
  };
  </script>
     