"use strict";
let inputPageSize = document.querySelector("#input-page-size");
let inputCategory = document.querySelector("#input-category");
const btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener("click", function () {
  if (validate()) {
    //Set lại value của userActive dựa vào form nhập
    userActive.pageSize = Number.parseInt(inputPageSize.value);
    userActive.category = inputCategory.value;
    //Lưu lại thông tin của userActive đã set lại vào localStorage
    saveToStorage("userActive", userActive);
    //Tìm theo index của userArr có username trùng với username của userActive
    const index = userArr.findIndex(
      (userItem) => userItem.username === userActive.username
    );
    userArr[index] = userActive;
    //Lưu kết quả set thuộc tính của pagesize và category từ userActive về mảng userArr
    saveToStorage("userArr", userArr);
    alert("Setting successfully!");
    window.location.href = "../pages/news.html";
  }
});
//Dữ nguyên những trường mà người dùng hiện tại đã setting để tiện theo dõi và chỉnh sửa
inputPageSize.value = userActive.pageSize;
console.log(userActive);
inputCategory.value = userActive.category;

function validate() {
  let isValidate = true;
  const pageSize = Number.parseInt(inputPageSize.value);
  if (Number.isNaN(pageSize) || pageSize < 1) {
    alert("Page size must be a positive number!");
    isValidate = false;
  }
  return isValidate;
}
