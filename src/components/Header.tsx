'use client'
import { FileUp, Download, RefreshCcw, UserPlus } from 'lucide-react'

export default function Header({
  onExport,
  onImport,
  onReset,
  onSaveToDB,
  onAddRow,
  cacheStatus,
}: {
  onExport: () => void
  onImport: () => void
  onReset: () => void
  onSaveToDB: () => void
  onAddRow: () => void
  cacheStatus: "active" | "expired"
}) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">Excel Manager</h1>
      <div className="flex gap-4 items-center">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            cacheStatus === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {cacheStatus === 'active' ? 'Cache actif' : 'Cache expiré'}
        </span>

        <button title="Ajouter une ligne" onClick={onAddRow} className="btn-icon">
          <UserPlus />
        </button>

        <button title="Importer" onClick={onImport} className="btn-icon">
          <FileUp />
        </button>

        <button title="Exporter" onClick={onExport} className="btn-icon">
          <Download />
        </button>

        <button title="Réinitialiser" onClick={onReset} className="btn-icon">
          <RefreshCcw />
        </button>
      </div>
    </header>
  )
}
