"use client";

import { KudosCard, KudosCardProps, Pagination } from "@repo/ui";
import { useKudos } from "../../hooks/useKudos";
import { NoKudos } from "./NoKudos";

const CARD_COLORS: KudosCardProps["color"][] = [
  "blue",
  "yellow",
  "coral",
  "mint",
  "purple",
  "cyan",
] as const;

const CARD_EMOJIS: KudosCardProps["emoji"][] = [
  "🎉",
  "🙌",
  "💯",
  undefined,
] as const;

export function KudosReceived() {
  const { kudosReceived, changeReceivedPage } = useKudos();

  const handlePageChange = async (page: number) => {
    // Convert to 0-based index for the contract
    await changeReceivedPage(page - 1);
  };

  if (!kudosReceived || kudosReceived.kudos.length === 0) {
    return (
      <NoKudos message="No kudos received yet. Your first one is on the way! ✨" />
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kudosReceived.kudos.map((kudo, index) => {
          const color = CARD_COLORS[index % CARD_COLORS.length];
          const emoji = CARD_EMOJIS[index % CARD_EMOJIS.length];

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
            currentPage={Number(kudosReceived.currentPage) + 1}
            totalPages={Number(kudosReceived.totalPages)}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
