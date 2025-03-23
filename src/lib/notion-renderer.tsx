import { ReactNode } from 'react';
import Image from 'next/image';

// Notionのブロックタイプに対応するコンポーネントを作成
export function renderNotionBlock(block: any): ReactNode {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case 'paragraph':
      return (
        <p key={id} className="mb-4">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </p>
      );

    case 'heading_1':
      return (
        <h1 key={id} className="text-3xl font-bold mb-4">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </h1>
      );

    case 'heading_2':
      return (
        <h2 key={id} className="text-2xl font-bold mb-3">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 key={id} className="text-xl font-bold mb-2">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <li key={id} className="ml-6 list-disc mb-1">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </li>
      );

    case 'numbered_list_item':
      return (
        <li key={id} className="ml-6 list-decimal mb-1">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </li>
      );

    case 'image':
      const imageUrl = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption.length > 0 ? value.caption[0].plain_text : '';
      
      return (
        <figure key={id} className="my-6">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={imageUrl}
              alt={caption || 'Image'}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          {caption && <figcaption className="text-center text-sm mt-2 text-gray-500">{caption}</figcaption>}
        </figure>
      );

    case 'divider':
      return <hr key={id} className="my-6 border-t border-gray-300" />;

    case 'quote':
      return (
        <blockquote key={id} className="pl-4 border-l-4 border-gray-300 my-4 italic">
          {value.rich_text.map((text: any, i: number) => renderRichText(text, i))}
        </blockquote>
      );

    case 'code':
      return (
        <pre key={id} className="bg-gray-800 text-white p-4 rounded-lg my-4 overflow-x-auto">
          <code>
            {value.rich_text.map((text: any) => text.plain_text).join('')}
          </code>
        </pre>
      );

    default:
      return null;
  }
}

// リッチテキストをレンダリングするヘルパー関数
function renderRichText(text: any, key: number): ReactNode {
  const { annotations, plain_text, href } = text;
  const { bold, italic, strikethrough, underline, code } = annotations;

  let content = plain_text;

  if (code) {
    content = <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded">{content}</code>;
  }
  if (bold) {
    content = <strong>{content}</strong>;
  }
  if (italic) {
    content = <em>{content}</em>;
  }
  if (strikethrough) {
    content = <del>{content}</del>;
  }
  if (underline) {
    content = <u>{content}</u>;
  }

  if (href) {
    return (
      <a key={key} href={href} className="text-blue-500 hover:underline">
        {content}
      </a>
    );
  }

  return <span key={key}>{content}</span>;
} 