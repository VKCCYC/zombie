<template lang="pug">
v-container
  v-row
    v-col.text-center.text(cols="12")
      h1 {{ currentText }}
      h1 {{ currentTime }}
    v-col.text-center.text(cols="12")
      //- :disabled="status === STATUS.COUNTING" 如果我的狀態是倒數中，停用此功能
      //- :disabled="status !== STATUS.COUNTING" 如果我的狀態不是倒數中，停用此功能
      //- :disabled="currentItem.length === 0" 現在沒有項目，停用此按鈕
      v-btn(size variant="text" icon="mdi-play" :disabled="status === STATUS.COUNTING || (currentItem.length === 0 && items.length === 0)"
      @click="startTimer")
      v-btn(size variant="text" icon="mdi-pause" :disabled="status !== STATUS.COUNTING" @click="pauseTimer")
      v-btn(size variant="text" icon="mdi-skip-next" :disabled="currentItem.length === 0" @click='finishTimer')
</template>

<script setup>
import { useListStore } from '@/store/list'
import { useSettingsStore } from '@/store/settings'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useWebNotification } from '@vueuse/core'

const list = useListStore()
const { currentItem, items, timeleft } = storeToRefs(list)
const { setCurrentItem, countdown, setFinishedItem } = list

const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)

// 0 = 停止
// 1 = 倒數中
// 2 = 暫停
// 狀態碼 (老師習慣大寫)
const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}

const status = ref(STATUS.STOP)

// 回傳是數字，老師習慣設定 0
let timer = 0
const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    setCurrentItem()
  }

  status.value = STATUS.COUNTING

  timer = setInterval(() => {
    countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()

  if (notify.value) {
    const { show, isSupported } = useWebNotification({
      title: '事項完成',
      body: currentItem.value,
      icon: new URL('@/assets/tomato.png', import.meta.url).href
    })
    if (isSupported.value) {
      show()
    }
  }
  // 在 setFinishedItem() 下面會都被清除所以要在上面放 if
  setFinishedItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  // 如果現在有東西在倒數
  // 就顯示倒數的值
  if (currentItem.value.length > 0) {
    return currentItem.value
    // 目前沒東西，但是我有代辦事項，就顯示點擊開始
  } else if (items.value.length > 0) {
    return '點擊開始'
  } else {
    return '沒有事項'
  }
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})

</script>

<style>
.text{
  font-size: 48px;
  text-shadow: 0px 0px 10px rgba(96, 201, 10, 0.8),0px 0px 30px rgba(58, 199, 105, 0.8);
}
</style>
