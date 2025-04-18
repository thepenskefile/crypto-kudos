import { Button, Input, Modal, Textarea, UseModalState } from "@repo/ui";
import { useSendKudo } from "../../hooks/useKudos";
import { ErrorMessage } from "../common/ErrorMessage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const schema = z.object({
  toAddress: z
    .string()
    .min(1, { message: "This field is required" })
    .regex(ethereumAddressRegex, {
      message: "Please enter a valid Ethereum address",
    }),
  message: z.string().min(1, { message: "This field is required" }),
});

export type Schema = z.infer<typeof schema>;

export function SendKudosModal({ modal }: { modal: UseModalState }) {
  const formMethods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    shouldUnregister: true,
    defaultValues: {
      toAddress: "",
      message: "",
    },
  });

  const { sendKudo, isPending, isError, error } = useSendKudo({
    mutation: {
      onSuccess: () => {
        modal.close();
      },
    },
  });

  function handleSendKudos(formData: Schema) {
    sendKudo(formData.toAddress as `0x${string}`, formData.message);
  }

  return (
    <Modal visible={modal.visible} onClose={modal.close}>
      <form
        onSubmit={formMethods?.handleSubmit(handleSendKudos)}
        className="space-y-6"
      >
        <Modal.Title className="flex items-center gap-3 pb-6">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-gray-900/50 flex items-center justify-center">
            <span className="text-2xl">💌</span>
          </div>
          <span className="text-2xl font-medium text-blue-600 dark:text-blue-400">
            Send Kudos
          </span>
        </Modal.Title>
        <Modal.Content>
          <div className="space-y-4">
            <Input
              {...formMethods.register("toAddress")}
              validationText={formMethods.formState.errors.toAddress?.message}
              label="Recipient address"
              name="toAddress"
              placeholder="0x..."
              hint="Enter the Ethereum address of the person you want to send kudos to"
            />

            <Textarea
              {...formMethods.register("message")}
              validationText={formMethods.formState.errors.message?.message}
              label="Message"
              name="message"
              placeholder="Write your appreciation message here..."
              hint="Write a heartfelt message to show your appreciation"
            />
            {isError && (
              <ErrorMessage error={error} title="An error occurred" />
            )}
          </div>
        </Modal.Content>
        <Modal.Footer>
          <Button variant="outline" size="sm" onClick={modal.close}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            isLoading={isPending}
          >
            <span className="flex items-center gap-2 justify-center">
              <span>💝</span> Send Kudos
            </span>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
