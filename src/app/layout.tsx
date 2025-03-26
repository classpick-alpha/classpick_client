import type { Metadata } from "next";

import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Classpick",
  description: "Classpick",
};

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
