export interface TaskData {
    id: number;
    title: string;
    description: string;
    priority: string;
  }
  
  export interface CardItemProps {
    data: TaskData;
    onEdit: (task: TaskData) => void;
    onDelete: (id: number) => void;
  }