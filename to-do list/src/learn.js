// const user = {
//   name: "RAm Das",
//   age: 19,
//   phno: 98798798,
//   address: "gwarko",
// };

// const { name, age, ...others } = user;
// console.log({ name, age, others });

// const { name: fullname } = user;

// console.log({ fullname, age });

// let color = ["red", "green", "blue"];

// let [first, second, ...rest] = color;
// console.log([first, second, rest]);

// console.log(false && "Hello");

// console.log(5 > 2 && "good");

// const fruits = new Map([["apple", 300], [("mango", 500)]]);

// // fruits.set("apple", 200);
// // fruits.set("mango", 500);

// console.log(fruits.get("apple"));
// console.log(typeof fruits);

// console.log(!!(5 >= 5));

//spread operator
let numbers = [1, 2, 3, 4, 5];

let max = Math.max(...numbers);
console.log(max);

let min = Math.min(...numbers);
console.log(min);

console.log(numbers);
