import { useReducer, useRef } from 'react';
import { CreateTask } from './CreateTask.component';
import { TasksList } from './TasksList.component';
import { tasks as initialTasks } from '../../dummy-data/tasks.dummy-data';
import './TaskManager.component.css';
import { Task } from '../../types/task.type';
import { flushSync } from 'react-dom';

export function TaskManager() {
  const tasksListRef = useRef<HTMLOListElement>(null);
  const [tasks, dispatch] = useReducer(reducer, initialTasks);

  function handleCreate(taskName: string) {
    // Force React to update (AKA flush) the DOM synchronously!
    flushSync(() => {
      dispatch({
        type: 'create',
        taskName,
      });
    });
    tasksListRef.current?.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
  function handleUpdate(task: Task) {
    dispatch({
      type: 'update',
      taskId: task.id,
      taskName: task.name,
      taskInProgress: task.inProgress,
    });
  }
  function handleDelete(taskId: string) {
    dispatch({
      type: 'delete',
      taskId,
    });
  }

  return (
    <section className="task-manager">
      <h2>Task manager</h2>
      <CreateTask onCreate={handleCreate} />
      <TasksList
        ref={tasksListRef}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        tasks={tasks}
      />
    </section>
  );
}

// discriminated unions
interface CreateTaskManagerAction {
  type: 'create';
  taskName: string;
}
interface UpdateTaskManagerAction {
  type: 'update';
  taskId: string;
  taskName: string;
  taskInProgress: boolean;
}
interface DeleteTaskManagerAction {
  type: 'delete';
  taskId: string;
}
type TaskManagerAction =
  | CreateTaskManagerAction
  | UpdateTaskManagerAction
  | DeleteTaskManagerAction;

function reducer(tasks: Task[], action: TaskManagerAction): Task[] {
  if (action.type === 'create') {
    return [
      ...tasks,
      {
        id: Math.random().toString(),
        name: action.taskName,
        inProgress: false,
      },
    ];
  }
  if (action.type === 'update') {
    return tasks.map((task) => {
      if (task.id === action.taskId) {
        return {
          id: task.id,
          name: action.taskName,
          inProgress: action.taskInProgress,
        };
      }
      return task;
    });
  }
  if (action.type === 'delete') {
    return tasks.filter((task) => task.id !== action.taskId);
  }

  throw 'invalid action type!';
}
