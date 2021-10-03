<template>
  <h1>Home</h1>
  <el-space wrap :size="30">
    <!-- select database -->
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
    <!-- select table -->
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
  <!-- table -->
  <div class="table">
    <el-table :data="state.rows" border stripe style="width:100%; margin: 0 auto" max-height="650">
      <el-table-column
        v-for="item in state.columns"
        :key="item.Field"
        :prop="item.Field"
        :label="item.Field"
        :width="state.columnWidth"
      />
      <!-- operations -->
      <el-table-column
        v-if="state.selectedTable"
        fixed="right"
        label="Operations"
        :width="OPERATION_COLUMN_WIDTH"
      >
        <template #default>
          <el-row :gutter="5">
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
    <!-- pannel -->
    <div class="pannel">
      <el-button round @click="handlePageChangePrev" :disabled="state.currentPage <= 1">Prev</el-button>
      <p style="display: inline;margin: 0 8px;">第 {{ state.currentPage }} 页</p>
      <el-button round @click="handlePageChangeNext" :disabled="state.rows.length < PAGE_SIZE">Next</el-button>
      <el-button type="primary" @click="state.dialogVisible = true">Add</el-button>
      <!-- dialog -->
      <el-dialog v-model="state.dialogVisible" title="Insert">
        <el-form :model="state.form">
          <el-form-item label="Promotion name" :label-width="COLUMN_WIDTH">
            <el-input v-model="state.form.name" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button plain @click="state.dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="state.dialogVisible = false">Confirm</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
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
  isEdit: boolean,
  dialogVisible: boolean,
  form: {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  }
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
  isEdit: false,
  dialogVisible: false,
  form: {
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
  }
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
        const width = (document.body.clientWidth * 0.8 - OPERATION_COLUMN_WIDTH) / state.columns.length
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

const handlePageChangePrev = (): void => {
  state.currentPage--
  console.log(state.currentPage)
  handlePageChange()
}

const handlePageChangeNext = (): void => {
  state.currentPage++
  console.log(state.currentPage)
  handlePageChange()
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
.pannel {
  width: 100%;
  margin: 30px auto 0;
}
</style>
