<template>
  <h1>Home</h1>
  <el-space wrap :size="30">
    <!-- select database -->
    <el-select key="database" v-model="state.selectedDatabase" clearable placeholder="Select Database"
      @change="handleDatabaseChange">
      <el-option v-for="item in state.databases" :key="item.Database" :label="item.Database" :value="item.Database" />
    </el-select>
    <!-- select table -->
    <el-select key="table" v-model="state.selectedTable" clearable placeholder="Select Table"
      @change="handleTableChange">
      <el-option v-for="item in state.tables" :key="item[`Tables_in_${state.selectedDatabase}`]"
        :label="item[`Tables_in_${state.selectedDatabase}`]" :value="item[`Tables_in_${state.selectedDatabase}`]" />
    </el-select>
  </el-space>
  <!-- table -->
  <div class="table">
    <el-table :data="state.rows" border stripe style="width:100%; margin: 0 auto" max-height="650">
      <el-table-column v-for="item in state.columns" :key="item.Field" :prop="item.Field" :label="item.Field"
        :width="state.columnWidth" />
      <!-- operations -->
      <el-table-column v-if="state.selectedTable" fixed="right" label="Operations" :width="OPERATION_COLUMN_WIDTH">
        <template #default>
          <el-button type="primary" plain>Edit</el-button>
          <el-button type="danger" plain>Delete</el-button>
          <el-button v-if="state.isEdit" type="info" plain>Cancel</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- panel -->
    <div class="panel">
      <el-button round @click="handlePageChangePrev" :disabled="state.currentPage <= 1">Prev</el-button>
      <p style="display: inline;margin: 0 8px;">第 {{ state.currentPage }} 页</p>
      <el-button round @click="handlePageChangeNext" :disabled="state.rows.length < PAGE_SIZE">Next</el-button>
      <el-button type="primary" @click="state.dialogVisible = true">Add</el-button>
      <!-- dialog -->
      <el-dialog v-model="state.dialogVisible" title="Insert">
        <el-form :model="state.form" :rules="state.formRules" ref="ruleForm" label-position="right">
          <el-form-item v-for="item in state.columns" :key="item.Field" :label="item.Field" :label-width="COLUMN_WIDTH">
            <el-input v-model="state.form[item.Field]" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button plain @click="state.dialogVisible = false">Cancel</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { dataItem, param } from '@/models'
import * as service from '@/services'
import { START_ROW, PAGE_SIZE, COLUMN_WIDTH, OPERATION_COLUMN_WIDTH } from '@/constant'

interface stateItem extends dataItem {
  selectedDatabase: string,
  selectedTable: string,
  columnWidth: number,
  currentPage: number,
  isEdit: boolean,
  dialogVisible: boolean,
  form: {
    [key: string]: string | number | null
  },
  formRules: {
    name: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur',
      },
    ]
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
  isEdit: true,
  dialogVisible: false,
  form: {},
  formRules: {
    name: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur',
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: 'blur',
      },
    ]
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

const submitForm = (formName: string): void => {
  console.log('submit', formName)
}

const resetForm = (formName: string): void => {
  console.log('reset', formName)
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
    .then(() => console.log(state.columns))
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
  margin: 20px auto 0;
}

.panel {
  width: 100%;
  margin: 20px auto 0;
}
</style>
