import React from 'react';
import { MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, trend = 'up', caption, loading }) {
  const trendUp = trend === 'up';
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <article className="stat-card">
      <div className="stat-topline">
        <span className={`stat-icon ${trendUp ? 'teal' : 'red'}`}>
          <Icon size={14} />
        </span>
        <button className="icon-button" type="button" aria-label={`${label} options`}>
          <MoreHorizontal size={15} />
        </button>
      </div>
      <p>{label}</p>
      <div className="stat-body">
        {loading ? <div className="stat-skeleton" /> : <strong>{value.toLocaleString()}</strong>}
        <span className={`trend ${trendUp ? 'positive' : 'negative'}`}>
          <TrendIcon size={11} />
          {caption}
        </span>
      </div>
    </article>
  );
}
