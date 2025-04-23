import { FC, useEffect } from 'react';
import { useStandard15Form } from '@/hooks/useStandard15Form';
import { Standard15Assessment, ScaffoldingLevel } from '@/types/standard15';
import { useAuth } from '@/hooks/useAuth';
import { useScaffolding } from '@/hooks/useScaffolding';
import { DynamicTable } from '@/components/shared/DynamicTable';
import { AssessmentLayout } from '@/components/layout/AssessmentLayout';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Spinner } from '@/components/ui/Spinner';
import { ClientProfile } from './components/ClientProfile';
import { FinancialAnalysis } from './components/FinancialAnalysis';
import { BrandStrategy } from './components/BrandStrategy';
import { CareerProgression } from './components/CareerProgression';

interface Props {
  initialData?: Standard15Assessment;
  isPreview?: boolean;
}

export const Standard15Capstone: FC<Props> = ({ initialData, isPreview }) => {
  const { user } = useAuth();
  const { scaffoldingLevel, teacherConfig } = useScaffolding('standard-15');
  const {
    formState,
    isLoading,
    isSaving,
    error,
    handleSubmit,
    handleSaveDraft,
    handleAddRow,
    handleUpdateField,
    resetForm
  } = useStandard15Form(initialData);

  useEffect(() => {
    if (error) {
      console.error('Form error:', error);
    }
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  const renderScaffoldedContent = (
    section: keyof Standard15Assessment,
    defaultRows: number
  ) => {
    const shouldShowPrefilledContent = scaffoldingLevel !== ScaffoldingLevel.Clean;
    const isFullyScaffolded = scaffoldingLevel === ScaffoldingLevel.Complete;

    return (
      <DynamicTable
        data={formState[section]}
        onAddRow={() => handleAddRow(section)}
        onUpdateField={(rowIndex, field, value) => 
          handleUpdateField(section, rowIndex, field, value)
        }
        showAddButton={!isFullyScaffolded}
        defaultRows={shouldShowPrefilledContent ? defaultRows : 1}
        hints={teacherConfig?.hints?.[section]}
        sampleAnswers={teacherConfig?.sampleAnswers?.[section]}
        isEditable={!isPreview}
      />
    );
  };

  return (
    <AssessmentLayout
      title="Career Development Project"
      standard="Standard 15: Career Development and Professional Growth"
    >
      <div className="space-y-8">
        {error && (
          <Alert variant="error">
            An error occurred: {error.message}
          </Alert>
        )}

        <section>
          <ClientProfile
            scenario="alex"
            scaffoldingLevel={scaffoldingLevel}
            isPreview={isPreview}
          />
          <FinancialAnalysis
            renderTable={renderScaffoldedContent}
            scaffoldingLevel={scaffoldingLevel}
            isPreview={isPreview}
          />
        </section>

        <section>
          <ClientProfile
            scenario="jordan"
            scaffoldingLevel={scaffoldingLevel}
            isPreview={isPreview}
          />
          <BrandStrategy
            renderTable={renderScaffoldedContent}
            scaffoldingLevel={scaffoldingLevel}
            isPreview={isPreview}
          />
        </section>

        <section>
          <ClientProfile
            scenario="taylor"
            scaffoldingLevel={scaffoldingLevel}
            isPreview={isPreview}
          />
          <CareerProgression
            renderTable={renderScaffoldedContent}
            scaffoldingLevel={scaffoldingLevel}
            isPreview={isPreview}
          />
        </section>

        {!isPreview && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Last saved: {formState.lastSaved || 'Never'}
            </div>
            <div className="space-x-4">
              <Button
                variant="secondary"
                onClick={handleSaveDraft}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSaving}
              >
                Submit Assessment
              </Button>
            </div>
          </div>
        )}
      </div>
    </AssessmentLayout>
  );
};

export default Standard15Capstone; 