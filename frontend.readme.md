set up path:
nodejs version 22.10.0
npm version 10.1.0
npx create-next-app@latest --typescript
Would you like to use ESLint? Yes
Would you like to use Tailwind CSS? Yes
Would you like your code inside a `src/` directory? Yes
Would you like to use App Router? (recommended) Yes
Would you like to use Turbopack for `next dev`? Yes
Would you like to customize the import alias (`@/*` by default)? No
cd frontend
npm install @reduxjs/toolkit react-redux
npm install redux-saga
npm install @apollo/client graphql
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
now preapre strcuture as below:
/frontend
  /src
    /components       (all your reusable UI components)
    /features         (each business module: leads, campaigns, etc.)
    /graphql          (GraphQL queries, mutations, fragments)
    /redux
      /slices         (Redux slices for non-API global state)
      /sagas          (Redux Saga files)
      store.ts        (Redux store setup)
    /services         (service classes, utils, business logic)
    /hooks            (custom reusable hooks)
    /utils            (helpers, formatters)
    /pages            (Next.js pages - already exists)
  /public
  package.json
  tsconfig.json
  ...
  ---------------------------------------------------------------
  mkdir -p src/{components,features,graphql,redux/slices,redux/sagas,services,hooks,utils}
after this set up done for redux store, provider for the store access, setting up it in layouttsx
dotenv cli will be sued for envs
----------------------------------------------
http://localhost:4000 for local ui access
----------------------------------------------
for tailwind set up
    npx tailwindcss init -p
----------------------------------------------
