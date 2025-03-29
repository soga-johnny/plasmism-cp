'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface CustomCursorProps {
  className?: string;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ className }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [hoveredElement, setHoveredElement] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionState, setTransitionState] = useState<'compiling' | 'ready'>('ready');
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  // 遷移検知
  useEffect(() => {
    // 新しいパス名が検出されたときに遷移状態を開始
    setIsTransitioning(true);
    setTransitionState('compiling');
    
    // コンパイル中のアニメーション
    const compilingTimeout = setTimeout(() => {
      setTransitionState('ready');
      
      // Ready状態を表示した後、通常の状態に戻る
      const readyTimeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
      
      return () => clearTimeout(readyTimeout);
    }, 800);
    
    return () => clearTimeout(compilingTimeout);
  }, [pathname]);

  // 滑らかな移動のためのアニメーション
  useEffect(() => {
    const animateMovement = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.y - prev.y) * 0.15
      }));
      
      rafRef.current = requestAnimationFrame(animateMovement);
    };
    
    rafRef.current = requestAnimationFrame(animateMovement);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetPosition]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      
      // 画面遷移中はホバー要素を更新しない
      if (isTransitioning) return;
      
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
  }, [isTransitioning]);

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 select-none ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-110%, 12px)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {isTransitioning ? (
        // 遷移中の表示
        <div 
          className={`text-xs bg-[#251E1F] ${transitionState === 'ready' ? 'text-[#00E701]' : 'text-[#FFB800]'} px-2 py-1 rounded-lg whitespace-nowrap custom-cursor-info cursor-transition-state backdrop-blur-sm border border-white/10`}
        >
          <span className="transition-opacity duration-300">
            {transitionState === 'compiling' ? 'Compiling...' : 'Ready'}
          </span>
        </div>
      ) : (
        // 通常の表示
        <div 
          className={`text-xs bg-[#251E1F] ${isClickable ? 'text-[#EC5D49]' : 'text-white'} px-2 py-1 rounded-lg whitespace-nowrap custom-cursor-info backdrop-blur-sm border border-white/10`}
          style={{
            transition: 'color 0.3s ease, background-color 0.3s ease, transform 0.3s ease',
          }}
        >
          <span className="opacity-70">return (</span><br/>
          <span className="transition-opacity duration-300">{hoveredElement}</span>
          <span className="opacity-70">)</span>
        </div>
      )}
    </div>
  );
};

export default CustomCursor; 