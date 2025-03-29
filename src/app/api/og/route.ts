import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()
    const $ = cheerio.load(html)

    let ogImage = $('meta[property="og:image"]').attr('content') || 
                 $('meta[name="twitter:image"]').attr('content') ||
                 $('link[rel="image_src"]').attr('href')

    // URLが相対パスの場合は絶対パスに変換
    if (ogImage && !ogImage.startsWith('http')) {
      const urlObj = new URL(url)
      ogImage = `${urlObj.protocol}//${urlObj.host}${ogImage}`
    }

    // containeer.spaceのURLをcontaineer.vercel.appに置換
    if (ogImage && ogImage.includes('containeer.space')) {
      ogImage = ogImage.replace('containeer.space', 'containeer.vercel.app')
    }

    return NextResponse.json({ ogImage })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch OGP data' }, { status: 500 })
  }
} 