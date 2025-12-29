export interface Chore {
  id: string;
  title: string;
  description?: string;
  assignedProfileId: string;
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
  points: number;
  recurrence?: RecurrenceRule;
  completedAt?: Date;
  createdAt: Date;
}

export interface ChoreReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: Date;
  daysOfWeek?: number[];
}
