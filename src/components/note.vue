<template>
  <div class="note">
    
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
  background-color: orange;
  color: white;
}
</style>