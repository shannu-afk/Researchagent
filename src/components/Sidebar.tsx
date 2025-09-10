import React from 'react';
import { ViewType } from '../App';
import { 
  LayoutDashboard, 
  Search, 
  Lightbulb, 
  Database, 
  FileText, 
  GitBranch,
  Bot,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'research', label: 'Research Agent', icon: Search },
    { id: 'usecase', label: 'Use Case Agent', icon: Lightbulb },
    { id: 'resources', label: 'Resource Agent', icon: Database },
    { id: 'reports', label: 'Final Reports', icon: FileText },
    { id: 'architecture', label: 'Architecture', icon: GitBranch },
  ] as const;

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-xl border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Research</h1>
            <p className="text-sm text-gray-500">Multi-Agent System</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Powered by Multi-Agent AI</span>
        </div>
      </div>
    </div>
  );
}