"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  y?: number;
  x?: number;
  scale?: number;
  viewportMargin?: string;
}

const customEase = [0.16, 1, 0.3, 1] as const;

/**
 * 1. FadeInView: Fast, hardware-accelerated reveal on scroll or load
 */
export function FadeInView({
  children,
  delay = 0,
  duration = 0.35,
  className = "",
  y = 15,
  x = 0,
  scale = 1,
  viewportMargin = "0px",
}: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale: scale !== 1 ? scale : 1 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: customEase,
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * 2. StaggerContainer & StaggerItem: Staggered sequence for grids and lists
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  viewportMargin?: string;
}

export function StaggerContainer({
  children,
  className = "",
  delay = 0,
  viewportMargin = "0px",
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.06,
            delayChildren: delay || 0.05,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: viewportMargin }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItemVariants} className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  );
}

/**
 * 3. InteractiveCard: Subtle lift & glow on hover
 */
interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
}

export function InteractiveCard({ children, className = "" }: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * 4. MagneticButton: Tactile hover & tap feedback for CTAs
 */
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  scaleHover?: number;
  scaleTap?: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  scaleHover = 1.02,
  scaleTap = 0.98,
}: MagneticButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: scaleHover }}
      whileTap={{ scale: scaleTap }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={`inline-block transform-gpu ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * 5. FloatingElement: Idle 60fps floating animation
 */
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  yOffset?: number;
}

export function FloatingElement({
  children,
  className = "",
  duration = 6,
  yOffset = 6,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * 6. PulseGlow: Ambient breathing pulse for featured cards
 */
interface PulseGlowProps {
  className?: string;
}

export function PulseGlow({ className = "" }: PulseGlowProps) {
  return (
    <motion.div
      animate={{
        opacity: [0.35, 0.65, 0.35],
        scale: [0.99, 1.01, 0.99],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      className={`transform-gpu ${className}`}
    />
  );
}
