import React from 'react';
import { Topic, Level, TaskType } from '../types';
import { UI_TEXT, TOPIC_MAP_VN } from '../constants';

interface Props {
  selectedTopic: Topic;
  setTopic: (t: Topic) => void;
  selectedLevel: Level;
  setLevel: (l: Level) => void;
  selectedTask: TaskType;
  setTask: (t: TaskType) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const LeftPanel: React.FC<Props> = ({
  selectedTopic,
  setTopic,
  selectedLevel,
  setLevel,
  selectedTask,
  setTask,
  onGenerate,
  isGenerating
}) => {
  return (
    <div className="h-full flex flex-col bg-white border-r border-slate-200 shadow-sm">
      {/* Scrollable Settings Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="bg-brand-100 text-brand-600 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
          </span>
          {UI_TEXT.leftPanel.title}
        </h2>

        {/* Topic Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {UI_TEXT.leftPanel.topicLabel}
          </label>
          <div className="space-y-2">
            {Object.values(Topic).map((topic) => (
              <label key={topic} className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all ${selectedTopic === topic ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="radio"
                  name="topic"
                  value={topic}
                  checked={selectedTopic === topic}
                  onChange={() => setTopic(topic)}
                  className="h-4 w-4 text-brand-600 border-slate-300 focus:ring-brand-500"
                />
                <span className="ml-3 text-sm font-medium text-slate-700">{TOPIC_MAP_VN[topic]}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Level Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {UI_TEXT.leftPanel.levelLabel}
          </label>
          <select
            value={selectedLevel}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="w-full p-3 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
          >
            <option value={Level.A2_B1}>A2 → B1 Transition</option>
            <option value={Level.B1_SOLID}>B1 Solid (Target)</option>
          </select>
        </div>

        {/* Task Selector */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {UI_TEXT.leftPanel.taskLabel}
          </label>
          <div className="space-y-2">
            {Object.values(TaskType).map((task) => (
              <label key={task} className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all ${selectedTask === task ? 'bg-brand-50 border-brand-500' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input
                  type="radio"
                  name="task"
                  value={task}
                  checked={selectedTask === task}
                  onChange={() => setTask(task)}
                  className="h-4 w-4 text-brand-600 border-slate-300 focus:ring-brand-500"
                />
                <span className="ml-3 text-sm text-slate-700">{task}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="p-6 border-t border-slate-200 bg-white z-10">
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-brand-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isGenerating ? (
              <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang tạo...
              </>
          ) : UI_TEXT.leftPanel.buttons.newTasks}
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;