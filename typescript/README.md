# Homework 1

The instructions can be found in `README.md` in the `main` branch. 


## Compiling and running

The project is setup with npm already. `npm install` will install packages, `npm run compile` will run the TypeScript compiler, and `npm run start` will start the compiled program. *Tip*: When using `npm run start`, type `--` after start to ensure arguments you pass are interpreted as part of the `flashcard` command. 

## TS-Standard

The project comes preconfigured with [ts-standard](https://github.com/standard/ts-standard), which you can execute with `npm run lint` or `npx ts-standard`. It is very opinionated and picky about style and will fail the build on minor deviations. You can let it auto-format many things with `npx ts-standard --fix`.

If you do not want to follow this specific style guide, feel free to disable ts-standard entirely from this project or replace it with a differently configured checker. Try to follow a reasonably consistent style in your solution, but we won't require that you meet the ts-standard specs exactly.

## Blocking I/O

The code uses blocking I/O calls which are not idomatic in Node.js. We will discuss this later in the class.




