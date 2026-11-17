import {
  BarChart3,
  Code2,
  Database,
  Layers,
  LayoutDashboard,
  LineChart,
  PieChart,
  Search,
  Server,
  Sigma,
  Sparkles,
  Table,
  Workflow,
} from 'lucide-react';
import type { SkillIconKey } from '../types/portfolio';

export function renderSkillIcon(iconKey: SkillIconKey, className = 'w-5 h-5') {
  switch (iconKey) {
    case 'bar-chart-3':
      return <BarChart3 className={className} />;
    case 'table':
      return <Table className={className} />;
    case 'database':
      return <Database className={className} />;
    case 'server':
      return <Server className={className} />;
    case 'code-2':
      return <Code2 className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'sigma':
      return <Sigma className={className} />;
    case 'line-chart':
      return <LineChart className={className} />;
    case 'workflow':
      return <Workflow className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'search':
      return <Search className={className} />;
    case 'pie-chart':
      return <PieChart className={className} />;
    case 'layout-dashboard':
      return <LayoutDashboard className={className} />;
    default:
      return <BarChart3 className={className} />;
  }
}

export const SKILL_ICON_OPTIONS: { value: SkillIconKey; label: string }[] = [
  { value: 'bar-chart-3', label: 'Bar Chart (Power BI)' },
  { value: 'table', label: 'Table / Spreadsheet (Excel)' },
  { value: 'database', label: 'Database (SQL)' },
  { value: 'server', label: 'Server (PostgreSQL)' },
  { value: 'code-2', label: 'Code (Python)' },
  { value: 'layers', label: 'Dataframes (Pandas)' },
  { value: 'sigma', label: 'Numerical (NumPy)' },
  { value: 'line-chart', label: 'Line Chart (Matplotlib)' },
  { value: 'workflow', label: 'ETL Workflow (Power Query)' },
  { value: 'sparkles', label: 'Data Cleaning' },
  { value: 'search', label: 'Exploratory Analysis' },
  { value: 'pie-chart', label: 'Data Visualization' },
  { value: 'layout-dashboard', label: 'Dashboard Layout' },
];
