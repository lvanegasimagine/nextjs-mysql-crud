import { type NextRequest, NextResponse } from 'next/server'
import { conn } from '@/libs/mysql'

export async function GET () {
  try {
    const result = await conn.query('SELECT * FROM product')
    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function POST (req: NextRequest) {
  try {
    const { name, description, price } = await req.json()

    const result: any = await conn.query('INSERT INTO product SET ?', {
      name,
      description,
      price
    })

    return NextResponse.json({ name, description, price, id: result.insertId }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
