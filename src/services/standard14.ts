import { supabase } from './supabase';
import {
    Standard14Assessment,
    TeacherConfig,
    Hint,
    SampleAnswer,
    Progress,
    Version,
    AssessmentStatus
} from '../types/standard14';

export const standard14Service = {
    // Assessment CRUD operations
    async createAssessment(studentId: string): Promise<Standard14Assessment> {
        const { data, error } = await supabase
            .from('standard14_assessments')
            .insert({
                studentId,
                status: 'draft',
                personalReflection: {
                    pastExperiences: '',
                    impactReflection: '',
                    causes: [],
                    preferredWays: [],
                    futureGoals: '',
                    values: '',
                    idealImpact: ''
                },
                organizationComparison: {
                    fliMetrics: {
                        programExpenseRatio: 0,
                        costPerStudent: 0,
                        costPerHour: 0
                    },
                    cefMetrics: {
                        programExpenseRatio: 0,
                        costPerStudent: 0,
                        costPerHour: 0
                    },
                    effectivenessAnalysis: ''
                },
                givingPlan: {
                    monthlyAllocation: {
                        amount: 0,
                        percentage: 0,
                        taxImpact: 0
                    },
                    yearEndGiving: {
                        amount: 0,
                        percentage: 0,
                        taxImpact: 0
                    },
                    strategy: ''
                },
                impactAnalysis: {
                    quantitative: {
                        year1: {
                            studentsImpacted: 0,
                            economicBenefit: 0,
                            volunteerHours: 0
                        },
                        year2: {
                            studentsImpacted: 0,
                            economicBenefit: 0,
                            volunteerHours: 0
                        },
                        year3: {
                            studentsImpacted: 0,
                            economicBenefit: 0,
                            volunteerHours: 0
                        }
                    },
                    longTermImpact: ''
                }
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getAssessment(id: string): Promise<Standard14Assessment> {
        const { data, error } = await supabase
            .from('standard14_assessments')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async updateAssessment(id: string, updates: Partial<Standard14Assessment>): Promise<Standard14Assessment> {
        const { data, error } = await supabase
            .from('standard14_assessments')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async submitAssessment(id: string): Promise<Standard14Assessment> {
        const { data, error } = await supabase
            .from('standard14_assessments')
            .update({
                status: 'submitted',
                submittedAt: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Teacher configuration
    async getTeacherConfig(teacherId: string, classId: string, studentId?: string): Promise<TeacherConfig> {
        const query = supabase
            .from('standard14_teacher_config')
            .select('*')
            .eq('teacherId', teacherId)
            .eq('classId', classId);

        if (studentId) {
            query.eq('studentId', studentId);
        }

        const { data, error } = await query.single();

        if (error) throw error;
        return data;
    },

    async updateTeacherConfig(id: string, updates: Partial<TeacherConfig>): Promise<TeacherConfig> {
        const { data, error } = await supabase
            .from('standard14_teacher_config')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Hints and sample answers
    async getHints(teacherId: string, sectionId: string): Promise<Hint[]> {
        const { data, error } = await supabase
            .from('standard14_hints')
            .select('*')
            .eq('teacherId', teacherId)
            .eq('sectionId', sectionId);

        if (error) throw error;
        return data;
    },

    async getSampleAnswers(teacherId: string, sectionId: string): Promise<SampleAnswer[]> {
        const { data, error } = await supabase
            .from('standard14_sample_answers')
            .select('*')
            .eq('teacherId', teacherId)
            .eq('sectionId', sectionId);

        if (error) throw error;
        return data;
    },

    // Progress tracking
    async getProgress(assessmentId: string): Promise<Progress[]> {
        const { data, error } = await supabase
            .from('standard14_progress')
            .select('*')
            .eq('assessmentId', assessmentId);

        if (error) throw error;
        return data;
    },

    async updateProgress(progress: Partial<Progress>): Promise<Progress> {
        const { data, error } = await supabase
            .from('standard14_progress')
            .upsert(progress)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Version history
    async getVersions(assessmentId: string): Promise<Version[]> {
        const { data, error } = await supabase
            .from('standard14_versions')
            .select('*')
            .eq('assessmentId', assessmentId)
            .order('versionNumber', { ascending: false });

        if (error) throw error;
        return data;
    },

    async createVersion(assessmentId: string, content: Record<string, any>): Promise<Version> {
        const { data: latestVersion } = await supabase
            .from('standard14_versions')
            .select('versionNumber')
            .eq('assessmentId', assessmentId)
            .order('versionNumber', { ascending: false })
            .limit(1)
            .single();

        const versionNumber = (latestVersion?.versionNumber || 0) + 1;

        const { data, error } = await supabase
            .from('standard14_versions')
            .insert({
                assessmentId,
                versionNumber,
                content
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // Auto-save functionality
    async autoSave(assessmentId: string, content: Partial<Standard14Assessment>): Promise<void> {
        await this.updateAssessment(assessmentId, content);
        await this.createVersion(assessmentId, content);
    }
}; 