import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ComponentLibrary from './components/Editor/ComponentLibrary';
import PreviewPane from './components/Editor/PreviewPane';
import { useEditor } from './hooks/useEditor';

function App() {
  const {
    components,
    addComponent,
    moveComponent,
    selectedComponent,
    setSelectedComponent,
  } = useEditor();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      moveComponent(active.id, over.id);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <div className="w-1/4 p-4 border-r bg-white">
        <ComponentLibrary onAddComponent={addComponent} />
      </div>
      <div className="flex-1 p-4">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={components.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <PreviewPane
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
            />
          </SortableContext>
        </DndContext>
      </div>
      <div className="w-1/4 p-4 border-l bg-white">
        <h2 className="font-bold mb-2">Properties</h2>
        {selectedComponent ? (
          <div>Editing: {selectedComponent.type}</div>
        ) : (
          <p>Select a component to edit its properties.</p>
        )}
      </div>
    </div>
  );
}

export default App;