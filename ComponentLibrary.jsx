import React from 'react';
import { LayoutDashboard, Grid3x3 } from 'lucide-react';

const ComponentLibrary = ({ onAddComponent }) => {
  const components = [
    { type: 'hero', name: 'Hero Section', icon: LayoutDashboard },
    { type: 'features', name: 'Feature Grid', icon: Grid3x3 },
  ];

  return (
    <div>
      <h2 className="font-bold mb-2">Components</h2>
      <div className="space-y-2">
        {components.map((component, idx) => (
          <button
            key={idx}
            onClick={() => onAddComponent(component.type)}
            className="w-full flex items-center space-x-3 p-3 text-left bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-200 transition-colors"
          >
            <component.icon className="h-5 w-5 text-blue-500" />
            <span>{component.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ComponentLibrary;