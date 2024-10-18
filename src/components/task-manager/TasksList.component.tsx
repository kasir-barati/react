import { Task as TaskType } from '../../types/task.type';
import { Task } from './Task.component';
import './TasksList.component.css';

interface TasksListProps {
  tasks: TaskType[];
  onDelete(taskId: string): void;
  onUpdate(task: TaskType): void;
}

export function TasksList({
  tasks,
  onUpdate,
  onDelete,
}: Readonly<TasksListProps>) {
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
      <ol className="tasks-list">{tasksList}</ol>
    </form>
  );
}
