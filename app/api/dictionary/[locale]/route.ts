import { NextResponse } from 'next/server'
import { getDictionary } from '@/app/[lang]/dictionaries'

export async function GET(req: Request) {
  const url = req.url
  const lang = (url.match(/en|de|fa|ar/))![0]

  // Validate if the lang is one of the allowed ones
  if (!['en', 'de', 'fa', 'ar'].includes(lang)) {
    return NextResponse.json({ error: 'Invalid lang' }, { status: 400 })
  }

  try {
    // Fetch the dictionary data
    const dictionary = await getDictionary(lang as 'en' | 'de' | 'fa' | 'ar')
    return NextResponse.json(dictionary)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load dictionary' }, { status: 500 })
  }
}