import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const HeroSection = ({ id, headline, subheadline, ctaText, isSelected, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    outline: isSelected ? '2px solid #3b82f6' : 'none',
    outlineOffset: '4px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold">{headline}</h1>
      <p className="text-gray-600 mt-2">{subheadline}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">{ctaText}</button>
    </div>
  );
};

export default HeroSection;