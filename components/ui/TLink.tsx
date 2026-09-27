"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/layout/PageTransition";

type Props = ComponentProps<typeof Link> & { href: string };

const isExternal = (href: string) => /^(https?:|mailto:|tel:|\/\/)/.test(href);

/**
 * Internal link that routes through the page-transition curtain.
 * External, modified (cmd/ctrl/shift) and new-tab clicks behave natively.
 */
export function TLink({ href, onClick, target, ...props }: Props) {
  const { navigate } = usePageTransition();

  if (isExternal(href)) {
    return <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} onClick={onClick} {...(props as ComponentProps<"a">)} />;
  }

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === "_blank") return;
    e.preventDefault();
    const url = href.startsWith("#") ? window.location.pathname + window.location.search + href : href;
    navigate(url);
  };

  return <Link href={href} target={target} onClick={handle} {...props} />;
}
