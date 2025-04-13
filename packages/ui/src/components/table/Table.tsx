import * as React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { Pagination, PaginationProps } from "./Pagination";

interface TableProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  paginationProps?: Omit<PaginationProps, "className">;
}

export function Table({
  className,
  children,
  paginationProps,
  ...props
}: TableProps) {
  return (
    <div className="overflow-hidden rounded-xl shadow-lg bg-white/50 dark:bg-surface-dark/50 backdrop-blur-sm p-1">
      <table
        className={twMerge(
          clsx(
            "w-full overflow-hidden rounded-lg border-2 border-orange-200/50 dark:border-orange-900/30"
          ),
          className
        )}
        {...props}
      >
        {children}
      </table>
      {paginationProps && (
        <div className="mt-1 px-3 pb-0.5">
          <Pagination {...paginationProps} />
        </div>
      )}
    </div>
  );
}

interface HeadProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

function Head({ className, children, ...props }: HeadProps) {
  return (
    <thead
      className={twMerge(
        clsx("bg-orange-100/80 dark:bg-orange-900/20"),
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

interface HeadCellProps
  extends React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  > {}

function HeadCell({ className, children, ...props }: HeadCellProps) {
  return (
    <th
      className={twMerge(
        clsx(
          "text-orange-900 dark:text-orange-100 px-6 py-4 align-middle text-sm font-bold uppercase tracking-wider"
        ),
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

interface CellProps
  extends React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  > {}

function Cell({ className, children, ...props }: CellProps) {
  return (
    <td
      className={twMerge(
        clsx(
          "px-6 py-4 align-middle text-text-primary-light dark:text-text-primary-dark border-b border-orange-100 dark:border-orange-900/30"
        ),
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

interface RowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  > {}

function Row({ className, children, ...props }: RowProps) {
  return (
    <tr
      className={twMerge(clsx("transition-colors duration-200"), className)}
      {...props}
    >
      {children}
    </tr>
  );
}

interface BodyProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

function Body({ className, children, ...props }: BodyProps) {
  return (
    <tbody
      className={twMerge(
        clsx("bg-white/80 dark:bg-surface-dark/80"),
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
}

interface FootProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  > {}

function Foot({ className, children, ...props }: FootProps) {
  return (
    <tfoot
      className={twMerge(clsx("bg-orange-50 dark:bg-orange-900/20"), className)}
      {...props}
    >
      {children}
    </tfoot>
  );
}

Table.Head = Head;
Table.Body = Body;
Table.HeadCell = HeadCell;
Table.Row = Row;
Table.Cell = Cell;
Table.Foot = Foot;

export type { PaginationProps };
