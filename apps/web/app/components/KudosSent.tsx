"use client";

import { KudosCard, Pagination } from "@repo/ui";
import { useKudos } from "../hooks/useKudos";

export function KudosSent() {
  const { kudosSent, changeSentPage } = useKudos();

  const handlePageChange = async (page: number) => {
    // Convert to 0-based index for the contract
    await changeSentPage(page - 1);
  };

  if (!kudosSent || kudosSent.kudos.length === 0) {
    return (
      <div className="text-center p-8 text-text-secondary-light dark:text-text-secondary-dark">
        No kudos sent yet. Send some to your friends! ✨
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kudosSent.kudos.map((kudo, index) => {
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

      {kudosSent.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={Number(kudosSent.currentPage) + 1}
            totalPages={Number(kudosSent.totalPages)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
