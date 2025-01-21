function handleCheckbox(checkbox) {
  const message = checkbox.checked
    ? "Success: " + checkbox.nextElementSibling.textContent
    : "Unchecked: " + checkbox.nextElementSibling.textContent;

  const output = document.getElementById("output");
  output.textContent = message;
}

function handleSwitch(switchElement) {
  const output = document.getElementById("output");
  output.textContent = "Max Coder infiltrating game data...";
  setTimeout(() => {
    output.textContent = "";
  }, 5000);
}

function handleButton(type) {
  const loading = document.getElementById("loading");
  const output = document.getElementById("output");

  loading.classList.remove("hidden");
  output.textContent = "";

  setTimeout(() => {
    loading.classList.add("hidden");
    output.textContent = `Success: ${type} processed ✔`;
  }, 5000);
}


// particles

        