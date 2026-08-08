// ピザのデータ

const recipes = [

  {
    name: "マルゲリータ",
    image: "photo/margherita.png",
    link: "margherita.html",
    time: "約1時間",

    ingredients: [
      "小麦粉",
      "トマト",
      "モッツァレラチーズ",
      "バジル"
    ]
  },


  {
    name: "ジェノベーゼのピザ",
    image: "photo/genovese.png",
    link: "genovese.html",
    time: "準備中",

    ingredients: [
      "小麦粉",
      "バジル",
      "チーズ",
      "にんにく"
    ]
  },


  {
    name: "照り焼きチキンコーンマヨのピザ",
    image: "photo/teriyaki-corn-mayo.png",
    link: "teriyaki.html",
    time: "準備中",

    ingredients: [
      "小麦粉",
      "鶏肉",
      "コーン",
      "マヨネーズ",
      "チーズ"
    ]
  },


  {
    name: "チーズと蜂蜜のピザ",
    image: "photo/cheese-honey.png",
    link: "cheese-honey.html",
    time: "準備中",

    ingredients: [
      "小麦粉",
      "チーズ",
      "蜂蜜"
    ]
  }

];


// HTMLの要素を取得

// ホームページ
const recipeList =document.querySelector("#recipe-list");

const searchForm =document.querySelector("#search-form");

const recipeSearch =document.querySelector("#recipe-search");


// ダークモード
const darkModeButton =document.querySelector("#dark-mode-button");


// 検索ページ
const searchPageForm =document.querySelector("#search-page-form");

const searchPageInput =document.querySelector("#search-page-input");

const ingredientCheckboxes =document.querySelectorAll(".ingredient-checkbox");

const filterButton =document.querySelector("#filter-button");

const resetButton =document.querySelector("#reset-button");

const searchResultList =document.querySelector("#search-result-list");



// ホームページのピザ一覧を表示

function displayRecipes(recipeData) {
  // index.html以外では実行しない
  if (!recipeList) {return;}

  recipeList.innerHTML = "";

  // 検索結果が0件の場合
  if (recipeData.length === 0) {

    recipeList.innerHTML = `
      <li class="no-result">
        該当するピザがありません。
      </li>
    `;

    return;
  }


  recipeData.forEach(function(recipe) {

    const recipeItem = `

      <li>

        <a
          href="${recipe.link}"
          class="recipe-card">

          <img
            src="${recipe.image}"
            alt="${recipe.name}">

          <div class="recipe-text">

            <p class="recipe-name">
              ${recipe.name}
            </p>

            <p class="recipe-info">
              作業時間：${recipe.time}
            </p>
          </div>
        </a>
      </li>
    `;


    recipeList.insertAdjacentHTML("beforeend",recipeItem);
  });
}



// ホームページの料理名検索

function searchRecipes() {const keyword =recipeSearch.value.trim();

  // 何も入力されていない場合
  if (keyword === "") {displayRecipes(recipes);return;}

  const filteredRecipes =recipes.filter(function(recipe) {

    return recipe.name.includes(keyword);

    });
  displayRecipes(filteredRecipes);
}


// 検索ページにピザを表示

function displaySearchResults(recipeData) {

  // search.html以外では実行しない
  if (!searchResultList) {
    return;
  }

  searchResultList.innerHTML = "";

  // 検索結果が0件の場合
  if (recipeData.length === 0) {

    searchResultList.innerHTML = `
      <li class="search-no-result">
        条件に合うピザがありません。
      </li>
    `;

    return;
  }

  recipeData.forEach(function(recipe) {

    const recipeItem = `
      <li>

        <a
          href="${recipe.link}"
          class="recipe-card">

          <img
            src="${recipe.image}"
            alt="${recipe.name}">

          <div class="recipe-text">

            <p class="recipe-name">
              ${recipe.name}
            </p>

            <p class="recipe-info">
              作業時間：${recipe.time}
            </p>

          </div>

        </a>

      </li>
    `;

    searchResultList.insertAdjacentHTML(
      "beforeend",
      recipeItem
    );
  });
}


// 検索ページの絞り込み

function filterSearchPage() {
  // 検索欄の文字を取得
  const keyword =searchPageInput.value.trim();


  // 選択されている材料を保存する配列
  const selectedIngredients = [];


  ingredientCheckboxes.forEach(function(checkbox) {

      if (checkbox.checked) {

        selectedIngredients.push(checkbox.value);

      }
    }
  );


  // 条件に合うピザを探す
  const filteredRecipes =recipes.filter(function(recipe) {

      // 料理名の条件

      const matchesName =keyword === "" ||
        recipe.name.includes(keyword);


      // 材料の条件

      const matchesIngredients =selectedIngredients.every(
          function(ingredient) {
            return recipe.ingredients.includes(
              ingredient
            );
          }
        );


      // 名前と材料の両方に一致
      return (matchesName && matchesIngredients);
    });


  displaySearchResults(filteredRecipes);

}



// 検索条件をリセット

function resetSearch() {
  // 検索欄を空にする
  searchPageInput.value = "";
  
  // チェックを全部外す
  ingredientCheckboxes.forEach(
    function(checkbox) {checkbox.checked = false;});


  // 全ピザを表示
  displaySearchResults(recipes);

}



// ダークモード

function toggleDarkMode() {document.body.classList.toggle("dark-mode");


  // ダークモード中
  if (document.body.classList.contains("dark-mode")) 
  {
    darkModeButton.textContent = "☀️";
  }

  // 通常モード
  else {darkModeButton.textContent = "🌙";}
}



// FAQを使えるようにする

function setupFAQ() {const faqQuestions =document.querySelectorAll(
    ".faq-question"
    );


  faqQuestions.forEach(function(question) {

      question.addEventListener(
        "click",
        function() {const faqItem =question.parentElement;
          faqItem.classList.toggle("active");}
      );
    }
  );
}



// ホームページの検索イベント

if (searchForm) {
  searchForm.addEventListener(
    "submit",
    function(event) {

      // ページの再読み込みを防ぐ
      event.preventDefault();
      searchRecipes();
    }
  );
}



// ダークモードイベント

if (darkModeButton) {
  darkModeButton.addEventListener(
    "click",
    function() {toggleDarkMode();}
  );
}



// search.html
// 料理名検索

if (searchPageForm) {

  searchPageForm.addEventListener(
    "submit",
    function(event) {
      // ページの再読み込みを防ぐ
      event.preventDefault();
      filterSearchPage();
    }
  );

}



// search.html
// 材料絞り込みボタン

if (filterButton) {
  filterButton.addEventListener("click",
    function() {filterSearchPage(); });}



// search.html
// リセットボタン

if (resetButton) {resetButton.addEventListener("click",
    function() {resetSearch();});}



// ページを開いたときの処理


// index.html
if (recipeList) {  displayRecipes(recipes);}


// search.html
if (searchResultList) {displaySearchResults(recipes);}


// FAQ
setupFAQ();



// Console確認

console.log("script.jsが読み込まれました");


console.log(recipes);
