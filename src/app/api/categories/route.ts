import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
  const query = `
    *[_type == "category"]{
      _id,
      titleFa,
      titleEn
    }
  `

  const url = `https://7pf48vti.api.sanity.io/v2023-08-04/data/query/production?query=${encodeURIComponent(query)}`

  try {
    const response = await axios.get(url)
    return NextResponse.json(response.data.result)
  } catch (err) {
    return NextResponse.json({ error: 'خطا در دریافت دسته‌بندی‌ها' }, { status: 500 })
  }
}
