# JSX

- JavaScript is in charge of the HTML;
  1. Logic is written in JS.
  2. And logic determines content.
  3. Thus in React, rendering logic and markup live together in the same place.

> [!CAUTION]
>
> Do not confuse JSX and ReactJS:
>
> - They are two separate things.
> - JSX is a syntax extension, while React is a JavaScript library.

- Convert HTML to JSX with tools such as: https://transform.tools/html-to-jsx.
- A minimal templating language.
- Stricter than HTML.
- Can’t return multiple JSX tags.

  ```tsx
  return (
    <>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </>
  );
  ```

  Or use an element that makes semantic sense as its wrapper but if you could not think of any, first try `<></>` and as the last resort use a `div` or `span` since they are element of last resort.

  ```tsx
  return (
    <div>
      <h1>About</h1>
      <p>
        Hello there.
        <br />
        How do you do?
      </p>
    </div>
  );
  ```

  > [!NOTE]
  >
  > `<></>` is called Fragment. Fragments let you group things without leaving any trace in the browser HTML tree.

  > [!TIP]
  >
  > JSX is transformed into plain JavaScript objects, and we can’t return two objects from a function without wrapping them into an array.

- Use `{}` to "escape back" into JavaScript so that you can:

  ```tsx
  <h1>{user.name}</h1>
  <img className="avatar" src={user.imageUrl} alt={'Photo of ' + user.name} />
  ```

- Cannot use `if ... else ...` statement but instead we can use conditional (ternary) operator.

  ```tsx
  <>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</>
  ```

  > [!NOTE]
  >
  > This style works well for simple conditions, but use it in moderation. If your components get messy with too much nested conditional markup, consider extracting child components to clean things up. In React, markup is a part of your code, so you can use tools like variables and functions to tidy up complex expressions.

  - Do not need the `else` branch? use `&&`:

    ```tsx
    <section>{isLoggedIn && <AdminPanel />}</section>
    ```

    Here if `isLoggedIn` is `true` then we render the `AdminPanel` component. But if `isLoggedIn` is `false` then the whole expression becomes `false`. React treats `false` the same as `null`/`undefined`.

    > [!CAUTION]
    >
    > If the condition is a number ReactJS will render the number itself. Thus this code won't work as you might expect it too:
    >
    > ```tsx
    > messageCount && <p>{messages}</p>;
    > ```
    >
    > If `messageCount` is 0 then ReactJS will render 0. So a quick fix would be: `messageCount > 0`.

  - Want to render nothing? return `null`

    ```tsx
    if (isPacked) {
      return null;
    }
    return <li className="item">{name}</li>;
    ```

    > [!IMPORTANT]
    >
    > - In practice, returning `null` from a child component isn’t common.
    > - It might surprise a developer trying to render it.
    > - Instead conditionally include or exclude the child component in the parent component’s JSX.

- Use the `style` attribute when your styles depend on JavaScript variables.

  ```tsx
  <img
    style={{
      width: user.imageSize,
      height: user.imageSize,
    }}
    // ....
  />
  ```

  Double curlies here signifies objects in JSX. Note that **inline style properties are written in `camelCase`**.

- `export default` specifies the main component in the file.
- `class` attribute of HTML is being called `className`, `stroke-width` is `strokeWidth`:

  > [!NOTE]
  >
  > Attributes written in JSX become keys of JavaScript objects. In JS keys can not contain dashes or be reserved words like `class`.

  > [!CAUTION]
  >
  > `aria-*` and `data-*` are written as in HTML with dashes.

- No prescription on how to add CSS files to your ReactJS app.
- Rendering lists and `key`:

  ```tsx
  const products = [
    { title: 'Cabbage', id: '670d84e21e5459b11e7d5b18' },
    { title: 'Garlic', id: '670d84e2f5410ead712488a1' },
    { title: 'Apple', id: '670d84e27aa442573c067d2f' },
  ];

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
  ```

  Pass a string or a number to `key`. It uniquely identifies that item among its siblings. This helps react to keep track of what is happening in DOM. So it knows when it should update DOM. E.g. sorting, adding/removing/updating data.

  > [!TIP]
  >
  > Sometimes you wanna return multiple DOM nodes but you do not wanna add a `div` or `span` element. Solution:
  >
  > ```tsx
  > import { Fragment } from 'react';
  > // ...
  > const listItems = people.map((person) => (
  >   <Fragment key={person.id}>
  >     <h1>{person.name}</h1>
  >     <p>{person.bio}</p>
  >   </Fragment>
  > ));
  > ```

  > [!NOTE]
  >
  > - It is OK to use similar keys for JSX nodes in different arrays.
  > - Don’t generate keys while rendering, in other word, DO NOT use their `index` as key.
  > - Do not generate keys on the fly, e.g. with `key={Math.random()}`.
  >   - Your components and DOM will be recreated every time; slow down your react app.
  > - Your components won’t receive key as a prop. ReactJS use it internally.

- Responding to [events](./events.md):

  ![Event handler](./assets/event-handler.png)
