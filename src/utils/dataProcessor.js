/**
 * Data processing utilities for business user observations
 * All metrics are computed deterministically from the dataset
 */

// Canonicalization mappings for data sources
const DATA_SOURCE_CANONICALIZATION = {
  // CRM variants
  'crm': 'CRM data',
  'crm data': 'CRM data',
  'crmdata': 'CRM data',
  'customer relationship management': 'CRM data',
  'customer relationship management data': 'CRM data',
  
  // Usage variants
  'usage': 'usage logs',
  'usage logs': 'usage logs',
  'usagelogs': 'usage logs',
  'usage analytics': 'usage logs',
  'usage patterns': 'usage logs',
  
  // Support variants
  'support': 'support tickets',
  'support tickets': 'support tickets',
  'supporttickets': 'support tickets',
  'tickets': 'support tickets',
  
  // Billing variants
  'billing': 'billing data',
  'billing data': 'billing data',
  'billingdata': 'billing data',
  'payment': 'billing data',
  'payment history': 'billing data',
  
  // Finance variants
  'finance': 'finance data',
  'finance data': 'finance data',
  'financedata': 'finance data',
  
  // Data warehouse variants
  'data warehouse': 'data warehouse',
  'datawarehouse': 'data warehouse',
  'warehouse': 'data warehouse',
  
  // Team performance variants
  'team performance': 'team performance metrics',
  'team performance metrics': 'team performance metrics',
  'teamperformance': 'team performance metrics',
  'workflow metrics': 'team performance metrics',
  'performance': 'team performance metrics',
  
  // API variants
  'api': 'API logs',
  'api logs': 'API logs',
  'apilogs': 'API logs',
  'external apis': 'external APIs',
  'externalapis': 'external APIs',
  
  // Historical variants
  'historical': 'historical data',
  'historical data': 'historical data',
  'historicaldata': 'historical data',
  
  // Communication variants
  'communication': 'communication history',
  'communication history': 'communication history',
  'communicationhistory': 'communication history',
  'meeting notes': 'meeting notes',
  'meetingnotes': 'meeting notes',
  
  // Contract variants
  'contract': 'contract terms',
  'contract terms': 'contract terms',
  'contractterms': 'contract terms',
  'renewal': 'renewal history',
  'renewal history': 'renewal history',
  'renewalhistory': 'renewal history',
  
  // Training variants
  'training': 'training records',
  'training records': 'training records',
  'trainingrecords': 'training records',
  'feedback': 'feedback forms',
  'feedback forms': 'feedback forms',
  'feedbackforms': 'feedback forms'
};

// Expected columns for validation
const EXPECTED_COLUMNS = [
  'observation_id',
  'job_title', 
  'session_date',
  'task_category',
  'tools_used',
  'data_sources_accessed'
];

/**
 * Normalize column names to lower snake case
 */
const normalizeColumnNames = (columns) => {
  return columns.map(col => 
    col.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')
  );
};

/**
 * Parse and clean a single value
 */
const cleanValue = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.trim().toLowerCase();
};

/**
 * Split comma/semicolon/pipe separated values and clean them
 */
const splitAndClean = (value) => {
  if (!value || typeof value !== 'string') return [];
  return value
    .split(/[,;|]/)
    .map(item => item.trim())
    .filter(item => item.length > 0)
    .map(item => item.toLowerCase());
};

/**
 * Canonicalize data source names
 */
const canonicalizeDataSource = (source) => {
  const cleaned = source.toLowerCase().trim();
  return DATA_SOURCE_CANONICALIZATION[cleaned] || source;
};

/**
 * Parse session date
 */
const parseSessionDate = (dateStr) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

/**
 * Compute all metrics from the dataset
 */
export const computeMetrics = (rawData) => {
  // Validate required columns
  if (!rawData || rawData.length === 0) {
    throw new Error('No data provided');
  }

  const firstRow = rawData[0];
  const rawColumns = Object.keys(firstRow);
  const normalizedColumns = normalizeColumnNames(rawColumns);
  
  // Check for missing columns
  const missingColumns = EXPECTED_COLUMNS.filter(expected => 
    !normalizedColumns.includes(expected)
  );
  
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Create column mapping
  const columnMap = {};
  rawColumns.forEach((col, index) => {
    columnMap[normalizedColumns[index]] = col;
  });

  // Clean and process data
  const processedData = rawData.map(row => {
    const tools = splitAndClean(row[columnMap.tools_used]);
    const dataSources = splitAndClean(row[columnMap.data_sources_accessed])
      .map(canonicalizeDataSource);
    
    return {
      observation_id: row[columnMap.observation_id],
      job_title: cleanValue(row[columnMap.job_title]),
      session_date: parseSessionDate(row[columnMap.session_date]),
      task_category: cleanValue(row[columnMap.task_category]),
      tools_used: tools,
      data_sources_accessed: dataSources
    };
  }).filter(row => row.observation_id && row.job_title && row.task_category);

  // Compute metrics
  const totalSessions = processedData.length;
  
  if (totalSessions === 0) {
    throw new Error('No valid data after cleaning');
  }

  // Personas (job titles)
  const personaCounts = {};
  processedData.forEach(row => {
    personaCounts[row.job_title] = (personaCounts[row.job_title] || 0) + 1;
  });
  
  const personas = Object.entries(personaCounts)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / totalSessions) * 1000) / 10 // Round to 1 decimal
    }))
    .sort((a, b) => b.count - a.count);

  const primaryPersona = personas[0];

  // Tasks
  const taskCounts = {};
  processedData.forEach(row => {
    taskCounts[row.task_category] = (taskCounts[row.task_category] || 0) + 1;
  });
  
  const tasks = Object.entries(taskCounts)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / totalSessions) * 1000) / 10
    }))
    .sort((a, b) => b.count - a.count);

  const topTask = tasks[0];
  const top3Tasks = tasks.slice(0, 3);

  // Tools usage
  const toolCounts = {};
  processedData.forEach(row => {
    row.tools_used.forEach(tool => {
      toolCounts[tool] = (toolCounts[tool] || 0) + 1;
    });
  });
  
  const toolsUsage = Object.entries(toolCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Data sources usage
  const dataSourceCounts = {};
  processedData.forEach(row => {
    row.data_sources_accessed.forEach(source => {
      dataSourceCounts[source] = (dataSourceCounts[source] || 0) + 1;
    });
  });
  
  const dataSourcesUsage = Object.entries(dataSourceCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // Averages
  const avgToolsPerSession = Math.round(
    processedData.reduce((sum, row) => sum + row.tools_used.length, 0) / totalSessions * 10
  ) / 10;
  
  const avgDataSourcesPerSession = Math.round(
    processedData.reduce((sum, row) => sum + row.data_sources_accessed.length, 0) / totalSessions * 10
  ) / 10;

  // CRM prevalence (only from data sources, never from tools)
  const crmSessions = processedData.filter(row => 
    row.data_sources_accessed.some(source => 
      source.toLowerCase().includes('crm')
    )
  ).length;
  
  const crmPrevalencePct = Math.round((crmSessions / totalSessions) * 1000) / 10;

  // Validation assertions
  const personaPercentSum = personas.reduce((sum, p) => sum + p.percent, 0);
  const taskPercentSum = tasks.reduce((sum, t) => sum + t.percent, 0);
  
  if (Math.abs(personaPercentSum - 100) > 0.1) {
    console.warn(`Persona percentages sum to ${personaPercentSum}%, expected ~100%`);
  }
  
  if (Math.abs(taskPercentSum - 100) > 0.1) {
    console.warn(`Task percentages sum to ${taskPercentSum}%, expected ~100%`);
  }

  // Check for data source contamination in tools
  const toolNames = new Set(toolsUsage.map(t => t.name));
  const dataSourceNames = new Set(dataSourcesUsage.map(d => d.name));
  
  const contaminatedTools = Array.from(toolNames).filter(tool => 
    dataSourceNames.has(tool)
  );
  
  if (contaminatedTools.length > 0) {
    console.warn(`Tools contain data source names: ${contaminatedTools.join(', ')}`);
  }

  // Development sample validation (warnings only)
  if (totalSessions === 50) {
    if (primaryPersona.name !== 'csm' || Math.abs(primaryPersona.percent - 40) > 5) {
      console.warn(`Expected primary persona ~40% CSM, got ${primaryPersona.percent}% ${primaryPersona.name}`);
    }
    if (topTask.name !== 'customer data analysis' || Math.abs(topTask.percent - 22) > 5) {
      console.warn(`Expected top task ~22% customer data analysis, got ${topTask.percent}% ${topTask.name}`);
    }
    if (Math.abs(crmPrevalencePct - 72) > 5) {
      console.warn(`Expected CRM prevalence ~72%, got ${crmPrevalencePct}%`);
    }
  }

  return {
    totalSessions,
    personas,
    primaryPersona,
    tasks,
    topTask,
    top3Tasks,
    toolsUsage: toolsUsage.slice(0, 8), // Top 8
    dataSourcesUsage: dataSourcesUsage.slice(0, 8), // Top 8
    avgToolsPerSession,
    avgDataSourcesPerSession,
    crmPrevalencePct,
    processedData
  };
};

/**
 * Format a label for display (capitalize first letter)
 */
export const formatLabel = (label) => {
  if (!label) return '';
  return label.charAt(0).toUpperCase() + label.slice(1);
};

