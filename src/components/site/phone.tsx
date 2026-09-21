import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneFrame({
  className,
  screenClassName,
  children,
}: {
  className?: string;
  screenClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      <span className="absolute top-[18%] -left-[4px] h-8 w-[4px] rounded-l-sm bg-[#2b2c30]" />
      <span className="absolute top-[28%] -left-[4px] h-14 w-[4px] rounded-l-sm bg-[#2b2c30]" />
      <span className="absolute top-[38%] -left-[4px] h-14 w-[4px] rounded-l-sm bg-[#2b2c30]" />
      <span className="absolute top-[30%] -right-[4px] h-20 w-[4px] rounded-r-sm bg-[#2b2c30]" />

      <div className="h-full rounded-[54px] bg-[#0c0d10] p-[11px] shadow-device ring-1 ring-white/10">
        <div className={cn("relative h-full overflow-hidden rounded-[44px] bg-[#f4f5f8]", screenClassName)}>
          <div className="absolute top-3 left-1/2 z-30 h-[34px] w-[118px] -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}
