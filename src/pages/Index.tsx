
import React, { useState, useEffect } from 'react';
import { Search, Plus, Bell, Moon, Sun, Download, Sparkles } from 'lucide-react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterButtons from '../components/FilterButtons';
import ProfileSection from '../components/ProfileSection';
import TypewriterTitle from '../components/TypewriterTitle';
import MotivationalQuote from '../components/MotivationalQuote';
import NotificationBell from '../components/NotificationBell';
import ConfettiEffect from '../components/ConfettiEffect';
import { Task, TaskFilter, TaskSort } from '../types/Task';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('date');
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  // Load tasks from localStorage on component mount
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

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('nextask-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Check for confetti trigger when all tasks are completed
  useEffect(() => {
    const activeTasks = tasks.filter(task => !task.completed);
    if (tasks.length > 0 && activeTasks.length === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'modifiedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      modifiedAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task added successfully! 🎉",
      description: "Your new task has been added to the list.",
    });
  };

  const editTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, modifiedAt: new Date() }
        : task
    ));
    toast({
      title: "Task updated! ✨",
      description: "Your task has been successfully updated.",
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted! 🗑️",
      description: "The task has been removed from your list.",
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, modifiedAt: new Date() }
        : task
    ));
  };

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('nextask-theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nextask-tasks-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Tasks exported! 📁",
      description: "Your tasks have been downloaded as a JSON file.",
    });
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || 
                           (filter === 'completed' && task.completed) ||
                           (filter === 'active' && !task.completed);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const pendingTasksCount = tasks.filter(task => !task.completed).length;

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

      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect />}

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex-1">
            <TypewriterTitle />
            <MotivationalQuote darkMode={darkMode} />
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell count={pendingTasksCount} darkMode={darkMode} />
            
            <button
              onClick={exportTasks}
              className={`p-3 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-white/30 hover:bg-white/50 text-gray-800'
              }`}
              title="Export Tasks"
            >
              <Download size={20} />
            </button>
            
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-2xl backdrop-blur-lg transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-white/30 hover:bg-white/50 text-gray-800'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <ProfileSection darkMode={darkMode} />
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Task Form */}
          <div className="lg:col-span-1">
            <TaskForm onAddTask={addTask} darkMode={darkMode} />
          </div>

          {/* Right Column - Task Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <div className={`p-6 rounded-3xl backdrop-blur-lg border transition-all duration-300 ${
              darkMode 
                ? 'bg-white/5 border-white/10' 
                : 'bg-white/20 border-white/30'
            }`}>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`} size={20} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400' 
                      : 'bg-white/50 border-white/30 text-gray-800 placeholder-gray-600'
                  }`}
                />
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FilterButtons 
                  currentFilter={filter} 
                  onFilterChange={setFilter}
                  darkMode={darkMode}
                />
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as TaskSort)}
                  className={`px-4 py-2 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-purple-500 ${
                    darkMode 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-white/50 border-white/30 text-gray-800'
                  }`}
                >
                  <option value="date">Sort by Date</option>
                  <option value="priority">Sort by Priority</option>
                  <option value="alphabetical">Sort A-Z</option>
                </select>
              </div>
            </div>

            {/* Task List */}
            <TaskList 
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              darkMode={darkMode}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className={`mt-16 text-center py-6 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p className="flex items-center justify-center gap-2">
            Built with <span className="text-blue-500">💙</span> by Raiyan
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
