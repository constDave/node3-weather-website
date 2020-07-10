const body = document.querySelector("body");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");
const button = document.querySelector("button");

button.addEventListener("click", e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${location}`)
    .then(response => {
      response.json().then(data => {
        if (data.error) {
          return (messageOne.textContent = data.error);
        }

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data.forecast);
        console.log(data.time_of_day);
        search.value = "";
      });
    })
    .catch(error => {
      console.log("error");
    });
  console.log(location);
});
