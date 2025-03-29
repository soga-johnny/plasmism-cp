'use client';

import { useState, useEffect, useRef } from 'react';

interface CustomCursorProps {
  className?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // マウスの下にある要素の情報を取得
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        // クリック可能かどうかをチェック
        const computedStyle = window.getComputedStyle(element);
        const isElementClickable = 
          element.tagName === 'A' || 
          element.tagName === 'BUTTON' || 
          (element as HTMLElement).hasAttribute('onclick') || 
          element.getAttribute('role') === 'button' ||
          computedStyle.cursor === 'pointer';
        
        setIsClickable(isElementClickable);

        const id = element.id ? `#${element.id}` : '';
        const classList = Array.from(element.classList).map(c => `.${c}`).join('');
        
        // 表示テキストを生成（タグ名を省略）
        let elementInfo = '';
        
        // IDかクラスがある場合はそれを表示
        if (id || classList) {
          elementInfo = `${id}${classList}`;
        } else {
          // なければタグ名を表示
          elementInfo = element.tagName.toLowerCase();
        }
        
        // 長すぎる場合は省略
        if (elementInfo.length > 20) {
          elementInfo = elementInfo.substring(0, 20) + '...';
        }
        
        setHoveredElement(elementInfo);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 select-none ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-110%, 12px)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    >
      <div className={`text-xs bg-[#251E1F] ${isClickable ? 'text-[#EC5D49]' : 'text-white'} px-2 py-1 rounded-lg whitespace-nowrap custom-cursor-info backdrop-blur-sm border border-white/10`}>
        <span>return (</span><br/>
        {hoveredElement})
      </div>
    </div>
  );
};

export default CustomCursor; 