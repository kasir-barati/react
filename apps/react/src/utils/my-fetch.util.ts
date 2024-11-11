interface MyFetch<QueryString = undefined> {
  endpoint: string;
  queryStrings?: QueryString;
  signal?: AbortSignal;
}

export async function myFetch<Response, QueryString = undefined>({
  endpoint,
  queryStrings,
  signal,
}: Readonly<MyFetch<QueryString>>) {
  const url = new URL(endpoint);

  if (queryStrings) {
    for (const [key, value] of Object.entries(queryStrings)) {
      if (value === undefined) {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    signal,
  });

  if (!response.ok) {
    throw "Something's wrong in your API!";
  }

  const data: Response = await response.json();
  console.log(response, data);

  return data;
}
