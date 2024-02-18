import { Text, TypographyStylesProvider } from "@mantine/core";
import { useState, useEffect, useRef } from "react";

interface RevealingTextProps {
  text: string;
  speed?: number;
}

export const RevealingText = ({ text, speed = 50 }: RevealingTextProps) => {
  const [revealedText, setRevealedText] = useState("");
  const words = text.split(" ");
  const currentWordIndexRef = useRef(0);

  useEffect(() => {
    const currentWordIndex = currentWordIndexRef.current;
    const intervalId = setInterval(() => {
      if (currentWordIndex < words.length) {
        setRevealedText((prevText) => prevText + words[currentWordIndex] + " ");
        currentWordIndexRef.current = currentWordIndex + 1;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [words, speed]);

  return (
    <Text
      p="sm"
      size="sm"
      style={{
        background: "hsl(var(--bk-background) / 0.05)",
        color: "hsl(var(--bk-background))",
        borderRadius: "8px 0px 8px 8px",
      }}
    >
      <TypographyStylesProvider p="0" m="0">
        <div
          className="chat-response"
          dangerouslySetInnerHTML={{ __html: revealedText }}
        />
      </TypographyStylesProvider>
    </Text>
  );
};
