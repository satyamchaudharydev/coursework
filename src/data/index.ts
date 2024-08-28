import { EvaluationSection } from "@/app/coursework/Coursework";
import { Coursework } from "@/store/useCourseWorkStore";

export const exampleCoursework: Coursework[] = [
  {
    id: "1",
    courseworkType: "Ee",
    title: "Extended Essay on Mathematics",
    subject: "Maths",
    file: "/example.pdf",
    topic: "Advanced Calculus",
    totalWords: 4000,
    totalTimeReading: 30,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 6,
      evaluationDate: "2023-04-15",
    },
  },
  {
    id: "2",
    courseworkType: "Ee",
    title: "Extended Essay on Literature",
    subject: "English Literature",
    file: "/example.pdf",
    topic: "Modernism in Literature",
    totalWords: 3900,
    totalTimeReading: 28,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 7,
      evaluationDate: "2023-05-10",
    },
  },
  {
    id: "3",
    courseworkType: "Ee",
    title: "Extended Essay on History",
    subject: "History",
    file: "/example.pdf",
    topic: "World War II Strategies",
    totalWords: 4200,
    totalTimeReading: 35,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 5,
      evaluationDate: "2023-06-01",
    },
  },
  {
    id: "4",
    courseworkType: "Ee",
    title: "Extended Essay on Biology",
    subject: "Biology",
    file: "/example.pdf",
    topic: "Genetic Engineering",
    totalWords: 4100,
    totalTimeReading: 32,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 6,
      evaluationDate: "2023-06-15",
    },
  },
  {
    id: "5",
    courseworkType: "TokE",
    title: "Theory of Knowledge Essay on Ethics",
    subject: "Philosophy",
    file: "/example.pdf",
    topic: "Ethics and Technology",
    totalWords: 1600,
    totalTimeReading: 12,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 5,
      evaluationDate: "2023-03-20",
    },
  },
  {
    id: "6",
    courseworkType: "TokE",
    title: "Theory of Knowledge Essay on Science",
    subject: "Science",
    file: "/example.pdf",
    topic: "Scientific Paradigms",
    totalWords: 1500,
    totalTimeReading: 10,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 6,
      evaluationDate: "2023-04-05",
    },
  },
  {
    id: "7",
    courseworkType: "TokE",
    title: "Theory of Knowledge Essay on Art",
    subject: "Art",
    file: "/example.pdf",
    topic: "Art Interpretation",
    totalWords: 1550,
    totalTimeReading: 11,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 7,
      evaluationDate: "2023-04-25",
    },
  },
  {
    id: "8",
    courseworkType: "TokE",
    title: "Theory of Knowledge Essay on History",
    subject: "History",
    file: "/example.pdf",
    topic: "Bias in Historical Narratives",
    totalWords: 1580,
    totalTimeReading: 12,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 6,
      evaluationDate: "2023-05-02",
    },
  },
  {
    id: "9",
    courseworkType: "Ia",
    title: "Internal Assessment on Chemistry",
    subject: "Chemistry",
    file: "/example.pdf",
    topic: "Reaction Rates",
    totalWords: 1500,
    totalTimeReading: 10,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 5,
      evaluationDate: "2023-02-10",
    },
  },
  {
    id: "10",
    courseworkType: "Ia",
    title: "Internal Assessment on Economics",
    subject: "Economics",
    file: "/example.pdf",
    topic: "Market Structures",
    totalWords: 1400,
    totalTimeReading: 9,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 6,
      evaluationDate: "2023-02-15",
    },
  },
  {
    id: "11",
    courseworkType: "Ia",
    title: "Internal Assessment on Physics",
    subject: "Physics",
    file: "/example.pdf",
    topic: "Projectile Motion",
    totalWords: 1450,
    totalTimeReading: 10,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 7,
      evaluationDate: "2023-02-20",
    },
  },
  {
    id: "12",
    courseworkType: "Ia",
    title: "Internal Assessment on Geography",
    subject: "Geography",
    file: "/example.pdf",
    topic: "Urbanization",
    totalWords: 1480,
    totalTimeReading: 10,
    language: "English",
    evaluation: {
      maxScore: 7,
      totalScore: 5,
      evaluationDate: "2023-03-01",
    },
  },
];
export const evaluation: {
  sections: EvaluationSection[];
} = {
  sections: [
    {
      title: "Criteria A",
      name: "Understanding Knowledge Questions",
      description:
        "The student should be able to create a PDF viewer component that can display a PDF file.",
      strengths: [
        "The student has created a PDF viewer component that can display a PDF file.",
        "The student has used the react-pdf library to display the PDF file.",
        "The student has implemented a toolbar with buttons to zoom in, zoom out, and expand the PDF viewer.",
      ],
      improvements: [
        "The student should add a button to collapse the PDF viewer.",
        "The student should add a button to navigate to the next page of the PDF file.",
        "The student should add a button to navigate to the previous page of the PDF file.",
      ],
      score: 5,
      total: 5,
    },
    {
      title: "Criteria B",
      name: "pdfRef",
      description:
        "The student should be able to create a PDF viewer component that can display a PDF file.",
      strengths: [
        "The student has created a PDF viewer component that can display a PDF file.",
        "The student has used the react-pdf library to display the PDF file.",
        "The student has implemented a toolbar with buttons to zoom in, zoom out, and expand the PDF viewer.",
      ],
      improvements: [
        "The student should add a button to collapse the PDF viewer.",
        "The student should add a button to navigate to the next page of the PDF file.",
        "The student should add a button to navigate to the previous page of the PDF file.",
      ],
      score: 3,
      total: 5,
    },
  ],
};
