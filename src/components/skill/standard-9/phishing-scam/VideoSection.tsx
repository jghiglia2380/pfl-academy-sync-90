import { BookOpen } from 'lucide-react';

export function VideoSection() {
  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Watch the Scenario</h2>
      <div className="bg-gray-100 rounded-lg mb-4 w-full h-96">
        <iframe
          className="w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/XIe27xh_N0A"
          title="Understanding Phishing Scams"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="mt-4 flex items-start space-x-3">
        <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
        <p className="text-gray-600">
          Watch this short video to see how Sarah and her friend discuss a suspicious email 
          offering a free trip to Hawaii. Pay attention to the red flags they identify and 
          the tips they share for staying safe online.
        </p>
      </div>
    </section>
  );
}