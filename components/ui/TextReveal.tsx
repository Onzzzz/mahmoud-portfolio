"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface TextRevealProps {
  readonly children: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
  readonly splitBy?: "word" | "char";
  readonly stagger?: number;
  readonly as?: "h1" | "h2" | "h3" | "p" | "span";
  readonly once?: boolean;
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function TextReveal({
  children,
  className,
  style,
  splitBy = "word",
  stagger = 0.05,
  as: Tag = "h2",
  once = true,
}: TextRevealProps) {
  const MotionTag = motion.create(Tag);

  const items: ReactNode[] = [];

  if (splitBy === "char") {
    for (let i = 0; i < children.length; i++) {
      const char = children[i];
      items.push(
        <span key={i} style={{ display: "inline-block", overflow: "hidden" }}>
          <motion.span
            variants={charVariants}
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      );
    }
  } else {
    const words = children.split(" ");
    words.forEach((word, i) => {
      items.push(
        <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
          <motion.span variants={wordVariants} style={{ display: "inline-block" }}>
            {word}
          </motion.span>
        </span>
      );
    });
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {items}
    </MotionTag>
  );
}
