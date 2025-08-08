import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const res = await axios.post(
      `https://7pf48vti.api.sanity.io/v2023-08-04/data/mutate/production`,
      {
        mutations: [
          {
            create: {
              _type: 'menuItem',
              title: body.title,
              price: body.price,
              description: body.description,
              isSpecial: body.isSpecial || false,
              category: {
                _type: 'reference',
                _ref: body.categoryId,
              },
              image: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: body.imageAssetId,
                },
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    return NextResponse.json({ success: true, data: res.data })
  } catch (error) {
    console.error('خطا در افزودن آیتم:', error)
    return NextResponse.json({ error: 'افزودن آیتم ناموفق بود' }, { status: 500 })
  }
}
