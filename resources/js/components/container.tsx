import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn("max-w-5xl mx-auto w-full px-[--gutter]", className)}>{children}</div>
    )
}