import React from 'react';
import { CalendarDays, ChevronDown, Filter, Search } from 'lucide-react';
import { titleize } from '../../constants/statusConfig';
import { formatDate, formatFollowUpDate } from '../../utils/formatDate';
import ErrorMessage from '../common/ErrorMessage';
import Loader from '../common/Loader';
import Pagination from './Pagination';
import StatusBadge from './StatusBadge';

function splitRoute(route = '') {
  const [origin, destination] = route.split(/\s*(?:\u2192|->)\s*/);
  return [origin || 'Unknown', destination || 'Unknown'];
}

export default function ShipmentsTable({
  rows,
  loading,
  error,
  search,
  onSearchChange,
  page,
  pageSize,
  total,
  totalPages,
  onPageChange,
  onPageSizeChange,
  statusFilter,
  categoryFilter,
  monthFilter,
  onStatusFilterChange,
  onCategoryFilterChange,
  onMonthFilterChange,
  options,
}) {
  const selectedMonthLabel =
    monthFilter === 'all'
      ? 'All dates'
      : options.months.find((option) => option.value === monthFilter)?.label || 'All dates';

  function selectMonth(value, event) {
    onMonthFilterChange(value);
    const details = event.currentTarget.closest('details');
    if (details) {
      details.open = false;
    }
  }

  return (
    <section className="table-card">
      <div className="table-toolbar">
        <h2>Shipments Data</h2>
        <div className="toolbar-actions">
          <label className="search-field">
            <span className="sr-only">Search shipments</span>
            <Search size={16} />
            <input
              type="search"
              placeholder="Search Id, Company, etc"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
          </label>

          <details className="filter-menu">
            <summary>
              <Filter size={15} />
              Filter
            </summary>
            <div className="filter-panel">
              <label>
                Status
                <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value)}>
                  <option value="all">All statuses</option>
                  {options.statuses.map((status) => (
                    <option value={status} key={status}>
                      {titleize(status)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Product category
                <select
                  value={categoryFilter}
                  onChange={(event) => onCategoryFilterChange(event.target.value)}
                >
                  <option value="all">All categories</option>
                  {options.categories.map((category) => (
                    <option value={category} key={category}>
                      {titleize(category)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </details>

          <details className="month-menu">
            <summary aria-label="Month filter">
              <CalendarDays size={14} />
              {selectedMonthLabel}
              <ChevronDown size={12} />
            </summary>
            <div className="filter-panel month-panel">
              <button className="month-option" type="button" onClick={(event) => selectMonth('all', event)}>
                All dates
              </button>
              {options.months.map((option) => (
                <button
                  className={`month-option ${monthFilter === option.value ? 'active' : ''}`}
                  key={option.value}
                  type="button"
                  onClick={(event) => selectMonth(option.value, event)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>

      {error ? <ErrorMessage message={error} /> : null}
      {loading ? <Loader rows={7} /> : null}

      {!loading && !error ? (
        <>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Shipping ID</th>
                  <th scope="col">Company</th>
                  <th scope="col">Product Category</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Route</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((shipment) => {
                  const [origin, destination] = splitRoute(shipment.route);

                  return (
                    <tr key={shipment.shipping_id}>
                      <td className="id-cell">{shipment.shipping_id}</td>
                      <td>{shipment.company_name}</td>
                      <td>{titleize(shipment.product_category)}</td>
                      <td>{shipment.weight.toLocaleString()} kg</td>
                      <td>
                        <span>{origin}</span>
                        <small>{destination}</small>
                      </td>
                      <td>
                        <span>{formatDate(shipment.date)}</span>
                        <small>{formatFollowUpDate(shipment.date)}</small>
                      </td>
                      <td>
                        <StatusBadge status={shipment.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {rows.length === 0 ? (
            <div className="empty-state">No shipments match the current search or filters.</div>
          ) : null}

          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </>
      ) : null}
    </section>
  );
}
