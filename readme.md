# TypeForge

TypeForge was built for developers who want to develop full stack applications using TypeScript. TypeForge accomplishes its TypeScript exclusivity by serving an Angular application via an Express application hosted on a Node.js server. Further the Express application has access to the database through TypeORM which is an entirely TypeScript ORM.

The goal of TypeForge is to hit the ground running. We have attempted to do as much of the plumbing as possible, including a few bonus features that are particularly helpful within a Node environment.

# Installation
#### Install Redis
In order to utilize a multi-threaded environment, TypeForge instantiates a server on every thread of the host CPU. This improves speed slightly, but greatly decreases the risk of a request taking a long time due to the request in front of it waiting for output. Redis gives websockets a central location to report to so that all pub/sub events still occur regardless of the specific thread any given transmission is taking place on.
```bash
brew install redis
```
#### Install & Configure Database
Refer to the TypeORM documentation for instructions on which type of databases can be used with TypeORM. Follow the instructions provided to generate a `ormconfig.json` file and place it in the root directory of the project. By default, TypeForge is configured for a default installation of PostgreSQL. If you choose to use a different database, you may need to reconfigure the `ormconfig.json` and install the appropriate drivers.

#### Install NPM Packages
This will install the NPM Packages for both the Node Server and the Angular Client.
```bash
npm run install-all
```

# TypeForge Bits/Bobs
### Multi-Threaded
TypeForge is multithreaded by default. This allows the Node Server to serve more requests without getting bottlenecked by requests that require more time than others. That said, it is still best practice to use the `child_process` module within Node to break extra heavy tasks out into their own Node process. Just because the server is multi-threaded doesn't mean requests won't get bottlenecked by heavy processes taking place in front of them should they get handled by the same thread. For more information on how Node handles multi-threading, or rather Event Loop marshalling, please refer to this guide on the topic: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/

## Utilities

### Typings
When passing TypeScript interfaces between software packages, it is usually a good idea to boil them down to `d.ts` files or something equivalent. In other words, though it may be tempting, you should not be importing your TypeORM Entity Classes into your Angular Application, because when the TypeScript attempts to transpile, it will attempt to reference things it doesn't necessarily have access to. Sometimes these errors are easy to troubleshoot, and other times they can be incredibly cryptic. To get around this you should store your TypeScript interfaces in `d.ts` files within the utils folder, and then compile them into the `core-definitions.d.ts` file within the `/utils/typings/` folder. This will allow your Angular Application and your Node Server to utilize the same interfaces without issue.
#### Generate the Core Definitions File
```bash
npm run generate-definitions
```

Anytime you update any of the `d.ts` files within your `utils/typings` folder you will want to regerate the core definitions file to make sure that your Angular application, along with anything else that references your definitions has access to the most recent definitions.

Alternatively, you could manually import each `d.ts` file as needed without generating the Core Definitions file, however being that this is a developer dependency and tool, it won't save any space or processing power in a production deployed application.
