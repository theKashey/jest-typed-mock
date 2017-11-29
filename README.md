# jest-typed-mock
## Make unit tests great again!

[![NPM](https://nodei.co/npm/jest-typed-mock.png?downloads=true&stars=true)](https://nodei.co/npm/jest-typed-mock/)

jest-typed-mock brings type checking to the wild `__mocks__` of Jest.

``
Manual mocks are defined by writing a module in a __mocks__/ subdirectory immediately adjacent to the module. For example, to mock a module called user in the models directory, create a file called user.js and put it in the models/__mocks__ directory. ``
https://facebook.github.io/jest/docs/en/manual-mocks.html#content

# Usage
 Add to your package.json
 ```json
 "scripts": {
   ...
   "jest-typed-mock": "jest-typed-mock flow",       // for Flow 
   "jest-typed-mock": "jest-typed-mock typescript", // for TS
   ...
 }
 ```
There is no support for common JS, yet.  

# Type safety
[Rewiremock](https://github.com/theKashey/rewiremock) can provide a type safety to dependency mocking, but Jest do had it's own
mocking (and sandboxing) system. As long rewiremock still able to work, even under the Jest management - it is now a quite good idea.

__jest-typed-mock__ is not a library. It is just a small tool, which can check `mocked` file against the real one.

Lets imagine - we have a.js
```typescript
//a.js
export const function1 = (a:number):number => a**2;
export const function2 = (a:number):number => a*2;
export default (a:string) => a.substr(1)
```
and `__mocks__/a.js`
```typescript
export const function1 = (a:number):number => 1;
export const function2 = (a:number):number => 2;
export default (a:string) => "3"
```

It is ok. But next you change the real a.js
```typescript
//a.js
// function 1 is changed
export const function1 = (a:string):number => parseInt(a);
// function 2 is removed
export default (a:string) => a.substr(1)
```
But your tests are still using the old `__mocks__`, and they are still green.

__jest-typed-mock__ just matches real files and mocks.

TS:
``
Property 'function2' is missing in type 'typeof "....a"'.
``

Flow:
``property `function2` of exports of "/__mocks__/a.js". Property not found in const real = () => import('/a.js');``

As result - you reduce a smell of mocking.