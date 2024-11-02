# How Prisma works in Nx?

1. `pnpm add @prisma/client`.
2. Install its plugin: `nx add @nx-tools/nx-prisma`.
3. Add `schema.prisma` to your project: run `nx g @nx-tools/nx-prisma:configuration` and select "api" project.
4. Add your models.
5. Add `schema` option to your `project.json` so it knows where is your `schema.prisma` file:
   ```json
   {
     "prisma-generate": {
       "executor": "@nx-tools/nx-prisma:generate",
       "options": {
         "schema": "{projectRoot}/prisma/schema.prisma"
       }
     }
   }
   ```
6. `nx prisma-generate api` to generate Prisma Client code.

> [!TIP]
>
> We have passed the `schema` option from `nx.json` in a more elegant manner instead of duplicating our configuration.
