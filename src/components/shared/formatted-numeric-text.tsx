import type { ReactNode } from "react";

type FormattedNumericTextProps = {
  value: string | number;
};

const numericTokenPattern = /(\d+(?:[.,]\d+)*)([ºª°])?/g;

export function FormattedNumericText({ value }: FormattedNumericTextProps) {
  const text = String(value);
  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of text.matchAll(numericTokenPattern)) {
    const [token, digits, suffix] = match;
    const start = match.index ?? 0;

    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(
      <span className="edition-number" key={key++}>
        {digits}
      </span>
    );

    if (suffix) {
      parts.push(
        <span
          className={suffix === "°" ? "degree-symbol" : "edition-ordinal"}
          key={key++}
        >
          {suffix}
        </span>
      );
    }

    cursor = start + token.length;
  }

  if (cursor < text.length) parts.push(text.slice(cursor));

  return <>{parts}</>;
}