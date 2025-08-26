import React, { useState } from 'react';
import { Plus, Trash2, Save, Play, Settings, AlertTriangle, Users, TrendingUp, Calendar, MessageSquare, X } from 'lucide-react';

const PlaybookBuilder = () => {
  const [playbooks, setPlaybooks] = useState([
    {
      id: 1,
      name: 'High Risk Account Alert',
      description: 'Automatically create tasks for accounts with >70% churn probability',
      status: 'Active',
      priority: 'High',
      conditions: [
        { field: 'churn_probability', operator: '>', value: '70' }
      ],
      actions: [
        { type: 'create_task', details: 'Create Salesforce task for account owner' },
        { type: 'send_email', details: 'Send alert email to CSM team' }
      ],
      lastTriggered: '2 hours ago',
      successRate: 94
    },
    {
      id: 2,
      name: 'Usage Decline Intervention',
      description: 'Trigger retention actions when usage drops by >20%',
      status: 'Active',
      priority: 'Medium',
      conditions: [
        { field: 'usage_decline', operator: '>', value: '20' },
        { field: 'account_segment', operator: '=', value: 'Enterprise' }
      ],
      actions: [
        { type: 'create_task', details: 'Schedule usage review call' },
        { type: 'send_email', details: 'Send usage optimization guide' }
      ],
      lastTriggered: '1 day ago',
      successRate: 87
    },
    {
      id: 3,
      name: 'Contract Renewal Reminder',
      description: 'Send renewal reminders 90 days before contract expiry',
      status: 'Draft',
      priority: 'Low',
      conditions: [
        { field: 'contract_expiry', operator: '<=', value: '90' }
      ],
      actions: [
        { type: 'send_email', details: 'Send renewal reminder email' },
        { type: 'create_task', details: 'Schedule renewal discussion' }
      ],
      lastTriggered: 'Never',
      successRate: 0
    }
  ]);

  const [showBuilder, setShowBuilder] = useState(false);
  const [editingPlaybook, setEditingPlaybook] = useState(null);
  const [newPlaybook, setNewPlaybook] = useState({
    name: '',
    description: '',
    priority: 'Medium',
    conditions: [{ field: '', operator: '', value: '' }],
    actions: [{ type: '', details: '' }]
  });

  const availableFields = [
    { value: 'churn_probability', label: 'Churn Probability', type: 'number' },
    { value: 'usage_decline', label: 'Usage Decline %', type: 'number' },
    { value: 'account_segment', label: 'Account Segment', type: 'text' },
    { value: 'contract_expiry', label: 'Days to Contract Expiry', type: 'number' },
    { value: 'support_tickets', label: 'Support Tickets Count', type: 'number' },
    { value: 'last_activity', label: 'Days Since Last Activity', type: 'number' },
    { value: 'mrr', label: 'Monthly Recurring Revenue', type: 'number' }
  ];

  const availableOperators = [
    { value: '>', label: 'Greater than' },
    { value: '>=', label: 'Greater than or equal to' },
    { value: '<', label: 'Less than' },
    { value: '<=', label: 'Less than or equal to' },
    { value: '=', label: 'Equals' },
    { value: '!=', label: 'Not equals' },
    { value: 'contains', label: 'Contains' }
  ];

  const availableActions = [
    { value: 'create_task', label: 'Create Task' },
    { value: 'send_email', label: 'Send Email' },
    { value: 'create_alert', label: 'Create Alert' },
    { value: 'assign_owner', label: 'Assign Account Owner' },
    { value: 'schedule_call', label: 'Schedule Call' },
    { value: 'update_status', label: 'Update Account Status' }
  ];

  const addCondition = () => {
    setNewPlaybook({
      ...newPlaybook,
      conditions: [...newPlaybook.conditions, { field: '', operator: '', value: '' }]
    });
  };

  const removeCondition = (index) => {
    const updatedConditions = newPlaybook.conditions.filter((_, i) => i !== index);
    setNewPlaybook({ ...newPlaybook, conditions: updatedConditions });
  };

  const addAction = () => {
    setNewPlaybook({
      ...newPlaybook,
      actions: [...newPlaybook.actions, { type: '', details: '' }]
    });
  };

  const removeAction = (index) => {
    const updatedActions = newPlaybook.actions.filter((_, i) => i !== index);
    setNewPlaybook({ ...newPlaybook, actions: updatedActions });
  };

  const savePlaybook = () => {
    if (editingPlaybook) {
      const updated = playbooks.map(p => p.id === editingPlaybook.id ? { ...newPlaybook, id: editingPlaybook.id, status: 'Draft' } : p);
      setPlaybooks(updated);
      setEditingPlaybook(null);
    } else {
      const newId = Math.max(...playbooks.map(p => p.id)) + 1;
      setPlaybooks([...playbooks, { ...newPlaybook, id: newId, status: 'Draft', lastTriggered: 'Never', successRate: 0 }]);
    }
    setNewPlaybook({ name: '', description: '', priority: 'Medium', conditions: [{ field: '', operator: '', value: '' }], actions: [{ type: '', details: '' }] });
    setShowBuilder(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Playbook Builder</h1>
        <p className="text-gray-600">Create automated retention workflows with no-code conditions and actions</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Play className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Playbooks</p>
              <p className="text-2xl font-bold text-gray-900">{playbooks.filter(p => p.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(playbooks.reduce((acc, p) => acc + p.successRate, 0) / playbooks.length)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accounts Affected</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Retention Playbooks</h2>
            <p className="text-sm text-gray-600">Automate customer retention workflows</p>
          </div>
          <button
            onClick={() => setShowBuilder(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Playbook
          </button>
        </div>
      </div>

      {/* Playbooks List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Playbooks</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {playbooks.map((playbook) => (
            <div key={playbook.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{playbook.name}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(playbook.priority)}`}>
                      {playbook.priority}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(playbook.status)}`}>
                      {playbook.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{playbook.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Conditions</h5>
                      <div className="space-y-2">
                        {playbook.conditions.map((condition, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                            {condition.field} {condition.operator} {condition.value}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Actions</h5>
                      <div className="space-y-2">
                        {playbook.actions.map((action, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                            {action.type}: {action.details}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                    <span>Last triggered: {playbook.lastTriggered}</span>
                    <span>Success rate: {playbook.successRate}%</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-6">
                  <button
                    onClick={() => {
                      setEditingPlaybook(playbook);
                      setNewPlaybook({ ...playbook });
                      setShowBuilder(true);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbook Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {editingPlaybook ? 'Edit Playbook' : 'Create New Playbook'}
              </h3>
              <button
                onClick={() => {
                  setShowBuilder(false);
                  setEditingPlaybook(null);
                  setNewPlaybook({ name: '', description: '', priority: 'Medium', conditions: [{ field: '', operator: '', value: '' }], actions: [{ type: '', details: '' }] });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Playbook Name</label>
                  <input
                    type="text"
                    value={newPlaybook.name}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter playbook name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newPlaybook.priority}
                    onChange={(e) => setNewPlaybook({ ...newPlaybook, priority: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newPlaybook.description}
                  onChange={(e) => setNewPlaybook({ ...newPlaybook, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe what this playbook does"
                />
              </div>

              {/* Conditions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Conditions</h4>
                  <button
                    onClick={addCondition}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Condition
                  </button>
                </div>
                
                <div className="space-y-3">
                  {newPlaybook.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <select
                        value={condition.field}
                        onChange={(e) => {
                          const updated = [...newPlaybook.conditions];
                          updated[index].field = e.target.value;
                          setNewPlaybook({ ...newPlaybook, conditions: updated });
                        }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select field</option>
                        {availableFields.map(field => (
                          <option key={field.value} value={field.value}>{field.label}</option>
                        ))}
                      </select>
                      
                      <select
                        value={condition.operator}
                        onChange={(e) => {
                          const updated = [...newPlaybook.conditions];
                          updated[index].operator = e.target.value;
                          setNewPlaybook({ ...newPlaybook, conditions: updated });
                        }}
                        className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Operator</option>
                        {availableOperators.map(op => (
                          <option key={op.value} value={op.value}>{op.label}</option>
                        ))}
                      </select>
                      
                      <input
                        type="text"
                        value={condition.value}
                        onChange={(e) => {
                          const updated = [...newPlaybook.conditions];
                          updated[index].value = e.target.value;
                          setNewPlaybook({ ...newPlaybook, conditions: updated });
                        }}
                        className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Value"
                      />
                      
                      {newPlaybook.conditions.length > 1 && (
                        <button
                          onClick={() => removeCondition(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Actions</h4>
                  <button
                    onClick={addAction}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Action
                  </button>
                </div>
                
                <div className="space-y-3">
                  {newPlaybook.actions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <select
                        value={action.type}
                        onChange={(e) => {
                          const updated = [...newPlaybook.actions];
                          updated[index].type = e.target.value;
                          setNewPlaybook({ ...newPlaybook, actions: updated });
                        }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="">Select action</option>
                        {availableActions.map(act => (
                          <option key={act.value} value={act.value}>{act.label}</option>
                        ))}
                      </select>
                      
                      <input
                        type="text"
                        value={action.details}
                        onChange={(e) => {
                          const updated = [...newPlaybook.actions];
                          updated[index].details = e.target.value;
                          setNewPlaybook({ ...newPlaybook, actions: updated });
                        }}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Action details"
                      />
                      
                      {newPlaybook.actions.length > 1 && (
                        <button
                          onClick={() => removeAction(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowBuilder(false);
                    setEditingPlaybook(null);
                    setNewPlaybook({ name: '', description: '', priority: 'Medium', conditions: [{ field: '', operator: '', value: '' }], actions: [{ type: '', details: '' }] });
                  }}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={savePlaybook}
                  disabled={!newPlaybook.name || !newPlaybook.description}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4 mr-2 inline" />
                  Save Playbook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaybookBuilder;
