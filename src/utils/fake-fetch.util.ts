export function fakeFetch<T>(data: T, delay: number) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => resolve(data), delay);
  });
}
