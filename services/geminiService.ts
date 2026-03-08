import { GoogleGenAI, Type } from "@google/genai";
import { TaskData, FeedbackData, VocabItem, Level, Topic, TaskType } from "../types";
import { CORE_DOCUMENT_TEXT } from "../constants";

// Initialize Gemini API
// Note: In a production app, key should be proxied or handled securely.
// For this demo, we assume process.env.API_KEY is available or injected.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are an expert English Speaking Coach for a Vietnamese teacher preparing for a school visit in India.
Your goal is to help the user reach a solid B1 level (CEFR).
You are supportive, encouraging, but strict about clarity and structure.
Always refer to the provided CORE_DOCUMENT_TEXT for context.
Output JSON when requested.
`;

export const generateSpeakingTask = async (
  topic: Topic,
  level: Level,
  taskType: TaskType
): Promise<TaskData> => {
  let prompt = "";

  if (taskType === TaskType.SHADOWING) {
    prompt = `
      Context: The user is a teacher.
      Topic: ${topic}
      Level: ${level}
      Task Type: SHADOWING PRACTICE
      Core Content: ${CORE_DOCUMENT_TEXT.substring(0, 3000)}...
      
      Goal: Create a Shadowing Practice script based on the Core Content.
      1. Select a relevant section and rewrite it into a B1-level paragraph (70-140 words). 
         - Use simple grammar and clear linking words (e.g., however, for example, in addition).
         - Keep educational meaning accurate.
      2. Split this paragraph into 4-6 chunks for shadowing.
         - In each chunk, use ALL CAPS for stressed words.
         - Use '||' to mark natural pauses.
         - Suggest a pace (Slow, Normal, Fast).
      3. Extract 6-10 keywords from the script.

      Generate a speaking task in JSON format with this schema:
      {
        "title": "Shadowing Practice: [Topic Name]",
        "instructionsVN": "Nghe mẫu (hoặc đọc hướng dẫn) và lặp lại từng đoạn. Chú ý trọng âm và ngắt nghỉ.",
        "instructionsEN": ["Listen to the model audio", "Repeat after each chunk", "Focus on stress and intonation"],
        "context": "Original concept: [Brief summary of original text]",
        "shadowingData": {
          "script": "The full rewritten B1 paragraph...",
          "chunks": [
            {"text": "Chunk 1 text with CAPS and ||", "pace": "Normal"},
            {"text": "Chunk 2...", "pace": "Normal"}
          ],
          "keywords": ["word1", "word2"]
        }
      }
    `;
  } else {
    prompt = `
      Context: The user is a teacher.
      Topic: ${topic}
      Level: ${level}
      Task Type: ${taskType}
      Core Content: ${CORE_DOCUMENT_TEXT.substring(0, 3000)}... (truncated for brevity, assume full context logic)
      
      Generate a speaking task in JSON format with the following schema:
      {
        "title": "Short title",
        "instructionsVN": "Instructions in Vietnamese",
        "instructionsEN": ["Step 1", "Step 2"],
        "context": "A brief excerpt or fact from the Core Content relevant to this task"
      }
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as TaskData;
  } catch (error) {
    console.error("Error generating task:", error);
    return {
      title: "Error",
      instructionsVN: "Không thể tạo bài tập lúc này. Vui lòng thử lại.",
      instructionsEN: ["Please try again."],
      context: ""
    };
  }
};

export const evaluateResponse = async (
  taskContext: string,
  userResponse: string,
  level: Level,
  taskType: TaskType = TaskType.MINI_SPEAKING
): Promise<FeedbackData> => {
  let prompt = "";

  if (taskType === TaskType.SHADOWING) {
    prompt = `
      Task Type: SHADOWING PRACTICE
      Target Script (Task Context): "${taskContext}"
      User Transcript: "${userResponse}"
      Target Level: ${level}

      Analyze the user's shadowing attempt.
      Since this is shadowing, focus on **pronunciation, intonation, and completeness**.
      
      1. Identify 2-3 pronunciation or intonation issues (or missing words).
      2. Provide "Intonation Improvements" instead of grammar correction.
      3. "Improved Version" should just be the relevant part of the Target Script that they missed or messed up.
      4. Identify 3-5 key phrases they should practice more.

      Output JSON format:
      {
        "mistakes": [{"original": "What user said/missed", "correction": "Correct pronunciation/stress", "explanation": "Intonation/Stress tip (VN)"}],
        "improvedVersion": "The target sentence they struggled with...",
        "whyBetter": "Explain the rhythm/flow (VN)",
        "patterns": [],
        "followUpQuestions": ["Try saying this sentence faster.", "Focus on the pause after..."],
        "pronunciation": [{"word": "...", "tip": "...", "phonetic": "..."}],
        "vocabUsed": [],
        "intonationTips": ["Tip 1 about rising/falling tone", "Tip 2 about chunking"]
      }
    `;
  } else {
    prompt = `
      Task Context: ${taskContext}
      User Response: "${userResponse}"
      Target Level: ${level}

      Analyze this response.
      1. Identify 2-3 critical mistakes (grammar/vocab) keeping them from B1.
      2. Create an Improved Version that is natural, B1 level, and suitable for a professional teacher.
      3. Explain why the improved version is better (in Vietnamese).
      4. Identify 2 Destination B1 grammar patterns or linking words used (or that should be used).
      5. Generate 2 follow-up deep questions in English to push the conversation further.
      6. Provide 3 pronunciation tips for words likely mispronounced by Vietnamese speakers in this text.

      Output JSON format:
      {
        "mistakes": [{"original": "...", "correction": "...", "explanation": "VN explanation"}],
        "improvedVersion": "...",
        "whyBetter": "VN explanation",
        "patterns": ["Pattern 1", "Pattern 2"],
        "followUpQuestions": ["Q1", "Q2"],
        "pronunciation": [{"word": "...", "tip": "...", "phonetic": "..."}],
        "vocabUsed": ["list", "of", "advanced", "words", "used"]
      }
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as FeedbackData;
  } catch (error) {
    console.error("Error evaluating response:", error);
    return {
      mistakes: [],
      improvedVersion: "Could not generate feedback.",
      whyBetter: "System error.",
      patterns: [],
      followUpQuestions: [],
      pronunciation: [],
      vocabUsed: []
    };
  }
};

export const extractVocabulary = async (topic: Topic): Promise<VocabItem[]> => {
  const prompt = `
    Based on the Topic: ${topic} and the CORE_DOCUMENT_TEXT provided in system instructions.
    Extract 8-10 useful vocabulary items (collocations, educational terms) suitable for B1 level.
    
    Output JSON:
    [
      { "word": "term", "definition": "simple English def", "vnMeaning": "VN meaning", "example": "Sentence using it" }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as VocabItem[];
  } catch (error) {
    console.error("Error extracting vocab:", error);
    return [];
  }
};

export const generateRapidFireQuestions = async (topic: Topic): Promise<string[]> => {
    const prompt = `
      Generate 10 rapid-fire, short questions related to ${topic} and the core text.
      Questions should be simple B1 level but thought-provoking.
      Output JSON array of strings.
    `;

    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });
  
      const text = response.text;
      if (!text) return [];
      return JSON.parse(text) as string[];
    } catch (error) {
      return ["What is your opinion on homework?", "Do students need more rest?", "Is AI good or bad?"];
    }
}