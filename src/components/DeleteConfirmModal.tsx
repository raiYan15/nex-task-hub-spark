
import React from 'react';
import { X, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
  darkMode: boolean;
}

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle, darkMode }: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
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
      <div className={`relative max-w-md w-full p-6 rounded-3xl backdrop-blur-lg border animate-scale-in ${
        darkMode 
          ? 'bg-gray-900/90 border-white/20' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold flex items-center gap-3 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            <Trash2 className="text-red-500" size={24} />
            Delete Task
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

        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Are you sure you want to delete the task <strong>"{taskTitle}"</strong>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
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
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
