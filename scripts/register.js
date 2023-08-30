"use strict";
const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUserName = document.querySelector("#input-username");
const inputPassWord = document.querySelector("#input-password");
const inputPassWordConfirm = document.querySelector("#input-password-confirm");
const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.addEventListener("click", function () {
  //Lấy giá trị user nhập vào và gán vào biến user từ constuctor User
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputPassWord.value,
    inputUserName.value
  );
  //Check validate
  const isValidate = validate(user);
  if (isValidate) {
    //Thêm user mới tạo vào mảng các User
    userArr.push(user);
    //Lưu vào localStorage
    saveToStorage("userArr", userArr);
    //Thông báo trên màn hình
    alert("Đăng kí thành công");
    //Điều hướng sang trang login
    window.location.href = "../pages/login.html";
  }
});

function validate(user) {
  let isValidate = true;
  const errorMessages = [];

  // Validate required fields
  if (!user.firstname.trim()) {
    errorMessages.push("First name is required");
    isValidate = false;
  }
  if (!user.lastname.trim()) {
    errorMessages.push("Last name is required");
    isValidate = false;
  }
  if (!user.username.trim()) {
    errorMessages.push("User name is required");
    isValidate = false;
  }

  //Kiểm tra username của user trong mảng có bằng với giá trị của ô input username mà người dùng nhập vào không
  //nếu có thông báo lỗi ra màn hình
  if (userArr.some((user) => user.username === inputUserName.value)) {
    errorMessages.push("Username is already taken");
    isValidate = false;
  }
  // Kiểm tra xem password của người dùng nhập có trùng với trừng confirm password không
  if (user.password !== inputPassWordConfirm.value) {
    errorMessages.push("Password does not match confirm password");
    isValidate = false;
  }

  // Check password length
  if (user.password.length <= 8) {
    errorMessages.push("Password must be at least 8 characters long");
    isValidate = false;
  }

  // Show error messages if any
  if (!isValidate) {
    alert(errorMessages.join("\n"));
  }

  return isValidate;
}
