# Customer Churn Prediction & Prevention Module

A comprehensive wireframe web application designed for subscription-based businesses (SaaS, media, telecom) to identify at-risk customers and take proactive retention actions.

## 🎯 Overview

This prototype demonstrates both MVP functionality and future vision concepts for customer churn prevention, allowing business users to explore real-world workflow data and interact with mock layouts representing retention workflows.

## ✨ Features

### 🚀 MVP (Core Deliverable)
- **Data Explorer**: Upload and analyze Excel files with workflow observations
- **Risk Dashboard**: Monitor at-risk accounts with KPI tiles and actionable insights
- **Quick Actions**: Simple retention actions (Salesforce tasks, CSV export)

### 🔮 Future Vision (Phase 2-3)
- **Account 360**: Comprehensive account view with risk drivers and usage trends
- **Playbook Builder**: No-code UI for defining retention workflows
- **Outcome Analytics**: Measure retention impact and campaign ROI

## 🛠️ Technology Stack

- **Frontend**: React 18 with React Router
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Recharts for interactive data visualization
- **File Processing**: XLSX library for Excel file uploads
- **Icons**: Lucide React for consistent iconography

## 📁 Project Structure

```
customer-churn-mock-prd/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navigation.js
│   ├── pages/
│   │   ├── DataExplorer.js
│   │   ├── RiskDashboard.js
│   │   ├── Account360.js
│   │   ├── PlaybookBuilder.js
│   │   └── OutcomeAnalytics.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd customer-churn-mock-prd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Data Structure

### Excel File Format
The application expects Excel files with the following columns:
- `observation_id`: Unique identifier for each observation
- `job_title`: Role (CSM, Analyst, Ops Manager, AM)
- `session_date`: Date of the observation session
- `task_category`: Type of task performed
- `tools_used`: Tools utilized during the session
- `data_sources_accessed`: Data sources referenced

### Mock Data
The application includes comprehensive mock data for:
- Customer accounts with churn risk assessments
- Usage patterns and engagement metrics
- Retention playbook performance
- Campaign ROI and segment analysis

## 🎨 Design Philosophy

- **Modern & Clean**: Inspired by Salesforce and Datadog design patterns
- **Business-Friendly**: Intuitive interface for non-technical users
- **Responsive**: Mobile-first design approach
- **Accessible**: Clear navigation and consistent visual hierarchy

## 📱 Pages Overview

### 1. Data Explorer (Home)
- Excel file upload and analysis
- Interactive charts and filters
- Workflow observation insights

### 2. Risk Dashboard (MVP)
- KPI tiles for key metrics
- At-risk accounts table
- Monthly churn trends
- Quick action buttons

### 3. Account 360 (Phase 2)
- Detailed account view
- Risk driver analysis
- Usage and engagement metrics
- Recommended retention actions

### 4. Playbook Builder (Phase 2)
- No-code workflow creation
- Condition and action builders
- Playbook performance tracking

### 5. Outcome Analytics (Phase 3)
- Retention impact measurement
- Campaign ROI analysis
- Leadership reporting tools

## 🔧 Customization

### Adding New Metrics
1. Update the mock data in respective page components
2. Add new chart configurations
3. Modify KPI calculations as needed

### Styling Changes
- Modify `tailwind.config.js` for theme customization
- Update component classes for visual changes
- Add custom CSS in `src/index.css`

### Data Integration
- Replace mock data with real API calls
- Implement authentication and user management
- Add real-time data updates

## 📈 Business Value

### For Customer Success Teams
- Proactive identification of at-risk accounts
- Automated retention workflows
- Performance measurement and optimization

### For Business Leaders
- Churn reduction insights
- Campaign ROI tracking
- Strategic retention planning

### For Analysts
- Workflow optimization opportunities
- Data-driven retention strategies
- Performance benchmarking

## 🚧 Development Notes

### Current Status
- ✅ MVP wireframes complete
- ✅ Future vision concepts implemented
- ✅ Responsive design implemented
- ✅ Interactive charts and filters
- ✅ Mock data and scenarios

### Future Enhancements
- Real-time data integration
- Advanced analytics and ML predictions
- Multi-tenant architecture
- API integrations (Salesforce, HubSpot, etc.)
- Advanced reporting and dashboards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes. Please ensure compliance with your organization's policies before using in production.

## 📞 Support

For questions or support, please refer to the project documentation or create an issue in the repository.

---

**Built with ❤️ for customer success teams worldwide**
