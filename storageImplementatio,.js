function saveRecipe(recipeName) {
    let recipes = getSavedRecipes();
  
    if (!recipes.includes(recipeName)) {
      recipes.push(recipeName);
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
      updateFavoriteList();
    } else {
      alert(`${recipeName} is already in your favorites!`);
    }
  }
  
  function getSavedRecipes() {
    let recipes = localStorage.getItem('favoriteRecipes');
    return recipes ? JSON.parse(recipes) : [];
  }

  function removeRecipe(recipeName) {
    let recipes = getSavedRecipes();
    recipes = recipes.filter(recipe => recipe !== recipeName);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
    updateFavoriteList();
  }

  function updateFavoriteList() {
    const favoriteList = document.getElementById('favorite-recipes');
    favoriteList.innerHTML = '';
    const recipes = getSavedRecipes();
  
    recipes.forEach(recipe => {
      const li = document.createElement('li');
      li.textContent = recipe;
  
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.style.marginLeft = '10px';
      removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
      removeBtn.addEventListener('click', function() {
        removeRecipe(recipe);
      });
  
      li.appendChild(removeBtn);
      favoriteList.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', updateFavoriteList);
  