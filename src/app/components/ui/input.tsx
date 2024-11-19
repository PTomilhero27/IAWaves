import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/app/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: LucideIcon;
  classIcon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, icon: Icon, classIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {Icon && (
          <Icon
            width={20}
            height={20}
            className={`${classIcon} text-icon absolute left-3 text-muted-foreground`}
          />
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-input px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-600",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };