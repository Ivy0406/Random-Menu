// 宣告類型對照表 (因為API是英文，使用者介面是中英文)
const foodType = {
    "Beef牛肉" : "Beef",
    "Chicken雞肉" : "Chicken",
    "Lamb羊肉" : "Lamb",
    "Pork豬肉" : "Pork",
    "Seafood海鮮" : "Seafood",
    "Pasta義大利麵" : "Pasta",
    "Vegetarian素食" : "Vegetarian",
};

// 宣告 DOM 元素
const select = document.querySelector("select");
const button = document.querySelector(".btn");
const resultbox = document.querySelector(".filter");
const resultTitle = document.querySelector(".result_Title");
const resultImage = document.querySelector("img");
const resultContent = document.querySelector(".result_Content");

// 新增監聽事件：點擊按鈕
button.addEventListener("click",function(){
    // 若使用者未成功選擇一項料理類型就點擊按鈕，會跳出提醒。
    const selectedType = select.value;
    if(selectedType == "default"){
        alert("請先選擇一個料理類型哦！");
        return;
    }

    // 根據在 <select> 下拉選單中選到的中文料理類型（selectedType），去對應一份中英對照表（foodType），取得英文分類名稱，並存入變數 category 中，讓 API 使用。
    const category = foodType[selectedType];
    
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(function(response) {
        const meals = response.data.meals; // 回傳資料為陣列

        // 若回傳的陣列為0筆資料，則跳通知
        if(meals.length === 0){
            alert("查無此類別料理哦~要不要嘗試其他類型的餐點呢?")
            return;
        }

        // 若回傳的陣列中有多筆資料，則隨機挑一筆
        const randomMeal = meals[Math.floor(Math.random()*meals.length)];

        // 接續請求菜色簡介資料
        return axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`)

        .then(function(response){
        const mealDetail = response.data.meals[0]; // 宣告料理詳細資訊
        
        //把資料顯示在畫面上
        resultTitle.textContent = randomMeal.strMeal;
        resultImage.src = randomMeal.strMealThumb;
        resultImage.alt = randomMeal.strMeal;
        resultContent.textContent = mealDetail.strInstructions;

        document.querySelector(".result").style.display = "block";
    });
        
    })
    
    
   

    
    


})