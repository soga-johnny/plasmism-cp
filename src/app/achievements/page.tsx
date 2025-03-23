import Link from 'next/link';
import Image from 'next/image';
import { getAllAchievements } from '@/lib/notion';
import Footer from '@/components/Footer';

// メタデータ
export const metadata = {
  title: '実績一覧 | プラズミズム',
  description: 'プラズミズムの実績一覧です。',
};

// 実績一覧ページ
export default async function AchievementsPage() {
  // Notionから実績データを取得
  const achievementsData = await getAllAchievements();

  return (
    <main className="min-h-screen flex flex-col text-white md:py-24 pt-8 pb-24">
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-12 border-b border-white/7">
          <p className="text-md mb-4">● Achievements</p>
          <h1 className="text-5xl font-thin mb-6">実績</h1>
          <p className="mb-8 font-extralight text-sm md:text-base">
            私たちがこれまで手がけてきたプロジェクトやお客様の声をご紹介します。
          </p>
        </div>

        {/* 実績一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mx-8 mx-4">
          {achievementsData.length > 0 ? (
            achievementsData.map((achievement: any) => {
              // ページIDを取得
              const id = achievement.id;
              
              // プロパティを取得
              const properties = achievement.properties;
              const title = properties?.Title?.title[0]?.plain_text || '無題';
              const description = properties?.Description?.rich_text[0]?.plain_text || '';
              const date = properties?.Date?.date?.start || '';
              const category = properties?.Category?.select?.name || '';
              
              // サムネイル画像（カバー画像がない場合はデフォルト画像を使用）
              const coverImage = achievement.cover?.external?.url || 
                                achievement.cover?.file?.url || 
                                '/default-achievement.jpg';

              return (
                <Link href={`/achievements/${id}`} key={id}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="relative w-full h-48">
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xs bg-white/20 rounded-full px-3 py-1">{category}</span>
                        <span className="ml-2 text-xs text-white/70">{formatDate(date)}</span>
                      </div>
                      <h2 className="text-xl font-medium mb-2">{title}</h2>
                      <p className="text-sm text-white/80 line-clamp-2">{description}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p>実績データを読み込み中...</p>
            </div>
          )}
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