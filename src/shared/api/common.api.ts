import axios from 'axios'

const HOST = 'https://test.v5.pryaniky.com'

export const instance = axios.create({
  baseURL: `${HOST}`,
})
