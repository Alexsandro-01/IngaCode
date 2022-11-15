// const x = 'aaa';
// const y = new Date(x);

// if (y === 'Invalid Date') {
//   console.log('a');
// } else {
//   console.log('b');
// }

// function calcTimeInterval(startDate, endDate) {
//   const start = new Date(startDate);
//   const end = new Date(endDate);
//   const interval = new Date(end - start);
//   // console.log(inicio);
//   // console.log(fim);
//   const result = {
//     hours: interval.getUTCHours(),
//     minutes: interval.getUTCMinutes(),
//     seconds: interval.getUTCSeconds(),
//   };
//   return result;
// }

// let m = 122;
// const modMinute = m % 60;
// console.log(modMinute);

// m = modMinute >= 1 ? (m - (modMinute * 60)) : m;

// const h = modMinute >= 1 ? 15 + modMinute : 15;

// console.log(h, m);

// const x = '2022-11-13T01:46:18.160Z';
// const y = x.slice(8, 10);
// console.log(y);

// const date = Date.parse('2022-11-12T01:46:18.160Z');
// // 1668217578160

// const parsedDate = new Date(date);
// // 2022-11-12T01:46:18.160Z

// const day = parsedDate.getDate();
// 11

const x = '2022-11-12 15:35:00';

const date = new Date(x).toISOString();

console.log(date);