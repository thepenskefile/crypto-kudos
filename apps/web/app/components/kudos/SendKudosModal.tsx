import { Button, Input, Modal, Textarea, UseModalState } from "@repo/ui";
import { UsernameFormElement } from "../../(home)/page";
import { useSendKudo } from "../../hooks/useKudos";
import { ErrorMessage } from "../ErrorMessage";

export function SendKudosModal({ modal }: { modal: UseModalState }) {
  const { sendKudo, isPending, isError, error } = useSendKudo({
    mutation: {
      onSuccess: () => {
        modal.close();
      },
    },
  });

  function handleSendKudos(event: React.FormEvent<UsernameFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    sendKudo(
      form.elements.toAddress.value as `0x${string}`,
      form.elements.message.value
    );
  }

  return (
    <Modal visible={modal.visible} onClose={modal.close}>
      <Modal.Title className="flex items-center gap-3 pb-6">
        <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-gray-900/50 flex items-center justify-center">
          <span className="text-2xl">💌</span>
        </div>
        <span className="text-2xl font-medium text-blue-600 dark:text-blue-400">
          Send Kudos
        </span>
      </Modal.Title>
      <Modal.Content>
        <form onSubmit={handleSendKudos} className="space-y-6">
          <div className="space-y-2">
            <Input
              label="Recipient address"
              name="toAddress"
              placeholder="0x..."
              hint="Enter the Ethereum address of the person you want to send kudos to"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              label="Message"
              name="message"
              placeholder="Write your appreciation message here..."
              hint="Write a heartfelt message to show your appreciation"
            />
          </div>
          {isError && <ErrorMessage error={error} title="An error occurred" />}
        </form>
      </Modal.Content>
      <Modal.Footer>
        <Button
          variant="primary"
          size="sm"
          type="submit"
          className="min-w-[160px]"
          isLoading={isPending}
        >
          <span className="flex items-center gap-2 justify-center">
            <span>💝</span> Send Kudos
          </span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
