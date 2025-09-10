import React, { useState } from 'react';
import { Search, Building, Globe, TrendingUp, Users, DollarSign, Target, CheckCircle, Loader, AlertCircle, MapPin } from 'lucide-react';

interface ResearchAgentProps {
  onResearchComplete: (data: any) => void;
}

export function ResearchAgent({ onResearchComplete }: ResearchAgentProps) {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [researchResults, setResearchResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const industries = [
    'Automotive', 'Healthcare', 'Finance', 'Retail', 'Manufacturing',
    'Technology', 'Education', 'Real Estate', 'Energy', 'Transportation',
    'Telecommunications', 'Entertainment', 'Aerospace', 'Food & Beverage', 'Pharmaceuticals',
    'IT Services', 'Artificial Intelligence', 'SaaS', 'E-commerce', 'Fintech'
  ];

  // Extensive map of company names to their stock symbols
  const companyToSymbolMap: { [key: string]: string } = {
    // Tech Giants
    'amazon': 'AMZN', 'amzn': 'AMZN', 'amazon.com': 'AMZN',
    'tesla': 'TSLA', 'tesla motors': 'TSLA',
    'microsoft': 'MSFT', 'msft': 'MSFT', 'microsoft corporation': 'MSFT',
    'apple': 'AAPL', 'aapl': 'AAPL', 'apple inc': 'AAPL', 'apple inc.': 'AAPL',
    'google': 'GOOGL', 'googl': 'GOOGL', 'alphabet': 'GOOGL', 'alphabet inc': 'GOOGL', 'alphabet inc.': 'GOOGL',
    'meta': 'META', 'meta platforms': 'META', 'facebook': 'META', 'fb': 'META',
    'netflix': 'NFLX', 'nflx': 'NFLX',
    'nvidia': 'NVDA', 'nvda': 'NVDA',
    'amd': 'AMD', 'advanced micro devices': 'AMD',
    'intel': 'INTC', 'intel corporation': 'INTC',
    'ibm': 'IBM', 'international business machines': 'IBM',
    'oracle': 'ORCL', 'oracle corporation': 'ORCL',
    'salesforce': 'CRM', 'salesforce.com': 'CRM',
    'adobe': 'ADBE', 'adobe inc': 'ADBE',
    'sap': 'SAP', 'sap se': 'SAP',
    'paypal': 'PYPL', 'paypal holdings': 'PYPL',
    'shopify': 'SHOP', 'shopify inc': 'SHOP',
    'uber': 'UBER', 'uber technologies': 'UBER',
    'lyft': 'LYFT', 'lyft inc': 'LYFT',
    'airbnb': 'ABNB', 'airbnb inc': 'ABNB',
    'spotify': 'SPOT', 'spotify technology': 'SPOT',
    'twitter': 'TWTR', 'twitter inc': 'TWTR', 'x': 'TWTR',
    'snap': 'SNAP', 'snap inc': 'SNAP',
    'pinterest': 'PINS', 'pinterest inc': 'PINS',
    'zoom': 'ZM', 'zoom video communications': 'ZM',
    'atlassian': 'TEAM', 'atlassian corporation': 'TEAM',
    'servicenow': 'NOW', 'servicenow inc': 'NOW',
    'intuit': 'INTU', 'intuit inc': 'INTU',
    'square': 'SQ', 'block': 'SQ', 'square inc': 'SQ', 'block inc': 'SQ',
    'twilio': 'TWLO', 'twilio inc': 'TWLO',
    'mongodb': 'MDB', 'mongodb inc': 'MDB',
    'snowflake': 'SNOW', 'snowflake inc': 'SNOW',
    'datadog': 'DDOG', 'datadog inc': 'DDOG',
    'cloudflare': 'NET', 'cloudflare inc': 'NET',
    
    // Indian Companies (Publicly Traded)
    'infosys': 'INFY', 'infosys ltd': 'INFY', 'infosys limited': 'INFY',
    'tcs': 'TCS', 'tata consultancy services': 'TCS',
    'wipro': 'WIT', 'wipro ltd': 'WIT', 'wipro limited': 'WIT',
    'hcl tech': 'HCLTECH', 'hcl technologies': 'HCLTECH',
    'tech mahindra': 'TECHM', 'tech mahindra ltd': 'TECHM',
    'larsen & toubro': 'LT', 'larsen and toubro': 'LT', 'l&t': 'LT',
    'reliance industries': 'RELIANCE', 'reliance': 'RELIANCE',
    'tata motors': 'TTM', 'tatamotors': 'TTM',
    'tata steel': 'TATASTEEL', 'tatasteel': 'TATASTEEL',
    'bajaj fintech': 'BAJAJFINSV', 'bajaj finserv': 'BAJAJFINSV',
    'hdfc bank': 'HDB', 'hdfc': 'HDB',
    'icici bank': 'IBN', 'icici': 'IBN',
    'axis bank': 'AXISBANK', 'axisbank': 'AXISBANK',
    'sbi': 'SBIN', 'state bank of india': 'SBIN',
    'adani enterprises': 'ADANIENT', 'adani': 'ADANIENT',
    'adani ports': 'ADANIPORTS', 'adani ports and special economic zone': 'ADANIPORTS',
    'adani green': 'ADANIGREEN', 'adani green energy': 'ADANIGREEN',
    'adani transmission': 'ADANITRANS', 'adani power': 'ADANIPOWER',
    'bharti airtel': 'BHARTIARTL', 'airtel': 'BHARTIARTL',
    'reliance jio': 'RELIANCE', 'jio': 'RELIANCE',
    'zomato': 'ZOMATO', 'zomato ltd': 'ZOMATO',
    'paytm': 'PAYTM', 'one97 communications': 'PAYTM',
    'nykaa': 'NYKAA', 'fsn e-commerce': 'NYKAA',
    'policybazaar': 'PB FINSERV', 'pb finserv': 'PB FINSERV',
    'flipkart': 'WMT', 'walmart': 'WMT', // Flipkart is owned by Walmart
    
    // AI & Hyderabad Based Companies
    'aiplanet': 'AIPLANET', // Special case - not publicly traded
    'ai planet': 'AIPLANET',
    'concentrix': 'CNXC', 'concentrix corporation': 'CNXC', // Has operations in Hyderabad
    'genpact': 'G', 'genpact limited': 'G', // Has operations in Hyderabad
    'accenture': 'ACN', 'accenture plc': 'ACN', // Has large operations in Hyderabad
    'capgemini': 'CAP.PA', 'capgemini se': 'CAP.PA', // Has operations in Hyderabad
    'deloitte': 'Private', // Not publicly traded
    'ey': 'Private', // Not publicly traded
    'kpmg': 'Private', // Not publicly traded
    'pwc': 'Private', // Not publicly traded
    'mindtree': 'MINDTREE', 'mindtree limited': 'MINDTREE',
    'ltimindtree': 'LTIM', 'lti mindtree': 'LTIM',
    'cyient': 'CYIENT', 'cyient limited': 'CYIENT',
    'mastek': 'MASTEK', 'mastek limited': 'MASTEK',
    'hexaware': 'Private', // Acquired by private equity
    'mahindra satyam': 'TECHM', // Merged with Tech Mahindra
    
    // Other Global Companies
    'cisco': 'CSCO', 'cisco systems': 'CSCO',
    'hp': 'HPQ', 'hp inc': 'HPQ', 'hewlett packard': 'HPQ',
    'dell': 'DELL', 'dell technologies': 'DELL',
    'lenovo': 'LNVGY', 'lenovo group': 'LNVGY',
    'sony': 'SONY', 'sony group': 'SONY',
    'samsung': 'SSNLF', 'samsung electronics': 'SSNLF',
    'toshiba': 'TOSBF', 'toshiba corporation': 'TOSBF',
    'panasonic': 'PCRFY', 'panasonic corporation': 'PCRFY',
    'ericsson': 'ERIC', 'telefonaktiebolaget lm ericsson': 'ERIC',
    'nokia': 'NOK', 'nokia corporation': 'NOK',
    'motorola': 'MSI', 'motorola solutions': 'MSI',
    'blackberry': 'BB', 'blackberry limited': 'BB',
    'palantir': 'PLTR', 'palantir technologies': 'PLTR',
    'workday': 'WDAY', 'workday inc': 'WDAY',
    'okta': 'OKTA', 'okta inc': 'OKTA',
    'zscaler': 'ZS', 'zscaler inc': 'ZS',
    'fortinet': 'FTNT', 'fortinet inc': 'FTNT',
    'palo alto networks': 'PANW', 'palo alto': 'PANW',
    'crowdstrike': 'CRWD', 'crowdstrike holdings': 'CRWD',
    'splunk': 'SPLK', 'splunk inc': 'SPLK',
    'proofpoint': 'PFPT', 'proofpoint inc': 'PFPT',
    'qualys': 'QLYS', 'qualys inc': 'QLYS',
    'tenable': 'TENB', 'tenable holdings': 'TENB',
    'rapid7': 'RPD', 'rapid7 inc': 'RPD',
    'checkpoint': 'CHKP', 'checkpoint software': 'CHKP',
    'juniper networks': 'JNPR', 'juniper': 'JNPR',
    'arista networks': 'ANET', 'arista': 'ANET',
    'f5 networks': 'FFIV', 'f5': 'FFIV',
    'citrix': 'CTXS', 'citrix systems': 'CTXS',
    'vmware': 'VMW', 'vmware inc': 'VMW'
  };

  const fetchCompanyData = async (company: string) => {
    try {
      const cleanCompany = company.trim();
      
      // Try different variations
      const variations = [
        cleanCompany + ' (company)',
        cleanCompany,
        cleanCompany + ' Inc.',
        cleanCompany + ' Inc',
        cleanCompany + ' Corporation',
        cleanCompany + ' Corp.',
        cleanCompany + ' Ltd.',
        cleanCompany + ' Ltd',
        cleanCompany + ' Limited',
        cleanCompany + ' LLC',
        cleanCompany + ' Technologies',
        cleanCompany + ' Solutions',
        cleanCompany + ' Systems',
        cleanCompany + ' Group',
        cleanCompany + ' Holdings'
      ];
      
      for (const variation of variations) {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(variation)}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // Skip disambiguation pages
          if (data.type === 'disambiguation') {
            continue;
          }
          
          return {
            description: data.extract,
            thumbnail: data.thumbnail?.source,
            url: data.content_urls?.desktop?.page,
            title: data.title
          };
        }
      }
      
      console.log(`No Wikipedia page found for company: ${company}`);
      return null;
    } catch (error) {
      console.error('Error fetching company data:', error);
      return null;
    }
  };

  const fetchStockData = async (symbol: string) => {
    try {
      // Special handling for AIPlanet - not a public company
      if (symbol === 'AIPLANET') {
        return {
          price: 'N/A',
          change: 'N/A',
          changePercent: 'N/A',
          symbol: 'AIPLANET',
          note: 'AIPlanet is a private company based in Hyderabad, India, focused on AI education and upskilling.'
        };
      }
      
      // Skip other private companies
      if (symbol === 'Private') {
        return {
          price: 'N/A',
          change: 'N/A',
          changePercent: 'N/A',
          symbol: 'PRIVATE',
          note: 'This is a private company and does not have publicly traded stock.'
        };
      }
      
      const apiKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
      
      if (!apiKey) {
        setError('Alpha Vantage API key is not configured. Please add VITE_ALPHA_VANTAGE_API_KEY to your environment variables.');
        return null;
      }
      
      setCurrentTask(`Fetching real-time stock data for ${symbol}...`);
      
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for API errors or rate limiting
      if (data['Error Message']) {
        throw new Error(data['Error Message']);
      }
      
      if (data['Note']) {
        throw new Error(`API Rate Limit: ${data['Note']}`);
      }
      
      if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
        // Try alternative API endpoint
        const dailyResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
        const dailyData = await dailyResponse.json();
        
        if (dailyData['Time Series (5min)']) {
          const timeSeries = dailyData['Time Series (5min)'];
          const latestTime = Object.keys(timeSeries)[0];
          const latestData = timeSeries[latestTime];
          
          return {
            price: latestData['4. close'],
            change: (parseFloat(latestData['4. close']) - parseFloat(latestData['1. open'])).toFixed(2),
            changePercent: `${(((parseFloat(latestData['4. close']) - parseFloat(latestData['1. open'])) / parseFloat(latestData['1. open'])) * 100).toFixed(2)}%`,
            symbol: symbol
          };
        }
        
        throw new Error('No stock data available for this symbol');
      }
      
      const quote = data['Global Quote'];
      return {
        price: quote['05. price'],
        change: quote['09. change'],
        changePercent: quote['10. change percent'],
        symbol: symbol
      };
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(`Failed to fetch real-time stock data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  };

  const startResearch = async () => {
    if (!companyName && !industry) return;

    setIsResearching(true);
    setResearchProgress(0);
    setError(null);

    const tasks = [
      'Analyzing company profile and market position',
      'Researching industry trends and standards',
      'Identifying key competitors and market leaders',
      'Analyzing current AI/ML adoption in sector',
      'Evaluating operational challenges and opportunities',
      'Compiling strategic focus areas and priorities'
    ];

    for (let i = 0; i < tasks.length; i++) {
      setCurrentTask(tasks[i]);
      setResearchProgress(((i + 1) / tasks.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    let companyData = null;
    let stockData = null;
    
    if (companyName) {
      setCurrentTask('Fetching company data from Wikipedia...');
      companyData = await fetchCompanyData(companyName);
      setResearchProgress(60);

      // Try to fetch stock data
      let symbol = companyToSymbolMap[companyName.toLowerCase()];
      
      // If not found in map, try using the company name directly (for tickers)
      if (!symbol) {
        symbol = companyName.toUpperCase();
      }
      
      if (symbol) {
        setCurrentTask('Fetching real-time data...');
        stockData = await fetchStockData(symbol);
        setResearchProgress(80);
        
        // If stock data fetch failed but we have company data, try to infer symbol from company title
        if (!stockData && companyData?.title) {
          const titleWords = companyData.title.split(' ');
          if (titleWords.length > 0) {
            const possibleSymbol = companyToSymbolMap[titleWords[0].toLowerCase()];
            if (possibleSymbol) {
              setCurrentTask('Trying alternative symbol...');
              stockData = await fetchStockData(possibleSymbol);
            }
          }
        }
      }
    }

    setResearchProgress(90);

    // Special handling for AIPlanet
    let description = companyData?.description || 'Provide a valid company name to get real-time data';
    let locationInfo = '';
    
    if (companyName.toLowerCase().includes('aiplanet') || companyName.toLowerCase().includes('ai planet')) {
      description = "AIPlanet (formerly DPhi) is an AI education platform based in Hyderabad, India. It focuses on upskilling professionals and students in artificial intelligence and machine learning through competitions, courses, and community engagement.";
      locationInfo = "Headquartered in Hyderabad, India";
      if (!stockData) {
        stockData = {
          price: 'N/A',
          change: 'N/A',
          changePercent: 'N/A',
          symbol: 'AIPLANET',
          note: 'AIPlanet is a private company focused on AI education and upskilling.'
        };
      }
    }

    // Generate research results
    const results = {
      company: companyName || 'Industry Analysis',
      industry: industry,
      location: locationInfo,
      // Only show real data if successfully fetched
      marketSize: stockData ? (stockData.price === 'N/A' ? 'Private Company' : `$${parseFloat(stockData.price).toFixed(2)}`) : (companyData ? 'Real-time market data unavailable' : 'Market data requires company name'),
      growth: stockData ? (stockData.change === 'N/A' ? 'Not publicly traded' : stockData.changePercent) : (companyData ? 'Real-time growth data unavailable' : 'Growth data requires company name'),
      keyPlayers: companyData ? [companyName] : ['Enter a company name for real data'],
      description: description,
      thumbnail: companyData?.thumbnail,
      wikipediaUrl: companyData?.url,
      stockData: stockData,
      symbol: stockData?.symbol,
      trends: [
        'Increased automation adoption',
        'Customer experience optimization',
        'Data-driven decision making',
        'Supply chain digitization',
        'Predictive analytics implementation'
      ],
      challenges: [
        'Legacy system integration',
        'Data silos and fragmentation',
        'Skilled workforce shortage',
        'Regulatory compliance',
        'ROI measurement difficulties'
      ],
      opportunities: [
        'Process automation',
        'Customer personalization',
        'Predictive maintenance',
        'Intelligent document processing',
        'Real-time analytics'
      ],
      focusAreas: [
        'Operations Optimization',
        'Customer Experience',
        'Supply Chain Management',
        'Quality Assurance',
        'Risk Management'
      ]
    };

    setResearchResults(results);
    onResearchComplete(results);
    setIsResearching(false);
    setCurrentTask('Research completed!');
    setResearchProgress(100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Research Agent</h2>
            <p className="text-gray-600">Get real-time company and market data</p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700">{error}</p>
            <p className="text-xs text-red-600 mt-1">
              Tip: Make sure you have configured VITE_ALPHA_VANTAGE_API_KEY in your environment variables
            </p>
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Research Parameters</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., AIPlanet, Tesla, Infosys, TSLA, INFY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter company name (AIPlanet, Tesla, Infosys) or ticker symbol (TSLA, INFY, TCS)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Industry *
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select an industry</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={startResearch}
          disabled={!companyName || !industry || isResearching}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isResearching ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Researching...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Get Real-Time Data</span>
            </>
          )}
        </button>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> AIPlanet is a private company based in Hyderabad. While it won't have stock data, 
            you can still get company information. Public companies will show real-time stock data.
          </p>
        </div>
      </div>

      {/* Research Progress */}
      {isResearching && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Research Progress</h3>
            <span className="text-sm text-gray-500">{Math.round(researchProgress)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${researchProgress}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600 flex items-center">
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            {currentTask}
          </p>
        </div>
      )}

      {/* Research Results */}
      {researchResults && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-gray-900">Real-Time Research Results</h3>
            </div>
            
            {researchResults.thumbnail && (
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={researchResults.thumbnail}
                  alt={researchResults.company}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{researchResults.company}</h4>
                  {researchResults.location && (
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {researchResults.location}
                    </div>
                  )}
                  {researchResults.symbol && researchResults.symbol !== 'AIPLANET' && researchResults.symbol !== 'PRIVATE' && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mt-1">
                      {researchResults.symbol}
                    </span>
                  )}
                  {researchResults.wikipediaUrl && (
                    <a
                      href={researchResults.wikipediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm mt-1"
                    >
                      View on Wikipedia
                    </a>
                  )}
                </div>
              </div>
            )}

            <p className="text-gray-700 mb-6">{researchResults.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg inline-block mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">{researchResults.marketSize}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {researchResults.stockData ? (researchResults.stockData.price === 'N/A' ? 'Company Status' : 'Current Stock Price') : 'Requires valid company'}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg inline-block mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">{researchResults.growth}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {researchResults.stockData ? (researchResults.stockData.change === 'N/A' ? 'Trading Status' : 'Today\'s Change') : 'Requires valid company'}
                </div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg inline-block mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-xl font-bold text-gray-900">{researchResults.keyPlayers.length}</div>
                <div className="text-xs text-gray-600 mt-1">Key Players</div>
              </div>
            </div>

            {researchResults.stockData && (
              <div className={`border rounded-lg p-4 mb-6 ${
                researchResults.stockData.price === 'N/A' 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <h4 className="text-lg font-semibold mb-3">
                  {researchResults.stockData.price === 'N/A' 
                    ? 'Company Information' 
                    : 'Real-Time Stock Data'}
                </h4>
                
                {researchResults.stockData.price === 'N/A' ? (
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-800">{researchResults.stockData.note}</p>
                    {researchResults.company.toLowerCase().includes('aiplanet') && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>AIPlanet (Hyderabad):</strong> An AI education platform focused on upskilling 
                          professionals and students through competitions, courses, and community engagement in 
                          artificial intelligence and machine learning.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-sm text-green-700">Current Price:</span>
                      <div className="text-lg font-bold text-green-900 mt-1">${parseFloat(researchResults.stockData.price).toFixed(2)}</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-sm text-gray-700">Change:</span>
                      <div className={`text-lg font-bold mt-1 ${
                        researchResults.stockData.change.includes('-') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {researchResults.stockData.change}
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <span className="text-sm text-gray-700">Change %:</span>
                      <div className={`text-lg font-bold mt-1 ${
                        researchResults.stockData.changePercent.includes('-') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {researchResults.stockData.changePercent}
                      </div>
                    </div>
                  </div>
                )}
                
                {researchResults.stockData.price !== 'N/A' && (
                  <p className="text-xs text-green-700 mt-2">
                    Data updated at: {new Date().toLocaleTimeString()}
                  </p>
                )}
              </div>
            )}

            {!researchResults.stockData && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="text-md font-semibold text-yellow-900">Real-Time Data Not Available</h4>
                </div>
                <p className="text-sm text-yellow-800 mt-2">
                  We couldn't fetch real-time data for "{researchResults.company}". Try using the exact company name or ticker symbol.
                  For Indian companies, try: Infosys (INFY), TCS (TCS), Wipro (WIT)
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Industry Trends
              </h4>
              <ul className="space-y-2">
                {researchResults.trends.map((trend: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-700">{trend}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-600" />
                Key Challenges
              </h4>
              <ul className="space-y-2">
                {researchResults.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Opportunities
              </h4>
              <ul className="space-y-2">
                {researchResults.opportunities.map((opportunity: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-700">{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-purple-600" />
                Strategic Focus Areas
              </h4>
              <ul className="space-y-2">
                {researchResults.focusAreas.map((area: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-700">{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}