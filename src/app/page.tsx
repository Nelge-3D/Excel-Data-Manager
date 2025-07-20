'use client'
import { useState, useEffect, useRef } from 'react'
import { read, utils } from 'xlsx'
import Header from '@/components/Header'
import FileDropZone from '@/components/FileDropZone'
import ExcelTable from '@/components/ExcelTable'
import { exportToExcel } from "@/app/lib/exportExcel"
import { saveToCache, loadFromCache } from "@/app/lib/cache"
import { Employee } from '@/app/types/types'

export default function HomePage() {
  const [data, setData] = useState<Employee[]>([])
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
    const formattedData: Employee[] = newData.map(row => ({
      nom: row.Nom || '',
      email: row.Email || '',
      telephone: row.Téléphone || '',
      departement: row.Département || '',
      salaire: parseFloat(row.Salaire) || 0,
    }))
    setData(formattedData)
    setCacheStatus("active")
    saveToCache(formattedData)
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
      const jsonData = utils.sheet_to_json(sheet)
      handleData(jsonData)
    }
    reader.readAsBinaryString(file)
  }

  function handleReset() {
    if (confirm("Voulez-vous vraiment réinitialiser les données ?")) {
      setData([])
      localStorage.removeItem("excel-data")
      localStorage.removeItem("excel-data-exp")
      setCacheStatus("expired")
    }
  }

  function handleAddRow() {
    setData(prev => [
      ...prev,
      {
        nom: "",
        email: "",
        telephone: "",
        departement: "",
        salaire: 0,
      },
    ])
  }

  async function handleSaveToDB() {
    if (!data.length) return alert("Aucune donnée à enregistrer")

    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        alert("Données enregistrées en base avec succès 🎉")
      } else {
        const error = await res.json()
        alert(`Erreur lors de l'enregistrement: ${error.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur réseau lors de l'enregistrement")
    }
  }

  return (
    <>
      <Header 
        onExport={() => exportToExcel(data)} 
        onImport={handleImportClick}
        onReset={handleReset}
        onAddRow={handleAddRow}
        onSaveToDB={handleSaveToDB}
        cacheStatus={cacheStatus} 
      />

      <main className="max-w-6xl mx-auto p-6">
        {!data.length ? (
          <FileDropZone onData={handleData} />
        ) : (
          <ExcelTable data={data} onEdit={setData} />
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
