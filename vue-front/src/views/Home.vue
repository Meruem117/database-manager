<template>
  <h1>Home</h1>
  <el-space wrap :size="30">
    <el-select
      key="database"
      v-model="state.selectedDatabase"
      clearable
      placeholder="Select Database"
      @change="handleDatabaseChange"
    >
      <el-option
        v-for="item in state.databases"
        :key="item.Database"
        :label="item.Database"
        :value="item.Database"
      />
    </el-select>
    <el-select
      key="table"
      v-model="state.selectedTable"
      clearable
      placeholder="Select Table"
      @change="handleTableChange"
    >
      <el-option
        v-for="item in state.tables"
        :key="item[`Tables_in_${state.selectedDatabase}`]"
        :label="item[`Tables_in_${state.selectedDatabase}`]"
        :value="item[`Tables_in_${state.selectedDatabase}`]"
      />
    </el-select>
  </el-space>
  <div class="table">
    <el-table
      :data="state.tableDetail.rows"
      border
      stripe
      style="width:100%; margin: 0 auto"
      max-height="650"
    >
      <el-table-column
        v-for="item in state.tableDetail.columns"
        :key="item.Field"
        :prop="item.Field"
        :label="item.Field"
        :width="state.tableColumnWidth"
      />
      <el-table-column
        v-if="state.selectedTable"
        fixed="right"
        label="Operations"
        :width="state.tableColumnWidth"
      >
        <template #default>
          <el-button type="text" size="small">Detail</el-button>
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import * as service from '@/services'
import { dataItem } from '@/models'

interface stateItem extends dataItem {
  selectedDatabase: string,
  selectedTable: string,
  tableColumnWidth: number
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
  selectedTable: '',
  tableColumnWidth: 180
})

const handleDatabaseChange = (): void => {
  if (state.selectedDatabase) {
    getTables(state.selectedDatabase)
  }
}

const handleTableChange = (): void => {
  if (state.selectedDatabase && state.selectedTable) {
    getTableDetail(state.selectedDatabase, state.selectedTable)
    const width = 1280 / (state.tableDetail.columns.length + 1)
    state.tableColumnWidth = width > 180 ? width : 180
  }
}

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

const getTableDetail = (database: string, table: string): void => {
  service.getTableDetail(database, table)
    .then(res => state.tableDetail = res)
    .catch(err => console.error(err))
}

onMounted(() => {
  getDatabases()
})

</script>

<style scoped>
.table {
  height: auto;
  width: 80%;
  margin: 30px auto 0;
}
</style>
