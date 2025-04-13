import * as React from "react";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import { Button } from "../button";

export interface PaginationProps {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
  title?: string;
}

export function Pagination({
  totalItems,
  totalPages,
  currentPage,
  setCurrentPage,
  isLoading,
  title = "items",
}: PaginationProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 xl:flex-row">
      <div className="flex w-full items-center justify-between xl:w-auto xl:justify-normal xl:space-x-6">
        <div className="text-sm font-medium text-orange-900 dark:text-orange-100">
          {totalItems} {title}
        </div>
        {isLoading && (
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
            Loading...
          </span>
        )}
      </div>
      <div className="flex w-full flex-row justify-between gap-2 xl:w-auto">
        <Button
          variant="secondary"
          className="rounded-lg border-2 border-orange-200/50 dark:border-orange-900/30 bg-white/80 dark:bg-surface-dark/80 px-3 py-2 text-orange-900 dark:text-orange-100 hover:bg-orange-50 dark:hover:bg-orange-900/20"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <div className="flex items-center">
            <ChevronDoubleLeftIcon className="h-4 w-4" />
            <span className="ml-1 hidden text-sm md:block">First</span>
          </div>
        </Button>
        <Button
          variant="secondary"
          className="rounded-lg border-2 border-orange-200/50 dark:border-orange-900/30 bg-white/80 dark:bg-surface-dark/80 px-3 py-2 text-orange-900 dark:text-orange-100 hover:bg-orange-50 dark:hover:bg-orange-900/20"
          onClick={() => setCurrentPage(Number(currentPage) - 1)}
          disabled={currentPage === 1}
        >
          <div className="flex items-center">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="ml-1 hidden text-sm md:block">Previous</span>
          </div>
        </Button>

        <Button
          variant="secondary"
          className="rounded-lg border-2 border-orange-200/50 dark:border-orange-900/30 bg-white/80 dark:bg-surface-dark/80 px-3 py-2 text-orange-900 dark:text-orange-100 hover:bg-orange-50 dark:hover:bg-orange-900/20"
          onClick={() => setCurrentPage(Number(currentPage) + 1)}
          disabled={currentPage === totalPages}
        >
          <div className="flex items-center">
            <span className="mr-1 hidden text-sm md:block">Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </div>
        </Button>

        <Button
          variant="secondary"
          className="rounded-lg border-2 border-orange-200/50 dark:border-orange-900/30 bg-white/80 dark:bg-surface-dark/80 px-3 py-2 text-orange-900 dark:text-orange-100 hover:bg-orange-50 dark:hover:bg-orange-900/20"
          onClick={() => setCurrentPage(Number(totalPages))}
          disabled={currentPage === totalPages}
        >
          <div className="flex items-center">
            <span className="mr-1 hidden text-sm md:block">Last</span>
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </div>
        </Button>
      </div>
    </div>
  );
}
