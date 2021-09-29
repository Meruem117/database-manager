import axios from 'axios'
import { databaseListItem, tableListItem, columnItem, rowItem, param, feedback } from '@/models'

export async function getDatabases(): Promise<databaseListItem[]> {
    const res = await axios.get('/api/')
    return res.data
}

export async function getTables(database: string): Promise<tableListItem[]> {
    const res = await axios.get(`/api/${database}`)
    return res.data
}

export async function getTableColumns(database: string, table: string): Promise<columnItem[]> {
    const res = await axios.get(`/api/${database}/${table}`)
    return res.data
}

export async function getTableRows(database: string, table: string, param: param): Promise<rowItem[]> {
    const res = await axios.post(`/api/${database}/${table}/select`, param)
    return res.data
}

export async function insertRow(database: string, table: string, value: rowItem): Promise<feedback> {
    const res = await axios.post(`/api/${database}/${table}/insert`, value)
    return res.data
}

export async function updateRow(database: string, table: string, posts: { key: rowItem, value: rowItem }): Promise<feedback> {
    const res = await axios.post(`/api/${database}/${table}/update`, posts)
    return res.data
}

export async function deleteRow(database: string, table: string, key: rowItem): Promise<feedback> {
    const res = await axios.post(`/api/${database}/${table}/delete`, key)
    return res.data
}
