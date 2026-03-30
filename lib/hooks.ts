"use client";

import { useState, useEffect, useRef } from "react";

export function useTyping(words: readonly string[], speed = 80, deleteSpeed = 40, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const word = words[wordIdx];
    if (!deleting && text === word) {
      timer.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1);
      timer.current = setTimeout(() => setText(next), deleting ? deleteSpeed : speed);
    }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, deleting, wordIdx, words, speed, deleteSpeed, pause]);

  return text;
}
