<template lang="pug">
v-container
  v-row
    v-col(cols="12")
      h1.text-center 通知設定
    v-col(cols="12")
      v-radio-group(inline v-model="notify")
        v-radio(label="開啟" :value="true")
        v-radio(label="關閉" :value="false")
    v-col(cols="12")
      h1.text-center 鈴聲設定
    v-col(cols="12")
      v-table
        thead
          tr
            th 名稱
            th 試聽
            th 選擇
        tbody
          tr(v-for='alarm in alarms', :key='alarm.id')
            td {{ alarm.name }}
            td
              audio(:src='alarm.file', controls='')
            td
              //- selectedAlarm => 我們選擇的鈴聲
              v-radio-group(v-model='selectedAlarm')
                v-radio(:value="alarm.id")
</template>

<script setup>
import { useSettingsStore } from '@/store/settings'
// 使用 storeToRefs 輔助，解構維持響應性
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
// 可以解構或是不解構
// 解構寫法
const { alarms, selectedAlarm, notify } = storeToRefs(settings)

</script>

<style scoped>
/* style scoped 只會影響這元件 */
/* 要下 :deep 才能順利影響 */
:deep(.v-selection-control-group.v-selection-control-group--inline) {
  margin: auto
}
</style>
