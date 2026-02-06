
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    { step: "01", title: "Subscribe", desc: "Choose a plan and subscribe." },
    { step: "02", title: "Request", desc: "Submit unlimited requests." },
    { step: "03", title: "Receive", desc: "Get designs in 48 hours." },
    { step: "04", title: "Revise", desc: "Unlimited revisions included." }
];

export default function ProcessCards() {
    const container = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useGSAP(() => {
        // Only set up animation if we have cards
        if (!cardsRef.current.length) return;

        // Use a timeline for precise sequencing
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top", // When top of container hits top of viewport
                end: `+=${processSteps.length * 100}%`, // Scroll distance based on card count
                pin: true, // Pin the container
                scrub: true, // Link animation to scroll position
                anticipatePin: 1, // Smooth out pinning
            }
        });

        // Animate each card except the first one (which is already there)
        // We want them to slide up from the bottom
        cardsRef.current.forEach((card, index) => {
            if (index === 0) return; // First card stays put

            tl.fromTo(
                card,
                {
                    yPercent: 100, // Start fully below
                },
                {
                    yPercent: 0, // Move to neutral position (stacking)
                    ease: "none", // Linear movement for scrub
                    stagger: 0.5 // Overlap control handled by timeline duration usually, but explicit sequencing is safer here
                }
            );
        });

    }, { scope: container });

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <div ref={container} className="h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="text-center mb-12 absolute top-12 z-0 opacity-50">
                <h2 className="font-display text-[8vw] md:text-7xl uppercase text-white">HOW IT WORKS</h2>
            </div>

            <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center">
                {processSteps.map((item, i) => (
                    <div
                        key={i}
                        ref={addToRefs}
                        className="absolute top-0 w-full h-full flex items-center gap-8 p-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] origin-top border border-white/10 bg-gradient-to-br from-[#1A1A1A] to-[#050505] backdrop-blur-xl overflow-hidden"
                        style={{
                            zIndex: i + 1,
                            // We don't rely only on CSS positioning here, GSAP handles the y-transform
                        }}
                    >
                        {/* Glass Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-10 pointer-events-none"></div>

                        <div className="font-display text-[12rem] leading-none text-white opacity-[0.03] absolute -top-8 -right-8 select-none pointer-events-none z-0">
                            {item.step}
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8 w-full z-10">
                            <div className="font-display text-7xl text-brand-gold drop-shadow-lg">{item.step}</div>
                            <div className="flex-1">
                                <h3 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">{item.title}</h3>
                                <p className="text-gray-400 text-xl leading-relaxed max-w-lg">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
