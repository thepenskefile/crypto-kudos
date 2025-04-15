import { Card, Tab } from "@repo/ui";
import { KudosReceived } from "./KudosReceived";
import { KudosSent } from "./KudosSent";

const TABS = {
  RECEIVED: "received",
  SENT: "sent",
} as const;

export function KudosTabs() {
  return (
    <Card>
      <Tab.Container defaultValue={TABS.RECEIVED}>
        <Tab.List className="flex gap-2 p-2 bg-blue-100 dark:bg-gray-900/50">
          <Tab.Trigger
            value={TABS.RECEIVED}
            className="flex-1 text-base px-4 py-2 rounded-xl"
          >
            <span className="flex items-center gap-2 justify-center">
              <span className="text-xl">🎁</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                Kudos Received
              </span>
            </span>
          </Tab.Trigger>
          <Tab.Trigger
            value={TABS.SENT}
            className="flex-1 text-base px-4 py-2 rounded-xl"
          >
            <span className="flex items-center gap-2 justify-center">
              <span className="text-xl">💝</span>
              <span className="text-gray-600 dark:text-gray-300 font-medium">
                Kudos Sent
              </span>
            </span>
          </Tab.Trigger>
        </Tab.List>

        <Tab.Content>
          <Tab.Panel value={TABS.RECEIVED} className="p-4">
            <KudosReceived />
          </Tab.Panel>
          <Tab.Panel value={TABS.SENT} className="p-4">
            <KudosSent />
          </Tab.Panel>
        </Tab.Content>
      </Tab.Container>
    </Card>
  );
}
