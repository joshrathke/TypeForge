#TypeStack

Typestack was built for developers who want to develop full stack applications using TypeScript. Typestack accomplishes its TypeScript exclusivity by serving an Angular application via an Express application hosted on a Node.js server. Further the Express application has access to the database through TypeORM which is an entirely TypeScript ORM.

The goal of Typestack is to hit the ground running. We have attempted to do as much of the plumbing as possible, including a few bonus features that are particularly helpful within a Node environment.

#Installation
####Install Redis
In order to utilize a multi-threaded environment, TypeStack instantiates a server on every thread of the host CPU. This improves speed very slightly, but greatly decreases the risk of a request taking a long time due to the request in front of it waiting for output. Redis gives websockets a central location to report to so that all pub/sub events still occur regardless of the specific thread any given transmission is taking place on.
```bash
brew install redis
```
####Install & Configure Database
Refer to the TypeORM documentation for instructions on which type of databases can be used with TypeORM. Follow the instructions provided to generate a `ormconfig.json` file and place it in the root directory of the project. By default, TypeStack is configured for a default installation of PostgreSQL. If you choose to use a different database, you may need to reconfigure the `ormconfig.json` and install the appropriate drivers.

####Install NPM Packages
This will install the NPM Packages for both the Node Server and the Angular Client.
```bash
npm run install-all
```

#TypeStack Bits/Bobs
###Multi-Threaded
TypeStack is multithreaded by default. This allows the Node Server to serve more requests without getting bottlenecked by requests that require more time than others. That said, it is still best practice to use the `child_process` module within Node to break extra heavy tasks out into their own Node process. Just because the server is multi-threaded doesn't mean requests won't get bottlenecked by heavy processes taking place in front of them should they get handled by the same thread. For more information on how Node handles multi-threading, or rather Event Loop marshalling, please refer to this guide on the topic: https://nodejs.org/en/docs/guides/dont-block-the-event-loop/