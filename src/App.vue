<template lang="pug">
v-app
  v-app-bar(color='error')
    v-container.d-flex.align-center
      v-app-bar-title 殭屍鐘
      v-btn(prepend-icon="mdi-home" to="/") 首頁
      v-btn(prepend-icon="mdi-list-status" to="/list") 事項
      v-btn(prepend-icon="mdi-cog" to="/settings") 設定
      v-btn(@click="toggleTheme")
        v-icon mdi-theme-light-dark
  v-main
    v-col.box1
      v-img(src="@/assets/zombie_surprised.png")
    v-col.box2
      v-img(src="@/assets/zombie_grinning.png")
    v-col.box3
      v-img(src="@/assets/zombie_cool.png")
    //- Component = 目前該顯示的路由元件
    router-view(v-slot="{ Component }")
      //-  keep-alive 裡面的東西不會被銷毀(保持被包住的元件不被銷毀)
      //- 使用 include 指定只有 HomeView 這個元件不被銷毀
      keep-alive(include="HomeView")
        //- component = 動態元件 ; 使用 is 綁定元件
        component(:is="Component")
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

<style>
.box1{
  width: 100px!important;
  height: 100px;
  position: absolute;
  top: 100px;
  left: 100px;
  z-index: 1000;
  pointer-events: none;
  animation: box1 2s ease-in-out infinite;
}

.box2{
  width: 100px!important;
  height: 100px;
  position: absolute;
  top: 80%;
  left: 5%;
  z-index: 1000;
  pointer-events: none;
  animation: box2 8s ease-in infinite;
}

.box3{
  width: 100px!important;
  height: 100px;
  position: absolute;
  top: 55%;
  left: 45%;
  z-index: 1000;
  animation: box3 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes box1{
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes box2{
  0% {
    /* transform: rotateY(0deg); */
  }
  50% {
    /* transform: rotateY(90deg); */
    transform: translateX(80vw);
  }
  100% {
    /* transform: rotateY(0deg); */
  }
}

@keyframes box3{
  0% {
   opacity: 0;
  }
  50% {
   opacity: 1;
   transform: scale(1.2);
  }
  100% {
    opacity: 0;
  }
}

</style>
