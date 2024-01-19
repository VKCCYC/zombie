<template lang="pug">
v-container
  v-row
    v-col(cols="12")
      h1.text-center 事項
    v-col(cols="12")
      v-text-field(variant="solo-filled",
      label="新增事項",v-model="newItem",
      :rules="[rules.required, rules.length]",append-icon="mdi-plus",
      ref="newItemInput",@click:append="onInputSubmit",@keydown.enter="onInputSubmit"
       )
      //-    ref="newItemInput" 給元件一個參照
      v-table
        thead
          tr
            th 名稱
            th 操作
        tbody
          tr(v-for="(item, i) in items", :key="item.id")
            td
              span(v-show="!item.edit") {{ item.name }}
              v-text-field(v-show="item.edit",
              v-model="item.model",
              :rules="[rules.required, rules.length]",
              ref="editItemInput" @keydown.enter="onEditInputSubmit(item.id, i)",
              autofocus="")
            td
              template(v-if="!item.edit")
                v-btn(icon="mdi-pen",
                variant="text",
                color="green",
                @click="editItem(item.id)")
                v-btn(icon="mdi-delete-empty", variant="text",
                  color="red", @click="delItem(item.id)")
              template(v-else)
                v-btn(icon="mdi-check", variant="text", color="green",
                  @click="onEditInputSubmit(item.id, i)")
                v-btn(icon="mdi-undo-variant", variant="text", color="red",
                  @click="cancelEditItem(item.id)")
          tr(v-if="items.length === 0")
            td(colspan="2") 沒有事項
    v-col(cols="12")
      h1.text-center 已完成事項
    v-col(cols="12")
      v-table
        thead
          tr
            th 名稱
            th 操作
        tbody
          tr(v-for="item in finishedItems" :key="item.id")
            td {{ item.name }}
            td
              v-btn(icon="mdi-delete" variant="text"
                  color="red"
                  @click="delFinishedItem(item.id)")
          tr(v-if="finishedItems.length === 0")
            td(colspan="2") 沒有已完成事項
</template>

<script setup>
import { ref } from 'vue'
import { useListStore } from '@/store/list'
import { storeToRefs } from 'pinia'

const list = useListStore()
const { items, finishedItems } = storeToRefs(list)
// function 固定不變 => 所以直接解構
const { addItem, editItem, delItem, cancelEditItem, confirmEditItem, delFinishedItem } = list

const newItem = ref('')
const newItemInput = ref(null)
const editItemInput = ref([])

const onInputSubmit = async () => {
  const validate = await newItemInput.value.validate()
  console.log(validate)
  if (validate.length > 0) return
  addItem(newItem.value)
  newItemInput.value.reset()
}

const onEditInputSubmit = async (id, i) => {
  const validate = await editItemInput.value[i].validate()
  if (validate.length > 0) return
  confirmEditItem(id)
}

// const rules = {
//   required: value => !!value || 'asdasd'
//   /*
//   實際寫法
//   required: (value) => {
//     return !!value || 'asdasd'
//   }
//   */
// }

const rules = {
  required: (value) => {
    return Boolean(value) || '欄位必填'
  },
  length: (value) => {
    return value.length >= 3 || '必須三個字以上'
  }
}

</script>
