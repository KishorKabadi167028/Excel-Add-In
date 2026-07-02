import React, { useState } from 'react'

export default function Settings(){
  const [apiUrl, setApiUrl] = useState(localStorage.getItem('apiUrl') || 'https://localhost:5001')
  const save = () => {
    localStorage.setItem('apiUrl', apiUrl)
    alert('Saved')
  }
  return (
    <div>
      <label>API URL: <input value={apiUrl} onChange={e=>setApiUrl(e.target.value)} style={{width:400}}/></label>
      <div><button onClick={save}>Save</button></div>
    </div>
  )
}
