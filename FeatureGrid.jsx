import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Star, Zap, Shield } from 'lucide-react';

const FeatureGrid = ({ id, title, features, isSelected, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    outline: isSelected ? '2px solid #3b82f6' : 'none',
    outlineOffset: '4px',
  };

  const icons = [Star, Zap, Shield];

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={index} className="flex items-start space-x-4">
              <Icon className="w-6 h-6 text-blue-500 mt-1" />
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureGrid;