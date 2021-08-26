// clear page function (after searching another entry)
var wipeTheBoard = function() {
    var clearOut = document.querySelectorAll(".card");
    if (clearOut.length > 0) {
      for (i = 0; i < clearOut.length; i++) {
        let d = document.getElementById("results");
        d.removeChild(clearOut[i]);
      }
    }
  };

// clears all entries off screen when clear button clicked
const clearAll = document.querySelector(".clear")

clearAll.addEventListener("click", function(evt) {
    evt.preventDefault();
    let d = document.getElementById("results");
    d.innerHTML = "";
})
  
  // display all pokemon names when catch 'em all button clicked
  const catchEmAll = document.querySelector("#catch");
  catchEmAll.addEventListener("click", function(evt) {
    evt.preventDefault();
    wipeTheBoard();
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then(res => res.json())
      .then(data => {
        data.results.forEach(result => {
          console.log(result.name);
          var newCard = document.createElement("div");
          newCard.className = "card";
          newCard.innerHTML = result.name;
          document.getElementById("results").appendChild(newCard);
        });
      })
      .catch(err => {
        console.log("something went wrong...", err);
      });
  });
  

  // page returns result for any option in dropdown menu
  const superSearch = document.querySelector("#findIt");
  superSearch.addEventListener("click", function(evt) {
    evt.preventDefault();
    wipeTheBoard();
    let id = document.querySelector("#search").value.toLowerCase();
    let searchValue = document.querySelector("select.form-control").value;
    // console.log(id);
    // console.log(searchValue);
    if (
      searchValue == "pokemon" ||
      searchValue == "ability" ||
      searchValue == "location" ||
      searchValue == "move"
    ) {
      let apiURL = `https://pokeapi.co/api/v2/${searchValue}/${id}`;
      fetch(apiURL)
        .then(res => res.json())
        .then(data => {
          console.log(data.name);
          var newCard = document.createElement("div");
          newCard.className = "card";
          newCard.innerHTML = data.name;
          document.getElementById("results").appendChild(newCard);
        })
        .catch(err => alert("No matches! Try something else!"));
    }
  });