import { forwardRef } from 'react';
import { Task as TaskType } from '../../types/task.type';
import { Task } from './Task.component';
import './TasksList.component.css';

interface TasksListProps {
  tasks: TaskType[];
  onDelete(taskId: string): void;
  onUpdate(task: TaskType): void;
}

export const TasksList = forwardRef<
  HTMLOListElement,
  Readonly<TasksListProps>
>(({ tasks, onUpdate, onDelete }, ref) => {
  const tasksList = tasks.map((task) => {
    return (
      <Task
        task={task}
        onDelete={onDelete}
        onUpdate={onUpdate}
        key={task.id}
      />
    );
  });

  return (
    <form>
      <ol ref={ref} className="tasks-list">
        {tasksList}
      </ol>
    </form>
  );
});
