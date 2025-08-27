import React, { useState, useEffect, useRef } from 'react';
import { Upload, Download, Filter, BarChart3, PieChart, TrendingUp, Users, Lightbulb, Download as DownloadIcon, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { computeMetrics, formatLabel } from '../utils/dataProcessor';

const DataExplorer = () => {
  // State
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [filters, setFilters] = useState({
    jobTitles: [],
    taskCategories: [],
    tools: [],
    sources: []
  });

  // Refs for chart export
  const chartRefs = useRef({});

  // Auto-load Excel file
  useEffect(() => {
    const tryLoad = async () => {
      try {
        setError(null);
        const res = await fetch('/business_user_observations.xlsx');
        if (!res.ok) throw new Error('Excel file not found');
        
        const buf = await res.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws);
        
        if (!json || json.length === 0) {
          throw new Error('Excel file contains no data');
        }

        setData(json);
        setFilteredData(json);
        
        // Compute metrics
        const computedMetrics = computeMetrics(json);
        console.log('Computed metrics:', computedMetrics);
        setMetrics(computedMetrics);
        
      } catch (e) {
        console.error('Error loading data:', e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    tryLoad();
  }, []);

  // Apply filters
  const applyFilters = () => {
    if (!data.length) return;
    
    const next = data.filter((item) => {
      const jobOk = !filters.jobTitles.length || filters.jobTitles.includes(item.job_title);
      const catOk = !filters.taskCategories.length || filters.taskCategories.includes(item.task_category);
      
      // Handle tools and sources that might be comma-separated
      const toolList = (item.tools_used || '').split(/[,;|]/).map(t => t.trim().toLowerCase());
      const srcList = (item.data_sources_accessed || '').split(/[,;|]/).map(s => s.trim().toLowerCase());
      
      const toolsOk = !filters.tools.length || filters.tools.every((t) => toolList.includes(t.toLowerCase()));
      const srcOk = !filters.sources.length || filters.sources.every((s) => srcList.includes(s.toLowerCase()));
      
      return jobOk && catOk && toolsOk && srcOk;
    });
    setFilteredData(next);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  // Export chart as PNG
  const exportChart = (chartName) => {
    const chartElement = chartRefs.current[chartName];
    if (chartElement) {
      // Simple export - in a real app you'd use html2canvas or similar
      alert(`Exporting ${chartName} chart...\nIn production, this would save as PNG.`);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading Data Explorer...</div>
          <div className="text-gray-600">Fetching business_user_observations.xlsx</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Data</h3>
              <p className="text-red-800">{error}</p>
              <p className="text-sm text-red-700 mt-2">
                Please ensure business_user_observations.xlsx is available in the public folder.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">No Data Available</div>
          <div className="text-gray-600">Unable to compute metrics from the dataset</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Explorer</h1>
        <p className="text-gray-600 mb-2">Explore customer success workflow observations to understand retention needs</p>
        <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          📁 Auto-loaded: business_user_observations.xlsx
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Session Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{metrics.primaryPersona.percent}%</div>
            <div className="text-sm text-blue-700 font-medium">Primary Persona</div>
            <div className="text-xs text-blue-600">{formatLabel(metrics.primaryPersona.name)}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">{metrics.topTask.percent}%</div>
            <div className="text-sm text-indigo-700 font-medium">Top Task</div>
            <div className="text-xs text-indigo-600">{formatLabel(metrics.topTask.name)}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{metrics.crmPrevalencePct}%</div>
            <div className="text-sm text-purple-700 font-medium">CRM Usage</div>
            <div className="text-xs text-purple-600">Prevalence across sessions</div>
          </div>
        </div>

      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{metrics.totalSessions}</div>
          <div className="text-xs text-gray-500">Total sessions</div>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{metrics.personas.length}</div>
          <div className="text-xs text-gray-500">Distinct personas</div>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{metrics.avgToolsPerSession}</div>
          <div className="text-xs text-gray-500">Avg tools per session</div>
        </div>
        <div className="bg-white border rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{metrics.avgDataSourcesPerSession}</div>
          <div className="text-xs text-gray-500">Avg data sources per session</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sessions by Job Title */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={el => chartRefs.current['jobTitle'] = el}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Sessions by Job Title</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">Total: {metrics.totalSessions} sessions</div>
              <button 
                onClick={() => exportChart('jobTitle')}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Export as PNG"
              >
                <DownloadIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.personas}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} sessions (${props.payload.percent}%)`, 
                  'Count'
                ]}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Percentage labels */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {metrics.personas.map((item, index) => (
              <div key={index} className="text-center p-2 bg-gray-50 rounded">
                <div className="font-medium">{formatLabel(item.name)}</div>
                <div className="text-gray-600">{item.percent}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions by Task Category */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={el => chartRefs.current['taskCategory'] = el}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Sessions by Task Category</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">Categories: {metrics.tasks.length}</div>
              <button 
                onClick={() => exportChart('taskCategory')}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                title="Export as PNG"
              >
                <DownloadIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.tasks}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} sessions (${props.payload.percent}%)`, 
                  'Count'
                ]}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          {/* Top 3 tasks with individual percentages */}
          <div className="mt-4">
            <div className="text-xs text-gray-600 mb-2">Top 3 Tasks:</div>
            <div className="flex space-x-2 text-xs">
              {metrics.top3Tasks.map((item, index) => (
                <div key={index} className="flex-1 text-center p-2 bg-green-50 rounded">
                  <div className="font-medium">{formatLabel(item.name)}</div>
                  <div className="text-green-600">{item.percent}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Tools Used */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={el => chartRefs.current['toolsUsed'] = el}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Top Tools Used</h3>
            </div>
            <button 
              onClick={() => exportChart('toolsUsed')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Export as PNG"
            >
              <DownloadIcon className="h-4 w-4" />
            </button>
          </div>
          {metrics.toolsUsage && metrics.toolsUsage.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.toolsUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value, name) => [`${value} sessions`, formatLabel(name)]} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-lg font-medium mb-2">No Data Available</div>
                <div className="text-sm">Apply different filters or check data format</div>
              </div>
            </div>
          )}
        </div>

        {/* Top Data Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6" ref={el => chartRefs.current['dataSources'] = el}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Top Data Sources</h3>
            </div>
            <button 
              onClick={() => exportChart('dataSources')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Export as PNG"
            >
              <DownloadIcon className="h-4 w-4" />
            </button>
          </div>
          {metrics.dataSourcesUsage && metrics.dataSourcesUsage.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={metrics.dataSourcesUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value, name) => [`${value} sessions`, formatLabel(name)]} />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-lg font-medium mb-2">No Data Available</div>
                <div className="text-sm">Apply different filters or check data format</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Business Case Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Why This Data Shows We Need a Churn Prevention Module</h3>
        <div className="text-sm text-gray-800 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium mb-2">Current State - Manual & Inefficient:</h5>
              <ul className="space-y-1">
                <li>• {formatLabel(metrics.primaryPersona.name)}s manually review {metrics.primaryPersona.count} sessions individually</li>
                <li>• Analysts manually analyze data across {metrics.topTask.count} sessions</li>
                <li>• No automated risk detection or prioritization</li>
                <li>• Reactive approach - only act after problems arise</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Solution - AI-Powered Automation:</h5>
              <ul className="space-y-1">
                <li>• Automate account risk scoring using the same data sources</li>
                <li>• Proactive alerts instead of manual reviews</li>
                <li>• Standardized retention workflows across all roles</li>
                <li>• Data-driven prioritization of at-risk accounts</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 p-3 bg-red-50 rounded border">
            <p className="font-medium text-red-900">
              💡 <strong>Key Insight:</strong> Teams are spending {metrics.totalSessions} sessions manually reviewing customer data that could be automated with AI-powered churn prediction, improving retention outcomes.
            </p>
          </div>
        </div>
        
        {/* Debug info - remove this in production */}
        <div className="mt-4 p-3 bg-gray-50 rounded border text-xs text-gray-600">
          <strong>Debug Info:</strong> Primary persona: {metrics.primaryPersona.name} ({metrics.primaryPersona.count} sessions), 
          Top task: {metrics.topTask.name} ({metrics.topTask.count} sessions), 
          Total: {metrics.totalSessions} sessions
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Observation Data ({filteredData.length} records)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tools Used</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.slice(0, 10).map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.observation_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formatLabel(item.job_title)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatLabel(item.task_category)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.tools_used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
