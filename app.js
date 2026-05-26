let foods = JSON.parse(localStorage.getItem("foods") || "[]");

let cameraStream = null;
let lastImage = "";

function go(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
}

/* CAMERA */
async function openCamera() {
  const video = document.getElementById("video");
  video.style.display = "block";

  cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = cameraStream;

  setTimeout(() => {
    const canvas = document.getElementById("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);

    lastImage = canvas.toDataURL("image/png");

    cameraStream.getTracks().forEach(t => t.stop());
    video.style.display = "none";
  }, 2000);
}

/* ADD FOOD */
function addFood() {
  let food = document.getElementById("food").value;
  let cal = document.getElementById("cal").value;
  let file = document.getElementById("file");

  let image = lastImage;

  if (!image && file.files[0]) {
    image = URL.createObjectURL(file.files[0]);
  }

  foods.push({ food, cal, image });
  localStorage.setItem("foods", JSON.stringify(foods));

  render();
}

/* RENDER */
function render() {
  let list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";

  let total = 0;

  foods.forEach(f => {
    total += Number(f.cal);

    list.innerHTML += `
      <div class="item">
        ${f.image ? `<img src="${f.image}">` : ""}
        <div>${f.food} - ${f.cal} kcal</div>
      </div>
    `;
  });

  let t = document.getElementById("total");
  if (t) t.innerText = total;
}

window.onload = render;
