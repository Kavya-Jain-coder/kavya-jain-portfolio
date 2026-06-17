'use client';

import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  words?: string[];
  text?: string;
  speed?: number;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  words,
  text,
  speed = 50,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const isVisible = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Looping mode (cycle through words array)
  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, speed]);

  // Single text mode (type once)
  useEffect(() => {
    if (!text || words) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true;
          let i = 0;
          const interval = setInterval(() => {
            if (i <= text.length) {
              setDisplayed(text.slice(0, i));
              i++;
            } else {
              clearInterval(interval);
              onComplete?.();
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [text, speed, words, onComplete]);

  return (
    <span ref={containerRef} className={className}>
      {displayed}
      <span className="typewriter-cursor" />
    </span>
  );
}
