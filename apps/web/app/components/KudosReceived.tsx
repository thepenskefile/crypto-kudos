"use client";

import { KudosCard, Pagination } from "@repo/ui";
import { useKudos } from "../hooks/useKudos";
import { useState } from "react";

export function KudosReceived() {
  const [currentPage, setCurrentPage] = useState(1);
  const { kudosReceived } = useKudos();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // TODO: Implement pagination in the useKudos hook
  };

  if (!kudosReceived || kudosReceived.kudos.length === 0) {
    return (
      <div className="text-center p-8 text-text-secondary-light dark:text-text-secondary-dark">
        No kudos received yet. Your first one is on the way! ✨
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kudosReceived.kudos.map((kudo, index) => {
          // Rotate through different colors and emojis for visual variety
          const colors = [
            "blue",
            "yellow",
            "coral",
            "mint",
            "purple",
            "cyan",
          ] as const;
          const emojis = ["🎉", "🙌", "💯", "none"] as const;
          const color = colors[index % colors.length];
          const emoji = emojis[index % emojis.length];

          return (
            <KudosCard
              key={`${kudo.from}-${kudo.timestamp}`}
              fromAddress={kudo.from}
              toAddress={kudo.to}
              message={kudo.message}
              color={color}
              emoji={emoji}
            />
          );
        })}
      </div>

      {kudosReceived.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={Number(kudosReceived.currentPage)}
            totalPages={Number(kudosReceived.totalPages)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
