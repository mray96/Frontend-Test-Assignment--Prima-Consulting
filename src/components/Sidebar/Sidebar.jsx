import React from 'react';
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
  Package,
  Settings,
  Ship,
  Truck,
} from 'lucide-react';

const generalItems = [
  { label: 'Dashboard', icon: BarChart3, active: true },
  { label: 'Tracking', icon: Truck },
  { label: 'Shipments', icon: Package },
];

const otherItems = [
  { label: 'Settings', icon: Settings },
  { label: 'Log out', icon: LogOut },
];

function NavItem({ item, collapsed }) {
  const Icon = item.icon;

  return (
    <button
      className={`nav-item ${item.active ? 'active' : ''}`}
      type="button"
      title={collapsed ? item.label : undefined}
    >
      <Icon size={17} strokeWidth={2.2} />
      <span>{item.label}</span>
    </button>
  );
}

export default function Sidebar({ collapsed, mobileOpen, onToggle, onClose }) {
  const CollapseIcon = collapsed ? ChevronRight : ChevronLeft;

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
      aria-label="Main navigation"
    >
      <button className="sidebar-close-button" type="button" aria-label="Close navigation" onClick={onClose}>
        <X size={18} />
      </button>
      <div className="logo">
        <span className="logo-mark">
          <Ship size={22} />
        </span>
        <span className="logo-text">Prima Ship</span>
      </div>
      <button
        className="collapse-button"
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        aria-expanded={!collapsed}
        onClick={onToggle}
      >
        <CollapseIcon size={15} />
      </button>

      <nav>
        <p className="nav-section">General</p>
        {generalItems.map((item) => (
          <NavItem item={item} collapsed={collapsed} key={item.label} />
        ))}

        <p className="nav-section nav-section-spaced">Others</p>
        {otherItems.map((item) => (
          <NavItem item={item} collapsed={collapsed} key={item.label} />
        ))}
      </nav>
    </aside>
  );
}
