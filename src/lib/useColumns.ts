import { useEffect, useState } from "react";

// Matches the original: 2 cols on phones, 3 cols from 768px, 4 cols from 1024px.
// Keep in sync with the grid classes in App.tsx.
const colsFor = (w: number) => (w >= 1024 ? 4 : w >= 768 ? 3 : 2);

export function useColumns() {
  const [cols, setCols] = useState(() => colsFor(window.innerWidth));
  useEffect(() => {
    const onResize = () => setCols(colsFor(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}
