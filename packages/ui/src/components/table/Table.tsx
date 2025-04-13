import * as React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface TableProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <table
      className={twMerge(
        clsx(
          "w-full rounded-lg overflow-hidden border border-border-light dark:border-border-dark"
        ),
        className
      )}
      {...props}
    >
      {children}
    </table>
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
        clsx("bg-surface-light dark:bg-surface-dark"),
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
          "text-text-primary-light dark:text-text-primary-dark px-4 py-3 align-middle text-sm font-semibold uppercase tracking-wider"
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
          "px-4 py-3 align-middle text-text-primary-light dark:text-text-primary-dark border-b border-border-light dark:border-border-dark"
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
          "hover:bg-accent-secondary dark:hover:bg-accent-secondary-hover transition-colors duration-150"
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
      className={twMerge(clsx("bg-bg-light dark:bg-bg-dark"), className)}
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
        clsx("bg-surface-light dark:bg-surface-dark"),
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
