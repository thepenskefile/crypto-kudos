import { cn } from "../../utils/cn";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "text-purple-600 dark:text-purple-400"
        )}
      >
        ←
      </button>

      <div className="flex gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "w-8 h-8 rounded-lg font-medium transition-all duration-200",
              currentPage === page
                ? "bg-purple-600 dark:bg-purple-400 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-purple-600 dark:text-purple-400"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "text-purple-600 dark:text-purple-400"
        )}
      >
        →
      </button>
    </div>
  );
}
