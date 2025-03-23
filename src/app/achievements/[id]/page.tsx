import { getAchievementById, getAllAchievements } from '@/lib/notion';
import { renderNotionBlock } from '@/lib/notion-renderer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// 動的メタデータ
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // paramsのプロパティを使用する前にPromiseを解決する
  const id = params?.id;
  if (!id) {
    return {
      title: '実績が見つかりません | プラズミズム',
      description: 'IDが指定されていません。',
    };
  }

  const achievement = await getAchievementById(id);
  
  if (!achievement) {
    return {
      title: '実績が見つかりません | プラズミズム',
      description: '指定された実績は見つかりませんでした。',
    };
  }

  // Notionページの型を any で扱う
  const page = achievement.page as any;
  const title = page.properties?.Title?.title[0]?.plain_text || '実績詳細';
  const description = page.properties?.Description?.rich_text[0]?.plain_text || '';

  return {
    title: `${title} | プラズミズム`,
    description,
  };
}

// 静的パスの生成（ビルド時にプリレンダリングするパス）
export async function generateStaticParams() {
  const achievements = await getAllAchievements();
  
  return achievements.map((achievement: any) => ({
    id: achievement.id,
  }));
}

// 実績詳細ページ
export default async function AchievementPage({ params }: { params: { id: string } }) {
  // paramsのプロパティを使用する前にPromiseを解決する
  const id = params?.id;
  if (!id) {
    notFound();
  }

  const achievementData = await getAchievementById(id);
  
  if (!achievementData) {
    notFound();
  }

  // Notionページの型を any で扱う
  const page = achievementData.page as any;
  const { blocks } = achievementData;
  
  // プロパティの取得
  const properties = page.properties;
  const title = properties?.Title?.title[0]?.plain_text || '無題';
  const description = properties?.Description?.rich_text[0]?.plain_text || '';
  const date = properties?.Date?.date?.start || '';
  const category = properties?.Category?.select?.name || '';
  
  // カバー画像
  const coverImage = page.cover?.external?.url || 
                    page.cover?.file?.url || 
                    '/default-achievement.jpg';

  return (
    <main className="min-h-screen flex flex-col text-white md:py-24 pt-8 pb-24">
      <div className="flex-1 w-full max-w-[1000px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-6">
          <Link href="/achievements" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            <span>実績一覧に戻る</span>
          </Link>
        </div>

        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm bg-white/20 rounded-full px-4 py-1">{category}</span>
            <span className="text-sm text-white/70">{formatDate(date)}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-thin mb-4">{title}</h1>
          <p className="text-lg text-white/80 mb-8">{description}</p>
        </div>

        {/* カバー画像 */}
        <div className="relative w-full h-72 md:h-96 mb-12">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* コンテンツ */}
        <div className="prose prose-invert max-w-none mb-12">
          {blocks.map((block: any) => renderNotionBlock(block))}
        </div>

        {/* 関連実績（将来的に実装可能） */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-thin mb-4">関連する実績</h2>
          <p className="text-white/70 mb-4">準備中...</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// 日付のフォーマット関数
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 