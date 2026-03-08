import React, { useState, useEffect } from 'react';
import LeftPanel from './components/LeftPanel';
import CenterCanvas from './components/CenterCanvas';
import RightPanel from './components/RightPanel';
import { Topic, Level, TaskType, TaskData, FeedbackData, VocabItem, HistoryItem } from './types';
import { generateSpeakingTask, evaluateResponse, extractVocabulary, generateRapidFireQuestions } from './services/geminiService';
import { UI_TEXT } from './constants';

function App() {
  // Settings State
  const [topic, setTopic] = useState<Topic>(Topic.COLLABORATION);
  const [level, setLevel] = useState<Level>(Level.A2_B1);
  const [taskType, setTaskType] = useState<TaskType>(TaskType.MINI_SPEAKING);

  // Task State
  const [currentTask, setCurrentTask] = useState<TaskData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Feedback State
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);
  
  // Aux Data State
  const [vocabList, setVocabList] = useState<VocabItem[]>([]);
  const [rapidQuestions, setRapidQuestions] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Initialize Vocabulary when topic changes
  useEffect(() => {
    const fetchVocab = async () => {
      const vocab = await extractVocabulary(topic);
      setVocabList(vocab);
      const rapid = await generateRapidFireQuestions(topic);
      setRapidQuestions(rapid);
    };
    fetchVocab();
  }, [topic]);

  const handleGenerateTask = async () => {
    setIsGenerating(true);
    setFeedback(null); // Clear previous feedback
    try {
      const task = await generateSpeakingTask(topic, level, taskType);
      setCurrentTask(task);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSubmit = async (answerText: string) => {
    if (!currentTask) return;
    setIsProcessingAnswer(true);
    
    try {
      // If shadowing, the taskContext is the script itself, otherwise the task title/context
      const taskContext = currentTask.shadowingData 
        ? currentTask.shadowingData.script 
        : currentTask.title;

      const result = await evaluateResponse(taskContext, answerText, level, taskType);
      setFeedback(result);
      
      // Add to history
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        date: new Date(),
        task: currentTask.title,
        duration: answerText.length / 15, // rough estimate
        score: Math.min(100, Math.max(50, 100 - (result.mistakes.length * 10))), // Simple dummy scoring logic
        improvement: 10
      };
      setHistory(prev => [newItem, ...prev]);
      
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessingAnswer(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
        <div>
          <h1 className="text-xl font-bold text-brand-700 tracking-tight">{UI_TEXT.header.title}</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{UI_TEXT.header.subtitle}</p>
        </div>
        <div className="hidden md:block text-sm text-slate-400 italic">
           {UI_TEXT.header.subtext}
        </div>
        <div className="flex items-center gap-2">
             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">VN / EN</span>
             <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
             </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
        {/* Left Panel (Settings) */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2 h-full">
          <LeftPanel 
            selectedTopic={topic}
            setTopic={setTopic}
            selectedLevel={level}
            setLevel={setLevel}
            selectedTask={taskType}
            setTask={setTaskType}
            onGenerate={handleGenerateTask}
            isGenerating={isGenerating}
          />
        </div>

        {/* Center Canvas (Task & Recording) */}
        <div className="col-span-1 md:col-span-5 lg:col-span-6 h-full relative">
          <CenterCanvas 
            task={currentTask} 
            onAnswer={handleAnswerSubmit}
            isProcessing={isProcessingAnswer}
          />
           {/* Mobile Trigger for Left Panel could go here if implemented */}
        </div>

        {/* Right Panel (Feedback & Aux) */}
        <div className="col-span-1 md:col-span-4 h-full">
          <RightPanel 
            feedback={feedback} 
            vocabList={vocabList} 
            history={history}
            rapidQuestions={rapidQuestions}
          />
        </div>
      </main>
    </div>
  );
}

export default App;