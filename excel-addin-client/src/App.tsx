import React from 'react'
import TaskPane from './components/TaskPane'

export default function App() {
  return (
    <div style={{padding:12,fontFamily:'Segoe UI, Arial'}}>
      <h2>Excel Add-in Starter</h2>
      <TaskPane />
    </div>
  )
}
