const deleteForm = document.querySelector("#form-delete");
deleteForm.addEventListener("submit", function (event) {
  const confirmation = confirm("Deseja Remover?");
  if (!confirmation) {
    event.preventDefault();
  }
});
