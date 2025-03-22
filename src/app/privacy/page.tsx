"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Privacy() {
  return (
    <main className="min-h-screen flex flex-col text-white md:py-24 pt-8 pb-24">
      <Header />
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="mb-8">
          <p className="text-md mb-4">● Privacy policy</p>
          <h1 className="text-5xl font-thin mb-6">プライバシーポリシー</h1>
          <p className="mb-8 font-extralight">お客様の個人情報に関する取り組みについて</p>
        </div>

        <div className="border-t border-white/7 pt-20 mb-12 px-16">
          <p className="mb-20 leading-relaxed text-sm">Plasmism株式会社（以下「当社」といいます。）は、当社が管理するウェブサイト（URL：https://plasmism.com/）（以下「当社サイト」といいます。）の提供にあたり、当社のお客様（当社サイトの利用者を含みます。）、取引先ご担当者様及び採用候補者の個人情報を取得することがあります。
            <br/><br/>
            当社は、個人情報保護の重要性に鑑み、このプライバシーポリシー（以下「本ポリシー」といいます。）を定め、個人情報の保護に関する法律その他の法令及び個人情報保護委員会のガイドライン（以下「法令等」と総称します。）とともに本ポリシーを遵守し、適正に個人情報を取り扱います。
            <br/><br/>
            なお、本ポリシーで使用する用語の意味は、個人情報の保護に関する法律における定義に従います。  
            </p>
        </div>
        
        <div className="space-y-12 mb-16 mx-16 border-t border-white/7 pt-10 ">
          <section>
            <h2 className="text-4xl font-thin mb-6">１. 当社に関する情報</h2>
            <div className="p-6 rounded-lg">
              <p className="mb-4 text-gray-300">当社は、お客様の個人情報を大切に取り扱い、個人情報保護に関する法律を遵守いたします。</p>
              <p className="text-gray-300">本ポリシーは、当社のすべてのサービスにおいて適用されます。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">２. 個人情報の利用目的</h2>
            <div className="p-6 rounded-lg">
              <p className="mb-4 text-gray-300">当社は、以下の目的のために個人情報を収集し、利用いたします。</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>サービスの提供・改善</li>
                <li>お問い合わせへの対応</li>
                <li>新サービスの開発</li>
                <li>マーケティング活動</li>
                <li>採用活動</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">３. 個人情報の第三者提供</h2>
            <div className="p-6 rounded-lg">
              <p className="mb-4 text-gray-300">当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              </ul>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">４. 個人情報に関する安全管理措置</h2>
            <div className="p-6 rounded-lg">
              <p className="text-gray-300">当社は、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">５. 利用者の権利義務の尊重</h2>
            <div className="p-6 rounded-lg">
              <p className="mb-4 text-gray-300">当社は、利用者から個人情報の開示、訂正、削除、利用停止等の請求があった場合には、本人確認の上、速やかに対応いたします。</p>
              <p className="text-gray-300">開示等の請求については、当社の指定する方法に従って行っていただきます。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">６. Cookie等の使用</h2>
            <div className="p-6 rounded-lg">
              <p className="text-gray-300">当社のウェブサイトでは、利便性の向上、利用状況の分析等のためにCookieを使用することがあります。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">７. 法令等の遵守について</h2>
            <div className="p-6 rounded-lg">
              <p className="text-gray-300">当社は、個人情報の取扱いにあたり、個人情報保護法その他の関係法令を遵守します。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">８. リンクについて</h2>
            <div className="p-6 rounded-lg">
              <p className="text-gray-300">当社のウェブサイトから他のウェブサイトへのリンクをクリックした場合、当社はリンク先サイトでの個人情報の取扱いについては責任を負いません。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">９. お問い合わせ窓口</h2>
            <div className="p-6 rounded-lg">
              <p className="text-gray-300">個人情報の取扱いに関するお問い合わせは、当社ウェブサイトのお問い合わせフォームよりお願いいたします。</p>
            </div>
          </section>
          
          <section>
            <h2 className="text-4xl font-thin mb-6">１０. ポリシーの変更とお知らせ責任</h2>
            <div className="p-6 rounded-lg">
              <p className="text-gray-300">当社は、必要に応じて、本ポリシーを変更することがあります。変更した場合には、当社ウェブサイト上で通知します。</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}