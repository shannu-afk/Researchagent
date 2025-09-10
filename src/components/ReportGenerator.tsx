import React, { useState } from 'react';
import { FileText, Download, Share2, CheckCircle, Star, TrendingUp, Target, ExternalLink, Calendar } from 'lucide-react';

interface ReportGeneratorProps {
  researchData: any;
  useCases: any[];
  resources: any[];
}

export function ReportGenerator({ researchData, useCases, resources }: ReportGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'executive' | 'technical' | 'implementation'>('executive');

  const generateMarkdownReport = () => {
    const date = new Date().toLocaleDateString();
    
    const markdown = `# AI/ML Use Case Proposal Report

**Generated on:** ${date}
**Industry:** ${researchData?.industry || 'N/A'}
${researchData?.company ? `**Company:** ${researchData.company}` : ''}

## Executive Summary

This report presents a comprehensive analysis of AI and Machine Learning opportunities for the ${researchData?.industry || 'target'} industry. Our multi-agent research system has identified ${useCases.length} high-value use cases with supporting implementation resources.

### Key Findings
- Market Size: ${researchData?.marketSize || 'N/A'}
- Industry Growth Rate: ${researchData?.growth || 'N/A'}
- Total Use Cases Identified: ${useCases.length}
- Implementation Resources Found: ${resources.length}

## Industry Analysis

### Market Overview
${researchData?.industry || 'The target industry'} is experiencing significant transformation driven by digital technologies and AI adoption. Key market characteristics include:

- Strong growth trajectory with ${researchData?.growth || 'competitive'} annual growth
- Increasing demand for automation and intelligent solutions
- Focus on operational efficiency and customer experience enhancement

### Industry Trends
${researchData?.trends?.map((trend: string) => `- ${trend}`).join('\n') || 'Industry trends analysis not available'}

### Key Challenges
${researchData?.challenges?.map((challenge: string) => `- ${challenge}`).join('\n') || 'Challenge analysis not available'}

## Recommended Use Cases

${useCases.map((useCase, index) => `
### ${index + 1}. ${useCase.title}

**Category:** ${useCase.category}
**Priority:** ${useCase.priority}
**Expected ROI:** ${useCase.roi}
**Implementation Timeline:** ${useCase.timeframe}

**Description:**
${useCase.description}

**Key Benefits:**
${useCase.benefits?.map((benefit: string) => `- ${benefit}`).join('\n') || ''}

**Technologies Required:**
${useCase.technologies?.map((tech: string) => `- ${tech}`).join('\n') || ''}

**Implementation Challenges:**
${useCase.challenges?.map((challenge: string) => `- ${challenge}`).join('\n') || ''}

**References:**
${useCase.references?.map((ref: string) => `- ${ref}`).join('\n') || ''}

---
`).join('')}

## Implementation Resources

### Datasets
${resources.filter(r => r.type === 'Dataset').map(resource => `
#### ${resource.title}
- **Platform:** ${resource.platform}
- **Size:** ${resource.fileSize || 'N/A'}
- **URL:** [${resource.url}](${resource.url})
- **Description:** ${resource.description}
`).join('\n')}

### Models and Libraries
${resources.filter(r => r.type.includes('Model')).map(resource => `
#### ${resource.title}
- **Platform:** ${resource.platform}
- **Downloads:** ${resource.downloads || 'N/A'}
- **URL:** [${resource.url}](${resource.url})
- **Description:** ${resource.description}
`).join('\n')}

### Code Repositories
${resources.filter(r => r.type === 'Code Repository').map(resource => `
#### ${resource.title}
- **Platform:** ${resource.platform}
- **Stars:** ${resource.stars || 'N/A'}
- **URL:** [${resource.url}](${resource.url})
- **Description:** ${resource.description}
`).join('\n')}

## Next Steps

1. **Prioritize Use Cases:** Review and prioritize the recommended use cases based on your organization's strategic goals and available resources.

2. **Resource Evaluation:** Assess the identified datasets, models, and code repositories for compatibility with your existing infrastructure.

3. **Pilot Implementation:** Start with high-priority, low-complexity use cases to build internal capabilities and demonstrate value.

4. **Team Development:** Invest in training and hiring to build the necessary AI/ML expertise within your organization.

5. **Infrastructure Planning:** Prepare the technical infrastructure needed to support AI/ML implementations.

## Conclusion

The ${researchData?.industry || 'target'} industry presents significant opportunities for AI and ML adoption. The identified use cases offer substantial potential for operational efficiency gains, cost reduction, and enhanced customer experiences. With proper planning and execution, these initiatives can deliver measurable business value and competitive advantage.

---
*This report was generated using an AI-powered multi-agent research system. All resource links and recommendations should be validated before implementation.*
`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI_Use_Case_Report_${date.replace(/\//g, '-')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasData = researchData || useCases.length > 0 || resources.length > 0;

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Data Available</h2>
        <p className="text-gray-600 mb-6">
          Complete the research workflow to generate comprehensive reports
        </p>
        <div className="text-sm text-gray-500">
          1. Research Agent → 2. Use Case Agent → 3. Resource Agent → 4. Report Generation
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Final Reports</h2>
              <p className="text-gray-600">Comprehensive analysis and recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={generateMarkdownReport}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'executive', label: 'Executive Summary', icon: TrendingUp },
            { id: 'technical', label: 'Technical Analysis', icon: Target },
            { id: 'implementation', label: 'Implementation Plan', icon: CheckCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        {activeTab === 'executive' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h3>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  This comprehensive analysis presents AI and Machine Learning opportunities for the {researchData?.industry || 'target'} industry, 
                  identifying {useCases.length} strategic use cases with high business impact potential.
                </p>
              </div>
            </div>

            {researchData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{researchData.marketSize}</div>
                  <div className="text-gray-600">Market Size</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{researchData.growth}</div>
                  <div className="text-gray-600">Annual Growth</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{useCases.length}</div>
                  <div className="text-gray-600">Use Cases Identified</div>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Key Recommendations</h4>
              <div className="grid gap-4">
                {useCases.slice(0, 3).map((useCase, index) => (
                  <div key={useCase.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900">{useCase.title}</h5>
                      <p className="text-gray-600 text-sm mb-2">{useCase.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600 font-medium">ROI: {useCase.roi}</span>
                        <span className="text-blue-600 font-medium">Timeline: {useCase.timeframe}</span>
                        <span className="text-purple-600 font-medium">Priority: {useCase.priority}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Analysis</h3>
            </div>

            <div className="grid gap-6">
              {useCases.map((useCase) => (
                <div key={useCase.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{useCase.title}</h4>
                      <p className="text-gray-600">{useCase.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{useCase.priority} Priority</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Technologies Required</h5>
                      <div className="flex flex-wrap gap-2">
                        {useCase.technologies?.map((tech: string, index: number) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Implementation Challenges</h5>
                      <ul className="space-y-1">
                        {useCase.challenges?.map((challenge: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                            <span className="text-gray-700">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="font-semibold text-gray-900 mb-2">References</h5>
                    <div className="space-y-1">
                      {useCase.references?.map((ref: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-blue-600">
                          <ExternalLink className="w-3 h-3" />
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

        {activeTab === 'implementation' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Implementation Roadmap</h3>
            </div>

            <div className="grid gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Phase 1: Quick Wins (3-6 months)
                </h4>
                <div className="space-y-3">
                  {useCases.filter(uc => uc.difficulty === 'Low').map((useCase) => (
                    <div key={useCase.id} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-900">{useCase.title}</span>
                      <span className="text-sm text-gray-600">({useCase.timeframe})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-yellow-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Phase 2: Medium-term Projects (6-12 months)
                </h4>
                <div className="space-y-3">
                  {useCases.filter(uc => uc.difficulty === 'Medium').map((useCase) => (
                    <div key={useCase.id} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-gray-900">{useCase.title}</span>
                      <span className="text-sm text-gray-600">({useCase.timeframe})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Phase 3: Complex Initiatives (12+ months)
                </h4>
                <div className="space-y-3">
                  {useCases.filter(uc => uc.difficulty === 'High').map((useCase) => (
                    <div key={useCase.id} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-red-600" />
                      <span className="text-gray-900">{useCase.title}</span>
                      <span className="text-sm text-gray-600">({useCase.timeframe})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-4">Implementation Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{resources.filter(r => r.type === 'Dataset').length}</div>
                  <div className="text-sm text-gray-600">Datasets Available</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{resources.filter(r => r.type.includes('Model')).length}</div>
                  <div className="text-sm text-gray-600">Pre-trained Models</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{resources.filter(r => r.type === 'Code Repository').length}</div>
                  <div className="text-sm text-gray-600">Code Repositories</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}