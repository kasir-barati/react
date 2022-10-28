# LifeCycle hooks

- Do not do side effects in any lifecycle hook unless it is stated that it is allowed.
- Creation ones:
  1.  `constructor`
      - Do not forget to call `super(props)`
  2.  `getDerivedStateFromProps`
      - Should be `static`
      - If you have initialized your state
  3.  `render`
  4.  `componentDidMount`
      - **Do side effects** like Ajax calls
      - Do not update state. Bad performance
- Update ones:
  1. `getDerivedStateFromProps`
  2. `shouldComponentUpdate(nextProps, nextState)`
     - It should return a boolean
  3. `render`
  4. `getSnapshotBeforeUpdate(previousProps, previousState)`
  5. `componentDidUpdate`
     - **Do side effects**, e.x. fetch data from server
- Cleanup
  1. In `componentWillUnmount` lifecycle hook you can cleanup stuff

# React hooks

- `useState`
  - To fake the `getDerivedStateFromProps` you can use this react hook and initialize it based on the `props` value.
- `useEffect`
  - Is equivalent to all the lifecycle hooks in a functional component.
  - Is the second important react hook after `useState`.
  - By default **runs for every render cycle**:
    - By passing one or more items it is only executed when that item/s changes.
    - By passing nothing it will run fr every render cycle.
    - By passing an empty array it will run soly for the first time and not more.
  - Do side effects.
  - Do cleanups
