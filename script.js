function calculateCalories() {
    let age = document.getElementById('age').value;
    let height = document.getElementById('height').value;
    let weight = document.getElementById('weight').value;
    let gender = document.querySelector('input[name="gender"]:checked');
    
    if (age === "" || height === "" || weight === "" || gender === null) {
        alert("Please fill in all fields");
        return;
    }
    let bmr;
    if (gender.value === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    let resultDiv = document.getElementById('result');
    let caloriesResult = document.getElementById('caloriesResult');
    caloriesResult.innerHTML = (bmr * 1.55).toFixed(0) + ' calories per day (for moderate activity level)';
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({behaviour:'smooth'});

    let calculateButton = document.getElementById('calculateButton');
    calculateButton.style.display = 'none';
}

function closeResult() {
    let resultDiv = document.getElementById('result');
    resultDiv.style.display = 'none';
    let calculateButton = document.getElementById('calculateButton');
    calculateButton.style.display = 'block';
}
function generateMeal() {
    let meals = document.getElementById('meals').value;
    let calories = document.getElementById('calories').value;
    let cuisine = document.querySelector('input[name="cuisine"]:checked');
    if (meals === "" || calories === "" || cuisine === null) {
        alert("Please fill in all fields");
        return;
    }
    const api_key = '21895d21b9b24b50b8fe2b7b19367fb3';

    axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${api_key}&timeFrame=day&targetCalories=${calories}&cuisine=${cuisine}`)
    .then(response => {
        console.log('response received');
        // Handle the response data here as needed
        meals = response.data.meals;
        calories1 = response.data.nutrients.calories;
        protein = response.data.nutrients.protein;
        fat = response.data.nutrients.fat;
        carbohydrates = response.data.nutrients.carbohydrates;
        console.log('Success:', meals,'\n','calories: ',calories1,'\n','protein:',protein);
        mealDivs = ['breakfast','launch','dinner'];
        let generateDiv = document.getElementById('generateMeal');
        let caloriesDiv = document.getElementById('caloriesdiv');
        caloriesDiv.innerHTML = `<p>Calories: ${calories1}</p>
                                 <p>Protein: ${protein}</p>
                                 <p>Fat: ${fat}</p>
                                 <p>Carbs: ${carbohydrates}</p>`;
        i = 0;
        for (const meal of mealDivs){
            let mealCap = document.getElementById(meal+' cap');
            let mealImage = document.getElementById(meal+' image');
            mealCap.textContent = meals[i].title;
            mealImage.src= `https://spoonacular.com/recipeImages/${meals[i].id}-312x231.jpg`;
            i++;
        }
        generateDiv.style.display = 'block';
        generateDiv.scrollIntoView({behaviour:'smooth'});
        let calculateButton = document.getElementById('generateButton');
        calculateButton.style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

    
}

function closeResult() {
let resultDiv = document.getElementById('generateMeal');
resultDiv.style.display = 'none';
let calculateButton = document.getElementById('generateButton');
calculateButton.style.display = 'block';
}