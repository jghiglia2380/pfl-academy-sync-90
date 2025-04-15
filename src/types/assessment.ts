export interface StandardType {
    id: number;
    title: string;
}

export interface QuestionType {
    type: string;
    count: number;
    timeEstimate: {
        min: number;
        max: number;
    };
}

export interface Midterm {
    id: number;
    title: string;
    timeLimit: number;
    standards: StandardType[];
    questionTypes: QuestionType[];
    difficulty: string;
    dateCreated: Date;
}

export interface Final {
    id: number;
    title: string;
    timeLimit: number;
    standards: StandardType[];
    questionTypes: QuestionType[];
    difficulty: string;
    dateCreated: Date;
    comprehensiveReview: boolean;
    practicalApplication: boolean;
}

export interface Quiz {
    id: number;
    title: string;
    timeLimit: number;
    standards: StandardType[];
    questions: {
        id: number;
        type: string;
        text: string;
        options?: string[];
        correctAnswer?: string | number;
    }[];
    difficulty: string;
    version: number;
    isRandomized: boolean;
    questionsToShow?: number;
    questionPoolSize?: number;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    standards: StandardType[];
    requirements: string[];
    rubric: {
        criteria: string;
        points: number;
        description: string;
    }[];
    timeframe: {
        weeks: number;
        hoursPerWeek: number;
    };
    difficulty: string;
    groupSize?: number;
} 