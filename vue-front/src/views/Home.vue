<template>
  <h1>Home</h1>
  <el-button type="primary" @click="getDatabases">Send</el-button>
  <el-select
    v-model="state.selectedDatabase"
    placeholder="Select Database"
    :change="getTables(state.selectedDatabase)"
  >
    <el-option
      v-for="item in state.databases"
      :key="item.Database"
      :label="item.Database"
      :value="item.Database"
    ></el-option>
  </el-select>

  <el-select v-model="state.selectedTable" clearable placeholder="Select Table">
    <el-option
      v-for="item in state.tables"
      :key="item[`Tables_in_${state.selectedDatabase}`]"
      :label="item[`Tables_in_${state.selectedDatabase}`]"
      :value="item[`Tables_in_${state.selectedDatabase}`]"
    ></el-option>
  </el-select>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import * as service from '@/services'
import { dataItem } from '@/models'

interface stateItem extends dataItem {
  selectedDatabase: string,
  selectedTable: string
}

const state: stateItem = reactive({
  databases: [],
  tables: [],
  tableDetail: {
    columns: [],
    rows: []
  },
  feedback: {},
  selectedDatabase: '',
  selectedTable: ''
})

const getDatabases = (): void => {
  service.getDatabases()
    .then(res => state.databases = res)
    .catch(err => console.error(err))
}

const getTables = (database: string): void => {
  service.getTables(database)
    .then(res => state.tables = res)
    .catch(err => console.error(err))
}

onMounted(() => {
  getDatabases()
})

</script>
