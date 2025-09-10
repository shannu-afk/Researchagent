import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ResearchAgent } from './components/agents/ResearchAgent';
import { UseCaseAgent } from './components/agents/UseCaseAgent';
import { ResourceAgent } from './components/agents/ResourceAgent';
import { ReportGenerator } from './components/ReportGenerator';
import { Architecture } from './components/Architecture';

export type ViewType = 'dashboard' | 'research' | 'usecase' | 'resources' | 'reports' | 'architecture';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [researchData, setResearchData] = useState<any>(null);
  const [useCases, setUseCases] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'research':
        return <ResearchAgent onResearchComplete={setResearchData} />;
      case 'usecase':
        return <UseCaseAgent researchData={researchData} onUseCasesGenerated={setUseCases} />;
      case 'resources':
        return <ResourceAgent useCases={useCases} onResourcesCollected={setResources} />;
      case 'reports':
        return <ReportGenerator researchData={researchData} useCases={useCases} resources={resources} />;
      case 'architecture':
        return <Architecture />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {renderCurrentView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;