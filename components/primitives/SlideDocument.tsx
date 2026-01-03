import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideDocumentProps {
  isActive: boolean;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Document-first slide layout:
 * - One dominant focal element (`primary`)
 * - Secondary/supporting content is visually subdued and staged in time
 */
export function SlideDocument({
  isActive,
  primary,
  secondary,
  children,
  footer,
  className,
}: SlideDocumentProps) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="pt-10 md:pt-14"
      >
        <div className="text-left">{primary}</div>

        {secondary && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
            transition={{ delay: 0.45, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-6"
          >
            {secondary}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
            transition={{ delay: 0.7, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}

        {footer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
            transition={{ delay: 0.95, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="mt-10"
          >
            {footer}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

