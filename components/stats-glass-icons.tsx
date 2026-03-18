"use client";

import dynamic from "next/dynamic";
import "@/components/GlassIcons.css";
import { Users, Award, Star, ShieldCheck, Wrench, Clock, CheckCircle, Settings } from "lucide-react";

const GlassIcons = dynamic(() => import("@/components/GlassIcons"), { ssr: false });

interface StatsGlassIconsProps {
  variant: "montaz" | "serwis";
}

export default function StatsGlassIcons({ variant }: StatsGlassIconsProps) {
  const montazItems = [
    { icon: <Users className="w-6 h-6" />, color: "blue", label: "500+ montaży" },
    { icon: <Award className="w-6 h-6" />, color: "purple", label: "10+ marek" },
    { icon: <Star className="w-6 h-6" />, color: "orange", label: "Ocena 4.9" },
    { icon: <ShieldCheck className="w-6 h-6" />, color: "green", label: "5 lat gwarancji" },
  ];

  const serwisItems = [
    { icon: <Wrench className="w-6 h-6" />, color: "blue", label: "1000+ serwisów" },
    { icon: <Clock className="w-6 h-6" />, color: "purple", label: "Termin 2-5 dni" },
    { icon: <CheckCircle className="w-6 h-6" />, color: "green", label: "Wszystkie marki" },
    { icon: <Settings className="w-6 h-6" />, color: "orange", label: "Gwarancja na usługę" },
  ];

  const items = variant === "montaz" ? montazItems : serwisItems;

  return (
    <div style={{ height: "180px", position: "relative" }}>
      <GlassIcons items={items} className="stats-glass" />
    </div>
  );
}
