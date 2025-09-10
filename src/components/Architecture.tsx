import React, { useEffect, useState } from 'react';
import { GitBranch, Bot, Search, Lightbulb, Database, FileText, ArrowRight, Zap, Globe, Brain } from 'lucide-react';

export function Architecture() {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const agents = [
    {
      id: 'research',
      name: 'Research Agent',
      icon: Search,
      description: 'Industry & company analysis',
      color: 'bg-blue-500',
      borderColor: 'border-blue-500',
      tasks: ['Web browsing', 'Market analysis', 'Competitor research', 'Trend identification']
    },
    {
      id: 'usecase',
      name: 'Use Case Agent', 
      icon: Lightbulb,
      description: 'AI/ML use case generation',
      color: 'bg-purple-500',
      borderColor: 'border-purple-500',
      tasks: ['Opportunity identification', 'Feasibility analysis', 'ROI calculation', 'Priority ranking']
    },
    {
      id: 'resource',
      name: 'Resource Agent',
      icon: Database,
      description: 'Dataset & resource collection',
      color: 'bg-green-500',
      borderColor: 'border-green-500',
      tasks: ['Kaggle datasets', 'HuggingFace models', 'GitHub repos', 'Documentation']
    },
    {
      id: 'report',
      name: 'Report Agent',
      icon: FileText,
      description: 'Final proposal generation',
      color: 'bg-orange-500',
      borderColor: 'border-orange-500',
      tasks: ['Report synthesis', 'Recommendation ranking', 'Implementation roadmap', 'Export formats']
    }
  ];

  const dataFlow = [
    { from: 'research', to: 'usecase', label: 'Industry insights' },
    { from: 'usecase', to: 'resource', label: 'Use case specs' },
    { from: 'resource', to: 'report', label: 'Resource links' },
  ];

  const externalSources = [
    { name: 'Web Search APIs', icon: Globe, color: 'bg-indigo-500' },
    { name: 'Kaggle', icon: Database, color: 'bg-blue-600' },
    { name: 'HuggingFace', icon: Brain, color: 'bg-yellow-500' },
    { name: 'GitHub', icon: GitBranch, color: 'bg-gray-800' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <GitBranch className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Multi-Agent Architecture</h2>
            <p className="text-gray-600">System design and workflow visualization</p>
          </div>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-blue-600" />
          System Architecture Overview
        </h3>

        <div className="relative">
          {/* Central Coordinator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <div className="text-center mt-2">
              <div className="text-sm font-semibold text-gray-900">Multi-Agent</div>
              <div className="text-xs text-gray-600">Coordinator</div>
            </div>
          </div>

          {/* Agent Nodes */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const isActive = animationPhase === index;
              
              return (
                <div key={agent.id} className="relative">
                  <div
                    className={`p-6 rounded-xl border-2 transition-all duration-500 ${
                      isActive
                        ? `${agent.borderColor} shadow-lg scale-105 bg-white`
                        : 'border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 ${agent.color} rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
                        <p className="text-sm text-gray-600">{agent.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {agent.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${isActive ? agent.color.replace('bg-', 'bg-') : 'bg-gray-300'}`}></div>
                          <span className={`text-sm ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connection lines to center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div
                      className={`w-1 h-20 ${isActive ? agent.color : 'bg-gray-300'} transition-colors duration-500`}
                      style={{
                        transformOrigin: 'center',
                        transform: `rotate(${index * 90}deg)`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Data Flow & Integration</h3>
        
        <div className="flex items-center justify-between mb-8">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div key={agent.id} className="flex flex-col items-center">
                <div className={`p-4 ${agent.color} rounded-xl mb-2`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900">{agent.name}</span>
                
                {index < agents.length - 1 && (
                  <div className="flex items-center mt-4">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-8" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dataFlow.map((flow, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <ArrowRight className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">{flow.label}</div>
                <div className="text-xs text-gray-600">
                  {agents.find(a => a.id === flow.from)?.name} → {agents.find(a => a.id === flow.to)?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Integrations */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">External Data Sources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {externalSources.map((source, index) => {
            const Icon = source.icon;
            return (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`p-4 ${source.color} rounded-xl inline-block mb-3`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900">{source.name}</h4>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Autonomous agent coordination</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Real-time web data collection</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Intelligent use case generation</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Automated resource discovery</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Comprehensive report generation</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Technology Stack</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Frontend</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">React + TypeScript</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Agent Framework</span>
              <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">CrewAI / LangChain</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Web Search</span>
              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Tavily / Serper</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">LLM Provider</span>
              <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">OpenAI / Anthropic</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Deployment</span>
              <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded">Streamlit / Gradio</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}