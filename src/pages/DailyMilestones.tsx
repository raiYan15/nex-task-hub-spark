
import React, { useState, useEffect } from 'react';
import { Calendar, Target, Clock, AlertTriangle, Home, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Task } from '../types/Task';
import AlarmSystem from '../components/AlarmSystem';

const DailyMilestones = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const savedTasks = localStorage.getItem('nextask-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    const savedTheme = localStorage.getItem('nextask-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate < today;
  });

  const completedToday = todaysTasks.filter(task => task.completed);
  const pendingToday = todaysTasks.filter(task => !task.completed);

  const completionRate = todaysTasks.length > 0 ? (completedToday.length / todaysTasks.length) * 100 : 0;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-purple-500' : 'bg-blue-300'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse delay-1000 ${
          darkMode ? 'bg-violet-500' : 'bg-pink-300'
        }`} />
      </div>

      <AlarmSystem tasks={tasks} darkMode={darkMode} />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className={`p-3 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-white/30 hover:bg-white/50 text-gray-800'
              }`}
            >
              <Home size={20} />
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Daily Milestones
            </h1>
          </div>
          
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-lg border ${
            darkMode 
              ? 'bg-white/10 border-white/20 text-white' 
              : 'bg-white/30 border-white/40 text-gray-800'
          }`}>
            <Calendar size={20} />
            <span className="font-medium">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Today's Progress */}
          <div className={`p-6 rounded-3xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/20 border-white/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-blue-500" size={24} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Today's Progress
              </h3>
            </div>
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {Math.round(completionRate)}%
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {completedToday.length} of {todaysTasks.length} tasks completed
            </p>
          </div>

          {/* Pending Tasks */}
          <div className={`p-6 rounded-3xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/20 border-white/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-yellow-500" size={24} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Pending Today
              </h3>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {pendingToday.length}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Tasks remaining
            </p>
          </div>

          {/* Overdue Tasks */}
          <div className={`p-6 rounded-3xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/20 border-white/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Overdue
              </h3>
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">
              {overdueTasks.length}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Needs attention
            </p>
          </div>

          {/* Completed Today */}
          <div className={`p-6 rounded-3xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/20 border-white/30'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-green-500" size={24} />
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Completed
              </h3>
            </div>
            <div className="text-3xl font-bold text-green-500 mb-2">
              {completedToday.length}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Great work!
            </p>
          </div>
        </div>

        {/* Task Lists */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Overdue Tasks */}
          {overdueTasks.length > 0 && (
            <div className={`p-6 rounded-3xl backdrop-blur-lg border ${
              darkMode 
                ? 'bg-white/5 border-red-500/30' 
                : 'bg-white/20 border-red-500/30'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 text-red-500 flex items-center gap-3`}>
                <AlertTriangle size={24} />
                Overdue Tasks ({overdueTasks.length})
              </h2>
              <div className="space-y-4">
                {overdueTasks.map(task => (
                  <div key={task.id} className={`p-4 rounded-xl border ${
                    darkMode 
                      ? 'bg-red-500/10 border-red-500/30' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Due: {new Date(task.dueDate!).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Today's Tasks */}
          <div className={`p-6 rounded-3xl backdrop-blur-lg border ${
            darkMode 
              ? 'bg-white/5 border-white/10' 
              : 'bg-white/20 border-white/30'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center gap-3`}>
              <Target size={24} />
              Today's Tasks ({todaysTasks.length})
            </h2>
            <div className="space-y-4">
              {todaysTasks.length === 0 ? (
                <p className={`text-center py-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No tasks scheduled for today
                </p>
              ) : (
                todaysTasks.map(task => (
                  <div key={task.id} className={`p-4 rounded-xl border transition-all duration-300 ${
                    task.completed
                      ? darkMode 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-green-50 border-green-200'
                      : darkMode 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-white/30 border-white/40'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : darkMode
                            ? 'border-gray-400'
                            : 'border-gray-300'
                      }`}>
                        {task.completed && <span className="text-xs">✓</span>}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          task.completed 
                            ? darkMode ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                            : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyMilestones;
