"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Briefcase,
  Search,
  Building,
  Rocket,
  User,
  GraduationCap,
  MoreHorizontal,
  Shield,
  Banknote,
  TrendingUp,
  BarChart,
  Minimize,
  Minus,
  Maximize,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  search: Search,
  building: Building,
  rocket: Rocket,
  user: User,
  "graduation-cap": GraduationCap,
  "more-horizontal": MoreHorizontal,
  shield: Shield,
  banknote: Banknote,
  "trending-up": TrendingUp,
  "bar-chart": BarChart,
  minimize: Minimize,
  minus: Minus,
  maximize: Maximize,
};

interface OptionButtonProps {
  label: string;
  description?: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionButton({
  label,
  description,
  icon,
  selected,
  onClick,
}: OptionButtonProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        relative w-full p-5 rounded-xl border-2 text-left
        transition-all duration-200
        ${
          selected
            ? "border-sage bg-sage/10 text-cream"
            : "border-charcoal-light bg-charcoal hover:border-sage/30 text-cream-muted hover:text-cream"
        }
      `}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        {IconComponent && (
          <div
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
              ${selected ? "bg-sage/20" : "bg-charcoal-light"}
            `}
          >
            <IconComponent
              className={`w-6 h-6 ${selected ? "text-sage" : "text-cream-muted"}`}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className={`font-semibold text-lg ${selected ? "text-cream" : ""}`}
          >
            {label}
          </div>
          {description && (
            <div
              className={`text-sm mt-1 ${
                selected ? "text-cream-muted" : "text-cream-dark"
              }`}
            >
              {description}
            </div>
          )}
        </div>

        {/* Check indicator */}
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-8 h-8 rounded-full bg-sage flex items-center justify-center flex-shrink-0"
          >
            <Check className="w-5 h-5 text-charcoal" strokeWidth={3} />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
