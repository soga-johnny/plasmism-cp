import { getAchievementById, getAllAchievements } from '@/lib/notion';
import { renderNotionBlock } from '@/lib/notion-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AppPageParams, DynamicPageComponent } from '@/app/next-type-fixes';

// 動的メタデータ
export async function generateMetadata({ 
  params 
}: AppPageParams<{ id: string }>): Promise<Metadata> {
  try {
    const achievement = await getAchievementById(params.id);
    
    if (!achievement) {
      return {
        title: '実績が見つかりません | プラズミズム',
        description: '指定された実績は見つかりませんでした。',
      };
    }

    // Notionページの型を any で扱う
    const page = achievement.page as any;
    const title = page.properties?.Title?.title?.[0]?.plain_text || '実績詳細';
    const description = page.properties?.Description?.rich_text?.[0]?.plain_text || '';

    return {
      title: `${title} | プラズミズム`,
      description,
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'エラーが発生しました | プラズミズム',
      description: '実績の読み込み中にエラーが発生しました。',
    };
  }
}

// 静的パスの生成（ビルド時にプリレンダリングするパス）
export async function generateStaticParams() {
  const achievements = await getAllAchievements();
  
  return achievements.map((achievement: any) => ({
    id: achievement.id,
  }));
}

// 実績詳細ページ
const AchievementPage: DynamicPageComponent<{ id: string }> = async ({ params }) => {
  try {
    const achievementData = await getAchievementById(params.id);
    
    if (!achievementData) {
      notFound();
    }

    // Notionページの型を any で扱う
    const page = achievementData.page as any;
    const { blocks } = achievementData;
    
    // プロパティの取得（オプショナルチェイニングで安全に取得）
    const properties = page.properties || {};
    const title = properties?.Title?.title?.[0]?.plain_text || 'Untitled';
    const description = properties?.Description?.rich_text?.[0]?.plain_text || '';
    
    // 新しく追加されたプロパティ（オプショナルチェイニングで安全に取得）
    const scope = properties?.Scope?.rich_text?.[0]?.plain_text || 'Nothing';
    const client = properties?.Client?.rich_text?.[0]?.plain_text || 'Nothing';
    
    // URLプロパティはURL型として扱う
    const url = properties?.URL?.url || properties?.URL?.rich_text?.[0]?.plain_text || 'Nothing';
    
    // Coverプロパティ（Files & media型）の扱い
    // Notion API経由のCoverプロパティに対応
    let coverImage;
    
    // Cover プロパティがある場合は優先して使用
    if (properties?.Cover?.files?.[0]) {
      const coverFile = properties.Cover.files[0];
      if (coverFile.external) {
        coverImage = coverFile.external.url;
      } else if (coverFile.file) {
        coverImage = coverFile.file.url;
      }
    }
    
    // プロパティにない場合はページのカバー画像を使用
    if (!coverImage) {
      coverImage = page.cover?.external?.url || 
                   page.cover?.file?.url || 
                   '/not-found.png';
    }

    return (
      <main className="min-h-screen flex flex-col text-white md:py-12 pt-2 pb-24">
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-2 pb-12">
          <div className="mb-8">
            <Link href="/achievements" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              <span>実績一覧に戻る</span>
            </Link>
          </div>

          {/* ヘッダー */}
          <div className="mb-12">
            <h1 className="text-4xl font-light mb-6">{title}</h1>
            
            <div className="grid grid-cols-[80px_1fr] gap-y-2 text-sm mb-8">
              <div className="font-light">Scope</div>
              <div className="font-light">： {scope}</div>
              
              <div className="font-light">Client</div>
              <div className="font-light">： {client}</div>
              
              <div className="font-light">URL</div>
              <div>： <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{url}</a></div>
            </div>
            
            <p className="text-base text-white/80 mb-8">{description}</p>
            
            <div className="w-full h-[1px] bg-white/10 my-8"></div>
          </div>

          {/* 本文コンテンツ */}
          <div className="prose prose-invert max-w-none mb-12">
            {/* 箇条書きリスト（実績の解決項目など） */}
            <ul className="list-disc pl-5 mb-8">
              {blocks
                .filter((block: any) => block.type === 'bulleted_list_item')
                .map((block: any, index: number) => (
                  <div key={block.id || `bullet-${index}`}>
                    {renderNotionBlock(block)}
                  </div>
                ))}
            </ul>

            {/* 大きな画像表示エリア */}
            <div className="relative w-full aspect-video bg-white mt-16 rounded-md">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* その他のコンテンツ */}
            <div className="mt-8">
              {blocks
                .filter((block: any) => block.type !== 'bulleted_list_item')
                .map((block: any, index: number) => (
                  <div key={block.id || `content-${index}`}>
                    {renderNotionBlock(block)}
                  </div>
                ))}
            </div>
            
          </div>
          
          <div className="mt-8">
            <Link href="/achievements" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              <span>実績一覧に戻る</span>
            </Link>
          </div>       
           </div>
        <Footer />
      </main>
    );
  } catch (error) {
    console.error('Page rendering error:', error);
    notFound();
  }
};

export default AchievementPage; 