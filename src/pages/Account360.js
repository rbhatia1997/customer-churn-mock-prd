import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, TrendingUp, Calendar, DollarSign, MessageSquare, Activity, Download, Plus, Phone, Mail, MessageCircle, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const Account360 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock account data
  const account = {
    id: 1,
    name: 'TechCorp Solutions',
    segment: 'Enterprise',
    region: 'North America',
    accountOwner: 'Sarah Johnson',
    churnProbability: 78,
    mrr: 45000,
    contractValue: 540000,
    contractEndDate: '2024-12-31',
    industry: 'Technology',
    employees: 2500,
    founded: 2010,
    status: 'Active',
    riskLevel: 'High',
    topDrivers: [
      { driver: 'Usage Decline', score: 85, trend: 'decreasing' },
      { driver: 'Support Issues', score: 72, trend: 'stable' },
      { driver: 'Feature Gaps', score: 68, trend: 'increasing' }
    ]
  };

  // Mock usage data
  const usageData = [
    { date: '2024-01', users: 450, features: 12, apiCalls: 125000 },
    { date: '2024-02', users: 435, features: 12, apiCalls: 118000 },
    { date: '2024-03', users: 420, features: 11, apiCalls: 112000 },
    { date: '2024-04', users: 405, features: 11, apiCalls: 105000 },
    { date: '2024-05', users: 390, features: 10, apiCalls: 98000 },
    { date: '2024-06', users: 375, features: 10, apiCalls: 92000 }
  ];

  // Mock engagement data
  const engagementData = [
    { metric: 'Login Frequency', current: 3.2, previous: 4.1, trend: 'decreasing' },
    { metric: 'Feature Adoption', current: 65, previous: 72, trend: 'decreasing' },
    { metric: 'Support Tickets', current: 8, previous: 5, trend: 'increasing' },
    { metric: 'Training Sessions', current: 2, previous: 3, trend: 'decreasing' }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getTrendIcon = (trend) => {
    if (trend === 'increasing') return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (trend === 'decreasing') return <TrendingUp className="h-4 w-4 text-green-500 transform rotate-180" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/risk-dashboard')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Risk Dashboard
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{account.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{account.segment} • {account.region}</span>
              <span>Account Owner: {account.accountOwner}</span>
              <span>Industry: {account.industry}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-red-600 mr-4" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-900 mb-2">High Churn Risk Detected</h3>
            <p className="text-red-700 mb-3">
              This account has a {account.churnProbability}% probability of churning in the next 30 days. 
              Immediate intervention recommended.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-red-700">Contract ends: {account.contractEndDate}</span>
              <span className="text-red-700">MRR at risk: ${account.mrr.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'usage', 'engagement', 'billing', 'support'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                activeTab === tab
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Recurring Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${account.mrr.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Contract Value</p>
                  <p className="text-2xl font-bold text-gray-900">${account.contractValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">375</p>
                  <p className="text-sm text-red-600">↓ 16% from last month</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-red-600">↑ 60% from last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Drivers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Risk Drivers</h3>
            <div className="space-y-4">
              {account.topDrivers.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-orange-500'}`}></div>
                    <span className="font-medium text-gray-900">{driver.driver}</span>
                    {getTrendIcon(driver.trend)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg font-bold ${getRiskColor(driver.score)}`}>
                      {driver.score}%
                    </span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${index === 0 ? 'bg-red-500' : index === 1 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                        style={{ width: `${driver.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Phone className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium">Schedule Executive Review Call</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium">Send Retention Proposal</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium">Create Success Plan</span>
              </button>
              <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Plus className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium">Add to High-Touch Program</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-8">
          {/* Usage Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Trends (Last 6 Months)</h3>
                      <ResponsiveContainer width="100%" height={400}>
            <LineChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'apiCalls' ? `${(value/1000).toFixed(1)}K` : value, 
                  name === 'apiCalls' ? 'API Calls' : name
                ]}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} name="Active Users" />
              <Line type="monotone" dataKey="features" stroke="#10b981" strokeWidth={3} name="Features Used" />
              <Line type="monotone" dataKey="apiCalls" stroke="#f59e0b" strokeWidth={3} name="API Calls (K)" />
            </LineChart>
          </ResponsiveContainer>
          </div>

          {/* Feature Adoption */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Adoption</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Most Used Features</h4>
                <div className="space-y-3">
                  {['User Management', 'Reporting', 'API Integration', 'Workflow Automation'].map((feature, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{feature}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 bg-primary-500 rounded-full"
                            style={{ width: `${85 - index * 15}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{85 - index * 15}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Underutilized Features</h4>
                <div className="space-y-3">
                  {['Advanced Analytics', 'Custom Integrations', 'Team Collaboration', 'Mobile App'].map((feature, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{feature}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 bg-yellow-500 rounded-full"
                            style={{ width: `${25 + index * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{25 + index * 10}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'engagement' && (
        <div className="space-y-8">
          {/* Engagement Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {engagementData.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{metric.metric}</span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-900">{metric.current}</span>
                    <span className="text-sm text-gray-500">vs {metric.previous}</span>
                    <span className={`text-sm ${metric.trend === 'increasing' ? 'text-red-600' : metric.trend === 'decreasing' ? 'text-green-600' : 'text-gray-600'}`}>
                      {metric.trend === 'increasing' ? '↑' : metric.trend === 'decreasing' ? '↓' : '→'} 
                      {Math.abs(metric.current - metric.previous).toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Communications</h3>
            <div className="space-y-4">
              {[
                { type: 'Email', date: '2024-06-15', subject: 'Q2 Business Review', status: 'Sent' },
                { type: 'Call', date: '2024-06-10', subject: 'Feature Request Discussion', status: 'Completed' },
                { type: 'Meeting', date: '2024-06-05', subject: 'Executive Quarterly Review', status: 'Scheduled' },
                { type: 'Email', date: '2024-06-01', subject: 'Contract Renewal Reminder', status: 'Sent' }
              ].map((comm, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      comm.type === 'Email' ? 'bg-blue-500' : 
                      comm.type === 'Call' ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="font-medium text-gray-900">{comm.type}</span>
                    <span className="text-sm text-gray-600">{comm.subject}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{comm.date}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      comm.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      comm.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {comm.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing & Contract Information</h3>
            <p className="text-gray-600">Detailed billing information and contract details would be displayed here.</p>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support & Service History</h3>
            <p className="text-gray-600">Support ticket history and service interactions would be displayed here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account360;
