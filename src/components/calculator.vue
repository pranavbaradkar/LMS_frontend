<template>
  <div class="calculator">
    <div class="display">

      <div>
        <ul class="historyData">
          <li 
          v-for="(hist,index) in history"
          :key="index"
          >
            {{ hist }}
          </li>
        </ul>
      </div>

      <div v-if="state">
        {{ current || 0}}
      </div>
      

    </div>
    <div class="cal-container d-flex flex-row flex-wrap justify-content-sm-between">
      <div @click="clear" class="cal-btn">C</div>
      <div @click="sign()" class="cal-btn operator">+/-</div>
      <div @click="persent('%')" class="cal-btn operator">%</div>
      <div @click="append('/')" class="cal-btn operator">/</div>
      <div @click="append('7')" class="cal-btn ">7</div>
      <div @click="append('8')" class="cal-btn ">8</div>
      <div @click="append('9')" class="cal-btn ">9</div>
      <div @click="append('*')" class="cal-btn operator">*</div>
      <div @click="append('4')" class="cal-btn ">4</div>
      <div @click="append('5')" class="cal-btn ">5</div>
      <div @click="append('6')" class="cal-btn ">6</div>
      <div @click="append('-')" class="cal-btn operator">-</div>
      <div @click="append('1')" class="cal-btn ">1</div>
      <div @click="append('2')" class="cal-btn ">2</div>
      <div @click="append('3')" class="cal-btn ">3</div>
      <div @click="append('+')" class="cal-btn operator">+</div>
      <div @click="append('0')" class="cal-btn zero">0</div>
      <div @click="append('00')" class="cal-btn zero">00</div>
      <div @click="dot()" class="cal-btn ">.</div>
      <div @click="equal()" class="cal-btn operator">=</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      current:'',
      operator:null,
      history:[],
      solve:'',
      state:true
    }
  },
  methods:{
    clear(){
      this.state=true
      this.current=''
    },
    sign(){
      this.current = this.current.charAt(0) === '-' ?
          this.current.slice(1) : `-${this.current}`
    },
    persent(){
      this.current = `${parseFloat(this.current)/100}`
    },
    append(number){
      this.current = `${this.current}${number}`
    },
    dot(){
      if(this.current.indexOf('.')===-1){
        this.append('.')
      }
    },
    equal(){
      this.solve = this.current + '='
      this.current = eval(this.current)
      this.solve = this.solve + `${this.current}`
      this.history.push(this.solve)
      console.log(this.history)
    },
    histories(){
      this.state = false
      this.current = this.history
    }
  }
}
</script>


<style scoped>
.calculator{
  cursor: pointer;
  margin: 0 auto;
  width: 100%;
  font-size: 40px;
}
.cal-container {
  justify-content: space-between;
}
.historyData {
  background-color: #EBEBEB;
  color: #2D2D2D;
  font-size: 1rem;
  min-height: 150px;
  overflow: scroll;
  list-style: none;
}
.display {
  grid-column: 1 / 5;
  background-color: #EBEBEB;
  color: #2D2D2D;
  text-align: right;
  padding: 0px 10px;
}
.cal-btn{
  margin-top: 4px;
  margin-bottom: 4px;
  width: 21%;
  height: 43.4px;
  background: #FFFFFF;
  border-radius: 6px;

  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;


  color: #2D2D2D;
}

.zero{
  grid-column: 1 / 3;
}
.operator{
  background: #FFFFFF;
  color: #2D2D2D;
}
</style>