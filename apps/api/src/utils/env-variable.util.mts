export function getEnvVariables() {
  const port = Number(process.env.PORT ?? '3333');

  return { port };
}
