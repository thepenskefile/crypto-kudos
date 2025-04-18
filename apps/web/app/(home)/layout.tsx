"use client";

import { PageContent } from "@repo/ui";
import { HeroSection } from "../components/sections/HeroSection";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContent>
      <HeroSection />
      {children}
    </PageContent>
  );
}
