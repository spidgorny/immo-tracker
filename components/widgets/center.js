import cn from "classnames";

export function Center({ className, children }) {
  return <div className={cn("text-center mx-auto", className)}>{children}</div>;
}
