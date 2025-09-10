import React, { useState } from 'react';
import { Database, ExternalLink, Download, Search, CheckCircle, Loader, Github, FileText, Globe } from 'lucide-react';

interface ResourceAgentProps {
  useCases: any[];
  onResourcesCollected: (resources: any[]) => void;
}

export function ResourceAgent({ useCases, onResourcesCollected }: ResourceAgentProps) {
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectionProgress, setCollectionProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [resources, setResources] = useState<any[]>([]);

  const collectResources = async () => {
    if (!useCases.length) return;
    
    setIsCollecting(true);
    setCollectionProgress(0);
    
    const tasks = [
      'Searching Kaggle for relevant datasets',
      'Exploring HuggingFace model repositories',
      'Finding GitHub implementations and code samples',
      'Collecting industry-specific documentation',
      'Validating resource quality and relevance',
      'Organizing resource links and metadata'
    ];

    for (let i = 0; i < tasks.length; i++) {
      setCurrentTask(tasks[i]);
      setCollectionProgress(((i + 1) / tasks.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Generate mock resources based on use cases
    const mockResources = [
      {
        id: 1,
        title: 'Industrial Equipment Failure Dataset',
        description: 'Time series data for predictive maintenance with sensor readings, failure events, and maintenance records.',
        platform: 'Kaggle',
        type: 'Dataset',
        useCases: ['Predictive Maintenance System'],
        url: 'https://www.kaggle.com/datasets/equipment-failure-prediction',
        tags: ['time-series', 'iot', 'predictive-maintenance', 'anomaly-detection'],
        fileSize: '2.5 GB',
        downloads: '15.2K',
        rating: 4.7
      },
      {
        id: 2,
        title: 'Conversational AI Model - DialoGPT',
        description: 'Pre-trained conversational AI model fine-tuned for customer service applications.',
        platform: 'HuggingFace',
        type: 'Model',
        useCases: ['Intelligent Customer Service Chatbot'],
        url: 'https://huggingface.co/microsoft/DialoGPT-large',
        tags: ['nlp', 'conversational-ai', 'customer-service', 'chatbot'],
        fileSize: '1.2 GB',
        downloads: '87.5K',
        rating: 4.8
      },
      {
        id: 3,
        title: 'Supply Chain Optimization Algorithms',
        description: 'Python implementation of various optimization algorithms for supply chain management.',
        platform: 'GitHub',
        type: 'Code Repository',
        useCases: ['Supply Chain Optimization Platform'],
        url: 'https://github.com/supply-chain-optimization/algorithms',
        tags: ['optimization', 'supply-chain', 'logistics', 'python'],
        stars: '2.1K',
        forks: '456',
        rating: 4.6
      },
      {
        id: 4,
        title: 'Document Processing with OCR Dataset',
        description: 'Large collection of scanned documents with annotations for training OCR and NLP models.',
        platform: 'Kaggle',
        type: 'Dataset',
        useCases: ['Automated Document Processing'],
        url: 'https://www.kaggle.com/datasets/document-ocr-processing',
        tags: ['ocr', 'document-processing', 'nlp', 'computer-vision'],
        fileSize: '8.7 GB',
        downloads: '23.8K',
        rating: 4.5
      },
      {
        id: 5,
        title: 'Product Recommendation Engine',
        description: 'Complete implementation of collaborative filtering and deep learning recommendation systems.',
        platform: 'GitHub',
        type: 'Code Repository',
        useCases: ['Personalized Product Recommendation Engine'],
        url: 'https://github.com/recommendation-systems/ml-engine',
        tags: ['recommendation-systems', 'collaborative-filtering', 'deep-learning', 'tensorflow'],
        stars: '3.4K',
        forks: '892',
        rating: 4.9
      },
      {
        id: 6,
        title: 'E-commerce Customer Behavior Dataset',
        description: 'Comprehensive dataset containing customer interactions, purchases, and behavioral patterns.',
        platform: 'Kaggle',
        type: 'Dataset',
        useCases: ['Personalized Product Recommendation Engine'],
        url: 'https://www.kaggle.com/datasets/ecommerce-customer-behavior',
        tags: ['ecommerce', 'customer-behavior', 'recommendation', 'analytics'],
        fileSize: '1.8 GB',
        downloads: '31.6K',
        rating: 4.6
      },
      {
        id: 7,
        title: 'Transformer Models for Industry Applications',
        description: 'Pre-trained transformer models optimized for various industrial use cases.',
        platform: 'HuggingFace',
        type: 'Model Collection',
        useCases: ['Automated Document Processing', 'Intelligent Customer Service Chatbot'],
        url: 'https://huggingface.co/collections/industry-transformers',
        tags: ['transformer', 'bert', 'industry', 'nlp'],
        fileSize: '3.2 GB',
        downloads: '156.3K',
        rating: 4.8
      },
      {
        id: 8,
        title: 'AI Implementation Best Practices Guide',
        description: 'Comprehensive documentation on implementing AI solutions in enterprise environments.',
        platform: 'Documentation',
        type: 'Guide',
        useCases: ['All Use Cases'],
        url: 'https://ai-implementation-guide.com/best-practices',
        tags: ['implementation', 'best-practices', 'enterprise', 'ai-adoption'],
        pages: '127',
        rating: 4.7
      }
    ];

    setResources(mockResources);
    onResourcesCollected(mockResources);
    setIsCollecting(false);
    setCurrentTask('Resources collected successfully!');
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Kaggle': return Database;
      case 'HuggingFace': return Globe;
      case 'GitHub': return Github;
      case 'Documentation': return FileText;
      default: return ExternalLink;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Kaggle': return 'bg-blue-100 text-blue-800';
      case 'HuggingFace': return 'bg-yellow-100 text-yellow-800';
      case 'GitHub': return 'bg-gray-100 text-gray-800';
      case 'Documentation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Dataset': return 'bg-blue-100 text-blue-800';
      case 'Model': return 'bg-green-100 text-green-800';
      case 'Code Repository': return 'bg-purple-100 text-purple-800';
      case 'Guide': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Database className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resource Collection Agent</h2>
            <p className="text-gray-600">Collect datasets, models, and implementation resources</p>
          </div>
        </div>

        {useCases.length > 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-green-800 font-medium">
                {useCases.length} use cases available for resource collection
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-orange-500" />
              <span className="text-orange-800 font-medium">
                Please generate use cases first to collect relevant resources
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Collection Controls */}
      {useCases.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Collect Resources</h3>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 mb-2">
                Collect relevant datasets, models, and code repositories for the generated use cases
              </p>
              <div className="flex flex-wrap gap-2">
                {useCases.slice(0, 3).map((useCase) => (
                  <span key={useCase.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {useCase.title}
                  </span>
                ))}
                {useCases.length > 3 && (
                  <span className="text-gray-500 text-sm">+{useCases.length - 3} more</span>
                )}
              </div>
            </div>
            
            <button
              onClick={collectResources}
              disabled={isCollecting}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isCollecting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Collecting...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Collect Resources</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Collection Progress */}
      {isCollecting && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Collection Progress</h3>
            <span className="text-sm text-gray-500">{Math.round(collectionProgress)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-green-600 to-teal-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${collectionProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">{currentTask}</p>
        </div>
      )}

      {/* Collected Resources */}
      {resources.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Collected Resources</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {resources.length} resources
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {resources.filter(r => r.type === 'Dataset').length}
                </div>
                <div className="text-sm text-gray-600">Datasets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {resources.filter(r => r.type.includes('Model')).length}
                </div>
                <div className="text-sm text-gray-600">Models</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {resources.filter(r => r.type === 'Code Repository').length}
                </div>
                <div className="text-sm text-gray-600">Code Repos</div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {resources.map((resource) => {
              const PlatformIcon = getPlatformIcon(resource.platform);
              
              return (
                <div key={resource.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">{resource.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(resource.platform)}`}>
                          {resource.platform}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{resource.description}</p>
                    </div>
                    
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <PlatformIcon className="w-4 h-4" />
                      <span>View</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {resource.fileSize && (
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Size: {resource.fileSize}</span>
                      </div>
                    )}
                    {resource.downloads && (
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{resource.downloads} downloads</span>
                      </div>
                    )}
                    {resource.stars && (
                      <div className="flex items-center space-x-2">
                        <Github className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{resource.stars} stars</span>
                      </div>
                    )}
                    {resource.rating && (
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < Math.floor(resource.rating) ? 'bg-yellow-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Relevant Use Cases</h5>
                    <div className="flex flex-wrap gap-2">
                      {resource.useCases.map((useCase: string, index: number) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag: string, index: number) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}