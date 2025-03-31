'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full border border-white/10 rounded-xl p-8 bg-black/30 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">エラーが発生しました</h2>
        <p className="mb-6 text-white/70">
          予期しないエラーが発生しました。以下のボタンでリセットするか、お手数ですがページをリロードしてください。
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            リセット
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            ページをリロード
          </button>
        </div>
      </div>
    </div>
  );
} 