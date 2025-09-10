import React, { useState } from 'react';
import { Lightbulb, Zap, Star, ArrowRight, CheckCircle, Loader, Brain, Target, TrendingUp } from 'lucide-react';

interface UseCaseAgentProps {
  researchData: any;
  onUseCasesGenerated: (useCases: any[]) => void;
}

export function UseCaseAgent({ researchData, onUseCasesGenerated }: UseCaseAgentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [useCases, setUseCases] = useState<any[]>([]);

  const generateUseCases = async () => {
    if (!researchData) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const tasks = [
      'Analyzing research data and industry patterns',
      'Identifying AI/ML application opportunities',
      'Evaluating feasibility and ROI potential',
      'Generating detailed use case specifications',
      'Prioritizing use cases by impact and complexity',
      'Creating implementation roadmaps'
    ];

    for (let i = 0; i < tasks.length; i++) {
      setCurrentTask(tasks[i]);
      setGenerationProgress(((i + 1) / tasks.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Generate mock use cases based on research data
    const mockUseCases = [
      {
        id: 1,
        title: 'Predictive Maintenance System',
        category: 'Operations',
        priority: 'High',
        difficulty: 'Medium',
        impact: 'High',
        roi: '300%',
        timeframe: '6-9 months',
        description: 'AI-powered system to predict equipment failures and optimize maintenance schedules, reducing downtime by up to 40%.',
        technologies: ['Machine Learning', 'IoT Sensors', 'Time Series Analysis', 'Anomaly Detection'],
        benefits: [
          'Reduce unplanned downtime by 40%',
          'Lower maintenance costs by 25%',
          'Extend equipment lifespan',
          'Improve safety and reliability'
        ],
        challenges: [
          'Data quality and integration',
          'Sensor deployment costs',
          'Change management'
        ],
        references: [
          'McKinsey: The Age of Analytics',
          'Deloitte: Industry 4.0 Insights'
        ]
      },
      {
        id: 2,
        title: 'Intelligent Customer Service Chatbot',
        category: 'Customer Experience',
        priority: 'High',
        difficulty: 'Low',
        impact: 'Medium',
        roi: '200%',
        timeframe: '3-4 months',
        description: 'Advanced conversational AI to handle customer inquiries, provide 24/7 support, and improve customer satisfaction.',
        technologies: ['Natural Language Processing', 'Large Language Models', 'Intent Recognition', 'Knowledge Graphs'],
        benefits: [
          'Reduce response time by 80%',
          'Handle 70% of routine inquiries',
          '24/7 customer support availability',
          'Improve customer satisfaction scores'
        ],
        challenges: [
          'Training data preparation',
          'Multi-language support',
          'Integration with existing systems'
        ],
        references: [
          'Gartner: Conversational AI Market',
          'Forrester: Customer Experience Technology'
        ]
      },
      {
        id: 3,
        title: 'Supply Chain Optimization Platform',
        category: 'Operations',
        priority: 'Medium',
        difficulty: 'High',
        impact: 'High',
        roi: '250%',
        timeframe: '9-12 months',
        description: 'AI-driven platform to optimize inventory levels, predict demand, and streamline logistics operations.',
        technologies: ['Demand Forecasting', 'Optimization Algorithms', 'Graph Neural Networks', 'Reinforcement Learning'],
        benefits: [
          'Reduce inventory costs by 20%',
          'Improve demand forecast accuracy',
          'Optimize logistics routes',
          'Enhance supplier relationships'
        ],
        challenges: [
          'Complex system integration',
          'Multi-stakeholder coordination',
          'Data standardization'
        ],
        references: [
          'BCG: AI in Supply Chain Management',
          'MIT: Supply Chain Analytics'
        ]
      },
      {
        id: 4,
        title: 'Automated Document Processing',
        category: 'Operations',
        priority: 'Medium',
        difficulty: 'Low',
        impact: 'Medium',
        roi: '180%',
        timeframe: '4-6 months',
        description: 'Intelligent document processing system using OCR and NLP to automate data extraction and workflow management.',
        technologies: ['Computer Vision', 'OCR', 'Natural Language Processing', 'Workflow Automation'],
        benefits: [
          'Process documents 10x faster',
          'Reduce manual errors by 95%',
          'Improve compliance tracking',
          'Free up staff for higher-value tasks'
        ],
        challenges: [
          'Document format variations',
          'Data validation accuracy',
          'Legacy system integration'
        ],
        references: [
          'Accenture: Intelligent Automation',
          'PwC: Document AI Solutions'
        ]
      },
      {
        id: 5,
        title: 'Personalized Product Recommendation Engine',
        category: 'Customer Experience',
        priority: 'Medium',
        difficulty: 'Medium',
        impact: 'High',
        roi: '350%',
        timeframe: '6-8 months',
        description: 'ML-powered recommendation system to personalize customer experiences and increase sales conversion rates.',
        technologies: ['Collaborative Filtering', 'Deep Learning', 'Real-time Analytics', 'A/B Testing'],
        benefits: [
          'Increase conversion rates by 35%',
          'Boost average order value',
          'Improve customer engagement',
          'Reduce marketing costs'
        ],
        challenges: [
          'Cold start problem',
          'Data privacy concerns',
          'Real-time processing requirements'
        ],
        references: [
          'Amazon: Recommendation Systems',
          'Netflix: Personalization at Scale'
        ]
      }
    ];

    setUseCases(mockUseCases);
    onUseCasesGenerated(mockUseCases);
    setIsGenerating(false);
    setCurrentTask('Use cases generated successfully!');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Use Case Generation Agent</h2>
            <p className="text-gray-600">Generate AI/ML use cases based on research insights</p>
          </div>
        </div>

        {researchData ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-800 font-medium">
                Research data available for {researchData.industry}
                {researchData.company && ` - ${researchData.company}`}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span className="text-orange-800 font-medium">
                Please complete the research phase first to generate relevant use cases
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Generation Controls */}
      {researchData && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Use Cases</h3>
          
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Generate AI/ML use cases tailored to the {researchData.industry} industry
              {researchData.company && ` for ${researchData.company}`}
            </p>
            
            <button
              onClick={generateUseCases}
              disabled={isGenerating}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>Generate Use Cases</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Generation Progress */}
      {isGenerating && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generation Progress</h3>
            <span className="text-sm text-gray-500">{Math.round(generationProgress)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">{currentTask}</p>
        </div>
      )}

      {/* Generated Use Cases */}
      {useCases.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Generated Use Cases</h3>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {useCases.length} use cases
              </span>
            </div>
          </div>

          <div className="grid gap-6">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{useCase.title}</h4>
                    <p className="text-gray-600 text-lg">{useCase.description}</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(useCase.priority)}`}>
                      {useCase.priority} Priority
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(useCase.difficulty)}`}>
                      {useCase.difficulty} Complexity
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className="p-3 bg-green-100 rounded-lg inline-block mb-2">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{useCase.roi}</div>
                    <div className="text-sm text-gray-600">Expected ROI</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-3 bg-blue-100 rounded-lg inline-block mb-2">
                      <Star className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{useCase.impact}</div>
                    <div className="text-sm text-gray-600">Business Impact</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-3 bg-purple-100 rounded-lg inline-block mb-2">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{useCase.timeframe}</div>
                    <div className="text-sm text-gray-600">Implementation</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-3 bg-orange-100 rounded-lg inline-block mb-2">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{useCase.category}</div>
                    <div className="text-sm text-gray-600">Category</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Key Benefits</h5>
                    <ul className="space-y-2">
                      {useCase.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Implementation Challenges</h5>
                    <ul className="space-y-2">
                      {useCase.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Technologies Required</h5>
                  <div className="flex flex-wrap gap-2">
                    {useCase.technologies.map((tech: string, index: number) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">References</h5>
                  <div className="space-y-1">
                    {useCase.references.map((ref: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                        <ArrowRight className="w-4 h-4" />
                        <span>{ref}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}