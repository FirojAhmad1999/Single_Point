import React from 'react';
import { NavItem } from './NavItem';
import {
  LayoutGrid, Ship, FileText, Building2,
  Users, CheckSquare, Archive, History
} from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
      <NavItem to="/dashboard" icon={LayoutGrid}>Pipelines</NavItem>
      <NavItem to="/fleet" icon={Ship}>Fleet</NavItem>
      <NavItem to="/invoices" icon={FileText}>Invoices</NavItem>
      <NavItem to="/companies" icon={Building2}>My Companies</NavItem>
      <NavItem to="/people" icon={Users}>My People</NavItem>
      <NavItem to="/tasks" icon={CheckSquare}>Tasks To Do</NavItem>
      <NavItem to="/operators" icon={Users}>Operators</NavItem>
      <NavItem to="/archived" icon={Archive}>Archived Pipelines</NavItem>
      <NavItem to="/history" icon={History}>Docs History</NavItem>
    </nav>
  );
};

export default Navigation;