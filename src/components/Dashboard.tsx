import React from 'react';
import { Bot, Search, Lightbulb, Database, FileText, GitBranch, ArrowRight, Zap } from 'lucide-react';

export function Dashboard() {
  const agentStats = [
    { name: 'Research Agent', status: 'Ready', tasks: 0, icon: Search, color: 'bg-blue-500' },
    { name: 'Use Case Agent', status: 'Ready', tasks: 0, icon: Lightbulb, color: 'bg-purple-500' },
    { name: 'Resource Agent', status: 'Ready', tasks: 0, icon: Database, color: 'bg-green-500' },
    { name: 'Report Generator', status: 'Ready', tasks: 0, icon: FileText, color: 'bg-orange-500' },
  ];

  const workflow = [
    { step: 1, title: 'Industry Research', description: 'Analyze company and industry landscape', agent: 'Research Agent' },
    { step: 2, title: 'Use Case Generation', description: 'Generate relevant AI/ML use cases', agent: 'Use Case Agent' },
    { step: 3, title: 'Resource Collection', description: 'Find datasets and implementation resources', agent: 'Resource Agent' },
    { step: 4, title: 'Final Proposal', description: 'Generate comprehensive report with recommendations', agent: 'Report Generator' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI Use Case Generation Platform
            </h1>
            <p className="text-xl text-gray-600">
              Multi-Agent system for generating tailored AI solutions for any industry
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Bot className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>

      {/* Agent Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentStats.map((agent) => {
          const Icon = agent.icon;
          return (
            <div key={agent.name} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${agent.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">{agent.status}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
              <p className="text-sm text-gray-500">Tasks completed: {agent.tasks}</p>
            </div>
          );
        })}
      </div>

      {/* Workflow Overview */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Research Workflow</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {workflow.map((item, index) => (
            <div key={item.step} className="relative">
              <div className="bg-gray-50 rounded-xl p-6 h-full border-2 border-dashed border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {item.agent}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              
              {index < workflow.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Generate AI Use Cases?</h2>
          <p className="text-xl opacity-90 mb-6">
            Start by researching your target industry or company. Our AI agents will analyze the market, 
            identify opportunities, and generate tailored recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Research
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              View Architecture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}