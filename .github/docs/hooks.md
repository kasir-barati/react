# React hooks

- JS functions are a group of statements + some inputs & outputs.
- You can call functions inside each other (composing).
- In React components are JS functions. Thus we can utilize components inside each other.
- We have two kind of component: stateful, and stateless.
- In react components should be a pure function (same input, same output, no matter how many times called).
- React components should be as much as possible stateless.
- Can be used only inside functional components.
- They should be called at the top level of your component.
  - Hooks **CAN NOT** be called conditionally (`if (whatever) { useState() }` :x:).
  - You want to use `useState` in a condition or a loop, extract it into a new component.

## `useState`

- It creates a new _state_ for us + its setter.
  - Accepts the initial state when being called; `useState(/* initial state */)`.
  - Each time the component is called it creates separate states for each one.
- The convention is to name _state_ variables like `[something, setSomething]`.
- Update it with `setCount(previousCount => previousCount + 1)` and not `setCount(count + 1)`. Because if we call the latter case twice it is not gonna increase it by two since the count stays the same value as it was while it got rendered.
- In `StrictMode`, React will call your initializer function twice in order to help you find accidental impurities. This is development-only behavior and does not affect production.
- [Examples](https://react.dev/reference/react/useState#examples-basic).
- Would not merge objects. Instead it overrides the _state_. In other word in _React_, _state_ is considered **read-only**, so you should **replace it rather than mutate**. Thus this will break your app:

  ```ts
  const [user, setUser] = useState({ age: 12, name: 'kasir' });
  function handleIncreaseAgeClick() {
    setUser((previousUser) => ({ age: previousUser.age + 1 }));
  }
  ```

  Here we loss our `name` property. So we need to specify all fields:

  ```ts
  setUser((previousUser) => ({
    ...previousUser,
    age: previousUser.age + 1,
  }));
  ```

- When to create an object and when to create a new state?
  - [Learn more](https://react.dev/learn/managing-state).
- Avoiding recreating the initial state; instead of `useState(createInitialTodos());` do this `useState(createInitialTodos);` ([learn more](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state)).
- Changing `key` attribute causes rerender in _React_ ([learn more](https://react.dev/reference/react/useState#resetting-state-with-a-key)).