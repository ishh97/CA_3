//Acessing Elements in JS from HTML
var RandomMealId = 0
const modal = document.getElementById('modal')
const modalBox = document.getElementById('modal-content')
const modalImg = document.getElementById('modalImg')
const modalName = document.getElementById('modalName')
const modalIngredients = document.getElementById('modalIngredients')
const modalInstructions = document.getElementById('modalInstructions')
const modalLink = document.getElementById('modalLink')
let mealInfo = document.getElementById('mealInfo')
const MealImg = document.getElementById('mealImg')
let errorBox = document.getElementById("errorMessage")

//Random Meal Section
//Fetching image and Name
fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((data) => data.json())
  .then((dataParsed) => {

    var meal = document.getElementById('RandomName')
    meal.innerHTML = `<h3>${dataParsed.meals[0].strMeal}<h3/>`
    RandomMealId = dataParsed.meals[0].idMeal

    var MealImg = document.getElementById('RandomImg')
    MealImg.innerHTML = `<img src ='${dataParsed.meals[0].strMealThumb}'  class='MealImg'/>`

    // Returning for ingredients of random meal ingredients
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${RandomMealId}`);
  }).then((secondData) => secondData.json())
  .then((secondDataParsed) => {
    // Display the ingredients
    var ingredients = secondDataParsed.meals[0]

    var name = document.createElement('h3')
    name.innerHTML = ingredients.strMeal
    modalName.append(name)

    var country = document.createElement('p')
    country.innerHTML = `Country: ` + ingredients.strArea
    modalName.append(country)

    for (var i = 1; i <= 20; i++) {
      var ing = document.createElement('p')
      if (ingredients[`strstrIngredient${i}`] !== null) {
        ing.innerHTML = ingredients[`strIngredient${i}`] + "  " + ingredients[`strMeasure${i}`]
        modalIngredients.append(ing)
      }

    }

    var link = document.createElement('a')
    link.href = ingredients.strYoutube
    link.innerHTML = "For Youtube Video, Click Here"
    modalLink.append(link)


  })
  .catch((error) => {
    console.error('Error:', error);
  });
// Function to show modal
function ShowIngredients() {
  modalBox.style.display = 'flex';
  modal.style.display = "flex";
}

// function to close the modal
function CloseIngredients() {
  modalBox.style.display = 'none';
  modal.style.display = "none"
}

// Serchin the items of entered category
function search() {
  errorBox.innerHTML = ""
  // Get the value entered in the search input field
  var searchValue = document.getElementById("searchInput").value;
  console.log('Searched value: ' + searchValue);

  // Display the searched category value
  var Cate = document.getElementById('mealCategory');
  Cate.innerHTML = `Searched Category: ${searchValue}`;

   // Fetch data from the API based on the search value
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`)
  .then((data) => data.json())
    .then((dataParsed) => {

      const arr = dataParsed.meals;
      if (arr) {
        arr.forEach(element => {
           // Display the search results
          var container = document.createElement('div')
          container.setAttribute('class', 'container')

          var img = document.createElement('img')
          img.src = element.strMealThumb
          img.setAttribute('class', 'SearchImg')
          container.append(img)

          var name = document.createElement('h3')
          name.innerHTML = element.strMeal
          name.setAttribute('class', 'SearchName')
          container.append(name)

          MealImg.append(container)
        });
      }
      else {
        // Display error message if no results found
        MealImg.innerHTML = ''
        errorBox.innerHTML = `<h1>No Results Found</h1>
      <h3>Make sure that category name is from the list</h3>`;
      }
    }).catch((err) => {
      console.error('Error:', err);
      // Display error message if there was an error fetching data
      mealInfo.innerHTML = `<h1>Error fetching data</h1>
    <p>Please try again later</p>`;
    });
}
