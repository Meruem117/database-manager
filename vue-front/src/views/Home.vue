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
      />
      <el-table-column
        v-if="state.selectedTable"
        fixed="right"
        label="Operations"
        :width="state.columnWidth > OPERATION_COLUMN_WIDTH ? state.columnWidth : OPERATION_COLUMN_WIDTH"
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

    <el-pagination
      v-model:currentPage="state.currentPage"
      :page-size="PAGE_SIZE"
      layout="total, prev, pager, next"
      :total="1000"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import * as service from '@/services'
import { dataItem, param } from '@/models'
import { START_ROW, PAGE_SIZE, COLUMN_WIDTH, OPERATION_COLUMN_WIDTH } from '@/constant'

interface stateItem extends dataItem {
  selectedDatabase: string,
  selectedTable: string,
  columnWidth: number,
  currentPage: number,
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
  currentPage: 1,
  columnWidth: COLUMN_WIDTH,
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
        const width = (document.body.clientWidth * 0.8) / (state.columns.length + 1)
        state.columnWidth = width > COLUMN_WIDTH ? width : COLUMN_WIDTH
      })
    getTableRows(selectedDatabase, selectedTable, { start: START_ROW, offset: PAGE_SIZE })
  }
}

const handlePageChange = (): void => {
  const param: param = {
    start: (state.currentPage - 1) * PAGE_SIZE,
    offset: PAGE_SIZE
  }
  getTableRows(state.selectedDatabase, state.selectedTable, param)
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
