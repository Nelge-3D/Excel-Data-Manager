// app/api/employees/route.ts
import { PrismaClient } from '@/generated/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const inserted = await prisma.employee.createMany({
      data: body.map((e) => ({
        nom: e.nom,
        email: e.email,
        telephone: e.telephone,
        departement: e.departement,
        salaire: e.salaire,
      })),
      skipDuplicates: true,
    })

    return NextResponse.json({ 
      success: true, 
      count: inserted.count,
      message: `${inserted.count} employés enregistrés avec succès`
    })
  } catch (error: any) {
    console.error("Erreur Prisma:", error)
    return NextResponse.json({ 
      error: "Erreur serveur",
      details: error.message 
    }, { status: 500 })
  }
}