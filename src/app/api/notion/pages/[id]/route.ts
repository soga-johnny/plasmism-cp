import { NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params
    const response = await notion.pages.retrieve({ page_id: id })
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching Notion page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Notion page' },
      { status: 500 }
    )
  }
} 