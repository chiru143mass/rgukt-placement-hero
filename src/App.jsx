import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DSASection from './components/DSASection';
import AptitudeSection from './components/AptitudeSection';
import VerbalSection from './components/VerbalSection';
import ProjectsSection from './components/ProjectsSection';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [completions, setCompletions] = useState(() => {
    const saved = localStorage.getItem('placement_hero_completions');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('placement_hero_completions', JSON.stringify(completions));
  }, [completions]);

  const toggleCompletion = (topicId) => {
    setCompletions(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            completions={completions} 
            toggleCompletion={toggleCompletion} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'dsa':
        return (
          <DSASection 
            completions={completions} 
            toggleCompletion={toggleCompletion} 
          />
        );
      case 'aptitude':
        return (
          <AptitudeSection 
            completions={completions} 
            toggleCompletion={toggleCompletion} 
          />
        );
      case 'verbal':
        return (
          <VerbalSection 
            completions={completions} 
            toggleCompletion={toggleCompletion} 
          />
        );
      case 'projects':
        return (
          <ProjectsSection 
            completions={completions} 
            toggleCompletion={toggleCompletion} 
          />
        );
      default:
        return <Dashboard completions={completions} toggleCompletion={toggleCompletion} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
