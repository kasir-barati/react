interface MutationFetch<
  QueryString = undefined,
  BodyDto = undefined,
> {
  endpoint: string;
  queryStrings?: QueryString;
  signal?: AbortSignal;
  method: 'post' | 'put' | 'delete';
  body: BodyDto;
}
interface QueryFetch<QueryString = undefined> {
  endpoint: string;
  queryStrings?: QueryString;
  signal?: AbortSignal;
  /**@default 'get' */
  method?: 'post' | 'put' | 'get' | 'delete';
}

type MyFetch<QueryString, BodyDto = undefined> =
  | MutationFetch<QueryString, BodyDto>
  | QueryFetch<QueryString>;

export async function myFetch<
  Response,
  QueryString = undefined,
  BodyDto = undefined,
>(options: Readonly<MyFetch<QueryString, BodyDto>>) {
  const { endpoint, queryStrings, method = 'get', signal } = options;
  const url = new URL(endpoint);
  const fetchOptions: RequestInit = {
    signal,
    method,
  };

  if (queryStrings) {
    for (const [key, value] of Object.entries(queryStrings)) {
      if (value === undefined) {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  if (hasBody(options)) {
    fetchOptions.body = JSON.stringify(options.body);
    fetchOptions.headers = {
      'content-type': 'application/json',
    };
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw "Something's wrong in your API!";
  }

  const data: Response = await response.json();

  return data;
}

function hasBody<Q, B>(
  options: MyFetch<Q, B>,
): options is MutationFetch<Q, B> {
  return options.method !== 'get';
}
