import { EmptyKudosCard } from "./EmptyKudosCard";

const EMPTY_STATE_CARDS = [
  { color: "blue" as const },
  { color: "yellow" as const },
  { color: "coral" as const },
] as const;

export function NoKudos({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center pb-8 justify-center text-center">
      <div className="relative h-72 w-full max-w-[600px]">
        {EMPTY_STATE_CARDS.map((card, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 w-[200px] sm:w-[280px]"
            style={{
              transform: `translate(-50%, -50%) rotate(${(index - 1) * 15}deg)`,
              zIndex: index,
            }}
          >
            <EmptyKudosCard color={card.color} />
          </div>
        ))}
      </div>
      <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark">
        {message}
      </p>
    </div>
  );
}
