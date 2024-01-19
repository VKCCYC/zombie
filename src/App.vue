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
