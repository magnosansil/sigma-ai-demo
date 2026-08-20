import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "dark" | "signal" | "outline";
}

export function Button({ tone = "dark", className = "", ...props }: ButtonProps) {
  return <button className={`btn btn-${tone} ${className}`} {...props} />;
}
