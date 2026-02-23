const form = document.getElementById("memoryForm");
const wall = document.getElementById("memoryWall");

if (form && wall) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim() || "Anonymous";
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("memory").value.trim();
    const publicOk = document.getElementById("publicOk").checked;

    const njitChoice = form.querySelector('input[name="njitStudent"]:checked');
    const njit = njitChoice ? njitChoice.value : "unknown";

    const hobbies = Array.from(
      form.querySelectorAll('input[name="hobbies"]:checked')
    ).map(h => h.value);

    if (!message) {
      alert("Please write a memory before submitting.");
      return;
    }

    if (!publicOk) {
      alert("You must allow public display to post.");
      return;
    }

    const li = document.createElement("li");

    const nameEl = document.createElement("b");
    nameEl.textContent = name + ": ";
    li.appendChild(nameEl);

    li.appendChild(document.createTextNode(`“${message}”`));

    const meta = [];

    if (njit !== "unknown") meta.push(njit === "yes" ? "NJIT student" : "Not NJIT");
    if (phone) meta.push("Phone: " + phone);
    if (hobbies.length) meta.push("Hobbies: " + hobbies.join(", "));

    if (meta.length) {
      const metaDiv = document.createElement("div");
      metaDiv.className = "muted";
      metaDiv.style.marginTop = "6px";
      metaDiv.textContent = meta.join(" • ");
      li.appendChild(metaDiv);
    }

    wall.prepend(li);
    form.reset();
    document.getElementById("publicOk").checked = true;
  });
}