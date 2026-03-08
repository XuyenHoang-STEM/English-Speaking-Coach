import React, { useState } from 'react';
import { FeedbackData, VocabItem, HistoryItem } from '../types';
import { UI_TEXT } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  feedback: FeedbackData | null;
  vocabList: VocabItem[];
  history: HistoryItem[];
  rapidQuestions: string[];
}

const RightPanel: React.FC<Props> = ({ feedback, vocabList, history, rapidQuestions }) => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'vocab' | 'rapid' | 'history'>('vocab');

  const tabs = [
    { id: 'feedback', label: UI_TEXT.rightPanel.tabs.feedback, icon: '📝' },
    { id: 'vocab', label: UI_TEXT.rightPanel.tabs.vocab, icon: '📚' },
    { id: 'rapid', label: UI_TEXT.rightPanel.tabs.rapid, icon: '⚡' },
    { id: 'history', label: UI_TEXT.rightPanel.tabs.history, icon: '📊' },
  ] as const;

  return (
    <div className="h-full flex flex-col bg-white border-l border-slate-200 shadow-sm">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-brand-500 text-brand-600 bg-brand-50'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="mr-1">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* FEEDBACK TAB */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            {!feedback ? (
              <div className="text-center text-slate-400 py-10">
                Hoàn thành một bài nói để nhận phản hồi từ AI Coach.
              </div>
            ) : (
              <>
                {/* Mistakes */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h3 className="font-bold text-red-800 mb-3 flex items-center">
                    ⚠️ {feedback.intonationTips ? "Points to Improve" : "Những điểm cần cải thiện"}
                  </h3>
                  <ul className="space-y-3">
                    {feedback.mistakes.map((m, idx) => (
                      <li key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="text-red-500 line-through text-sm mb-1">{m.original}</div>
                        <div className="text-green-600 font-medium">{m.correction}</div>
                        <div className="text-slate-500 text-xs mt-1 italic">{m.explanation}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Intonation Tips (Shadowing Specific) */}
                {feedback.intonationTips && feedback.intonationTips.length > 0 && (
                   <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                          🎵 Intonation & Flow
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                          {feedback.intonationTips.map((tip, idx) => (
                              <li key={idx} className="text-sm">{tip}</li>
                          ))}
                      </ul>
                   </div>
                )}

                {/* Improved Version */}
                <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <h3 className="font-bold text-brand-800 mb-3 flex items-center">
                        ✨ {feedback.intonationTips ? "Focus Section" : "B1 Polished Version"}
                    </h3>
                    <p className="text-slate-700 italic mb-3">"{feedback.improvedVersion}"</p>
                    <div className="text-xs text-brand-700 bg-brand-100 p-2 rounded">
                        <strong>Why?</strong> {feedback.whyBetter}
                    </div>
                </div>

                {/* Questions */}
                <div>
                    <h3 className="font-bold text-slate-800 mb-2">💬 {feedback.intonationTips ? "Practice Challenges" : "Deeper Follow-up Questions"}</h3>
                    <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        {feedback.followUpQuestions.map((q, idx) => (
                            <li key={idx} className="text-sm">{q}</li>
                        ))}
                    </ul>
                </div>
                
                {/* Pronunciation */}
                 <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <h3 className="font-bold text-purple-800 mb-3 flex items-center">
                    🗣️ Pronunciation Tips
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {feedback.pronunciation.map((p, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                        <span className="font-semibold text-purple-700">{p.word}</span>
                        <span className="text-xs text-slate-500">{p.tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* VOCAB TAB */}
        {activeTab === 'vocab' && (
          <div className="space-y-4">
            {vocabList.length === 0 ? (
                 <div className="text-center text-slate-400 py-10">
                    Chọn chủ đề và tạo nhiệm vụ để lấy từ vựng.
                  </div>
            ) : (
                vocabList.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-brand-600 text-lg">{item.word}</h4>
                    </div>
                    <p className="text-sm text-slate-500 italic mb-2">{item.vnMeaning}</p>
                    <p className="text-xs bg-slate-100 p-2 rounded text-slate-700">
                    📖 {item.example}
                    </p>
                </div>
                ))
            )}
          </div>
        )}

        {/* RAPID FIRE TAB */}
        {activeTab === 'rapid' && (
          <div className="space-y-4">
             <div className="bg-accent-50 p-4 rounded-lg border border-accent-100 mb-4">
                <h3 className="font-bold text-accent-800 text-sm">⚡ Luyện phản xạ nhanh</h3>
                <p className="text-xs text-accent-700 mt-1">Answer these questions in 10 seconds or less!</p>
             </div>
             <ul className="space-y-3">
                {rapidQuestions.length > 0 ? rapidQuestions.map((q, idx) => (
                    <li key={idx} className="bg-white border border-slate-200 p-3 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                        {idx + 1}. {q}
                    </li>
                )) : (
                    <div className="text-center text-slate-400">No questions generated yet.</div>
                )}
             </ul>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-6">
             <div className="h-48 w-full bg-white p-2 rounded-lg border border-slate-100 shadow-inner">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={history}>
                        <XAxis dataKey="date" tick={{fontSize: 10}} tickFormatter={(d) => new Date(d).toLocaleDateString()} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Complexity" />
                    </BarChart>
                 </ResponsiveContainer>
             </div>
             
             <div className="space-y-2">
                {history.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <div>
                            <div className="font-medium text-sm text-slate-800">{item.task.substring(0, 25)}...</div>
                            <div className="text-xs text-slate-400">{new Date(item.date).toLocaleTimeString()}</div>
                        </div>
                        <div className="bg-brand-100 text-brand-700 px-2 py-1 rounded text-xs font-bold">
                            Score: {item.score}
                        </div>
                    </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightPanel;