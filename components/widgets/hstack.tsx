import { Stack } from "react-bootstrap";
import cn from "classnames";

export function HStack({ children, className, gap, style }) {
  let justifyDefault = `justify-content-between w-100`;
  if (className?.includes("justify-content")) {
    justifyDefault = "";
  }
  return (
    <Stack
      direction="horizontal"
      className={cn(justifyDefault, className)}
      gap={gap}
      style={style}
    >
      {children}
    </Stack>
  );
}

export function HStackLeft({ children, className, gap, style }) {
  let justifyDefault = `justify-content-start w-100`;
  if (className?.includes("justify-content")) {
    justifyDefault = "";
  }
  return (
    <Stack
      direction="horizontal"
      className={cn(justifyDefault, className)}
      gap={gap}
      style={style}
    >
      {children}
    </Stack>
  );
}

export function VStack({ children, className, gap, style }) {
  return (
    <Stack
      direction="vertical"
      className={cn(className)}
      gap={gap}
      style={style}
    >
      {children}
    </Stack>
  );
}

export function HStackFBA({ children, className, gap, style }) {
  let justifyDefault = `justify-content-between w-200`;
  return (
    <Stack
      direction="horizontal"
      className={cn(justifyDefault, className)}
      gap={gap}
      style={style}
    >
      {children}
    </Stack>
  );
}

export function HStackNewPurchaseOrder({ children, className, gap, style }) {
  let justifyDefault = `w-2`;
  return (
    <Stack
      direction="horizontal"
      className={cn(justifyDefault, className)}
      gap={gap}
      style={style}
    >
      {children}
    </Stack>
  );
}
