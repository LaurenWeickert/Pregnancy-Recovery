import React, { useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { User } from 'lucide-react';
import { useStore } from '../store/useStore';

export const UserProfile = () => {
  const { user } = useStore();

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3">
        <User className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="text-lg font-semibold">{user.name || <span className="text-gray-400 italic">(not set)</span>}</h2>
          <p className="text-sm text-gray-600">
            {user.postpartumDate
              ? (() => {
                  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                  const friendlyDate = formatInTimeZone(new Date(user.postpartumDate), userTimezone, "MMMM d, yyyy");
                  // Try to get the timezone abbreviation
                  const tzAbbr = new Date(user.postpartumDate).toLocaleTimeString(undefined, { timeZone: userTimezone, timeZoneName: 'short' }).split(' ').pop();
                  return `Postpartum since: ${friendlyDate}${tzAbbr ? ` (${tzAbbr})` : ''}`;
                })()
              : <span className="text-gray-400 italic">Postpartum date not set</span>}
          </p>
        </div>
      </div>
    </div>
  );
};