
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'urgent';
  category: 'work' | 'personal' | 'shopping' | 'health';
  dueDate?: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export type TaskFilter = 'all' | 'completed' | 'active';
export type TaskSort = 'date' | 'priority' | 'alphabetical';

export const PRIORITY_COLORS = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  urgent: 'bg-red-500'
};

export const CATEGORY_COLORS = {
  work: 'bg-blue-500',
  personal: 'bg-purple-500',
  shopping: 'bg-pink-500',
  health: 'bg-green-500'
};
