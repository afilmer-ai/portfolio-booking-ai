'use client';
import { useState, useEffect } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([
    { role: 'assistant', content: 'Hi! I’m the Bookin-AI bot. How can I help you automate your revenue today?' }
  ]);

  // --- AUTOMATION INTEGRATION ---
  const pushToAutomation = async (userEmail: string) => {
    // PASTE YOUR URL BELOW FROM ACTIVEPIECES
    const webhookUrl = 'https://cloud.activepieces.com/api/v1/webhooks/28FKvgk3x0OIBJnD1O104'; 

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          transcript: messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n'),
          source: "Bookin-AI Concierge",
          timestamp: new Date().toISOString()
        }),
      });
      console.log("Lead pushed to HQ! 🚀");
    } catch (error) {
      console.error("Automation error:", error);
    }
  };

  // Show the text bubble after a 2-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Check if the user is providing an email to trigger automation
    const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      pushToAutomation(emailMatch[0]);
    }
    
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userMsg] }),
    });
    const botMsg = await res.json();
    setMessages((prev) => [...prev, botMsg]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Text Bubble (Tooltip) */}
      {showTooltip && !isOpen && (
        <div className="mb-4 mr-2 bg-[#1F2937] border border-[#4ADE80] text-white p-3 rounded-2xl rounded-br-none shadow-[0_0_15px_rgba(74,222,128,0.3)] animate-bounce-slow max-w-[220px] relative">
          <p className="text-xs font-medium leading-tight">
            Want to see how we automate <span className="text-[#4ADE80]">Speed-to-Lead?</span> Ask me anything! 🤖
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            className="absolute -top-2 -right-2 bg-gray-800 border border-gray-600 rounded-full w-5 h-5 text-[10px] flex items-center justify-center hover:bg-gray-700 text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* The Main Bot Toggle Button */}
      <button 
        onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
        className="bg-[#0D0D0D] border-2 border-[#4ADE80] p-4 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:scale-110 active:scale-95 transition-all group"
      >
        <span className="text-2xl group-hover:rotate-12 transition-transform inline-block">🤖</span>
      </button>

      {/* The Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 h-96 bg-[#1F2937] border border-[#4ADE80] rounded-xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-3 bg-[#0D0D0D] text-[#4ADE80] font-bold border-b border-[#4ADE80] flex justify-between items-center">
            <span>Bookin-AI Concierge</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">✕</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-[#4ADE80] text-black font-medium' : 'bg-gray-800 text-white border border-gray-700'}`}>
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700 bg-gray-900 flex">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-black text-white p-2 rounded-l-md outline-none text-xs border border-gray-800 focus:border-[#4ADE80]" 
              placeholder="Ask about the Authority Stack..."
            />
            <button 
              onClick={sendMessage} 
              className="bg-[#4ADE80] px-3 rounded-r-md text-black font-bold hover:bg-green-400 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}