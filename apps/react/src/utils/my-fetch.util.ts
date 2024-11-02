interface MyFetch<QueryString = undefined> {
  endpoint: string;
  queryStrings?: QueryString;
}

export async function myFetch<Response, QueryString = undefined>({
  endpoint,
  queryStrings,
}: Readonly<MyFetch<QueryString>>) {
  const url = new URL(endpoint);

  if (queryStrings) {
    for (const [key, value] of Object.entries(queryStrings)) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url);

  console.log(response);

  if (!response.ok) {
    throw "Something's wrong in your API!";
  }

  const data: Response = await response.json();

  return data;
}
