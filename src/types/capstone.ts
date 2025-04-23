export interface CapstoneProject {
  id: string;
  standard: number;
  title: string;
  description: string;
  learningObjectives: string[];
  deliverables: Deliverable[];
  rubric: Rubric;
  timeframe: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: Resource[];
  submissionGuidelines: string;
}

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  format: string;
  requirements: string[];
  weight: number;
}

export interface Rubric {
  criteria: RubricCriterion[];
  totalPoints: number;
}

export interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  points: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  score: number;
  description: string;
  criteria: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'template' | 'tool';
  url: string;
  description: string;
} 