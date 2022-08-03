console.log("welcome");

// fetch("http://localhost:3000/weather?address=delhi").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.condition);
//       console.log(data.location);
//       console.log(data.temperature);
//     }
//   });
// });
const text = document.querySelector("searchText");
const button = document.querySelector("inputButton");

button.addEventListener("click", function () {
  console.log("test");
});
