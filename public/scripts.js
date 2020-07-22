const currentPage = location.pathname;
const menuItems = document.querySelectorAll("header .links a");

for (let item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active");
  }
}

function paginate(selectPage, totalPages) {
  let pages = [];
  let oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPages = currentPage == 1 || currentPage == totalPages;
    const pageAfterSelectedPages = currentPage <= selectPage + 2;
    const pageBeforeSelected = currentPage >= selectPage - 2;
    if (firstAndLastPages || (pageBeforeSelected && pageBeforeSelected)) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push("...");
      }
      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }
      pages.push(currentPage);
      oldPage = pages;
    }
  }
  return pages;
}

const pagination = document.querySelector(".pagination")

function createPagination(pagination){
  const filter = pagination.dataset.filter
  const page = +pagination.dataset.page
  const total = + pagination.dataset.total
  const pages = paginate(page,total)
  let elements = ""

  for(let page of pages){
    if(String(page).includes("...")){
      elements += `<span>${page}</span>`
    }else{
      if(filter){
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      }else{
        elements += `<a href="?page=${page}">${page}</a>`
      }
    }
  }
  pagination.innerHTML = elements
}
if(pagination){
  createPagination(pagination)
}
