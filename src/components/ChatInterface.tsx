import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';

const CONVERSATION_STARTERS = [
  "How does my sleep quality affect my postpartum recovery?",
  "What does my recovery score mean for breastfeeding?",
  "Should I start exercising based on my current strain?",
  "Is my heart rate variability normal for postpartum?",
  "How can I improve my sleep while caring for my baby?"
];

export const ChatInterface = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage, user } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showStarters, setShowStarters] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    setShowStarters(false);
    const userMessage = {
      id: crypto.randomUUID(),
      content: input,
      timestamp: new Date().toISOString(),
      userId: user.id,
      isAI: false,
    };

    addMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: Implement AI response with Whoop data integration
      const aiResponse = {
        id: crypto.randomUUID(),
        content: "I'm analyzing your Whoop data to provide personalized advice...",
        timestamp: new Date().toISOString(),
        userId: user.id,
        isAI: true,
      };
      
      setTimeout(() => {
        addMessage(aiResponse);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleStarterClick = (starter: string) => {
    setInput(starter);
    setShowStarters(false);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && showStarters && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-purple-900">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">Suggested Questions</h3>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {CONVERSATION_STARTERS.map((starter, index) => (
                <button
                  key={index}
                  onClick={() => handleStarterClick(starter)}
                  className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm text-purple-900 transition-colors duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                  {starter}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isAI ? 'justify-start' : 'justify-end'
            } animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 shadow-sm transform transition-all duration-200 hover:scale-[1.01] ${
                message.isAI
                  ? 'bg-purple-100 text-purple-900'
                  : 'bg-blue-100 text-blue-900'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {format(new Date(message.timestamp), 'HH:mm')}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t p-4 bg-gray-50 rounded-b-lg"
      >
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 disabled:opacity-50 transition-colors duration-200 hover:shadow-md"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};