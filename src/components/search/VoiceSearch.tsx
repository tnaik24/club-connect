'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';

interface VoiceSearchProps {
  onSearch: (query: string) => void;
  isListening?: boolean;
}

/**
 * Voice search component using Web Speech API
 */
export default function VoiceSearch({ onSearch, isListening = false }: VoiceSearchProps) {
  const [isRecording, setIsRecording] = useState(false);
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
        onSearch(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, [onSearch]);

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  if (!recognition) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Voice search is not supported in your browser.
      </div>
    );
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-3 rounded-full ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white transition-colors`}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <StopIcon className="w-6 h-6" />
        ) : (
          <MicrophoneIcon className="w-6 h-6" />
        )}
      </motion.button>
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
        >
          Listening...
        </motion.div>
      )}
    </div>
  );
} 