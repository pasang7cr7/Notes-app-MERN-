//filter method
//creates a new array for element that give true for conditions or filter

let arr = [1, 2, 3, 4, 5, 6, 6, 7, 8, 9];

let evenArr = arr.filter((val) => {
  return val % 2 === 0;
});

console.log(evenArr);

let mark = [21, 23, 98, 90, 41];
let dist = mark.filter((val) => {
  return val >= 90;
});

console.log(dist);
