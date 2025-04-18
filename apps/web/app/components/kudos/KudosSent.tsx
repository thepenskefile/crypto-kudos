"use client";

import { KudosCard, KudosCardProps, Pagination } from "@repo/ui";
import { useKudosSent } from "../../hooks/useKudos";
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

export function KudosSent() {
  const { kudosSent, changePage } = useKudosSent();

  const handlePageChange = async (page: number) => {
    // Convert to 0-based index for the contract
    await changePage(page - 1);
  };

  if (!kudosSent || kudosSent.kudos.length === 0) {
    return (
      <NoKudos message="No kudos sent yet. Send some to your friends! ✨" />
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kudosSent.kudos.map((kudo, index) => {
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
