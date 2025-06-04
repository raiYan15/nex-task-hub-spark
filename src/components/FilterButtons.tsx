
import React from 'react';
import { TaskFilter } from '../types/Task';

interface FilterButtonsProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  darkMode: boolean;
}

const FilterButtons = ({ currentFilter, onFilterChange, darkMode }: FilterButtonsProps) => {
  const filters: { key: TaskFilter; label: string; emoji: string }[] = [
    { key: 'all', label: 'All', emoji: '📋' },
    { key: 'active', label: 'Active', emoji: '⏳' },
    { key: 'completed', label: 'Completed', emoji: '✅' },
  ];

  return (
    <div className="flex gap-2">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            currentFilter === filter.key
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : darkMode
                ? 'bg-white/10 hover:bg-white/20 text-gray-300'
                : 'bg-white/30 hover:bg-white/50 text-gray-700'
          }`}
        >
          {filter.emoji} {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
