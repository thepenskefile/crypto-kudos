import { Button, cn, getColorFromAddress, UseModalState } from "@repo/ui";
import { Modal } from "@repo/ui";
import { KUDOS_CARD_COLOR_CLASSES, KudosCardProps } from "./KudosCard";
import { X } from "lucide-react";

type Kudo = {
  from: `0x${string}`;
  to: `0x${string}`;
  message: string;
  timestamp: bigint;
  transactionHash: `0x${string}`;
  color: KudosCardProps["color"];
  emoji: KudosCardProps["emoji"];
};

interface KudosDetailsModalProps {
  modal: UseModalState;
  kudos: Kudo & {
    explorerUrl?: string;
  };
}

export function KudosDetailsModal({ modal, kudos }: KudosDetailsModalProps) {
  return (
    <Modal
      visible={modal.visible}
      onClose={modal.close}
      panelClassName="border-none"
    >
      <div
        className={cn(
          "rounded-xl p-8 shadow-lg transition-transform dark:text-text-primary-light",
          "max-w-2xl mx-auto relative",
          kudos.color
            ? KUDOS_CARD_COLOR_CLASSES[kudos.color]
            : KUDOS_CARD_COLOR_CLASSES.blue
        )}
      >
        <button
          onClick={modal.close}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        {kudos.emoji && <div className="text-4xl mb-4">{kudos.emoji}</div>}

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex -space-x-2">
            <div
              className="w-12 h-12 rounded-full border-2 border-white shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] relative z-10"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${getColorFromAddress(kudos.from)}, ${getColorFromAddress(kudos.from)})`,
              }}
            />
            <div
              className="w-12 h-12 rounded-full border-2 border-white shadow-[inset_0_0_8px_rgba(0,0,0,0.1)]"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${getColorFromAddress(kudos.to)}, ${getColorFromAddress(kudos.to)})`,
              }}
            />
          </div>
          <div className="text-base font-mono opacity-90">
            <div className="break-all">{kudos.from}</div>
            <div className="break-all text-sm opacity-70">→ {kudos.to}</div>
          </div>
        </div>

        <div className="font-medium text-2xl mb-8">{kudos.message}</div>

        <div className="space-y-4 text-sm">
          {kudos.timestamp && (
            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Sent
              </h3>
              <p className="mt-1">
                {new Date(Number(kudos.timestamp) * 1000).toLocaleString()}
              </p>
            </div>
          )}

          {kudos.transactionHash && (
            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">
                Transaction
              </h3>
              <p className="mt-1 font-mono break-all">
                {kudos.transactionHash}
              </p>
            </div>
          )}

          {kudos.explorerUrl && (
            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(kudos.explorerUrl, "_blank")}
              >
                View on Explorer ↗
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
