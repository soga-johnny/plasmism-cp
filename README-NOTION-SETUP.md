# Notion API 設定手順

この実績ページはNotion APIを使用してデータを取得しています。以下の手順でNotionとの連携をセットアップしてください。

## 1. Notion インテグレーションの作成

1. [Notion Developers](https://www.notion.so/my-integrations) にアクセスし、ログインします。
2. 「+ 新しいインテグレーション」をクリックします。
3. インテグレーション名（例: 「Website Integration」）を入力します。
4. 関連するワークスペースを選択します。
5. 機能と権限を設定します：
   - 「読み取り機能」を有効にします。
   - その他の必要な権限を設定します。
6. 「送信」をクリックします。
7. 表示された「Internal Integration Token」（APIキー）をコピーします。
8. このトークンを `.env.local` ファイルの `NOTION_API_KEY` に設定します。

## 2. Notionデータベースの作成

1. Notionで新しいページを開きます。
2. `/database` と入力して、フルページデータベースを選択します。
3. 以下のプロパティを持つデータベースを作成します：
   - `Title` (タイトル): デフォルトのタイトルプロパティ
   - `Description` (リッチテキスト): 実績の簡単な説明
   - `Date` (日付): 実績の日付
   - `Category` (セレクト): 実績のカテゴリー（例: ウェブ開発、デザイン、コンサルティングなど）

## 3. データベースをインテグレーションと共有

1. 作成したデータベースページを開きます。
2. 右上の「...」をクリックし、「接続」を選択します。
3. 先ほど作成したインテグレーションを検索して選択します。
4. これでインテグレーションにデータベースへのアクセス権が付与されました。

## 4. データベースIDの取得

1. データベースのページをブラウザで開きます。
2. URLからデータベースIDを取得します：
   - URL形式: `https://www.notion.so/{workspace_name}/{database_id}?v={view_id}`
   - 例: `https://www.notion.so/myworkspace/83c75a39f33c4a7b98751f85915e9973?v=...`
   - この例では、`83c75a39f33c4a7b98751f85915e9973` がデータベースIDです。
3. このIDを `.env.local` ファイルの `NOTION_ACHIEVEMENTS_DATABASE_ID` に設定します。

## 5. Notionデータベースにコンテンツを追加

1. データベースページに新しいエントリを追加します。
2. 各プロパティを適切に設定します：
   - タイトル、説明、日付、カテゴリーを入力
   - ページ内にコンテンツを追加（テキスト、画像、リスト、引用など）
   - カバー画像を設定（ページのヘッダー部分）
3. 複数のエントリを追加してテストします。

## 6. アプリケーションの再起動

設定が終わったら、アプリケーションを再起動して変更を反映させます：

```bash
npm run dev
```

## トラブルシューティング

- **API Key Error**: APIキーが正しく設定されているか確認してください。
- **Database Access Error**: インテグレーションがデータベースと正しく共有されているか確認してください。
- **Empty Response**: データベースにコンテンツが追加されているか確認してください。
- **Property Error**: データベースに必要なプロパティ（Title, Description, Date, Category）が存在するか確認してください。

## 参考リンク

- [Notion API Documentation](https://developers.notion.com/)
- [Notion API Getting Started](https://developers.notion.com/docs/getting-started)
- [Notion Database API](https://developers.notion.com/reference/database) 