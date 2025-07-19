'use client'
import { useCallback } from "react"
import { read, utils } from "xlsx"

export default function FileDropZone({ onData }: { onData: (rows: any[]) => void }) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    const reader = new FileReader()

    reader.onload = (event) => {
      const binary = event.target?.result
      const workbook = read(binary, { type: "binary" })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = utils.sheet_to_json(sheet)
      onData(data as any[])
    }

    reader.readAsBinaryString(file)
  }, [onData])

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-4 border-dashed border-blue-400 rounded-lg p-12 text-center bg-blue-50 hover:bg-blue-100 transition"
    >
      <p className="text-blue-700 font-medium">Glissez un fichier Excel ici</p>
    </div>
  )
}
