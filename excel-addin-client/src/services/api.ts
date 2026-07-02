import axios from 'axios'

export type ExportRow = { [key: string]: any } // flexible shape; adjust to your API model

const getApiUrl = ()=> localStorage.getItem('apiUrl') || 'https://localhost:5001'

export async function postImport(data:any){
  const url = `${getApiUrl()}/api/data/import`
  const resp = await axios.post(url, data)
  return resp.data
}

export async function getExport(): Promise<ExportRow[]>{
  const url = `${getApiUrl()}/api/data/export`
  const resp = await axios.get(url)
  return resp.data as ExportRow[]
}
