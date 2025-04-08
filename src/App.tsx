import React from 'react';
import { ChatInterface } from './components/ChatInterface';
import { WhoopConnect } from './components/WhoopConnect';
import { UserProfile } from './components/UserProfile';
import { useStore } from './store/useStore';

function App() {
  const { user } = useStore();

  // Temporary setup for demo purposes
  React.useEffect(() => {
    if (!user) {
      useStore.getState().setUser({
        id: '1',
        email: 'demo@example.com'
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-purple-900 mb-8">
          Postpartum Wellness Assistant
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-[600px]">
              <ChatInterface />
            </div>
          </div>
          
          <div className="space-y-6">
            <UserProfile />
            <WhoopConnect />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;