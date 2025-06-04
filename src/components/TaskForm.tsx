
import React, { useState } from 'react';
import { Plus, Calendar, Tag, Flag } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'modifiedAt'>) => void;
  darkMode: boolean;
}

const TaskForm = ({ onAddTask, darkMode }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'urgent'>('medium');
  const [category, setCategory] = useState<'work' | 'personal' | 'shopping' | 'health'>('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
  };

  return (
    <div className={`p-6 rounded-3xl backdrop-blur-lg border transition-all duration-300 hover:shadow-xl ${
      darkMode 
        ? 'bg-white/5 border-white/10 shadow-lg shadow-purple-500/10' 
        : 'bg-white/20 border-white/30 shadow-lg shadow-blue-500/10'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
        darkMode ? 'text-white' : 'text-gray-800'
      }`}>
        <Plus className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white" size={32} />
        Add New Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              darkMode 
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' 
                : 'bg-white/50 border-white/30 text-gray-800 placeholder-gray-600'
            }`}
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`w-full p-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
              darkMode 
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' 
                : 'bg-white/50 border-white/30 text-gray-800 placeholder-gray-600'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                darkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/50 border-white/30 text-gray-800'
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
              className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                darkMode 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-white/50 border-white/30 text-gray-800'
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
            className={`w-full p-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
              darkMode 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-white/50 border-white/30 text-gray-800'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-purple-300"
        >
          Add Task ✨
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
