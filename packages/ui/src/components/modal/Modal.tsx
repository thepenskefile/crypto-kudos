"use client";

import React from "react";
import { useCallback, useState } from "react";
import {
  Dialog,
  Description,
  DialogTitle,
  Transition,
  DialogProps,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import type { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export interface ModalProps extends DialogProps {
  ignoreOutsideClick?: boolean;
  children: React.ReactElement | React.ReactElement[];
  visible: boolean;
  panelClassName?: string;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
}

export function Modal({
  visible,
  onClose,
  children,
  ignoreOutsideClick = false,
  initialFocus,
  panelClassName,
  ...restModalProps
}: ModalProps) {
  return (
    <Transition show={visible} as={React.Fragment}>
      <Dialog
        initialFocus={initialFocus}
        as="div"
        className="relative z-[9999999]"
        onClose={ignoreOutsideClick ? () => undefined : onClose}
        {...restModalProps}
      >
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75 transition-opacity backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={twMerge(
                  "relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100 dark:border-gray-700",
                  panelClassName
                )}
              >
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function Header({
  children,
  className,
  hasDivider = false,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  hasDivider: boolean;
}) {
  return (
    <header className={twMerge("mt-3 px-8 pt-5 sm:mt-5", className)}>
      {children}
      {hasDivider && (
        <hr className="border-gray-100 dark:border-gray-700 my-4" />
      )}
    </header>
  );
}

function HeaderTitle({
  children,
  className,
  as = "h3",
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) {
  return (
    <DialogTitle
      as={as}
      className={twMerge(
        "text-2xl px-8 py-4 font-semibold leading-6 text-purple-600 dark:text-purple-400",
        className
      )}
    >
      {children}
    </DialogTitle>
  );
}

function HeaderDescription({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <Description
      className={twMerge(
        "mt-2 text-base text-text-secondary-light dark:text-text-secondary-dark",
        className
      )}
    >
      {children}
    </Description>
  );
}

function Content({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <section className={twMerge("my-6 px-8 overflow-auto max-h-96", className)}>
      {children}
    </section>
  );
}

function Footer({
  children,
  className,
}: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}) {
  return (
    <footer
      className={twMerge(
        "flex w-full justify-end bg-gray-50 dark:bg-gray-900 px-8 py-5 border-t border-gray-100 dark:border-gray-700",
        className
      )}
    >
      <div className="space-x-2">{children}</div>
    </footer>
  );
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;
Modal.Title = HeaderTitle;
Modal.Description = HeaderDescription;

export interface UseModalState {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  open: () => void;
  close: () => void;
  toggle: () => void;
  modalProps: {
    visible: boolean;
    close: () => void;
  };
}

export function useModalState(defaultValue?: boolean): UseModalState {
  const [visible, setVisible] = useState(!!defaultValue);

  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible((x) => !x), []);

  return {
    visible,
    close,
    setVisible,
    open,
    toggle,
    modalProps: { visible, close },
  };
}
