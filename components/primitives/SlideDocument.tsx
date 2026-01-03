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
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 12,
          filter: isActive ? "blur(0px)" : "blur(4px)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 1,
        }}
        className="pt-10 md:pt-20"
      >
        <div className="text-left">{primary}</div>

        {secondary && (
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 12,
              filter: isActive ? "blur(0px)" : "blur(2px)",
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1,
              delay: 0.25, // Staged beat
            }}
            className="mt-8"
          >
            {secondary}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 20,
              delay: 0.5,
            }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}

        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
            className="mt-12"
          >
            {footer}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

