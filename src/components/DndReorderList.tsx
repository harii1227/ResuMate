import React, { useState } from 'react';

interface DndReorderListProps {
  items: string[];
  labels: Record<string, string>;
  onReorder: (newOrder: string[]) => void;
  hiddenItems?: string[];
  onToggleVisibility?: (itemId: string) => void;
}

export const DndReorderList: React.FC<DndReorderListProps> = ({
  items,
  labels,
  onReorder,
  hiddenItems = [],
  onToggleVisibility,
}) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Set dummy image / transparent drag layer for styling if needed, otherwise use browser default
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedList = [...items];
    const draggedItem = updatedList[draggedItemIndex];
    
    // Remove the dragged item
    updatedList.splice(draggedItemIndex, 1);
    // Insert into the new drop position
    updatedList.splice(index, 0, draggedItem);

    onReorder(updatedList);
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    onReorder(updated);
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    onReorder(updated);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isDragging = index === draggedItemIndex;
        const isOver = index === dragOverIndex;
        const isHidden = hiddenItems.includes(item);

        return (
          <div
            key={item}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
              isDragging
                ? 'opacity-40 border-violet-500 bg-violet-500/5'
                : isOver
                ? 'border-violet-500 bg-violet-600/10 scale-[1.02] translate-y-1'
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              {onToggleVisibility && (
                <input
                  type="checkbox"
                  checked={!isHidden}
                  onChange={() => onToggleVisibility(item)}
                  className="w-4.5 h-4.5 rounded border-slate-700 bg-slate-950 text-indigo-650 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer"
                  title={isHidden ? "Show section" : "Hide section"}
                />
              )}
              {/* Drag Handle Icon */}
              <div className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <span className={`text-sm font-semibold ${isHidden ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                {labels[item] || item}
              </span>
            </div>

            {/* Accessibility fallback reordering arrows */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent ${index === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                title="Move Up"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className={`p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent ${index === items.length - 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                title="Move Down"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
