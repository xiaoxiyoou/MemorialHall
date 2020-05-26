<template>
  <div class="row a-c">
    <div v-if="this.grade == 0">
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="this.grade == 1">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="1.1 <= this.grade && this.grade <= 1.5">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-off.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="1.6<= this.grade && this.grade <= 2">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="2.1<=this.grade && this.grade <= 2.5">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-off.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="2.6<=this.grade && this.grade <= 3">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-in.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="3.1<=this.grade && this.grade <= 3.5">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-off.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="3.6<=this.grade && this.grade <= 4">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-in.png" alt />
    </div>
    <div v-else-if="4.1<= this.grade && this.grade <= 4.5">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-off.png" alt />
    </div>
    <div v-else-if="4.6<= this.grade && this.grade <= 5">
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
      <img class="star" src="./star-on.png" alt />
    </div>
    <span class="text">{{this.grade}}分</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    grade: Number
  },
  data() {
    return {};
  },
  mounted(){
  },
  components: {}
};
</script>

<style scoped lang="stylus">
.star 
  width: 26px;
  margin-right: 6px;
.text
  font-size 28px
  color rgb(255,162,0)
  margin-left 22px
</style>
