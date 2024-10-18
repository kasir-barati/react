import { Task } from './Task.component';
import { useTasks } from './TasksContext.component';
import './TasksList.component.css';

export function TasksList() {
  const tasks = useTasks();
  const tasksList = tasks.map((task) => {
    return <Task task={task} key={task.id} />;
  });

  return (
    <form>
      <ol className="tasks-list">{tasksList}</ol>
    </form>
  );
}
