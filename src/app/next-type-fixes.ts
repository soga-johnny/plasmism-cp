import React from 'react';

// Next.js 15の型定義の互換性問題を解決するためのヘルパー型

// ページパラメータ型（App Router）
export type AppPageParams<T = Record<string, string>> = {
  params: T;
  searchParams?: Record<string, string | string[]>;
};

// 動的パラメータ付きのページコンポーネント型
export type DynamicPageComponent<T = Record<string, string>> = (
  props: AppPageParams<T>
) => Promise<React.ReactNode> | React.ReactNode; 