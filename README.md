```
Important Note: This repository is abandoned for now, since becoming too complex
```

# ts-full-stack-ref-monorepo
**TypeScript full-stack reference monorepo for 2022.**

## 🎯 Objective

JavaScript and Node.js world is famously, almost everywhere "unopinionated". That is great because it's empowering the community's freedom in coming up with new things and one of its strengths. However, it can make the learning process quite difficult, especially when you're self-taught. Lacking standard, commonly used architectures could be confusing.

In the recent few years, there is a trend to establish some standards, at least partly. For instance to propose ready-to-use architectures. Some examples could be [Angular](https://angular.io/docs), [Nest](https://docs.nestjs.com/), and [Redwood](https://redwoodjs.com/docs/introduction). There is a brilliant attempt to [gather in one place](https://github.com/goldbergyoni/nodebestpractices) all recent, considered to be widely established, Node.js best practices.

The progressing maturity of the JS ecosystem is also indicated by the wide use of TypeScript.

This repository tries to establish one full-stack reference architecture for my other learning projects. I do this primarily for myself and when done, I want to hopefully update it at least every few months. You're welcome to use it, any feedback is also appreciated!

## 🌳 Project architecture

This Node.js project is structured as a [monorepo](https://monorepo.tools/#understanding-monorepos) using [Turborepo](https://turborepo.org/docs), around [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces) feature.

The root directory contains root-level *package.json* (and *package-lock.json*), *libraries* and *services* directories, empty *index.ts* file for *tsc* (TypeScript build-in compiler) not to complain, this README, LICENSE and configuration files/dirs.

Each directory containing its own *package.json* is a package. For the purpose of this project, these are universally referred to as *components*.

### 📚 Libraries

Under *libraries* directory common functionalities lives, wrapped as separate components (like logger) for reusability. These are meant to be commonly used by any other component.

Each library component is structured only as complex as reasonably necessary, meaning is it likely to be and remain fairly simple since not needing to scale up.

### ⚙ Services

The microservices/apps/APIs are meant to live under *services* directory.

Each service component will be structured following the "3-Tiers" architectural pattern to meet the design principle of [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), easing further scaling-up.

It means it contains 3 separate layers:

- 1st layer: "entry-points", where the control flow starts and requests come in. An example component is meant to have a REST API there. The API receives requests, performs authentication, extracts the payload, and passes the control to the next layer.

- 2nd layer: "domain" (TBD), where the business logic of an app is defined, following the principle of [domain-driven design](https://en.wikipedia.org/wiki/Domain-driven_design). It can serve any kind of entry-points, being agnostic of the caller. It may call other services. It is also to interact with a database, which is done through the next layer.

- 3rd layer: "data-access" ([DAL](https://en.wikipedia.org/wiki/Data_access_layer)) (TBD), where all database interaction is meant to be defined and configured. It also defines the object model with ORM.

## 🤖🛠️ Technologies and tools

The project uses (or will use):

- Express on the backend
- Postgres database
- React on the frontend
- Docker
- npm workspaces feature
- Turborepo
- TypeScript throughout all the codebase
- ESLint and Prettier for consistent code style and formatting
- *.editorconfig* for maintaining consistent coding styles between different text editors and IDEs

## 🏅 Credits

This repository is heavily inspired by recent developments of [Practica.js Best Practice Starter](https://practica.dev/) which is based on [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices) repository.

### 🎉 Thanks!
