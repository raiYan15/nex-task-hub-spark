
import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Clock, Flag, Tag } from 'lucide-react';
import { Task, PRIORITY_COLORS, CATEGORY_COLORS } from '../types/Task';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditTaskModal from './EditTaskModal';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onEdit: (taskId: string, updates: Partial<Task>) => void;
  onDelete: () => void;
  darkMode: boolean;
}

const TaskItem = ({ task, onToggle, onEdit, onDelete, darkMode }: TaskItemProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <>
      <div className={`p-6 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        darkMode 
          ? 'bg-white/5 border-white/10 shadow-lg shadow-purple-500/5' 
          : 'bg-white/30 border-white/40 shadow-lg shadow-blue-500/10'
      } ${task.completed ? 'opacity-75' : ''} ${isOverdue ? 'ring-2 ring-red-400' : ''}`}>
        
        <div className="flex items-start gap-4">
          {/* Custom Checkbox */}
          <button
            onClick={onToggle}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-110 ${
              task.completed
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-400'
                : darkMode 
                  ? 'border-white/30 hover:border-purple-400' 
                  : 'border-gray-300 hover:border-purple-400'
            }`}
          >
            {task.completed && (
              <div className="w-full h-full flex items-center justify-center text-white animate-scale-in">
                ✓
              </div>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className={`text-lg font-semibold transition-all duration-300 ${
                task.completed 
                  ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                  : darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEditModal(true)}
                  className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                    darkMode 
                      ? 'hover:bg-white/10 text-gray-300 hover:text-white' 
                      : 'hover:bg-black/10 text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Edit size={16} />
                </button>
                
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-110"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {task.description && (
              <p className={`mb-4 ${
                task.completed 
                  ? darkMode ? 'text-gray-500' : 'text-gray-500'
                  : darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}

            {/* Tags and Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {/* Priority Tag */}
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-white font-medium ${PRIORITY_COLORS[task.priority]}`}>
                <Flag size={12} />
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>

              {/* Category Tag */}
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-white font-medium ${CATEGORY_COLORS[task.category]}`}>
                <Tag size={12} />
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>

              {/* Due Date */}
              {task.dueDate && (
                <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  isOverdue 
                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                    : darkMode ? 'bg-white/10 text-gray-300' : 'bg-black/10 text-gray-700'
                }`}>
                  <Calendar size={12} />
                  {formatDate(task.dueDate)}
                  {isOverdue && ' (Overdue)'}
                </span>
              )}

              {/* Created Time */}
              <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                darkMode ? 'bg-white/5 text-gray-400' : 'bg-black/5 text-gray-500'
              }`}>
                <Clock size={12} />
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDelete}
        taskTitle={task.title}
        darkMode={darkMode}
      />

      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={(updates) => onEdit(task.id, updates)}
        darkMode={darkMode}
      />
    </>
  );
};

export default TaskItem;
