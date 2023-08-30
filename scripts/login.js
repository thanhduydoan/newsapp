"use strict";
const inputUserName = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const btnSubmit = document.querySelector("#btn-submit");

//Đăng ký sự kiện click cho nút đăng nhập, khi người dùng click vào, hàm này sẽ được kích hoạt.
btnSubmit.addEventListener("click", function () {
  //Hàm validate kiểm tra xem người dùng đã nhập đầy đủ thông tin đăng nhập chưa.
  const isValidate = validate();
  if (isValidate) {
    //Tìm kiếm người dùng trong mảng userArr, kiểm tra xem username và password của người dùng có trùng với thông tin trong mảng hay không.
    const user = userArr.find(
      (item) =>
        item.username === inputUserName.value &&
        item.password === inputPassword.value
    );
    // Nếu tìm thấy, đăng nhập thành công, lưu thông tin người dùng vào localStorage và chuyển trang về trang chủ.
    if (user) {
      alert("Đăng nhập thành công!");
      saveToStorage("userActive", user);
      window.location.href = "../index.html";
    }
    //Nếu không tìm thấy username và password trùng với dữ liệu trong localstorage
    else {
      alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin đăng nhập.");
    }
  }
});

//Hàm kiểm tra xem người dùng đã nhập đầy đủ thông tin đăng nhập chưa
function validate() {
  let isValidate = true;
  //Nếu trường username không nhập gì hiển thị thông báo lỗi
  if (inputUserName.value === "") {
    alert("Vui lòng nhập tên đăng nhập!");
    isValidate = false;
  }
  //Nếu trường password không nhập gì hiển thị thông báo lỗi
  if (inputPassword.value === "") {
    alert("Vui lòng nhập mật khẩu!");
    isValidate = false;
  }
  return isValidate;
}
