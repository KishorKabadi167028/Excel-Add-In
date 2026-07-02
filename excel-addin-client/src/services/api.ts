import axios from 'axios'

const getApiUrl = ()=> localStorage.getItem('apiUrl') || 'https://localhost:5001'

export async function postImport(data:any){
  const url = `${getApiUrl()}/api/data/import`
  const resp = await axios.post(url, data)
  return resp.data
}

export async function getExport(){
  const url = `${getApiUrl()}/api/data/export`
  const resp = await axios.get(url)
  return resp.data
}
