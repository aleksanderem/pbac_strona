"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const steps = [
  {
    id: 1,
    title: "Przygotowanie miejsca montażu",
    description: "Zabezpieczenie ścian i podłóg, wyznaczenie optymalnej lokalizacji jednostek wewnętrznej i zewnętrznej zgodnie z wytycznymi producenta.",
    variant: "top" as const,
  },
  {
    id: 2,
    title: "Instalacja rurociągów i okablowania",
    description: "Wykonanie otworu w ścianie, montaż instalacji freonowej, grawitacyjny odpływ skroplin oraz zasilanie elektryczne jednostki z rozdzielni.",
    variant: "left" as const,
  },
  {
    id: 3,
    title: "Montaż i połączenie jednostek",
    description: "Montaż jednostki wewnętrznej (do 3m wysokości), instalacja jednostki zewnętrznej, połączenie obu urządzeń i wykonanie próby szczelności.",
    variant: "right" as const,
  },
  {
    id: 4,
    title: "Uruchomienie i szkolenie",
    description: "Napełnienie czynnikiem chłodniczym, uruchomienie systemu, test wszystkich trybów pracy oraz szkolenie domowników z obsługi pilota i aplikacji.",
    variant: "left" as const,
  },
];

function FeatureCard({ feature, isActive, onClick }: { feature: (typeof steps)[0]; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "z-20 cursor-pointer rounded-2xl p-4 transition-all",
        isActive
          ? "bg-white/10 shadow-sm ring-1 ring-white/10"
          : "hover:bg-white/5",
      )}
    >
      <h3 className={cn(
        "text-lg font-montserrat font-semibold transition-colors",
        isActive ? "text-white" : "text-white/50",
      )}>
        {feature.title}
      </h3>
      <motion.p
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0, marginTop: isActive ? 8 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden text-sm text-white/60"
      >
        {feature.description}
      </motion.p>
    </div>
  );
}

function IsometricBox({ variant, isActive }: { variant: "top" | "left" | "right"; isActive?: boolean }) {
  const TRANSITION = { type: "spring" as const, stiffness: 300, damping: 30 };
  const YVariants = { animate: { translateY: -20 }, initial: { translateY: 0 } };
  const XVariants = { animate: { translateX: 20 }, initial: { translateX: 0 } };
  const NegXVariants = { animate: { translateX: -20 }, initial: { translateX: 0 } };
  const NoOp = { animate: { translateX: 0, translateY: 0 }, initial: { translateX: 0, translateY: 0 } };

  const getVariants = (face: "top" | "left" | "right") => {
    if (face !== variant) return NoOp;
    return face === "left" ? NegXVariants : face === "right" ? XVariants : YVariants;
  };

  const getStroke = (face: "top" | "left" | "right") => {
    if (face !== variant || !isActive) return "rgba(255,255,255,0.1)";
    return "#3D5EFF";
  };

  return (
    <motion.div animate={isActive ? "animate" : "initial"} initial="initial">
      <motion.svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-48 sm:size-60">
        <motion.path variants={getVariants("top")} transition={TRANSITION} d="M100 40 Q108 40 155 68 Q162 72 155 76 Q108 104 100 104 Q92 104 45 76 Q38 72 45 68 Q92 40 100 40 Z" className="fill-white/5" stroke={getStroke("top")} strokeWidth="1.5" />
        <motion.path variants={getVariants("top")} transition={TRANSITION} d="M100 52 Q105 52 132 68 Q138 72 132 76 Q105 92 100 92 Q95 92 68 76 Q62 72 68 68 Q95 52 100 52 Z" className="fill-black" stroke={getStroke("top")} strokeWidth="1" />
        <motion.path variants={getVariants("left")} transition={TRANSITION} d="M45 76 L100 104 L100 164 Q100 170 92 166 L45 140 Q38 136 38 128 L38 80 Q38 72 45 76 Z" className="fill-white/[0.03]" stroke={getStroke("left")} strokeWidth="1.5" />
        <motion.path variants={getVariants("right")} transition={TRANSITION} d="M155 76 L100 104 L100 164 Q100 170 108 166 L155 140 Q162 136 162 128 L162 80 Q162 72 155 76 Z" className="fill-white/5" stroke={getStroke("right")} strokeWidth="1.5" />
        <motion.path variants={getVariants("left")} transition={TRANSITION} d="M55 86 L55 145" stroke={getStroke("left")} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
        <motion.path variants={getVariants("left")} transition={TRANSITION} d="M70 95 L70 155" stroke={getStroke("left")} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
        <motion.path variants={getVariants("left")} transition={TRANSITION} d="M85 104 L85 162" stroke={getStroke("left")} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
        <motion.path variants={getVariants("right")} transition={TRANSITION} d="M145 86 L145 145" stroke={getStroke("right")} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
        <motion.path variants={getVariants("right")} transition={TRANSITION} d="M130 95 L130 155" stroke={getStroke("right")} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
        <motion.path variants={getVariants("right")} transition={TRANSITION} d="M115 104 L115 162" stroke={getStroke("right")} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
      </motion.svg>
    </motion.div>
  );
}

function StackedBoxes({ activeId }: { activeId: number }) {
  return (
    <div className="relative flex w-full flex-col items-center">
      {steps.map((step, idx) => (
        <motion.div
          key={step.id}
          initial={false}
          animate={{ opacity: step.id === activeId ? 1 : 0.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex h-[72px] items-center justify-center"
          style={{ zIndex: step.id === activeId ? 10 : steps.length - idx, marginTop: idx === 0 ? 0 : 10 }}
        >
          <IsometricBox variant={step.variant} isActive={step.id === activeId} />
        </motion.div>
      ))}
    </div>
  );
}

export default function DetailedInstallation() {
  const [activeId, setActiveId] = useState(1);

  return (
    <section className="py-20 px-4">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12">
          <h2 className="mb-4 font-montserrat text-2xl sm:text-4xl font-bold text-white">
            Przebieg montażu
          </h2>
          <p className="max-w-xl text-white/50">
            Każdy etap realizowany przez certyfikowanych techników z uprawnieniami F-GAZ i SEP.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            {steps.map((step) => (
              <FeatureCard
                key={step.id}
                feature={step}
                isActive={activeId === step.id}
                onClick={() => setActiveId(step.id)}
              />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <StackedBoxes activeId={activeId} />
          </div>
        </div>
      </div>
    </section>
  );
}
