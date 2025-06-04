
import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Tag, Flag } from 'lucide-react';
import { Task } from '../types/Task';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSave: (updates: Partial<Task>) => void;
  darkMode: boolean;
}

const EditTaskModal = ({ isOpen, onClose, task, onSave, darkMode }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [category, setCategory] = useState(task.category);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''
  );

  useEffect(() => {
    if (isOpen) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setCategory(task.category);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '');
    }
  }, [isOpen, task]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative max-w-lg w-full p-6 rounded-3xl backdrop-blur-lg border animate-scale-in max-h-[90vh] overflow-y-auto ${
        darkMode 
          ? 'bg-gray-900/90 border-white/20' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-3 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <Save className="text-blue-500" size={24} />
            Edit Task
          </h2>
          
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
              darkMode 
                ? 'hover:bg-white/10 text-gray-300' 
                : 'hover:bg-black/10 text-gray-600'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/50 border-gray-300 text-gray-800'
              }`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 resize-none ${
                darkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/50 border-gray-300 text-gray-800'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Flag size={16} />
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'urgent')}
                className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-gray-300 text-gray-800'
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <Tag size={16} />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'work' | 'personal' | 'shopping' | 'health')}
                className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-white/50 border-gray-300 text-gray-800'
                }`}
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 flex items-center gap-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <Calendar size={16} />
              Due Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                darkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/50 border-gray-300 text-gray-800'
              }`}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
              darkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Cancel
          </button>
          
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
