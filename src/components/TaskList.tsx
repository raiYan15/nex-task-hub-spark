
import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onEditTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  darkMode: boolean;
}

const TaskList = ({ tasks, onToggleTask, onEditTask, onDeleteTask, darkMode }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className={`text-center py-16 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
        <p>Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Your Tasks ({tasks.length})
      </h2>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <TaskItem
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onEdit={onEditTask}
              onDelete={() => onDeleteTask(task.id)}
              darkMode={darkMode}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
