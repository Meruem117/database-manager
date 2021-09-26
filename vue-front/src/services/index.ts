import axios from 'axios'
import { databaseListItem, tableListItem, tableItem, rowItem, feedback } from '@/models'

export async function getDatabases(): Promise<databaseListItem[]> {
    const res = await axios.get('/api/')
    return res.data
}

export async function getTables(database: string): Promise<tableListItem[]> {
    const res = await axios.get(`/api/${database}`)
    return res.data
}

export async function getTableDetail(database: string, table: string): Promise<tableItem> {
    const res = await axios.get(`/api/${database}/${table}`)
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
