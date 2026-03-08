import React from 'react';
import { TaskData } from '../types';
import AudioInput from './AudioInput';

interface Props {
  task: TaskData | null;
  onAnswer: (text: string) => void;
  isProcessing: boolean;
}

const CenterCanvas: React.FC<Props> = ({ task, onAnswer, isProcessing }) => {
  
  const handlePlayChunk = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop previous
      // Clean text: remove || and markers if necessary, though TTS handles punctuation ok.
      // Removing CAPS might help flow for some engines, but usually ok.
      const cleanText = text.replace(/\|\|/g, '. '); 
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for B1 clarity
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-y-auto">
      {/* Task Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-brand-500"></div>
        {task ? (
          <div className="animate-fade-in">
             <div className="flex justify-between items-start mb-4">
                <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold tracking-wide uppercase rounded-full">
                    {task.shadowingData ? 'Shadowing Practice' : 'Current Task'}
                </span>
                <div className="flex items-center text-slate-400 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Target: {task.shadowingData ? '3-5 mins' : '1-2 mins'}
                </div>
             </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 leading-tight">
              {task.title}
            </h1>

            {task.context && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg border-l-4 border-accent-400 text-slate-600 italic text-sm">
                    "{task.context}"
                </div>
            )}
            
            {/* Specific Shadowing UI */}
            {task.shadowingData ? (
              <div className="space-y-6">
                 <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                    <h3 className="text-sm font-bold text-indigo-800 uppercase mb-3">Full Script (B1 Level)</h3>
                    <p className="text-lg text-indigo-900 leading-relaxed font-serif">
                      {task.shadowingData.script}
                    </p>
                 </div>

                 <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase mb-3">Practice Chunks (Listen & Repeat)</h3>
                    <div className="space-y-3">
                      {task.shadowingData.chunks.map((chunk, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md transition-all">
                           <button 
                             onClick={() => handlePlayChunk(chunk.text)}
                             className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-100 text-brand-600 hover:bg-brand-200 mb-2 sm:mb-0 sm:mr-4 flex-shrink-0"
                             title="Play Audio"
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                              </svg>
                           </button>
                           <div className="flex-1">
                              <p className="text-lg text-slate-800 font-medium">
                                {chunk.text.split(' ').map((word, i) => {
                                  const isStress = word === word.toUpperCase() && word.length > 1;
                                  return (
                                    <span key={i} className={isStress ? "text-brand-700 font-bold" : ""}>
                                      {word} {" "}
                                    </span>
                                  )
                                })}
                              </p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Pace: {chunk.pace}</span>
                                {chunk.text.includes('||') && <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">|| = Pause</span>}
                              </div>
                           </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 <div className="mt-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {task.shadowingData.keywords.map((kw, i) => (
                        <span key={i} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm text-slate-600 shadow-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                 </div>
              </div>
            ) : (
              /* Standard Task UI */
              <div className="space-y-4 mb-6">
                  <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-1">Hướng dẫn (VN)</h3>
                      <p className="text-slate-700">{task.instructionsVN}</p>
                  </div>
                  <div>
                      <h3 className="text-sm font-bold text-slate-400 uppercase mb-1">Instructions (EN)</h3>
                      <ul className="list-disc pl-5 space-y-1 text-slate-700">
                          {task.instructionsEN.map((inst, idx) => (
                              <li key={idx}>{inst}</li>
                          ))}
                      </ul>
                  </div>
              </div>
            )}

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center opacity-50">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
            </div>
            <p className="text-lg font-medium text-slate-800">Ready to practice?</p>
            <p className="text-slate-500">Select a topic and click "Tạo nhiệm vụ mới".</p>
          </div>
        )}
      </div>

      {/* Interaction Area */}
      {task && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 text-brand-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
                {task.shadowingData ? 'Record Your Shadowing' : 'Your Response'}
            </h3>
            <AudioInput onTranscribe={onAnswer} isProcessing={isProcessing} />
            
            <div className="mt-auto pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                * Audio is processed locally by your browser. Analysis is powered by Gemini 2.5.
            </div>
        </div>
      )}
    </div>
  );
};

export default CenterCanvas;