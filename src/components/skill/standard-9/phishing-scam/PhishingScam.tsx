import { Shield, ShieldAlert, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { VideoSection } from "./VideoSection";
import { ReflectionSection } from "./ReflectionSection";
import { KeyTakeaways } from "./KeyTakeaways";
import { QuizSection } from "./QuizSection";

export function PhishingScam({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (
      formData.reflection &&
      formData.isQuizCorrect &&
      formData.selectedAnswer &&
      formData.aiResponse
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
    console.log("PhishingScam component mounted", formData);
  }, [formData]);
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Recognizing a Phishing Scam</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <ShieldAlert className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">
            Online Safety Module
          </h2>
          <p className="text-sm text-gray-600">
            Learn to identify and protect against phishing scams
          </p>
        </div>
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
            <p className="text-gray-700 leading-relaxed">
              Phishing scams are one of the most common online threats, using
              fake messages to trick people into giving away personal
              information or money. In this activity, you'll watch a video that
              demonstrates a phishing scenario and learn how to spot the warning
              signs. You'll also reflect on how you can share this knowledge
              with others in a supportive way.
            </p>
          </div>
        </section>
        <VideoSection />
        <ReflectionSection formData={formData} setFormData={setFormData} />
        <KeyTakeaways />
        <QuizSection formData={formData} setFormData={setFormData} />
        <footer className="mt-8">
          <p className="italic text-gray-600">
            Online safety starts with awareness. Share what you've learned to
            help others stay safe!
          </p>
        </footer>
      </main>
    </div>
  );
}

export default PhishingScam;
