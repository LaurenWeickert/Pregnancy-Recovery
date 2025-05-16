import React, { useState, useEffect } from 'react';
import { LikeheartScale } from './LikeheartScale';
import { getTodayEmotionalState, getEmotionalStateHistory } from '../../data/mockData';

export const EmotionalTracker: React.FC = () => {
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [history, setHistory] = useState<{ value: number; timestamp: string; note?: string }[]>([]);

  useEffect(() => {
    // Get today's emotional state if it exists
    const todayState = getTodayEmotionalState();
    if (todayState) {
      setCurrentRating(todayState.value);
    }

    // Get emotional state history
    const emotionalHistory = getEmotionalStateHistory();
    setHistory(emotionalHistory);
  }, []);

  const handleRatingChange = (rating: number) => {
    setCurrentRating(rating);
    // The actual saving is handled in the LikeheartScale component
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-[#1F3D1F]">Emotional Wellbeing Tracker</h2>
      
      <div className="mb-8">
        <LikeheartScale 
          initialValue={currentRating} 
          onRatingChange={handleRatingChange} 
          showDescription={true}
        />
      </div>

      {history.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-[#1F3D1F]">Your Emotional History</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-[#1F3D1F]/10">
              <thead className="bg-[#1F3D1F]/5">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1F3D1F] uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1F3D1F] uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#1F3D1F] uppercase tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#1F3D1F]/10">
                {history.map((entry, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-[#1F3D1F]/5'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(entry.timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={i < entry.value ? '#FFDB00' : 'none'}
                            stroke={i < entry.value ? '#1F3D1F' : '#1F3D1F'}
                            strokeWidth="1.5"
                            className="w-4 h-4 mr-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-700">{entry.value}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{entry.note || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
