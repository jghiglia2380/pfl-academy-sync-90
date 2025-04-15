export function SmartGoalsIntro() {
  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-lg prose prose-blue max-w-none">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Understanding SMART Goals</h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        SMART goals help you create clear, achievable objectives by making them Specific, 
        Measurable, Achievable, Relevant, and Timebound. This framework transforms vague intentions 
        into concrete plans.
      </p>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Example SMART Goal:</h4>
        <p className="text-gray-700">
          "I will improve my math grade from a C to a B+ by studying with a tutor for two hours 
          every Tuesday and Thursday. This is achievable because I have already arranged sessions 
          with my school's free tutoring service. This goal is relevant as a higher math grade 
          will strengthen my college applications. I will accomplish this by the end of the current 
          semester in December 2024."
        </p>
      </div>
    </div>
  );
}