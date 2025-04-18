"use client";

import { Pagination, Spinner } from "@repo/ui";
import { useKudosSent } from "../../hooks/useKudos";
import { NoKudos } from "./NoKudos";
import { ErrorMessage } from "../common/ErrorMessage";
import { useGetExplorerUrl } from "../../hooks/useGetExplorerUrl";
import { useState } from "react";
import { useModalState } from "@repo/ui";
import { KudosDetailsModal } from "./KudosDetailsModal";
import { KudosCard, KudosCardProps } from "./KudosCard";

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
  const { kudosSent, changePage, isPending, isError, error } = useKudosSent();

  const [selectedKudos, setSelectedKudos] = useState<
    | (NonNullable<typeof kudosSent>["kudos"][number] & {
        color: KudosCardProps["color"];
        emoji: KudosCardProps["emoji"];
        explorerUrl: string;
      })
    | null
  >(null);

  const kudosDetailsModal = useModalState();

  const { getExplorerUrl } = useGetExplorerUrl();

  const handlePageChange = async (page: number) => {
    // Convert to 0-based index for the contract
    await changePage(page - 1);
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} title="An error occurred" />;
  }

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
              explorerUrl={getExplorerUrl(kudo.transactionHash)}
              onClick={() => {
                setSelectedKudos({
                  ...kudo,
                  color,
                  emoji,
                  explorerUrl: getExplorerUrl(kudo.transactionHash),
                });
                kudosDetailsModal.open();
              }}
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

      {selectedKudos && (
        <KudosDetailsModal modal={kudosDetailsModal} kudos={selectedKudos} />
      )}
    </div>
  );
}
