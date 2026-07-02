// excelService.ts - Office.js helpers

export async function readRange(address = 'A1:C5'){
  return await (window as any).Excel.run(async (context:any)=>{
    const sheet = context.workbook.worksheets.getActiveWorksheet()
    const range = sheet.getRange(address)
    range.load(['values','address'])
    await context.sync()
    return { address: range.address, values: range.values }
  })
}

export async function writeRange(address:string, values:any[][]){
  return await (window as any).Excel.run(async (context:any)=>{
    const sheet = context.workbook.worksheets.getActiveWorksheet()
    const range = sheet.getRange(address)
    range.values = values
    await context.sync()
  })
}

export async function importTableToJson(tableName:string){
  return await (window as any).Excel.run(async (context:any)=>{
    const table = context.workbook.tables.getItem(tableName)
    table.load(['columns/items/name','rows/items'])
    await context.sync()
    const cols = table.columns.items.map((c:any)=>c.name)
    const rows = table.rows.items.map((r:any)=>r.values[0])
    return rows.map((r:any[])=>{
      const obj:any = {}
      cols.forEach((c:string,i:number)=>obj[c]=r[i])
      return obj
    })
  })
}
