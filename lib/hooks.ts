"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useTyping(
  words: string[],
  typeSpeed = 85,
  deleteSpeed = 45,
  pauseMs = 2200
) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseMs);
            return;
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}

export function useCounter(end: number, trigger: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [trigger, end, duration]);

  return count;
}

export function useInView(threshold = 0.12): [React.RefCallback<HTMLElement>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node && !hasTriggered.current) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !hasTriggered.current) {
              hasTriggered.current = true;
              setIsVisible(true);
              observerRef.current?.disconnect();
            }
          },
          { threshold }
        );
        observerRef.current.observe(node);
      }
    },
    [threshold]
  );

  return [ref, isVisible];
}
