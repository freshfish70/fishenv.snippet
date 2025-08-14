import {orderBy, orderByAsc,orderByDesc} from './index.ts'

const data = [{
  name: "Alice",
  age: 30,
  isActive: true,
  createdAt: new Date("2023-01-01"),
}, {
  name: "Steve",
  age: 25,
  isActive: false,
  createdAt: new Date("2023-02-01"),
}, {
  name: "Charlie",
  age: 35,
  isActive: true,
  createdAt: new Date("2023-03-01"),
}, {
  name: "Xavier",
  age: 20,
  isActive: false,
  createdAt: new Date("2023-04-01"),
}
]

// Order by 
console.log("Order by name (asc):", orderBy(data, 'name', 'asc'));
console.log("Order by age (desc):", orderBy(data, "age", "desc"));
console.log("Order by isActive (asc):", orderBy(data, "isActive", "asc"));
console.log("Order by createdAt (desc):", orderBy(data, "createdAt", "desc"));


// Order by Asc
console.log("Order by name (asc):", orderByAsc(data, 'name'));
console.log("Order by age (asc):", orderByAsc(data, "age"));

// Order by Desc
console.log("Order by name (desc):", orderByDesc(data, 'name'));
console.log("Order by age (desc):", orderByDesc(data, "age"));
