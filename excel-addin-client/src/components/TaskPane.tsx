import React, { useState } from 'react'
import { readRange, writeRange, importTableToJson } from '../services/excelService'
import { postImport, getExport } from '../services/api'

export default function TaskPane(){
  const [logs, setLogs] = useState<string[]>([])

  const append = (t: string) => setLogs(s => [t, ...s].slice(0,50))

  const onRead = async () => {
    try{
      const r = await readRange('A1:C5')
      append('Read: ' + JSON.stringify(r.values))
    }catch(e:any){
      append('Read error: ' + e.message)
    }
  }

  const onWrite = async () => {
    try{
      await writeRange('A10:C12', [["One", "Two", "Three"],[1,2,3]])
      append('Write complete')
    }catch(e:any){ append('Write error: '+ e.message) }
  }

  const onImport = async () => {
    try{
      const data = await importTableToJson('Table1')
      append('Imported table rows: ' + data.length)
      const resp = await postImport(data)
      append('Server imported: ' + JSON.stringify(resp))
    }catch(e:any){ append('Import error: ' + (e?.message || e)) }
  }

  const onExport = async () => {
    try{
      const rows = await getExport()
      // write to sheet
      await writeRange('A20:C' + (20 + rows.length), [Object.keys(rows[0]||{}), ...rows.map(r=>[r.name, new Date(r.createdAt).toLocaleString()])])
      append('Exported ' + rows.length + ' rows to sheet')
    }catch(e:any){ append('Export error: ' + (e?.message || e)) }
  }

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <button onClick={onRead}>Read A1:C5</button>
        <button onClick={onWrite}>Write A10:C12</button>
        <button onClick={onImport}>Import Table1 → API</button>
        <button onClick={onExport}>Export API → Sheet</button>
      </div>
      <div style={{maxHeight:300,overflow:'auto',border:'1px solid #ddd',padding:8}}>
        {logs.map((l,i)=>(<div key={i} style={{fontSize:12}}>{l}</div>))}
      </div>
    </div>
  )
}
