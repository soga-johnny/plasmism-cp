import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function GET(
  request: Request,
  context: any // Next.js 15.2.3との互換性のために型をanyに
) {
  try {
    // Next.js 15.2.3に対応 - paramsがPromiseの場合も考慮
    const params = context.params || {}
    const id = typeof params === 'object' 
      ? (params.id || (params instanceof Promise ? (await params).id : null)) 
      : null

    if (!id) {
      return NextResponse.json(
        { error: 'Invalid ID parameter' },
        { status: 400 }
      )
    }

    const response = await notion.pages.retrieve({ page_id: id })
    
    return NextResponse.json(response)
  } catch (_error) {
    console.error('Error fetching Notion page:', _error)
    return NextResponse.json(
      { error: 'Failed to fetch Notion page' },
      { status: 500 }
    )
  }
} 