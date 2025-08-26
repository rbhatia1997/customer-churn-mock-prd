import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Download, Calendar, BarChart3, PieChart, Activity, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const OutcomeAnalytics = () => {
  const [dateRange, setDateRange] = useState('last_30_days');
  const [selectedMetric, setSelectedMetric] = useState('churn_rate');

  // Mock data for analytics
  const retentionData = [
    { month: 'Jan', retention: 97.2, target: 96.0, churn: 2.8 },
    { month: 'Feb', retention: 96.8, target: 96.0, churn: 3.2 },
    { month: 'Mar', retention: 97.5, target: 96.0, churn: 2.5 },
    { month: 'Apr', retention: 97.8, target: 96.0, churn: 2.2 },
    { month: 'May', retention: 98.1, target: 96.0, churn: 1.9 },
    { month: 'Jun', retention: 98.4, target: 96.0, churn: 1.6 }
  ];

  const playbookPerformance = [
    { playbook: 'High Risk Alert', accounts: 45, success: 38, successRate: 84.4, mrrSaved: 125000 },
    { playbook: 'Usage Decline', accounts: 32, success: 28, successRate: 87.5, mrrSaved: 89000 },
    { playbook: 'Contract Renewal', accounts: 67, success: 62, successRate: 92.5, mrrSaved: 234000 },
    { playbook: 'Support Escalation', accounts: 23, success: 19, successRate: 82.6, mrrSaved: 45000 },
    { playbook: 'Feature Adoption', accounts: 89, success: 76, successRate: 85.4, mrrSaved: 156000 }
  ];

  const campaignROI = [
    { campaign: 'Q1 Retention Push', spend: 25000, mrrSaved: 125000, roi: 400, accounts: 45 },
    { campaign: 'Enterprise Focus', spend: 35000, mrrSaved: 189000, roi: 440, accounts: 32 },
    { campaign: 'Usage Optimization', spend: 18000, mrrSaved: 89000, roi: 394, accounts: 28 },
    { campaign: 'Contract Renewal', spend: 22000, mrrSaved: 234000, roi: 964, accounts: 62 }
  ];

  const segmentPerformance = [
    { segment: 'Enterprise', retention: 98.2, churn: 1.8, accounts: 156, mrr: 8900000 },
    { segment: 'Mid-Market', retention: 97.1, churn: 2.9, accounts: 234, mrr: 4200000 },
    { segment: 'SMB', retention: 95.8, churn: 4.2, accounts: 567, mrr: 2100000 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getMetricValue = (metric) => {
    switch (metric) {
      case 'churn_rate':
        return { value: '1.6%', change: '-0.3%', trend: 'down', color: 'text-green-600' };
      case 'retention_rate':
        return { value: '98.4%', change: '+0.3%', trend: 'up', color: 'text-green-600' };
      case 'mrr_saved':
        return { value: '$648K', change: '+$89K', trend: 'up', color: 'text-green-600' };
      case 'intervention_time':
        return { value: '3.2 days', change: '-0.5 days', trend: 'down', color: 'text-green-600' };
      default:
        return { value: '0%', change: '0%', trend: 'stable', color: 'text-gray-600' };
    }
  };

  const getMetricLabel = (metric) => {
    switch (metric) {
      case 'churn_rate': return 'Churn Rate';
      case 'retention_rate': return 'Retention Rate';
      case 'mrr_saved': return 'MRR Saved';
      case 'intervention_time': return 'Avg Intervention Time';
      default: return 'Metric';
    }
  };

  const currentMetric = getMetricValue(selectedMetric);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Outcome Analytics</h1>
        <p className="text-gray-600">Measure the impact of retention efforts and campaign performance</p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <p className="text-sm text-gray-600">Select time period to analyze results</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_year">Last Year</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-gray-900">1.6%</p>
              <p className="text-sm text-green-600">↓ 0.3% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-gray-900">98.4%</p>
              <p className="text-sm text-green-600">↑ 0.3% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">MRR Saved</p>
              <p className="text-2xl font-bold text-gray-900">$648K</p>
              <p className="text-sm text-green-600">↑ $89K from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Intervention Time</p>
              <p className="text-2xl font-bold text-gray-900">3.2 days</p>
              <p className="text-sm text-green-600">↓ 0.5 days from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Selector and Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Trend Analysis</h3>
            <p className="text-sm text-gray-600">Track key metrics over time</p>
          </div>
          <div className="flex items-center space-x-2">
            {['churn_rate', 'retention_rate', 'mrr_saved', 'intervention_time'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedMetric === metric
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                {getMetricLabel(metric)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey={selectedMetric === 'churn_rate' ? 'churn' : selectedMetric === 'retention_rate' ? 'retention' : 'retention'} 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name={getMetricLabel(selectedMetric)}
              />
              {selectedMetric === 'retention_rate' && (
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#9ca3af" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  name="Target"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Playbook Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Playbook Performance</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Success Rate</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '87%' }}></div>
            </div>
            <span className="text-sm font-medium text-gray-900">87%</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Playbook</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accounts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRR Saved</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {playbookPerformance.map((playbook, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{playbook.playbook}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{playbook.accounts}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">{playbook.successRate}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            playbook.successRate >= 90 ? 'bg-green-500' : 
                            playbook.successRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${playbook.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${playbook.mrrSaved.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      playbook.successRate >= 90 ? 'bg-green-100 text-green-800' : 
                      playbook.successRate >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {playbook.successRate >= 90 ? 'Excellent' : 
                       playbook.successRate >= 80 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign ROI and Segment Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Campaign ROI */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign ROI</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignROI}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="campaign" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, 'ROI']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="roi" fill="#10b981" name="ROI %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {campaignROI.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{campaign.campaign}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900">${campaign.spend.toLocaleString()}</span>
                  <span className="text-gray-900">${campaign.mrrSaved.toLocaleString()}</span>
                  <span className="font-medium text-green-600">{campaign.roi}% ROI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Segment Performance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Segment Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ segment, retention }) => `${segment}\n${retention}%`}
                outerRadius={80}
                fill="#3b82f6"
                dataKey="retention"
              >
                {segmentPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}% retention`, name]} />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-4 space-y-2">
            {segmentPerformance.map((segment, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{segment.segment}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-900">{segment.retention}%</span>
                  <span className="text-gray-900">${segment.mrr.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Leadership Summary</h3>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">$648K</div>
            <div className="text-sm text-gray-600">Total MRR Saved</div>
            <div className="text-xs text-green-600 mt-1">↑ 15.8% vs last period</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">87%</div>
            <div className="text-sm text-gray-600">Overall Success Rate</div>
            <div className="text-xs text-blue-600 mt-1">↑ 3.2% vs last period</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Accounts Retained</div>
            <div className="text-xs text-purple-600 mt-1">↑ 12.3% vs last period</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Key Insights</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Contract Renewal playbook shows highest success rate at 92.5%</li>
            <li>• Enterprise segment leads retention with 98.2% rate</li>
            <li>• Q1 Retention Push campaign delivered 400% ROI</li>
            <li>• Average intervention time reduced by 0.5 days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OutcomeAnalytics;
