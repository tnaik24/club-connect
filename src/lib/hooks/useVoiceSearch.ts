import { useState, useEffect, useCallback } from 'react';
import { VoiceSearchState } from '@/types';

/**
 * Custom hook for handling voice search functionality
 * @returns Voice search state and control functions
 */
export function useVoiceSearch() {
  const [state, setState] = useState<VoiceSearchState>({
    isListening: false,
    transcript: '',
    error: null,
  });

  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setState((prev) => ({
          ...prev,
          transcript,
          isListening: false,
          error: null,
        }));
      };

      recognition.onerror = (event) => {
        setState((prev) => ({
          ...prev,
          isListening: false,
          error: event.error,
        }));
      };

      recognition.onend = () => {
        setState((prev) => ({
          ...prev,
          isListening: false,
        }));
      };

      setRecognition(recognition);
    }
  }, []);

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start();
      setState((prev) => ({
        ...prev,
        isListening: true,
        error: null,
      }));
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setState((prev) => ({
        ...prev,
        isListening: false,
      }));
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setState((prev) => ({
      ...prev,
      transcript: '',
      error: null,
    }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: !!recognition,
  };
} 