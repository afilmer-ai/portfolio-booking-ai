import React from 'react';

export default function CaseStudy() {
  return (
    <section className="bg-[#0D0D0D] py-24 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Narrative Section */}
        <div className="flex-1">
          <h2 className="text-[#4ADE80] text-sm font-mono tracking-widest mb-4 uppercase">
            // Case Study 01
          </h2>
          <h3 className="text-white text-4xl font-bold mb-6 leading-tight">
            Autonomous Lead <span className="text-[#4ADE80]">Orchestration</span>
          </h3>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            We built a zero-latency engine for Bookin-AI that identifies "AIOps" intent and triggers personalized responses in under 60 seconds. This architecture replaces manual triage with high-velocity conversion logic.
          </p>
          <div className="border-l-2 border-[#4ADE80] pl-6 py-2">
            <span className="text-white font-bold block">Result:</span>
            <span className="text-gray-400 italic">100% lead coverage with zero manual intervention.</span>
          </div>
        </div>

        {/* Visual Section */}
        <div className="flex-1 border border-[#4ADE80]/20 rounded-2xl bg-[#111111] p-4 shadow-[0_0_30px_rgba(74,222,128,0.1)]">
          <img 
            src="/public/bookin_ai_final_workflow.png" 
            alt="AI Workflow Diagram" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}