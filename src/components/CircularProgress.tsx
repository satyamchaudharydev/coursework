"use client";
import React from 'react';

const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage, radius }: { colour: string; percentage?: number; radius: number }) => {
  const circ = 2 * Math.PI * radius;
  const strokePct = percentage ? ((100 - percentage) * circ) / 100 : 0;
  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} 
      strokeWidth={`${radius * 0.2}`}
      strokeDasharray={circ}
      strokeDashoffset={strokePct}
    ></circle>
  );
};

const Text = ({ percentage, fontSize,text }: { percentage: number, fontSize: number, text?: string }) => {
  const label = text || `${percentage.toFixed(0)}%`;
  return (
    <text
      x="50%"
      y="50%"
      fontWeight={700}
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={`${fontSize}em`}
    >
      {label}
    </text>
  );
}

export default function CircularProgress({
  percentage,
  colour,
  size = 100,
  fontSize = 1.5,
  text = "",
}: {
  percentage: number;
  colour: string;
  size?: number;
  fontSize?: number;
  text?: string;
}) {
  const pct = cleanPercentage(percentage);
  const radius = size / 2 - size * 0.1; // Adjust radius to fit within the SVG
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size} ${size}`}
      style={{ maxWidth: `${size}px`, maxHeight: `${size}px` }}
      strokeLinecap="round"
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <Circle colour="lightgrey" radius={radius} />
        <Circle colour={colour} percentage={pct} radius={radius} />
      </g>
      <Text percentage={pct} fontSize={fontSize} text={text} />
    </svg>
  );
}

CircularProgress.displayName = "CircularProgress";
