import { useState, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

const getDefaultProps = (type) => {
  const defaults = {
    hero: {
      headline: 'Launch Your Next Big Thing',
      subheadline: 'An amazing product for our amazing team.',
      ctaText: 'Get Started',
    },
    features: {
      title: 'Key Features',
      features: [
        { title: 'Feature One', description: 'Description for the first feature.' },
        { title: 'Feature Two', description: 'Description for the second feature.' },
        { title: 'Feature Three', description: 'Description for the third feature.' }
      ]
    },
  };
  return defaults[type] || {};
};

export const useEditor = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateHistory = (newComponents) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newComponents);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const addComponent = useCallback((componentType) => {
    const newComponent = {
      id: Date.now(),
      type: componentType,
      props: getDefaultProps(componentType),
    };

    setComponents(prev => {
      const newComponents = [...prev, newComponent];
      updateHistory(newComponents);
      return newComponents;
    });
  }, [history, historyIndex]);

  const moveComponent = useCallback((activeId, overId) => {
    setComponents((items) => {
      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === overId);
      const newItems = arrayMove(items, oldIndex, newIndex);
      updateHistory(newItems);
      return newItems;
    });
  }, [history, historyIndex]);

  return {
    components,
    setComponents,
    selectedComponent,
    setSelectedComponent,
    addComponent,
    moveComponent,
  };
};