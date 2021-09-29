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
    <el-table :data="state.rows" border stripe style="width:100%; margin: 0 auto" max-height="650">
      <el-table-column
        v-for="item in state.columns"
        :key="item.Field"
        :prop="item.Field"
        :label="item.Field"
        :width="state.columnWidth"
        style="height: 160px;"
      />
      <el-table-column
        v-if="state.selectedTable"
        fixed="right"
        label="Operations"
        :width="state.columnWidth > 240 ? state.columnWidth : 240"
      >
        <template #default>
          <el-row justify="center">
            <el-col :span="8">
              <el-button type="primary" plain>Edit</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="danger" plain>Delete</el-button>
            </el-col>
            <el-col :span="8">
              <el-button v-if="state.isEdit" type="info" plain>Cancel</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import * as service from '@/services'
import { dataItem, param } from '@/models'

interface stateItem extends dataItem {
  selectedDatabase: string,
  selectedTable: string,
  param: param
  columnWidth: number,
  isEdit: boolean
}

const state: stateItem = reactive({
  databases: [],
  tables: [],
  columns: [],
  rows: [],
  feedback: {},
  selectedDatabase: '',
  selectedTable: '',
  param: { start: 0, offset: 10 },
  columnWidth: 180,
  isEdit: false
})

const handleDatabaseChange = (): void => {
  if (state.selectedDatabase) {
    getTables(state.selectedDatabase)
  }
}

const handleTableChange = (): void => {
  const { selectedDatabase, selectedTable } = state
  if (selectedDatabase && selectedTable) {
    getTableColumns(selectedDatabase, selectedTable)
      .then(() => {
        console.log(selectedTable, state.columns)
        const width = (document.body.clientWidth * 0.8) / (state.columns.length + 1)
        state.columnWidth = width > 180 ? width : 180
      })
    getTableRows(selectedDatabase, selectedTable, state.param)
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

const getTableColumns = async (database: string, table: string): Promise<void> => {
  service.getTableColumns(database, table)
    .then(res => state.columns = res)
    .catch(err => console.error(err))
}

const getTableRows = (database: string, table: string, param: param): void => {
  service.getTableRows(database, table, param)
    .then(res => state.rows = res)
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
