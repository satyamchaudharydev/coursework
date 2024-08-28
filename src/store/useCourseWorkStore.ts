import { exampleCoursework } from '@/data';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CourseworkType = "TokE" | "Ee" | "Ia";

export interface Coursework {
  id: string;
  courseworkType: CourseworkType;
  title: string;
  subject?: string;
  file: string;
  topic: string;
  totalWords: number;
  totalTimeReading: number;
  language: string;
  
  evaluation: {
    maxScore: number;
    totalScore: number;
    evaluationDate: string;
  };
}

interface CourseworkStore {
  courseworks: Coursework[];
  exampleCoursework: Coursework[];
  addCoursework: (coursework: Omit<Coursework, 'id'>) => Coursework | Error;
  removeAllCourseworks: () => void;
  removeCoursework: (id: string) => void;
  getSortedCourseworks: () => Coursework[]
  getSortedExampleCourseworks: () => Coursework[];
}

const sortCourseworksByDate = (courseworks: Coursework[]): Coursework[] => {
  return [...courseworks].sort((a, b) => 
    new Date(b.evaluation.evaluationDate).getTime() - new Date(a.evaluation.evaluationDate).getTime()
  );
};

export const useCourseworkStore = create<CourseworkStore>()(
  persist(
    (set, get) => ({
      courseworks: [],
      exampleCoursework: exampleCoursework,
      addCoursework: (coursework) => {
        const newCoursework = { ...coursework, id: Date.now().toString() };
        try{
          set((state) => ({ courseworks: [...state.courseworks, newCoursework] }));
        }
        catch (error) {
          return new Error('Failed to add coursework');
        }
        return newCoursework;
      },
      removeCoursework: (id) => {
        set((state) => ({
          courseworks: state.courseworks.filter((cw) => cw.id !== id),
        }));
      },
      removeAllCourseworks: () => {
        localStorage.removeItem('courseworks-storage');
        set({ courseworks: [] });
      },
      getSortedCourseworks: () => {
        return sortCourseworksByDate(get().courseworks);
      },
      getSortedExampleCourseworks: () => {
        return sortCourseworksByDate(get().exampleCoursework);
      },
    }),
    {
      partialize: (state: CourseworkStore) => ({ courseworks: state.courseworks }),
      name: 'courseworks-storage', // Name of the item in localStorage
    }
  )
);