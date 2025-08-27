# Customer Churn Mock PRD - Data Explorer

This project demonstrates a data-driven approach to understanding customer success workflows and validating the need for churn prevention automation.

## Data Processing Architecture

The Data Explorer is completely data-driven from `business_user_observations.xlsx` with no invented numbers or LLM-generated content. All metrics are computed deterministically using the `computeMetrics()` function in `src/utils/dataProcessor.js`.

### Expected Excel Structure

The Excel file must contain these columns:
- `observation_id` - Unique identifier for each session
- `job_title` - Role of the person (e.g., CSM, Analyst, Ops Manager)
- `session_date` - Date of the observation session
- `task_category` - Type of task being performed
- `tools_used` - Comma/semicolon/pipe-separated list of tools
- `data_sources_accessed` - Comma/semicolon/pipe-separated list of data sources

### Data Cleaning & Canonicalization

#### Column Normalization
- Column names are normalized to lower snake case
- Missing required columns trigger an error banner
- Empty datasets show appropriate error messages

#### Data Source Canonicalization
Data sources are mapped to canonical forms to handle variations in naming:

**CRM Data:**
- `crm`, `crm data`, `crmdata`, `customer relationship management`

**Usage Logs:**
- `usage`, `usage logs`, `usagelogs`, `usage analytics`, `usage patterns`

**Support Tickets:**
- `support`, `support tickets`, `supporttickets`, `tickets`

**Billing Data:**
- `billing`, `billing data`, `billingdata`, `payment`, `payment history`

**Finance Data:**
- `finance`, `finance data`, `financedata`

**Data Warehouse:**
- `data warehouse`, `datawarehouse`, `warehouse`

**Team Performance Metrics:**
- `team performance`, `team performance metrics`, `teamperformance`, `workflow metrics`, `performance`

**API Logs:**
- `api`, `api logs`, `apilogs`, `external apis`, `externalapis`

**Historical Data:**
- `historical`, `historical data`, `historicaldata`

**Communication History:**
- `communication`, `communication history`, `communicationhistory`, `meeting notes`, `meetingnotes`

**Contract Terms:**
- `contract`, `contract terms`, `contractterms`, `renewal`, `renewal history`, `renewalhistory`

**Training Records:**
- `training`, `training records`, `trainingrecords`, `feedback`, `feedback forms`, `feedbackforms`

#### Tools (No Canonicalization)
Tools are kept as entered except for casing normalization. Examples:
- `excel`, `salesforce`, `tableau`, `slack`, `zoom`, `python`, `sql`, `r`

### Computed Metrics

All metrics are derived from the dataset:

- **total_sessions** - Count of valid observations
- **personas** - Job title distribution with percentages
- **primary_persona** - Top job title and its percentage
- **tasks** - Task category distribution with percentages  
- **top_task** - Most common task and its percentage
- **top3_tasks** - Top 3 tasks with cumulative percentages
- **avg_tools_per_session** - Mean number of tools per session
- **avg_data_sources_per_session** - Mean number of data sources per session
- **tools_usage** - Session count per tool
- **data_sources_usage** - Session count per data source
- **crm_prevalence_pct** - Percentage of sessions using CRM data

### CRM Data Handling

**Critical Rule:** CRM is treated as a data source, never as a tool.
- CRM prevalence is calculated only from `data_sources_accessed` column
- Salesforce in `tools_used` does NOT count toward CRM usage
- This ensures accurate separation of tools vs. data sources

### Validation & Guardrails

#### Data Quality Checks
- Percentages sum to ~100% within 0.1% tolerance
- No data source names appear in tool lists
- Missing required columns show error banners
- Empty datasets show appropriate messages

#### Development Sample Validation
When dataset has 50 records (development sample), warnings are shown if values differ significantly from expected:
- Primary persona: ~40% CSM
- Top task: ~22% Customer data analysis  
- CRM prevalence: ~72%

### Adding New Tools or Data Sources

#### New Tools
1. Add to the tools list in your Excel file
2. No code changes needed - tools are processed dynamically
3. Tools appear in "Top Tools Used" chart automatically

#### New Data Sources
1. Add canonicalization mapping in `DATA_SOURCE_CANONICALIZATION` object
2. Include common variations and misspellings
3. Map to the canonical form you want displayed

Example:
```javascript
const DATA_SOURCE_CANONICALIZATION = {
  // New data source
  'customer feedback': 'customer feedback data',
  'customerfeedback': 'customer feedback data',
  'feedback data': 'customer feedback data',
  
  // Existing mappings...
};
```

### UI Components

All UI components display only computed values:
- **Session Summary** - Shows primary persona, top task, and CRM usage percentages
- **KPI Tiles** - Display total sessions, distinct personas, and averages
- **Charts** - Bar charts with percentage labels and session counts
- **Key Insight** - Templated sentence using computed metrics
- **Business Case** - Problem/solution analysis with actual counts

### Error Handling

- **Missing Excel file** - Shows error banner with instructions
- **Invalid data format** - Displays specific error messages
- **Missing columns** - Lists required columns and stops rendering
- **Empty dataset** - Shows "No Data Available" message

### Export Functionality

All charts include export buttons for PNG download (placeholder implementation). In production, integrate with `html2canvas` or similar library.

### Responsive Design

- Grid layouts adapt to screen sizes using Tailwind CSS
- Charts resize automatically with `ResponsiveContainer`
- Mobile-friendly spacing and typography

## Development

```bash
npm install
npm start
```

The app will automatically load `business_user_observations.xlsx` from the public folder and compute all metrics deterministically.

## Data Integrity

This implementation ensures:
- No hardcoded numbers or percentages
- All insights derived from actual data
- Clear separation between tools and data sources
- Consistent labeling and formatting
- Validation of data quality and completeness
