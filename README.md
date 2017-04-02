# sqin 

[![Greenkeeper badge](https://badges.greenkeeper.io/motiz88/sqin.svg)](https://greenkeeper.io/)

Command-line utilities for database change management, inspired by [Sqitch](http://sqitch.org) and aiming to keep compatibility with it where applicable.

>**NOTE:** This program is in a _very_ rough state. You probably want Sqitch itself for anything serious. At this point `sqin` is mainly a placeholder built around my specific need for `sqin resolve`, which pulls and concatenates SQL deploy script dependencies into one large script.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install -g sqin
```

## Supported commands
### sqin resolve
```sh
sqin resolve [scripts...]
```

Concatenate the SQL `scripts` and all their dependencies to stdout, such that each script is preceded by its dependencies. Dependencies are specified in SQL comments much like the ones `sqitch add` puts in deploy scripts:
```sql
-- requires: other-script
BEGIN;
-- etc...
COMMIT;
```

Thus if you have a `deploy` folder with a separate SQL script for each database entity (like you would have when using Sqitch), you can create a complete deploy script using something similar to:
```sh
sqin resolve deploy/*.sql > deploy-from-scratch.sql
```

## Dependencies

- [babel-runtime](https://github.com/git+https:/): babel selfContained runtime
- [depres](https://github.com/creynders/depres): Dependency graph resolution
- [glob](https://github.com/isaacs/node-glob): a little globber
- [mz](https://github.com/normalize/mz): modernize node.js to current ECMAScript standards
- [nopt](https://github.com/isaacs/nopt): Option parsing for Node, supporting types, shorthands, etc. Used by npm.
- [rx](https://github.com/Reactive-Extensions/RxJS): Library for composing asynchronous and event-based operations in JavaScript


## Dev Dependencies

- [babel-eslint](https://github.com/babel/babel-eslint): **babel-eslint** allows you to lint **ALL** valid Babel code with the fantastic [ESLint](https://github.com/eslint/eslint).
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [grunt](https://github.com/gruntjs/grunt): The JavaScript Task Runner
- [grunt-babel](https://github.com/babel/grunt-babel): Turn ES6 code into vanilla ES5 with no runtime required
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch): Run predefined tasks whenever watched file patterns are added, changed or deleted.
- [grunt-eslint](https://github.com/sindresorhus/grunt-eslint): Validate files with ESLint
- [grunt-mocha-cli](https://github.com/Rowno/grunt-mocha-cli): Run Mocha server-side tests in Grunt.
- [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks): Load multiple grunt tasks using globbing patterns

## License

MIT

