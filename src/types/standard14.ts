export type ScaffoldingLevel = 'clean' | 'guided' | 'complete';
export type HintVisibility = 'hidden' | 'visible' | 'conditional';
export type AssessmentStatus = 'draft' | 'submitted' | 'graded' | 'returned';

export interface PersonalReflection {
    pastExperiences: string;
    impactReflection: string;
    causes: string[];
    preferredWays: string[];
    futureGoals: string;
    values: string;
    idealImpact: string;
}

export interface OrganizationComparison {
    fliMetrics: {
        programExpenseRatio: number;
        costPerStudent: number;
        costPerHour: number;
    };
    cefMetrics: {
        programExpenseRatio: number;
        costPerStudent: number;
        costPerHour: number;
    };
    effectivenessAnalysis: string;
}

export interface GivingPlan {
    monthlyAllocation: {
        amount: number;
        percentage: number;
        taxImpact: number;
    };
    yearEndGiving: {
        amount: number;
        percentage: number;
        taxImpact: number;
    };
    strategy: string;
}

export interface ImpactAnalysis {
    quantitative: {
        year1: {
            studentsImpacted: number;
            economicBenefit: number;
            volunteerHours: number;
        };
        year2: {
            studentsImpacted: number;
            economicBenefit: number;
            volunteerHours: number;
        };
        year3: {
            studentsImpacted: number;
            economicBenefit: number;
            volunteerHours: number;
        };
    };
    longTermImpact: string;
}

export interface Standard14Assessment {
    id: string;
    studentId: string;
    teacherId?: string;
    status: AssessmentStatus;
    createdAt: string;
    updatedAt: string;
    submittedAt?: string;
    gradedAt?: string;
    score?: number;
    feedback?: string;
    personalReflection: PersonalReflection;
    organizationComparison: OrganizationComparison;
    givingPlan: GivingPlan;
    impactAnalysis: ImpactAnalysis;
}

export interface TeacherConfig {
    id: string;
    teacherId: string;
    classId: string;
    studentId?: string;
    scaffoldingLevel: ScaffoldingLevel;
    hintsEnabled: boolean;
    sampleAnswersEnabled: boolean;
    highContrastEnabled: boolean;
    textSizeMultiplier: number;
    createdAt: string;
    updatedAt: string;
}

export interface Hint {
    id: string;
    teacherId: string;
    sectionId: string;
    hintText: string;
    visibility: HintVisibility;
    createdAt: string;
    updatedAt: string;
}

export interface SampleAnswer {
    id: string;
    teacherId: string;
    sectionId: string;
    answerText: string;
    visibility: HintVisibility;
    createdAt: string;
    updatedAt: string;
}

export interface Progress {
    id: string;
    assessmentId: string;
    sectionId: string;
    status: string;
    timeSpent: number;
    lastInteraction: string;
    createdAt: string;
    updatedAt: string;
}

export interface Version {
    id: string;
    assessmentId: string;
    versionNumber: number;
    content: Record<string, any>;
    createdAt: string;
}

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string;
        fill?: boolean;
    }[];
}

export interface ChartOptions {
    responsive: boolean;
    plugins?: {
        legend?: {
            position?: string;
            display?: boolean;
        };
        title?: {
            display: boolean;
            text: string;
        };
    };
    scales?: {
        y?: {
            beginAtZero: boolean;
            title?: {
                display: boolean;
                text: string;
            };
        };
        r?: {
            beginAtZero: boolean;
            max: number;
        };
    };
} 