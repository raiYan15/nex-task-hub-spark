
import React, { useEffect, useState, useRef } from 'react';
import { AlertTriangle, X, Volume2 } from 'lucide-react';
import { Task } from '../types/Task';

interface AlarmSystemProps {
  tasks: Task[];
  darkMode: boolean;
}

const AlarmSystem = ({ tasks, darkMode }: AlarmSystemProps) => {
  const [overdueAlerts, setOverdueAlerts] = useState<Task[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Create alarm sound using Web Audio API
  const createAlarmSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Create a pleasant but attention-grabbing melody
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // G5
    oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.6); // C6

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
    
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  // Check for overdue tasks every minute
  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      const overdue = tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        const dueDate = new Date(task.dueDate);
        return dueDate < now;
      });

      // Only trigger alarm for new overdue tasks
      const newOverdue = overdue.filter(task => 
        !overdueAlerts.some(alert => alert.id === task.id)
      );

      if (newOverdue.length > 0) {
        setOverdueAlerts(prev => [...prev, ...newOverdue]);
        createAlarmSound();
      }
    };

    // Check immediately
    checkOverdueTasks();

    // Then check every minute
    const interval = setInterval(checkOverdueTasks, 60000);

    return () => clearInterval(interval);
  }, [tasks, overdueAlerts]);

  const dismissAlert = (taskId: string) => {
    setOverdueAlerts(prev => prev.filter(alert => alert.id !== taskId));
  };

  const dismissAllAlerts = () => {
    setOverdueAlerts([]);
  };

  if (overdueAlerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {overdueAlerts.map(task => (
        <div
          key={task.id}
          className={`p-4 rounded-2xl backdrop-blur-lg border animate-bounce ${
            darkMode 
              ? 'bg-red-900/30 border-red-500/50 text-white' 
              : 'bg-red-50/90 border-red-300/50 text-red-900'
          } shadow-xl`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 flex items-center gap-2">
              <AlertTriangle className="text-red-500 animate-pulse" size={20} />
              {isPlaying && <Volume2 className="text-red-500 animate-pulse" size={16} />}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">Task Overdue!</h4>
              <p className="text-sm font-medium truncate">{task.title}</p>
              <p className="text-xs opacity-75">
                Due: {new Date(task.dueDate!).toLocaleDateString()} at{' '}
                {new Date(task.dueDate!).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            
            <button
              onClick={() => dismissAlert(task.id)}
              className={`flex-shrink-0 p-1 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-red-800/50' 
                  : 'hover:bg-red-200/50'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ))}
      
      {overdueAlerts.length > 1 && (
        <button
          onClick={dismissAllAlerts}
          className={`w-full p-3 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-105 ${
            darkMode 
              ? 'bg-red-900/30 border-red-500/50 text-white hover:bg-red-900/50' 
              : 'bg-red-50/90 border-red-300/50 text-red-900 hover:bg-red-100/90'
          } text-sm font-medium`}
        >
          Dismiss All ({overdueAlerts.length})
        </button>
      )}
    </div>
  );
};

export default AlarmSystem;
