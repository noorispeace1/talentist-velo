import React from 'react';
import StatCard from './StatCard';

export default function StatsGrid({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full p-6 text-center text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
        No statistics available.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {data.map((stat, index) => (
        <StatCard
          key={stat.id || index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}