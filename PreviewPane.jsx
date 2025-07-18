import React from 'react';
import HeroSection from '../Blocks/HeroSection';
import FeatureGrid from '../Blocks/FeatureGrid';

const blockMap = {
  hero: HeroSection,
  features: FeatureGrid,
};

const PreviewPane = ({ components, selectedComponent, onSelectComponent }) => {
  if (components.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">
        <h2 className="text-xl font-bold">Drop components here</h2>
        <p>Start building your page from the library on the left.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {components.map((comp) => {
        const Component = blockMap[comp.type];
        if (!Component) return null;
        return (
          <div key={comp.id} onClick={() => onSelectComponent(comp)}>
            <Component {...comp.props} id={comp.id} isSelected={selectedComponent?.id === comp.id} />
          </div>
        );
      })}
    </div>
  );
};

export default PreviewPane;