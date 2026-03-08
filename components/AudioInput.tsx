import React, { useState, useEffect, useRef } from 'react';
import { WindowWithSpeech, SpeechRecognition } from '../types';

interface Props {
  onTranscribe: (text: string) => void;
  isProcessing: boolean;
}

const AudioInput: React.FC<Props> = ({ onTranscribe, isProcessing }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [fallbackText, setFallbackText] = useState('');

  useEffect(() => {
    const win = window as unknown as WindowWithSpeech;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            currentTranscript += event.results[i][0].transcript + ' ';
          } else {
            // Handle interim if needed, mostly just appending final
          }
        }
        setTranscript(prev => prev + currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setHasSpeechSupport(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript(''); // Clear previous session
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSubmit = () => {
    const final = isListening ? transcript : (transcript || fallbackText);
    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
    }
    if (final.trim()) {
      onTranscribe(final);
    }
  };

  return (
    <div className="w-full space-y-4">
      {hasSpeechSupport ? (
        <div className="flex flex-col gap-3">
          <div className={`p-4 rounded-lg border-2 transition-colors min-h-[120px] max-h-[200px] overflow-y-auto ${isListening ? 'border-red-400 bg-red-50 animate-pulse' : 'border-slate-200 bg-white'}`}>
            {transcript || <span className="text-slate-400 italic">Your spoken text will appear here...</span>}
          </div>
          
          <div className="flex gap-3">
             <button
              onClick={toggleListening}
              disabled={isProcessing}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 shadow-[0_4px_0_rgb(185,28,28)] active:translate-y-1 active:shadow-none' 
                  : 'bg-brand-600 hover:bg-brand-700 shadow-[0_4px_0_rgb(3,105,161)] active:translate-y-1 active:shadow-none'
              }`}
            >
              {isListening ? 'Stop Recording' : 'Start Recording (Mic)'}
            </button>

            <button 
                onClick={handleSubmit}
                disabled={(!transcript && !fallbackText) || isProcessing}
                className="flex-1 bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-4 rounded-lg shadow-[0_4px_0_rgb(217,119,6)] active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? 'Analyzing...' : 'Submit Answer'}
            </button>
          </div>
        </div>
      ) : (
        <div>
            <textarea
                value={fallbackText}
                onChange={(e) => setFallbackText(e.target.value)}
                placeholder="Microphone not supported. Type your answer here..."
                className="w-full p-4 border-2 border-slate-200 rounded-lg focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none min-h-[150px]"
            />
             <button 
                onClick={handleSubmit}
                disabled={!fallbackText || isProcessing}
                className="w-full mt-3 bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-4 rounded-lg shadow-[0_4px_0_rgb(217,119,6)] active:translate-y-1 active:shadow-none disabled:opacity-50"
            >
                {isProcessing ? 'Analyzing...' : 'Submit Answer'}
            </button>
        </div>
      )}
      
      {hasSpeechSupport && !isListening && (
        <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Or type your answer if you prefer:</p>
            <textarea
                value={fallbackText}
                onChange={(e) => setFallbackText(e.target.value)}
                placeholder="Type fallback answer..."
                className="w-full p-2 text-sm border border-slate-200 rounded-md focus:border-brand-500 outline-none h-20"
            />
        </div>
      )}
    </div>
  );
};

export default AudioInput;
