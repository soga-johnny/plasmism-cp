// 実績一覧のモックデータ
export const mockAchievements = [
  {
    id: 'achievement-1',
    properties: {
      Title: {
        title: [{ plain_text: 'Webサイトのリニューアル' }]
      },
      Description: {
        rich_text: [{ plain_text: '大手企業のコーポレートサイトをリニューアルし、モダンなデザインと高いユーザビリティを実現しました。' }]
      },
      Date: {
        date: { start: '2023-12-15' }
      },
      Category: {
        select: { name: 'ウェブ開発' }
      }
    },
    cover: {
      external: { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' }
    }
  },
  {
    id: 'achievement-2',
    properties: {
      Title: {
        title: [{ plain_text: 'ブランディング戦略の策定' }]
      },
      Description: {
        rich_text: [{ plain_text: 'スタートアップ企業のブランディング戦略を策定し、市場での認知度向上に貢献しました。' }]
      },
      Date: {
        date: { start: '2023-10-05' }
      },
      Category: {
        select: { name: 'ブランディング' }
      }
    },
    cover: {
      external: { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' }
    }
  },
  {
    id: 'achievement-3',
    properties: {
      Title: {
        title: [{ plain_text: 'モバイルアプリ開発' }]
      },
      Description: {
        rich_text: [{ plain_text: '健康管理をサポートするモバイルアプリを開発し、ユーザー満足度95%を達成しました。' }]
      },
      Date: {
        date: { start: '2023-08-20' }
      },
      Category: {
        select: { name: 'アプリ開発' }
      }
    },
    cover: {
      external: { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' }
    }
  }
];

// 実績詳細のモックデータ
export const mockAchievementDetails = {
  'achievement-1': {
    page: {
      id: 'achievement-1',
      properties: {
        Title: {
          title: [{ plain_text: 'Webサイトのリニューアル' }]
        },
        Description: {
          rich_text: [{ plain_text: '大手企業のコーポレートサイトをリニューアルし、モダンなデザインと高いユーザビリティを実現しました。' }]
        },
        Date: {
          date: { start: '2023-12-15' }
        },
        Category: {
          select: { name: 'ウェブ開発' }
        }
      },
      cover: {
        external: { url: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80' }
      }
    },
    blocks: [
      {
        id: 'block-1',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { 
              plain_text: 'このプロジェクトでは、クライアントのブランドイメージを強化するための包括的なウェブサイトリニューアルを実施しました。',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-2',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { 
              plain_text: 'プロジェクトの概要',
              annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-3',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { 
              plain_text: 'クライアントは創業30年の歴史を持つ大手企業でしたが、ウェブサイトは10年以上更新されておらず、現代のデジタル環境に対応していませんでした。私たちのチームは、ユーザー調査からデザイン、開発、テストまで一貫して担当し、6ヶ月間のプロジェクトを成功裏に完了しました。',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-4',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { 
              plain_text: '主な成果',
              annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-5',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [
            { 
              plain_text: 'サイト訪問者数が45%増加',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-6',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [
            { 
              plain_text: 'モバイルユーザーからのコンバージョンが60%向上',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-7',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [
            { 
              plain_text: 'ページ読み込み速度を70%改善',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-8',
        type: 'image',
        image: {
          type: 'external',
          external: {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80'
          },
          caption: [{ plain_text: 'プロジェクトの成果グラフ' }]
        }
      }
    ]
  },
  'achievement-2': {
    page: {
      id: 'achievement-2',
      properties: {
        Title: {
          title: [{ plain_text: 'ブランディング戦略の策定' }]
        },
        Description: {
          rich_text: [{ plain_text: 'スタートアップ企業のブランディング戦略を策定し、市場での認知度向上に貢献しました。' }]
        },
        Date: {
          date: { start: '2023-10-05' }
        },
        Category: {
          select: { name: 'ブランディング' }
        }
      },
      cover: {
        external: { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' }
      }
    },
    blocks: [
      {
        id: 'block-1',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { 
              plain_text: '新興のテクノロジースタートアップ企業のためのブランディング戦略を策定し、市場での存在感を高めるサポートを行いました。',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-2',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { 
              plain_text: '課題',
              annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-3',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { 
              plain_text: 'クライアントは革新的な技術を持っていましたが、競争の激しい市場で差別化し、ターゲットオーディエンスに効果的に訴求する方法が課題でした。',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      }
    ]
  },
  'achievement-3': {
    page: {
      id: 'achievement-3',
      properties: {
        Title: {
          title: [{ plain_text: 'モバイルアプリ開発' }]
        },
        Description: {
          rich_text: [{ plain_text: '健康管理をサポートするモバイルアプリを開発し、ユーザー満足度95%を達成しました。' }]
        },
        Date: {
          date: { start: '2023-08-20' }
        },
        Category: {
          select: { name: 'アプリ開発' }
        }
      },
      cover: {
        external: { url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80' }
      }
    },
    blocks: [
      {
        id: 'block-1',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { 
              plain_text: '最新のモバイル技術を活用した健康管理アプリの開発プロジェクトを担当しました。',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-2',
        type: 'heading_2',
        heading_2: {
          rich_text: [
            { 
              plain_text: 'プロジェクト概要',
              annotations: { bold: true, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      },
      {
        id: 'block-3',
        type: 'paragraph',
        paragraph: {
          rich_text: [
            { 
              plain_text: 'このプロジェクトでは、ユーザーの日常的な健康データを収集し、パーソナライズされたアドバイスを提供するアプリを開発しました。',
              annotations: { bold: false, italic: false, strikethrough: false, underline: false, code: false }
            }
          ]
        }
      }
    ]
  }
}; 