import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getGradeInfo = (score: number, totalScore: number) => {
  const percentage = (score / totalScore) * 100;

  if (percentage >= 90) return { grade: "Excellent", color: "#3CC28A" };
  if (percentage >= 80) return { grade: "Good", color: "#3CC28A" };
  if (percentage >= 70) return { grade: "Average", color: "#F9C94E" };
  return { grade: "Poor", color: "#EB751F" };
};

