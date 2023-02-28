<template>
  <div class="surface">
    <v-app-bar app elevation="0" color="surface" class="justify-start">
      <v-list-item>
        <v-list-item-icon>
          <v-img src="../assets/logo.png" contain height="32"></v-img>
        </v-list-item-icon>
        <v-list-item-content> </v-list-item-content>
        <v-list-item-action>
          <v-row class="align-center">
            <v-card-title class="font-weight-light pr-0">Hello,</v-card-title>

            <v-card-title class="pl-2">Diksha 👋</v-card-title>

            <v-avatar>
              <v-img src="../assets/user.png"></v-img>
            </v-avatar>
          </v-row>
        </v-list-item-action>
      </v-list-item>
    </v-app-bar>
    <v-container>
      <v-card
        color="surface"
        class="mx-auto"
        elevation="0"
        width="100%"
        :height="getHeight"
        variant="outlined"
      >
        <div class="text-h6 mb-1 text-center">Test Selection</div>
        <v-list-item-subtitle class="text-center grey--text"
          >Let's start your profile, connect to people you know, and engage with
          <br />them on topics you care about.</v-list-item-subtitle
        >

        <v-img
          width="100%"
          height="320px"
          src="../assets/holebanner.jpeg"
          cover
          class="mt-4"
        >
          <v-card
            class="pa-10"
            elevation="0"
            width="100%"
            height="100%"
            variant="outlined"
            color="#0f0d0d57"
          >
            <div class="white--text">
              <div class="text-caption">Recommended</div>

              <div class="text-h4 mb-1">Primary Teacher Assessment(VGOS)</div>
              <v-list-item-subtitle class="mt-4"
                >This course will provide you with in depth knowledge of child
                <br />development. it will take you though all the development
                domains. them on topics you care about.</v-list-item-subtitle
              >
              <div class="mt-4">
                <v-icon class="white--text">mdi-book</v-icon> 11
                Questions<v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-clock</v-icon> 5 mins
                <v-icon class="white--text">mdi-circle-small</v-icon
                ><v-icon class="white--text">mdi-book</v-icon>
                300 Users
              </div>

              <v-dialog v-model="dialog" height="90%" width="40vw">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="secondary"
                    class="black--text mt-8"
                    rounded
                    large
                    v-bind="attrs"
                    v-on="on"
                    >START TEST</v-btn
                  >
                </template>

                <div id="mycard">
                  <v-card width="700" elevation="0">
                    <div class="text-h6 mb-1 text-center pt-8">
                      Test Instruction
                    </div>
                    <v-card-subtitle class="pt-2 grey--text text-center"
                      >Primary Teacher Assessment(VGOS)</v-card-subtitle
                    >
                    <v-list dense>
                      <v-list-item-group>
                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-card-subtitle class="pt-2 text-start"
                              >This assessment consists a total of 11
                              questions</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-card-subtitle class="pt-2 text-start"
                              >The test assesses you in 4 different areas as can
                              be seen in the progress-bar at the
                              top</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-card-subtitle class="pt-2 text-start"
                              >You get a maximum of 60s to answer a question in
                              this test</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content class="pt-0 pb-0">
                            <v-card-subtitle class="pt-2 text-start"
                              >A timer that keeps ticking at the top indicates
                              how much time you have to answer a
                              question</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content class="pt-0 pb-0">
                            <v-card-subtitle class="pt-2 text-start"
                              >There is no negative making, some questions may
                              have more than one correct answer</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>

                        <v-list-item class="pt-0 pb-0">
                          <v-list-item-icon class="pr-0 mr-0">
                            <v-icon>mdi-circle-small</v-icon>
                          </v-list-item-icon>
                          <v-list-item-content class="pt-0 pb-0">
                            <v-card-subtitle class="pt-2 text-start"
                              >Upon the assessment completion, not only the
                              score but a detailed report is
                              generated</v-card-subtitle
                            >
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card>

                  <v-card elevation="0" align="center" width="100%">
                    <v-btn
                      color="secondary"
                      class="black--text mb-16"
                      rounded
                      large
                      @click="dialog = false"
                      to="/assessment"
                      >START TEST</v-btn
                    >
                  </v-card>
                </div>
              </v-dialog>
            </div>
          </v-card>
        </v-img>
        <div class="text-h6 py-4">Other Tests</div>

        <v-sheet class="pa-0 mt-3 ml-0 mr-0" max-width="100%">
          <v-slide-group
            v-model="model"
            class="pa-0 ma-0 surface"
            center-active
            show-arrows
          >
            <v-slide-item v-for="n in 15" :key="n">
              <v-card
                v-if="n == mouseHover"
                class="mx-auto mr-3"
                max-width="344"
                outlined
                height="180"
                @mouseover="mouseHover = n"
                @mouseleave="mouseHover = null"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  ></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-h7 mb-0 text-wrap">
                      Trained Graduate Teacher Assessment (VGOS)
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      This course will provide you with in Depth knowledge of
                      Child development. it will take you though all the
                      developmental domens</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-expand-transition>
                  <v-card-actions v-if="n == mouseHover">
                    <v-btn
                      block
                      color="secondary"
                      class="black--text"
                      rounded
                      to="/assessment"
                      >START TEST</v-btn
                    >
                  </v-card-actions>
                </v-expand-transition>
              </v-card>

              <v-card
                v-else
                class="mx-auto mr-3"
                max-width="344"
                outlined
                height="120"
                @mouseover="mouseHover = n"
                @mouseleave="mouseHover = null"
              >
                <v-list-item three-line>
                  <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                  ></v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="text-h7 mb-0 text-wrap">
                      Trained Graduate Teacher Assessment (VGOS)
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      This course will provide you with in Depth knowledge of
                      Child development. it will take you though all the
                      developmental domens</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-expand-transition>
                  <v-card-actions v-if="n == mouseHover">
                    <v-btn
                      block
                      color="secondary"
                      class="black--text"
                      rounded
                      to="/assessment"
                      >START TEST</v-btn
                    >
                  </v-card-actions>
                </v-expand-transition>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-card>
    </v-container>
  </div>
</template>
  
<script>
import "../styles.css";
export default {
  name: "HomeView",
  data() {
    return {
      mouseHover: null,
      tab: null,
      model: null,
      dialog: false,
      windowHeight: window.innerHeight,
    };
  },
  computed: {
    getHeight() {
      return this.windowHeight - 90;
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
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>
   