"use client";

import { Pagination, Spinner, useModalState } from "@repo/ui";
import { useKudosReceived } from "../../hooks/useKudos";
import { NoKudos } from "./NoKudos";
import { ErrorMessage } from "../common/ErrorMessage";
import { useGetExplorerUrl } from "../../hooks/useGetExplorerUrl";
import { useState } from "react";
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

export function KudosReceived() {
  const { kudosReceived, changePage, isPending, isError, error } =
    useKudosReceived();

  const { getExplorerUrl } = useGetExplorerUrl();

  const [selectedKudos, setSelectedKudos] = useState<
    | (NonNullable<typeof kudosReceived>["kudos"][number] & {
        color: KudosCardProps["color"];
        emoji: KudosCardProps["emoji"];
        explorerUrl: string;
      })
    | null
  >(null);

  const kudosDetailsModal = useModalState();

  const handlePageChange = async (page: number) => {
    await changePage(page - 1);
  };

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} title="An error occurred" />;
  }

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

      {kudosReceived.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={Number(kudosReceived.currentPage) + 1}
            totalPages={Number(kudosReceived.totalPages)}
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
