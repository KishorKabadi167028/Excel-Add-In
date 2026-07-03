import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  const readCell = async () => {
    await Excel.run(async (context) => {
      const range = context.workbook.getSelectedDataAreaOrNullObject()
      range.load('values')
      await context.sync()
      alert(`Selected range: ${JSON.stringify(range.values)}`)
    })
  }

  const writeCell = async () => {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getActiveWorksheet()
      const range = sheet.getRange('A1')
      range.values = [['Hello from Excel Add-in!']]
      await context.sync()
    })
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI' }}>
      <h1>Excel Add-in Task Pane</h1>
      <p>Welcome to your Excel Add-in!</p>
      
      <button 
        onClick={readCell}
        style={{ 
          padding: '10px 20px', 
          marginRight: '10px',
          backgroundColor: '#0078d4',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Read Cell A1:C5
      </button>

      <button 
        onClick={writeCell}
        style={{ 
          padding: '10px 20px',
          backgroundColor: '#107C10',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '4px'
        }}
      >
        Write to A1
      </button>

      <p>Click count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
