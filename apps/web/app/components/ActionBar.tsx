import { Button, Card, UseModalState } from "@repo/ui";

export function ActionBar({
  sendKudosModal,
}: {
  sendKudosModal: UseModalState;
}) {
  return (
    <Card className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        <WaveIcon />
        <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Welcome back!
        </span>
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={sendKudosModal.open}
        className="min-w-[140px]"
      >
        <span className="flex items-center gap-2 justify-center">
          <span>💌</span> Send Kudos
        </span>
      </Button>
    </Card>
  );
}

function WaveIcon() {
  return (
    <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-gray-900/50 flex items-center justify-center">
      <span className="text-2xl">👋</span>
    </div>
  );
}
