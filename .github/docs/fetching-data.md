# Why this subject matters?

Fetching data inside a `useEffect` has the following downsides:

<table>
  <thead>
    <tr>
      <th>Reason</th>
      <th>How it happens</th>
      <th>Implications</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>They do not run on the server.</td>
      <td>
        This hook is a client side hook. You <b>cannot</b> use it on the server.
      </td>
      <td>
        <ul>
          <li>
            The initial server-rendered HTML will only include a loading state with no data.
          </li>
          <li>
            Client computer will have to download all JavaScript and render your app only to discover that now it needs to load the data.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>You have network waterfalls</td>
      <td>
        <ol>
          <li>ReactJS renders the parent component.</li>
          <li>Parent component fetches some data.</li>
          <li>ReactJS renders the child components.</li>
          <li>Then children start fetching their data.</li>
        </ol>
      </td>
      <td>
        Significantly slows down your web app. Since fetching all data won't happen in parallel.
      </td>
    </tr>
    <tr>
      <td>
        Usually means you do not preload or cache data.
      </td>
      <td>
        No global state like Redux or a caching layer (libs like <a href="https://www.npmjs.com/package/@tanstack/react-query"><code>react-query</code></a>, or <a href="https://www.npmjs.com/package/swr"><code>swr</code></a>).
      </td>
      <td>
        If the component unmounts and then mounts again it will refetch data.
      </td>
    </tr>
    <tr>
      <td>Not very ergonomic.</td>
      <td>Implementation details; stuff like handling loading and error states, race condition, etc.</td>
      <td>
        A lot of boilerplate code involved when writing <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">fetch</a> calls in a way that does not suffer from bugs.
      </td>
    </tr>
  </tbody>
</table>

> [!NOTE]
>
> This list of downsides is not specific to React. It applies to fetching data **on mount** with any library. Thus you have two options:
>
> 1. Use a [ReactJS framework](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks).
> 2. Use a client-side cache:
>    - [`react-query`](https://www.npmjs.com/package/@tanstack/react-query).
>    - [`swr`](https://www.npmjs.com/package/swr).

## Some good extra materials on this subject:

- [useEffect: some issues with data fetching in Effects?](https://dev.to/amrguaily/useeffect-some-issues-with-data-fetching-in-effects-21nn)
- [Do we simply not fetch with useEffect anymore?](https://www.reddit.com/r/nextjs/comments/1bb56ek/do_we_simply_not_fetch_with_useeffect_anymore/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)
