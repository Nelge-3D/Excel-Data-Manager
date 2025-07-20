'use client'
import { FileUp, Download, RefreshCcw, Plus, Save } from 'lucide-react'

interface HeaderProps {
  onExport: () => void
  onImport: () => void
  onReset: () => void
  onAddRow: () => void
  onSaveToDB: () => void
  cacheStatus: "active" | "expired"
}

export default function Header({
  onExport,
  onImport,
  onReset,
  onAddRow,
  onSaveToDB,
  cacheStatus,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">Excel Manager</h1>

      <div className="flex items-center gap-4">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            cacheStatus === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {cacheStatus === "active" ? "Cache actif" : "Cache expiré"}
        </span>

        <button title="Importer" onClick={onImport} className="btn-icon" aria-label="Importer">
          <FileUp />
        </button>

        <button title="Exporter" onClick={onExport} className="btn-icon" aria-label="Exporter">
          <Download />
        </button>

        <button title="Rafraîchir" onClick={onReset} className="btn-icon" aria-label="Réinitialiser">
          <RefreshCcw />
        </button>

        <button title="Ajouter un employé" onClick={onAddRow} className="btn-icon" aria-label="Ajouter une ligne">
          <Plus />
        </button>

        <button title="Enregistrer en base" onClick={onSaveToDB} className="btn-icon" aria-label="Sauvegarder en base">
          <Save />
        </button>
      </div>
    </header>
  )
}
