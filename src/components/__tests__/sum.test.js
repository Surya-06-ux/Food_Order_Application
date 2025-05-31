import {sum} from '../sum';

test("Sum function adds two numbers", () => {

    const result = sum(2, 3);
    // Assertion
    expect(result).toBe(5);//not mandatory to use toBe
})