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
    <div className="overflow-hidden rounded-lg bg-orange-50/50 dark:bg-orange-950/10">
      <table className={twMerge(clsx("w-full"), className)} {...props}>
        {children}
      </table>
      {paginationProps && (
        <div className="px-6 py-4 border-t border-orange-200/50 dark:border-orange-900/20">
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
        clsx("bg-orange-100/70 dark:bg-orange-950/30"),
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
          "px-6 py-4 text-left text-sm font-semibold text-orange-950 dark:text-orange-100 uppercase tracking-wider"
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
          "px-6 py-4 text-text-primary-light dark:text-text-primary-dark border-b border-orange-200/50 dark:border-orange-900/20"
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
      className={twMerge(
        clsx(
          "transition-colors duration-200 hover:bg-orange-100/50 dark:hover:bg-orange-950/20"
        ),
        className
      )}
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
        clsx("divide-y divide-orange-200/50 dark:divide-orange-900/20"),
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
      className={twMerge(
        clsx(
          "bg-orange-100/70 dark:bg-orange-950/30 border-t border-orange-200/50 dark:border-orange-900/20"
        ),
        className
      )}
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
