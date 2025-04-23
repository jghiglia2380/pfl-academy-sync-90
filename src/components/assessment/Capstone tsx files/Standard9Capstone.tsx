import React from 'react';
import { useStandard9Form } from '@/hooks/useStandard9Form';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { FeedbackList } from '@/components/assessment/FeedbackList';
import { useForm } from 'react-hook-form';
import { Standard9Submission, CryptoScenario } from '../../types/standard9';
import { Badge } from '../ui/Badge';

interface Props {
  assessmentId?: string;
}

const cryptoScenario: CryptoScenario = {
  post: {
    username: '@CryptoMillionaire',
    timePosted: '10 minutes ago',
    content: '🚀 HUGE OPPORTUNITY! My AI-powered crypto trading bot has been crushing it! 20%+ gains every month like clockwork. Limited spots available - join my exclusive investment group now! Don\'t miss out on the future of finance! 💰',
    engagement: {
      likes: 3200,
      comments: 842,
      shares: 1500
    }
  },
  details: {
    algorithm: 'Proprietary AI algorithm that predicts market movements',
    minimumInvestment: 'Minimum investment: $5,000 in Bitcoin or Ethereum',
    offer: 'Special 48-hour offer: Early investors get bonus tokens',
    userBase: 'Join 10,000+ successful traders in our private group',
    automation: '100% automated - the bot does all the work!'
  }
};

export function Standard9Capstone({ assessmentId }: Props) {
  const {
    form,
    isLoading,
    isSaving,
    isSubmitting,
    assessment,
    saveDraft,
    submitAssessment,
    canSubmit,
    canEdit
  } = useStandard9Form(assessmentId);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<Standard9Submission>();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Standard 9: Consumer Protection & Identity Theft Prevention
          </h1>
          <div className="flex gap-4 mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Time: 45 minutes
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Written Analysis
            </div>
          </div>

          <form onSubmit={handleSubmit(submitAssessment)}>
            {/* Crypto Investment Scenario */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Cryptocurrency Investment Analysis
                  <Badge className="ml-2" variant="outline">Required</Badge>
                </h2>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  {/* Social Media Post */}
                  <div className="social-post mb-4">
                    <div className="post-header">
                      <img src="/profile-placeholder.jpg" className="w-10 h-10 rounded-full mr-3" alt="Profile" />
                      <div>
                        <p className="font-medium">{cryptoScenario.post.username}</p>
                        <p className="text-sm text-gray-500">{cryptoScenario.post.timePosted}</p>
                      </div>
                    </div>
                    <div className="post-content">
                      <p>{cryptoScenario.post.content}</p>
                      <img src="/crypto-chart.jpg" className="post-image mt-2" alt="Cryptocurrency price chart showing upward trend" />
                      <p className="text-sm text-gray-500 mt-2">
                        Likes: {cryptoScenario.post.engagement.likes.toLocaleString()} | 
                        Comments: {cryptoScenario.post.engagement.comments} | 
                        Shares: {cryptoScenario.post.engagement.shares.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div className="mt-4">
                    <p className="mb-3 font-medium">Investment Details from DM:</p>
                    <ul className="space-y-2">
                      {Object.values(cryptoScenario.details).map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>"{detail}"</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Analysis Requirements */}
                <div className="space-y-6">
                  <Textarea
                    label="Red Flags Analysis"
                    {...register('investmentAnalysis.cryptoScenario.redFlagsAnalysis')}
                    error={errors.investmentAnalysis?.cryptoScenario?.redFlagsAnalysis?.message}
                    disabled={!canEdit}
                    rows={4}
                    placeholder="Identify and explain the red flags present in this investment opportunity..."
                  />

                  <Textarea
                    label="Loss Calculation"
                    {...register('investmentAnalysis.cryptoScenario.potentialLosses')}
                    error={errors.investmentAnalysis?.cryptoScenario?.potentialLosses?.message}
                    disabled={!canEdit}
                    rows={4}
                    placeholder="Show your calculations for potential investor losses..."
                  />

                  <Textarea
                    label="Evaluation Framework"
                    {...register('investmentAnalysis.cryptoScenario.evaluationFramework')}
                    error={errors.investmentAnalysis?.cryptoScenario?.evaluationFramework?.message}
                    disabled={!canEdit}
                    rows={4}
                    placeholder="Create a framework for evaluating cryptocurrency investment opportunities..."
                  />
                </div>
              </div>
            </Card>

            {/* Fraud Analysis Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                1. Multi-Channel Fraud Analysis
              </h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Email Analysis</h3>
                <div className="email-preview mb-4">
                  <div className="email-header">
                    <p><strong>From:</strong> SecureBank Security Team &lt;security-alert@secure-bank-verify.net&gt;</p>
                    <p><strong>To:</strong> Valued Customer</p>
                    <p><strong>Subject:</strong> ⚠️ URGENT: Suspicious Activity Detected</p>
                  </div>
                  <div className="email-body">
                    <p>Dear Valued Customer,</p>
                    <p>We have detected unusual activity on your SecureBank account. For your protection, your account access has been temporarily limited.</p>
                    <p><strong>Click here to verify your identity and restore access: [LINK]</strong></p>
                  </div>
                </div>

                <Textarea
                  label="Identify at least 3 red flags in the email"
                  {...register('fraudAnalysis.emailRedFlags')}
                  error={errors.fraudAnalysis?.emailRedFlags?.message}
                  disabled={!canEdit}
                  rows={4}
                />

                <Textarea
                  label="Explain the psychological triggers used"
                  {...register('fraudAnalysis.psychologicalTriggers')}
                  error={errors.fraudAnalysis?.psychologicalTriggers?.message}
                  disabled={!canEdit}
                  rows={4}
                />

                <Textarea
                  label="Outline proper verification steps"
                  {...register('fraudAnalysis.verificationSteps')}
                  error={errors.fraudAnalysis?.verificationSteps?.message}
                  disabled={!canEdit}
                  rows={4}
                />
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
                <h3 className="font-medium text-gray-800 mb-3">Social Media Analysis</h3>
                <div className="social-post mb-4">
                  <div className="post-header">
                    <img src="profile-placeholder.jpg" className="w-10 h-10 rounded-full mr-3" alt="Profile" />
                    <div>
                      <p className="font-medium">@TechSupport_Help</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="post-content">
                    <p>Having account issues? Our support team is here 24/7! DM us your account details and we'll help restore access immediately.</p>
                  </div>
                </div>

                <Textarea
                  label="Identify red flags in the social media post"
                  {...register('fraudAnalysis.socialMediaRedFlags')}
                  error={errors.fraudAnalysis?.socialMediaRedFlags?.message}
                  disabled={!canEdit}
                  rows={4}
                />
              </div>
            </section>

            {/* Investment Fraud Analysis */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                2. Investment Fraud Analysis
              </h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="mb-3">Investment Opportunity Overview:</p>
                  <ul className="space-y-2">
                    <li>• Guaranteed 20% monthly returns</li>
                    <li>• Exclusive cryptocurrency trading algorithm</li>
                    <li>• Limited time offer - only 48 hours to invest</li>
                    <li>• Minimum investment: $5,000</li>
                    <li>• "Already trusted by 10,000+ investors!"</li>
                  </ul>
                </div>

                <Textarea
                  label="Identify characteristics of a Ponzi scheme"
                  {...register('investmentAnalysis.ponziCharacteristics')}
                  error={errors.investmentAnalysis?.ponziCharacteristics?.message}
                  disabled={!canEdit}
                  rows={4}
                />

                <Textarea
                  label="Calculate potential losses"
                  {...register('investmentAnalysis.potentialLosses')}
                  error={errors.investmentAnalysis?.potentialLosses?.message}
                  disabled={!canEdit}
                  rows={4}
                />

                <Textarea
                  label="Create evaluation framework"
                  {...register('investmentAnalysis.evaluationFramework')}
                  error={errors.investmentAnalysis?.evaluationFramework?.message}
                  disabled={!canEdit}
                  rows={4}
                />
              </div>
            </section>

            {/* Identity Theft Prevention & Recovery */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                3. Data Breach Response
              </h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="mb-3">Breach Notification:</p>
                  <p>A major retailer has reported a data breach affecting 100,000 customers. The compromised data includes:</p>
                  <ul className="space-y-2 mt-2">
                    <li>• Full names and addresses</li>
                    <li>• Credit card numbers (last 4 digits only)</li>
                    <li>• Purchase history from the past 6 months</li>
                    <li>• Email addresses and phone numbers</li>
                  </ul>
                </div>

                <Textarea
                  label="Create immediate action checklist"
                  {...register('identityProtection.immediateActions')}
                  error={errors.identityProtection?.immediateActions?.message}
                  disabled={!canEdit}
                  rows={4}
                />

                <Textarea
                  label="Develop 90-day monitoring plan"
                  {...register('identityProtection.monitoringPlan')}
                  error={errors.identityProtection?.monitoringPlan?.message}
                  disabled={!canEdit}
                  rows={4}
                />

                <Textarea
                  label="Design documentation template"
                  {...register('identityProtection.documentationTemplate')}
                  error={errors.identityProtection?.documentationTemplate?.message}
                  disabled={!canEdit}
                  rows={4}
                />
              </div>
            </section>

            {/* Submission Controls */}
            <div className="flex justify-between items-center mt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={saveDraft}
                disabled={isSaving || !canEdit}
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !canSubmit || !canEdit}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
              </Button>
            </div>
          </form>

          {assessment?.feedback && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback</h2>
              <FeedbackList feedback={assessment.feedback} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 