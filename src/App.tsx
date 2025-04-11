import React, { useState } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { WhoopConnect } from './components/WhoopConnect';
import { UserProfile } from './components/UserProfile';
import { useStore } from './store/useStore';
import { MessageCircle, Activity, User } from 'lucide-react';

function App() {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('chat');

  // Temporary setup for demo purposes
  React.useEffect(() => {
    if (!user) {
      useStore.getState().setUser({
        id: '1',
        email: 'demo@example.com'
      });
    }
  }, [user]);

  // Tab configuration
  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'insights', label: 'Insights', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="h-[600px]">
              <ChatInterface />
            </div>
          </div>
        );
      case 'insights':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Health Insights</h2>
            <p className="text-gray-600">Health analytics dashboard would be displayed here.</p>
          </div>
        );
      case 'profile':
        return (
          <div className="grid grid-cols-1 gap-6">
            <UserProfile />
            <WhoopConnect />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-8">
          Postpartum Wellness Assistant
        </h1>
        
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full shadow-md p-1 flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-purple-100 text-purple-900' 
                      : 'text-gray-600 hover:text-purple-900 hover:bg-purple-50'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Main Content */}
        {renderContent()}
      </div>
    </div>
  );
}

export default App;