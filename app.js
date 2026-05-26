let foods = JSON.parse(localStorage.getItem("foods") || "[]");

function save() {
  localStorage.setItem("foods", JSON.stringify(foods));
}

function addFood() {
  let food = document.getElementById("food").value;
  let cal = document.getElementById("cal").value;
  let img = document.getElementById("image");

  let imageURL = "";

  if (img && img.files[0]) {
    imageURL = URL.createObjectURL(img.files[0]);
  }

  foods.push({ food, cal, image: imageURL });
  save();

  window.location.reload();
}

function renderList() {
  let list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";

  foods.forEach((f, i) => {
    list.innerHTML += `
      <div class="card">
        <a href="detail.html?id=${i}" style="color:white;text-decoration:none;">
          ${f.image ? `<img src="${f.image}">` : ""}
          <div style="margin-top:10px;">${f.food} - ${f.cal} kcal</div>
        </a>
      </div>
    `;
  });
}

function renderStats() {
  let total = foods.reduce((sum, f) => sum + Number(f.cal), 0);
  let el = document.getElementById("stats");
  if (el) el.innerHTML = "Totale kalorier: " + total;
}

function loadDetail() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  let f = foods[id];
  if (!f) return;

  document.getElementById("detail").innerHTML = `
    ${f.image ? `<img src="${f.image}">` : ""}
    <h2>${f.food}</h2>
    <p>${f.cal} kcal</p>
  `;
}

window.onload = () => {
  renderList();
  renderStats();
  loadDetail();
};
