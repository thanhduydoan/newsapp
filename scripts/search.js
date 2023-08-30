"use strict";
const navPageNum = document.querySelector("#nav-page-num");
const inputQuery = document.querySelector("#input-query");
const btnSubmit = document.querySelector("#btn-submit");
const newsContainer = document.querySelector("#news-container");
const btnPrev = document.querySelector("#btn-prev");
const pageNum = document.querySelector("#page-num");
const btnNext = document.querySelector("#btn-next");
let totalResult = 0;
let keywords = "";
//Mặc định là ẩn phân trang
navPageNum.style.display = "none";
//Bắt sự kiện click
btnSubmit.addEventListener("click", function () {
  pageNum.textContent = "1";
  newsContainer.innerHTML = "";
  //Kiểm tra xem người dùng đã nhập gì chưa
  if (inputQuery.value.trim().length === 0) {
    navPageNum.style.display = "none";
    alert("Please input keyword!");
  } else {
    //thoả mãn điều kiện thì lấu giá tri người dùng nhập lưu trong biến keyword và gọi hàm render
    //ra giao diện
    keywords = inputQuery.value;
    getDataNewsKeywords(keywords, 1);
  }
});

async function getDataNewsKeywords(keywords, page) {
  try {
    //Kết nối với API và lấy dữ liệu
    const res = await fetch(
      `https://newsapi.org/v2/everything?q="${keywords}"&sortBy=popularity&pagesize=${userActive.pageSize}&page=${page}&apiKey=0c717c6d1c93405b9c4129ff3519407d`
    );
    //Chuyển API về dạng json
    const data = await res.json();
    if (data.totalResults == 0) {
      //Ẩn pagination
      navPageNum.style.display = "none";
      //Thông báo lỗi cho người dùng
      throw new Error("Can't find any articles try again");
    }
    //Hiển thị pagimation
    navPageNum.style.display = "block";
    //Gọi hàm displayNewList
    displayNewList(data);
  } catch (err) {
    alert("Error: " + err.message);
  }
}
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
									<a href=${article.url}
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
//Lắng nghe nút prev dựa vào gí trị hiện tại của trang để gọi hàm getDataNewsKeywords
btnPrev.addEventListener("click", function () {
  getDataNewsKeywords(keywords, Number(pageNum.innerHTML) - 1);
  pageNum.innerHTML = Number(pageNum.innerHTML) - 1;
  checkBtnPrev();
  checkBtnNext();
});

btnNext.addEventListener("click", function () {
  getDataNewsKeywords(keywords, Number(pageNum.innerHTML) + 1);
  pageNum.innerHTML = Number(pageNum.innerHTML) + 1;
  checkBtnPrev();
  checkBtnNext();
});
//Hàm kiểm tra nút Prev
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
