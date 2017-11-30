// @flow

export const function1 = (a: number, b: string): number => parseInt(b) + a;

export const function2 = jest.fn();
//export const function3 = (): number => 42;

export default (a: number): any => "10" + a