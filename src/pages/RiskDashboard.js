import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Clock, Users, Filter, Download, Plus, Eye, Settings } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RiskDashboard = () => {
  const [filters, setFilters] = useState({
    segment: '',
    region: '',
    accountOwner: ''
  });

  // Mock data for accounts
  const accounts = [
    {
      id: 1,
      accountName: 'TechCorp Solutions',
      segment: 'Enterprise',
      region: 'North America',
      accountOwner: 'Sarah Johnson',
      churnProbability: 'High',
      topDriver: 'Usage Decline',
      lastActivity: '2 days ago',
      mrr: '$45,000'
    },
    {
      id: 2,
      accountName: 'Global Retail Inc',
      segment: 'Mid-Market',
      region: 'Europe',
      accountOwner: 'Mike Chen',
      churnProbability: 'Medium',
      topDriver: 'Support Issues',
      lastActivity: '1 week ago',
      mrr: '$28,000'
    },
    {
      id: 3,
      accountName: 'StartupXYZ',
      segment: 'SMB',
      region: 'North America',
      accountOwner: 'Lisa Rodriguez',
      churnProbability: 'Low',
      topDriver: 'Feature Request',
      lastActivity: '3 days ago',
      mrr: '$12,000'
    },
    {
      id: 4,
      accountName: 'Manufacturing Plus',
      segment: 'Enterprise',
      region: 'Asia Pacific',
      accountOwner: 'David Kim',
      churnProbability: 'High',
      topDriver: 'Contract Expiry',
      lastActivity: '5 days ago',
      mrr: '$67,000'
    },
    {
      id: 5,
      accountName: 'Healthcare Systems',
      segment: 'Mid-Market',
      region: 'North America',
      accountOwner: 'Sarah Johnson',
      churnProbability: 'Medium',
      topDriver: 'Budget Cuts',
      lastActivity: '1 day ago',
      mrr: '$34,000'
    }
  ];

  // Mock chart data
  const monthlyChurnData = [
    { month: 'Jan', churnRate: 2.1, predictedRate: 2.3 },
    { month: 'Feb', churnRate: 1.8, predictedRate: 2.0 },
    { month: 'Mar', churnRate: 2.4, predictedRate: 2.2 },
    { month: 'Apr', churnRate: 2.0, predictedRate: 2.1 },
    { month: 'May', churnRate: 1.9, predictedRate: 2.0 },
    { month: 'Jun', churnRate: 2.2, predictedRate: 2.4 }
  ];

  const churnDriversData = [
    { driver: 'Usage Decline', count: 45, percentage: 35 },
    { driver: 'Support Issues', count: 32, percentage: 25 },
    { driver: 'Contract Expiry', count: 28, percentage: 22 },
    { driver: 'Budget Cuts', count: 15, percentage: 12 },
    { driver: 'Feature Gaps', count: 8, percentage: 6 }
  ];

  const getChurnBadgeColor = (probability) => {
    switch (probability) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAccounts = accounts.filter(account => {
    return (!filters.segment || account.segment === filters.segment) &&
           (!filters.region || account.region === filters.region) &&
           (!filters.accountOwner || account.accountOwner === filters.accountOwner);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Risk Dashboard</h1>
        <p className="text-gray-600">Monitor at-risk accounts and take proactive retention actions</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Predicted Churn Rate</p>
              <p className="text-2xl font-bold text-gray-900">2.4%</p>
              <p className="text-sm text-red-600">↑ 0.2% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High-Risk Accounts</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-sm text-yellow-600">↑ 3 from last week</p>
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Churn Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Churn Trend</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Actual</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span>Predicted</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyChurnData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [`${value}%`, name === 'churnRate' ? 'Actual Churn' : 'Predicted Churn']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="churnRate" stroke="#3b82f6" strokeWidth={3} name="Actual Churn" />
              <Line type="monotone" dataKey="predictedRate" stroke="#9ca3af" strokeWidth={3} strokeDasharray="5 5" name="Predicted Churn" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Churn Drivers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Churn Drivers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={churnDriversData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="driver" type="category" width={120} tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [`${value} accounts`, 'Count']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Segment</label>
            <select
              value={filters.segment}
              onChange={(e) => setFilters({...filters, segment: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Segments</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="SMB">SMB</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select
              value={filters.region}
              onChange={(e) => setFilters({...filters, region: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Regions</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia Pacific">Asia Pacific</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Owner</label>
            <select
              value={filters.accountOwner}
              onChange={(e) => setFilters({...filters, accountOwner: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Owners</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Mike Chen">Mike Chen</option>
              <option value="Lisa Rodriguez">Lisa Rodriguez</option>
              <option value="David Kim">David Kim</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            At-Risk Accounts ({filteredAccounts.length})
          </h3>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MRR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.accountName}</div>
                      <div className="text-sm text-gray-500">Last activity: {account.lastActivity}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {account.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.accountOwner}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getChurnBadgeColor(account.churnProbability)}`}>
                      {account.churnProbability}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{account.topDriver}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.mrr}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiskDashboard;
