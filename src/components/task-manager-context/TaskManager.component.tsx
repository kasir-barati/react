import { CreateTask } from './CreateTask.component';
import { TasksList } from './TasksList.component';
import { TasksProvider } from './TasksContext.component';
import './TaskManager.component.css';

export function TaskManager() {
  return (
    <TasksProvider>
      <section className="task-manager">
        <h2>Task manager</h2>
        <CreateTask />
        <TasksList />
      </section>
    </TasksProvider>
  );
}
