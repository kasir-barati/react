# State

- Components often need to change what's on the screen as a result of an interaction.
- A component can store some information.
- Component-specific memory: typing into the form, clicking “next” on an image carousel, etc.
- For this we use [`useState` hook](./hooks.md#usestate).
- Behaves more like a snapshot and not regular JS variables.
- Changing it triggers a rerender.

  > [!CAUTION]
  >
  > These two codes are equivalent:
  >
  > | Calling state setter function 3 times                                                                                            | Calling state setter function 1 time                                                                                             |
  > | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
  > | https://github.com/kasir-barati/react/blob/8b38df8c598c4c06c5b47152ecb30c0ec205cbff/.github/docs/examples/handle-click1.js#L1-L5 | https://github.com/kasir-barati/react/blob/8b38df8c598c4c06c5b47152ecb30c0ec205cbff/.github/docs/examples/handle-click2.js#L1-L3 |
  >
  > What is happening here is that when we are calling `setCount` three times in a row it will use that render's count value and not the updated one. Remember each time you call a setter state function it will re-render your component.

- To update array/object states make sure to use [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) or just pass a new array/object.

  Otherwise it won't bother to re-render your component :smiling_face_with_tear: since they will be referencing to the same location in RAM.

  Libs like redux use [immer](https://github.com/immerjs/use-immer) to reduce the burden of this tedious work.

## Lifting state up

- Sharing state between multiple components.
