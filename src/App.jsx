import React, { useState } from 'react';
import { useEffect } from 'react';
import { Boxes, Clock3, PackageCheck, Truck } from 'lucide-react';
import Header from './components/Header/Header';
import ShipmentsTable from './components/ShipmentsTable/ShipmentsTable';
import Sidebar from './components/Sidebar/Sidebar';
import StatCard from './components/StatCard/StatCard';
import { useShipments } from './hooks/useShipments';

export default function App() {
  const shipmentsState = useShipments();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const stats = shipmentsState.stats;
  const statCards = [
    {
      label: 'Total Shipments',
      value: stats?.total_shipments || 0,
      icon: Boxes,
      trend: 'up',
      caption: 'Up by 13% than last week',
    },
    {
      label: 'Pending',
      value: stats?.pending || 0,
      icon: Clock3,
      trend: 'down',
      caption: 'Down 4% than this week',
    },
    {
      label: 'Delivery',
      value: stats?.delivered || 0,
      icon: Truck,
      trend: 'up',
      caption: 'Up by 13% than this week',
    },
    {
      label: 'Completed',
      value: stats?.completed || 0,
      icon: PackageCheck,
      trend: 'up',
      caption: 'Up by 23% than this week',
    },
  ];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 820) {
        setMobileSidebarOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
      {mobileSidebarOpen ? (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={() => setSidebarCollapsed((current) => !current)}
        onClose={() => setMobileSidebarOpen(false)}
      />
      <main className="main-content">
        <Header onMenuClick={() => setMobileSidebarOpen(true)} />
        <section className="stats-grid" aria-label="Shipment summary">
          {statCards.map((card) => (
            <StatCard {...card} loading={shipmentsState.loading} key={card.label} />
          ))}
        </section>
        <ShipmentsTable
          rows={shipmentsState.filteredShipments}
          loading={shipmentsState.loading}
          error={shipmentsState.error}
          search={shipmentsState.search}
          onSearchChange={shipmentsState.setSearch}
          page={shipmentsState.page}
          pageSize={shipmentsState.pageSize}
          total={shipmentsState.pagination.total}
          totalPages={shipmentsState.pagination.totalPages}
          onPageChange={shipmentsState.setPage}
          onPageSizeChange={shipmentsState.setPageSize}
          statusFilter={shipmentsState.statusFilter}
          categoryFilter={shipmentsState.categoryFilter}
          monthFilter={shipmentsState.monthFilter}
          onStatusFilterChange={shipmentsState.setStatusFilter}
          onCategoryFilterChange={shipmentsState.setCategoryFilter}
          onMonthFilterChange={shipmentsState.setMonthFilter}
          options={shipmentsState.options}
        />
      </main>
    </div>
  );
}
