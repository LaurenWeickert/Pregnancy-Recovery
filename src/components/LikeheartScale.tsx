import React, { useState } from 'react';
import { saveEmotionalState, getEmotionalStateDescription } from '../../data/mockData';

interface LikeheartScaleProps {
  initialValue?: number;
  onRatingChange?: (rating: number) => void;
  showDescription?: boolean;
}

export const LikeheartScale: React.FC<LikeheartScaleProps> = ({
  initialValue = 0,
  onRatingChange,
  showDescription = true,
}) => {
  const [rating, setRating] = useState<number>(initialValue);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [note, setNote] = useState<string>('');
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);

  const handleRatingClick = (value: number) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
    setShowNoteInput(true);
  };

  const handleSaveNote = () => {
    saveEmotionalState(rating, note);
    setShowNoteInput(false);
    setNote('');
  };

  const displayRating = hoveredRating !== null ? hoveredRating : rating;
  const description = displayRating > 0 ? getEmotionalStateDescription(displayRating) : '';

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-lg bg-white shadow-md border border-[#1F3D1F]/10">
      <h3 className="text-lg font-semibold mb-2 text-[#1F3D1F]">How are you feeling today?</h3>
      
      <div className="flex justify-center space-x-2 my-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRatingClick(value)}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(null)}
            className={`relative p-2 rounded-full transition-transform duration-200 ${
              value <= displayRating ? 'scale-110' : 'scale-100'
            }`}
            aria-label={`Rate ${value} out of 5`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={value <= displayRating ? '#FFDB00' : 'none'}
              stroke={value <= displayRating ? '#1F3D1F' : '#1F3D1F'}
              strokeWidth="1.5"
              className="w-8 h-8 transition-all duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-[#1F3D1F]">
              {value}
            </span>
          </button>
        ))}
      </div>

      {showDescription && displayRating > 0 && (
        <div className="mt-6 text-center text-sm text-[#1F3D1F]/80 bg-[#1F3D1F]/5 p-3 rounded-lg">
          {description}
        </div>
      )}

      {showNoteInput && (
        <div className="mt-4">
          <label htmlFor="note" className="block text-sm font-medium text-[#1F3D1F] mb-1">
            Add a note about how you're feeling (optional)
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 rounded-l-md px-3 py-2 border border-[#1F3D1F]/20 focus:outline-none focus:ring-2 focus:ring-[#1F3D1F]/40 focus:border-[#1F3D1F]/40"
              placeholder="How are you feeling today?"
            />
            <button
              type="button"
              onClick={handleSaveNote}
              className="bg-[#1F3D1F] text-white rounded-r-md px-4 py-2 hover:bg-[#1F3D1F]/80 transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {rating > 0 && !showNoteInput && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setShowNoteInput(true)}
            className="text-sm text-[#1F3D1F] underline hover:text-[#1F3D1F]/80"
          >
            Add or edit note
          </button>
        </div>
      )}
    </div>
  );
};
