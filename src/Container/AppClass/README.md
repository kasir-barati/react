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
