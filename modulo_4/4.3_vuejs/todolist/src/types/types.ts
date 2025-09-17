export interface Task {
  name: string
  completed: boolean
}

export type TaskStatus = 'all' | 'completed' | 'pending'
