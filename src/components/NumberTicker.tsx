
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

/**
 * NumberTicker Component
 *
 * Animates a number from 0 to its target value when it comes into view.
 * Handles suffixes/prefixes (e.g., "200+", "98%") by stripping non-numeric chars for calculation
 * and re-appending them for display.
 */
interface NumberTickerProps {
    value: string;
    className?: string;
    delay?: number;
}

export default function NumberTicker({ value, className = "", delay = 0 }: NumberTickerProps) {
    const ref = useRef<HTMLSpanElement>(null);

    // Parse the numeric part and valid suffix/prefix
    // This regex matches the first number found and keeps context if needed
    // For simplicity given the inputs "200+", "98%", "50+", we check for number and suffix
    const numericValue = parseInt(value.replace(/\D/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    });

    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            // Small delay for staggering effect if multiple numbers appear at once
            const timeout = setTimeout(() => {
                motionValue.set(numericValue);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, delay, numericValue, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${Math.round(latest)}${suffix}`;
            }
        });
    }, [springValue, suffix]);

    return <span className={className} ref={ref}>0{suffix}</span>;
}
