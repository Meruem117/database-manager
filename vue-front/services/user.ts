import axios from 'axios'
import { userItem } from '../models/user'

export async function getUser(): Promise<userItem[]> {
    const res = await axios.get('/api/user')
    return res.data
}
