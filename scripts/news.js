"use strict";

const newsContainer = document.querySelector("#news-container");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");
//Biến để tính số tin tức tối đa trả về tử API

let totalResult = 0;
getDataNews("us", 1);
async function getDataNews(country, page) {
  try {
    //Kết nối với API và lấy dữ liệu
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pagesize=${userActive.pageSize}&page=${page}&apiKey=0c717c6d1c93405b9c4129ff3519407d`
    );
    //Chuyển API về dạng json
    const data = await res.json();
    console.log(data);
    displayNewList(data);
  } catch (err) {
    alert("Error: " + err.message);
  }
}
function checkBtnPrev() {
  if (pageNum.textContent == 1) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "block";
  }
}
function checkBtnNext() {
  if (
    pageNum.innerHTML === String(Math.ceil(totalResult / userActive.pageSize))
  ) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
}
btnPrev.addEventListener("click", function () {
  getDataNews("us", Number(pageNum.innerHTML) - 1);
  pageNum.innerHTML = Number(pageNum.innerHTML) - 1;
  checkBtnPrev();
  checkBtnNext();
});

btnNext.addEventListener("click", function () {
  getDataNews("us", Number(pageNum.innerHTML) + 1);
  pageNum.innerHTML = Number(pageNum.innerHTML) + 1;
  checkBtnPrev();
  checkBtnNext();
});

function displayNewList(data) {
  //Lấy giá trị cho biến totalResults
  totalResult = data.totalResults;
  checkBtnPrev();
  checkBtnNext();
  let html = "";
  data.articles.forEach(function (article) {
    html += `
        <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src=${article.urlToImage} class="card-img"
									alt=${article.title}>
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.description}</p>
									<a href="${article.url}"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
        `;
  });
  newsContainer.innerHTML = html;
}
