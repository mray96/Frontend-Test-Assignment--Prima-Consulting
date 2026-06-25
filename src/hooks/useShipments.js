import { useEffect, useMemo, useState } from 'react';
import { fetchShipments } from '../api/shipments';

export function useShipments() {
  const [shipments, setShipments] = useState([]);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadShipments() {
      setLoading(true);
      setError('');

      try {
        const payload = await fetchShipments({
          page,
          pageSize,
          query: search,
          signal: controller.signal,
        });
        setStats(payload.stats);
        setShipments(payload.shipping_data.data);
        setPagination({
          total: payload.shipping_data.total,
          totalPages: payload.shipping_data.totalPages,
        });
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message || 'Unable to load shipments.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadShipments();

    return () => controller.abort();
  }, [page, pageSize, search]);

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const statusMatches = statusFilter === 'all' || shipment.status === statusFilter;
      const categoryMatches =
        categoryFilter === 'all' || shipment.product_category === categoryFilter;
      const monthMatches = monthFilter === 'all' || shipment.date.startsWith(monthFilter);

      return statusMatches && categoryMatches && monthMatches;
    });
  }, [shipments, statusFilter, categoryFilter, monthFilter]);

  const options = useMemo(() => {
    const months = Array.from(
      new Map(
        shipments.map((shipment) => {
          const value = shipment.date.slice(0, 7);
          const label = new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
          }).format(new Date(`${shipment.date}T00:00:00`));

          return [value, label];
        }),
      ).entries(),
    )
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => b.value.localeCompare(a.value));

    return {
      statuses: Array.from(new Set(shipments.map((shipment) => shipment.status))).sort(),
      categories: Array.from(new Set(shipments.map((shipment) => shipment.product_category))).sort(),
      months,
    };
  }, [shipments]);

  function changeSearch(value) {
    setSearch(value);
    setPage(1);
  }

  function changePageSize(value) {
    setPageSize(Number(value));
    setPage(1);
  }

  function changeMonth(value) {
    setMonthFilter(value);
    setPage(1);
  }

  return {
    shipments,
    filteredShipments,
    stats,
    page,
    pageSize,
    search,
    statusFilter,
    categoryFilter,
    monthFilter,
    pagination,
    loading,
    error,
    options,
    setPage,
    setStatusFilter,
    setCategoryFilter,
    setMonthFilter: changeMonth,
    setSearch: changeSearch,
    setPageSize: changePageSize,
  };
}
