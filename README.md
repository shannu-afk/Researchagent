# Research Agent System

A powerful multi-agent system built with React and TypeScript for comprehensive research, use case generation, resource collection, and automated report generation.

## Features

### 🤖 Research Agent
- Analyze industry landscapes and company profiles
- Fetch real-time company data from Wikipedia
- Retrieve live stock data from Alpha Vantage API
- Generate comprehensive industry analysis reports

### 🎯 Use Case Agent
- Generate AI/ML use cases based on research data
- Identify automation opportunities
- Provide implementation recommendations

### 📚 Resource Agent
- Collect relevant tools and resources
- Curate learning materials and documentation
- Identify implementation partners

### 📊 Report Generator
- Create detailed AI implementation reports
- Generate strategic recommendations
- Export comprehensive analysis documents

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend Integration**: Supabase (for data storage)
- **APIs**: Wikipedia API, Alpha Vantage API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd researchagent/project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the project root and add your API keys:
```env
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key_here
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:4000`

## Usage

1. **Research Phase**: Enter a company name and/or select an industry to start research
2. **Use Case Generation**: The system will generate relevant AI/ML use cases based on the research
3. **Resource Collection**: Collect tools, resources, and implementation partners
4. **Report Generation**: Generate comprehensive reports with strategic recommendations

## API Keys

### Alpha Vantage API
- Sign up at [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- Get your free API key
- Add it to your `.env` file as `VITE_ALPHA_VANTAGE_API_KEY`

### Supabase (Optional)
- Create a project at [Supabase](https://supabase.com)
- Get your project URL and anon key
- Add them to your `.env` file


## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



This project is licensed under the MIT License.
