import React from 'react';

// Next.js型定義の互換性問題を解決するためのヘルパー型

// ページパラメータ型（App Router）- より柔軟な型定義
export type AppPageParams<T = Record<string, string>> = {
  params: Promise<T> | T | any;
  searchParams?: Record<string, string | string[]> | any;
};

// 動的パラメータ付きのページコンポーネント型
export type DynamicPageComponent<T = Record<string, string>> = (
  props: AppPageParams<T> | any
) => Promise<React.ReactNode> | React.ReactNode; 