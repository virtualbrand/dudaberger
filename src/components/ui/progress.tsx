"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "relative overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        primary: "bg-primary/10",
        secondary: "bg-secondary",
        destructive: "bg-destructive/10",
        outline:
          "bg-accent border border-border",
      },
      size: {
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        primary: "bg-primary",
        secondary: "bg-foreground",
        destructive: "bg-destructive",
        outline: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const circularProgressVariants = cva(
  "relative flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-12 h-12",
        default: "w-16 h-16",
        lg: "w-20 h-20",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number;
  showValue?: boolean;
  animated?: boolean;
  type?: "linear" | "circular";
  strokeWidth?: number;
  label?: string;
  barClassName?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      variant,
      size,
      showValue = false,
      animated = true,
      type = "linear",
      strokeWidth,
      label,
      barClassName,
      ...props
    },
    ref,
  ) => {
    const progress = Math.min(Math.max(value, 0), 100);

    if (type === "circular") {
      const circleSize = size === "sm" ? 48 : size === "lg" ? 80 : 64;
      const radius = (circleSize - (strokeWidth || 8)) / 2;
      const circumference = 2 * Math.PI * radius;
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      return (
        <div className="space-y-2">
          {label && (
            <div className="text-sm  text-foreground">
              {label}
            </div>
          )}
          <div className={cn(circularProgressVariants({ size }), className)}>
            <svg
              width={circleSize}
              height={circleSize}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke="hsl(var(--hu-secondary))"
                strokeWidth={strokeWidth || 8}
                fill="transparent"
                className="opacity-20"
              />
              {/* Progress circle */}
              <circle
                cx={circleSize / 2}
                cy={circleSize / 2}
                r={radius}
                stroke={
                  variant === "destructive"
                    ? "hsl(var(--hu-destructive))"
                    : variant === "secondary"
                      ? "hsl(var(--hu-secondary-foreground))"
                      : variant === "outline"
                        ? "hsl(var(--hu-foreground))"
                        : "hsl(var(--hu-primary))"
                }
                strokeWidth={strokeWidth || 8}
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: animated ? 'stroke-dashoffset 1.5s ease-out' : 'none',
                  willChange: 'stroke-dashoffset',
                }}
              />
            </svg>
            {showValue && (
              <div
                className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums"
                style={{
                  animation: animated ? 'fadeIn 0.3s ease-out 0.5s both' : 'none',
                }}
              >
                {Math.round(progress)}%
              </div>
            )}
          </div>
          {showValue && (
            <div
              className="text-center text-xs text-muted-foreground tabular-nums"
              style={{
                animation: animated ? 'fadeInUp 0.2s ease-out 0.3s both' : 'none',
              }}
            >
              {Math.round(progress)}%
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {label && (
          <div className="text-sm  text-foreground">
            {label}
          </div>
        )}
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ variant, size }), className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(progressIndicatorVariants({ variant }), barClassName)}
            style={{
              transform: `translateX(-${100 - progress}%)`,
              transition: animated ? 'transform 1.2s ease-in-out' : 'none',
              willChange: 'transform',
            }}
          />
        </ProgressPrimitive.Root>
        {showValue && (
          <div
            className="text-right text-xs font-semibold text-muted-foreground tabular-nums"
            style={{
              animation: animated ? 'fadeInUp 0.2s ease-out 0.3s both' : 'none',
            }}
          >
            {Math.round(progress)}%
          </div>
        )}
      </div>
    );
  },
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants };