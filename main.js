// script.js

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const recipesContainer = document.getElementById("recipes-container");

// Bootstrap Modal Instance
const recipeModal = new bootstrap.Modal(document.getElementById("recipeModal"));
const recipeModalLabel = document.getElementById("recipeModalLabel");
const recipeDetails = document.getElementById("recipe-details");

// Fetch recipes from API
const fetchRecipes = async (query) => {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=e6cc794ae1da488ab458ef42e4be3338`);
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};

// Display recipes dynamically
const displayRecipes = (recipes) => {
  recipesContainer.innerHTML = recipes
    .map(
      (recipe) => `
    <div class="col-md-4">
      <div class="card h-100">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <button class="btn btn-primary view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
};

// Handle recipe click for details
const fetchRecipeDetails = async (id) => {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=e6cc794ae1da488ab458ef42e4be3338`);
    const data = await response.json();
    showModal(data);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
};

// Show modal with recipe details
const showModal = (recipe) => {
  recipeModalLabel.textContent = recipe.title;
  recipeDetails.innerHTML = recipe.instructions || "No instructions available.";
  recipeModal.show();
};

// Event Listeners
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchRecipes(query);
});

recipesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-recipe-btn")) {
    const recipeId = e.target.dataset.id;
    fetchRecipeDetails(recipeId);
  }
});