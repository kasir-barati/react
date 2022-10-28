# LifeCycle hooks

- Creation ones:
  1.  `constructor`
      - Do not forget to call `super(props)`
  2.  `getDerivedStateFromProps`
      - Should be `static`
  3.  `render`
  4.  `componentDidMount`
      - Do side effects like Ajax calls
      - Do not update state. Bad performance
- Update ones:
  1. `getDerivedStateFromProps`
  2. `shouldComponentUpdate(nextProps, nextState)`
  3. `render`
  4. `getSnapshotBeforeUpdate(previousProps, previousState)`
  5. `componentDidUpdate`
