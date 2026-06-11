import React from 'react';
import { Card } from '@heroui/react';

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor = "bg-zinc-800/80", 
  iconColor = "text-zinc-400" 
}) {
  return (
    <Card 
      variant="default"
      className="border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-md hover:border-zinc-700/80 transition-all duration-300 shadow-xl group rounded-2xl cursor-pointer"
    >
      {/* Latest HeroUI v3 layout syntax maps to Card.Content */}
      <Card.Content className="p-6 flex flex-col justify-between gap-6">
        
        {/* Icon Wrapper */}
        <div className={`w-11 h-11 flex items-center justify-center rounded-xl ${iconBgColor} border border-zinc-700/30 group-hover:scale-105 transition-transform duration-300`}>
          {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
        </div>

        {/* Text Metrics Content */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider select-none">
            {title}
          </p>
          <h3 className="text-3xl font-semibold text-zinc-100 tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
        </div>

      </Card.Content>
    </Card>
  );
}