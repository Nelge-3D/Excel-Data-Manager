'use client'
import { useState, useEffect, useRef } from 'react'
import { read, utils } from 'xlsx'
import Header from '@/components/Header'
import FileDropZone from '@/components/FileDropZone'
import ExcelTable from '@/components/ExcelTable'
import { exportToExcel } from "@/app/lib/exportExcel"
import { saveToCache, loadFromCache, isCacheActive } from "@/app/lib/cache"

export default function HomePage() {
  const [data, setData] = useState<any[]>([])
  const [cacheStatus, setCacheStatus] = useState<"active" | "expired">("expired")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const cached = loadFromCache()
    if (cached) {
      setData(cached)
      setCacheStatus("active")
    } else {
      setCacheStatus("expired")
    }
  }, [])

  function handleData(newData: any[]) {
    setData(newData)
    setCacheStatus("active")
    saveToCache(newData)
  }

  function handleImportClick() {
    fileInputRef.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const binary = event.target?.result
      const workbook = read(binary as string, { type: 'binary' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = utils.sheet_to_json(sheet)
      handleData(data as any[])
    }
    reader.readAsBinaryString(file)
  }

  // Handler to reset the data and cache
  function handleReset() {
    setData([])
    setCacheStatus("expired")
    saveToCache([])
  }

  // Handler to add a new empty row
  function handleAddRow() {
    setData(prev => [...prev, {}])
    setCacheStatus("active")
    saveToCache([...data, {}])
  }

  return (
    <>
      <Header 
        onExport={() => exportToExcel(data)} 
        onImport={handleImportClick}
        onReset={handleReset}
        onAddRow={handleAddRow}
        cacheStatus={cacheStatus} 
      />
      <main className="max-w-6xl mx-auto p-6">
        {!data.length ? (
          <FileDropZone onData={handleData} />
        ) : (
          <ExcelTable data={data} onEdit={handleData} />
        )}
      </main>
      
      <input
        type="file"
        accept=".xlsx, .xls"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  )
}