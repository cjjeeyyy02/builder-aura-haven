import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  className?: string;
  bgVariant?: "blue" | "gray" | "white";
}

export function MetricCard({
  title,
  value,
  subtitle,
  description,
  icon,
  trend,
  className,
  bgVariant = "white",
}: MetricCardProps) {
  const backgroundVariants = {
    white: "bg-white border border-gray-200",
    blue: "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200",
    gray: "bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200",
  };

  const textVariants = {
    white: "text-gray-700",
    blue: "text-blue-700",
    gray: "text-gray-700",
  };

  const iconVariants = {
    white: "text-gray-400",
    blue: "text-blue-500",
    gray: "text-gray-500",
  };

  return (
    <Card
      className={cn(
        "hover:shadow-lg transition-all duration-300",
        backgroundVariants[bgVariant],
        className,
      )}
    >
      <CardContent className="p-4">
        {/* Header with title and icon */}
        <div className="flex items-center justify-between mb-3">
          <h3 className={cn("text-sm font-medium", textVariants[bgVariant])}>
            {title}
          </h3>
          {icon && <div className={iconVariants[bgVariant]}>{icon}</div>}
        </div>

        {/* Main value */}
        <div className="mb-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">
              {value}
            </span>
            {subtitle && (
              <span className="text-xl font-medium text-gray-600">
                {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Trend */}
        {trend && (
          <div className="mb-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.type === "increase" && "text-green-600",
                trend.type === "decrease" && "text-red-600",
                trend.type === "neutral" && "text-blue-600",
              )}
            >
              {trend.value}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              {trend.period}
            </span>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
