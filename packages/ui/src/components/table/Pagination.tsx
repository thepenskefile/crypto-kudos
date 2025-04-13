import * as React from "react";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import { Button } from "../button";

export interface PaginationProps {
  paginationData: {
    currentPage: bigint;
    pageSize: bigint;
    totalPages: bigint;
    totalItems: bigint;
  };
  currentPage: number;
  currentLimit: number;
  setCurrentPage: (page: number) => void;
  setCurrentLimit: (limit: number) => void;
  isLoading: boolean;
  title?: string;
}

export function Pagination({
  paginationData,
  setCurrentPage,
  isLoading,
  title = "items",
}: PaginationProps) {
  if (paginationData.totalItems <= 0) return null;

  if (paginationData.totalPages === 1) return null;

  return (
    <div className="bg-white text-xs font-bold uppercase leading-loose text-basic-dark shadow-tyro">
      <div className="flex flex-col items-center justify-between p-4 xl:flex-row">
        <div className="flex w-full items-center justify-between xl:w-auto xl:justify-normal xl:space-x-6">
          <div>
            {paginationData?.totalItems} {title}
          </div>
          {isLoading && <span>Loading...</span>}
        </div>
        <div className="flex w-full flex-row justify-between xl:w-auto">
          <Button
            variant="secondary"
            className="px-0 xl:px-4"
            onClick={() => setCurrentPage(1)}
            disabled={paginationData.currentPage === 1}
          >
            <div className="flex items-center">
              <ChevronDoubleLeftIcon className="mr-2" />

              <span className="hidden md:block">First</span>
            </div>
          </Button>
          <Button
            variant="secondary"
            className="px-0 xl:px-4"
            onClick={() => setCurrentPage(paginationData.currentPage - 1)}
            disabled={paginationData.currentPage === 1}
          >
            <div className="flex items-center">
              <ChevronLeftIcon className="mr-2" />

              <span className="hidden md:block">Previous</span>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="px-0 xl:px-4"
            onClick={() => setCurrentPage(paginationData.currentPage + 1)}
            disabled={paginationData.currentPage === paginationData.totalPages}
          >
            <div className="flex items-center">
              <span className="hidden md:block">Next</span>

              <ChevronRightIcon className="ml-2" />
            </div>
          </Button>

          <Button
            variant="secondary"
            className="px-0 xl:px-4"
            variant="secondary"
            onClick={() => setCurrentPage(paginationData.totalPages)}
            disabled={paginationData.currentPage === paginationData.totalPages}
          >
            <div className="flex items-center">
              <span className="hidden md:block">Last</span>

              <ChevronDoubleRightIcon className="ml-2" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
