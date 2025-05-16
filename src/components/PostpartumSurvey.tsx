import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { SurveyData } from '../types';

// Using the SurveyData interface from types.ts
// Creating a local state type that allows null values during form completion
interface SurveyFormData {
  age?: number;
  hasExperiencedLoss: boolean | null;
  hadMultipleBirth: boolean | null;
  babiesAtHome: boolean | null;
  isFirstPregnancy: boolean | null;
}

interface PostpartumSurveyProps {
  onComplete?: () => void;
}

export const PostpartumSurvey: React.FC<PostpartumSurveyProps> = ({ onComplete }) => {
  const { user } = useStore();
  const [surveyData, setSurveyData] = useState<SurveyFormData>({
    age: undefined,
    hasExperiencedLoss: null,
    hadMultipleBirth: null,
    babiesAtHome: null,
    isFirstPregnancy: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = e.target.value ? parseInt(e.target.value, 10) : undefined;
    setSurveyData(prev => ({ ...prev, age }));
  };

  const handleBooleanChange = (field: keyof SurveyData, value: boolean) => {
    setSurveyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save survey data to user profile
    // Convert null values to undefined for the actual SurveyData interface
    if (user) {
      const formattedSurveyData: SurveyData = {
        age: surveyData.age,
        hasExperiencedLoss: surveyData.hasExperiencedLoss === null ? undefined : surveyData.hasExperiencedLoss,
        hadMultipleBirth: surveyData.hadMultipleBirth === null ? undefined : surveyData.hadMultipleBirth,
        babiesAtHome: surveyData.babiesAtHome === null ? undefined : surveyData.babiesAtHome,
        isFirstPregnancy: surveyData.isFirstPregnancy === null ? undefined : surveyData.isFirstPregnancy
      };
      
      useStore.getState().setUser({
        ...user,
        surveyData: formattedSurveyData
      });
      setSubmitted(true);
      
      // Call the onComplete callback if provided
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 1500); // Give user time to see the thank you message
      }
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-[#1F3D1F]/10">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#1F3D1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-2xl font-semibold text-[#1F3D1F] mt-4">Thank You</h2>
          <p className="mt-2 text-gray-600">
            Your information has been saved. The chat assistant will now be better informed about your specific situation.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-4 py-2 bg-[#1F3D1F] text-white rounded-md hover:bg-[#1F3D1F]/80 transition-colors"
          >
            Edit Responses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-[#1F3D1F]/10">
      <h2 className="text-2xl font-semibold text-[#1F3D1F] mb-6">Postpartum Information</h2>
      <p className="mb-4 text-gray-600">
        Please provide the following information to help our chat assistant better understand your specific situation.
        This will allow us to provide more personalized and sensitive support.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-[#1F3D1F] mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              min="13"
              max="100"
              value={surveyData.age || ''}
              onChange={handleAgeChange}
              className="w-full px-3 py-2 border border-[#1F3D1F]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3D1F]/40"
            />
          </div>

          {/* Pregnancy Loss Question */}
          <div>
            <p className="block text-sm font-medium text-[#1F3D1F] mb-2">
              Have you experienced pregnancy loss or infant loss during this pregnancy or birth?
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleBooleanChange('hasExperiencedLoss', true)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.hasExperiencedLoss === true
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleBooleanChange('hasExperiencedLoss', false)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.hasExperiencedLoss === false
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Multiple Birth Question */}
          <div>
            <p className="block text-sm font-medium text-[#1F3D1F] mb-2">
              Did you have a multiple birth (twins, triplets, etc.)?
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleBooleanChange('hadMultipleBirth', true)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.hadMultipleBirth === true
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleBooleanChange('hadMultipleBirth', false)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.hadMultipleBirth === false
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Babies at Home Question */}
          <div>
            <p className="block text-sm font-medium text-[#1F3D1F] mb-2">
              Is your baby/are your babies currently at home with you?
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleBooleanChange('babiesAtHome', true)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.babiesAtHome === true
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleBooleanChange('babiesAtHome', false)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.babiesAtHome === false
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* First Pregnancy Question */}
          <div>
            <p className="block text-sm font-medium text-[#1F3D1F] mb-2">
              Is this your first pregnancy?
            </p>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handleBooleanChange('isFirstPregnancy', true)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.isFirstPregnancy === true
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleBooleanChange('isFirstPregnancy', false)}
                className={`px-4 py-2 rounded-md ${
                  surveyData.isFirstPregnancy === false
                    ? 'bg-[#1F3D1F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#1F3D1F] text-white rounded-md hover:bg-[#1F3D1F]/80 transition-colors"
              disabled={
                surveyData.hasExperiencedLoss === null ||
                surveyData.hadMultipleBirth === null ||
                surveyData.babiesAtHome === null ||
                surveyData.isFirstPregnancy === null
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
