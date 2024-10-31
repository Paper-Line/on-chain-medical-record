"use client";

import { useEffect, useRef } from "react";

type OutsideClickProps = {
  ref: React.RefObject<HTMLElement>;
  onClick: (event: MouseEvent) => void;
};

export default function useOutsideClick({ ref, onClick }: OutsideClickProps) {
  // Keep a mutable reference to click away callback
  // and change it every time the component using it changes
  // using 'useRef' here will make sure that we have a mutable
  // and single callback lying around.
  const callbackRef = useRef(onClick);

  useEffect(() => {
    callbackRef.current = onClick;
  }, [onClick]);

  // listen for click events on ref element
  // attaching a handler and calling the callback if necessary
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current && ref.current.contains(event.target)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref]);
}
