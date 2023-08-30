"use strict";
const todoList = document.querySelector("#todo-list");
const btnAdd = document.querySelector("#btn-add");
const inputTask = document.querySelector("#input-task");
displayTodoList();
function displayTodoList() {
  let html = "";
  todoArr
    .filter((todo) => todo.owner === userActive.username)
    .forEach((todo) => {
      html += `
        <li class=${todo.isDone ? "checked" : ""}>${
        todo.task
      }<span class="close">×</span></li>
        `;
    });
  todoList.innerHTML = html;
  eventToggleTask();
  eventDeleteTask();
}
btnAdd.addEventListener("click", function () {
  if (inputTask.value.trim().length === 0) {
    alert("Please input your task");
  } else {
    const todo = new Task(inputTask.value, userActive.username, false);
    todoArr.push(todo);
    saveToStorage("todoArr", todoArr);
    displayTodoList();
    inputTask.value = "";
  }
});

// Định nghĩa hàm xử lý sự kiện khi người dùng click vào một phần tử trong todoList
function eventToggleTask() {
  todoList.addEventListener("click", (event) => {
    // Thêm listener cho todoList
    const target = event.target; // Lấy phần tử mà người dùng click vào
    console.log(target);
    console.log(target.firstChild.textContent); // In ra nội dung của phần tử
    if (target.tagName === "LI") {
      // Kiểm tra xem phần tử có phải là 'LI' không
      target.classList.toggle("checked"); // Thêm hoặc xóa class 'checked'
      const todoText = target.firstChild.textContent; // Lấy nội dung của phần từ đầu tiên trong 'target'
      const todo = todoArr.find((item) => {
        // Tìm kiếm phần tử trong 'todoArr'
        return item.owner === userActive.username && item.task === todoText; // Điều kiện tìm kiếm
      });
      if (todo) {
        // Nếu tìm thấy phần tử
        todo.isDone = target.classList.contains("checked"); // Cập nhật trạng thái 'isDone'
        saveToStorage("todoArr", todoArr); // Lưu danh sách 'todoArr' vào localStorage
      }
    }
  });
}

function eventDeleteTask() {
  // Lấy danh sách tất cả các nút xóa trên giao diện
  document.querySelectorAll("#todo-list .close").forEach((closeEl) => {
    // Đăng ký sự kiện click cho từng nút xóa
    closeEl.addEventListener("click", function () {
      // Hiển thị confirm box để hỏi người dùng có chắc muốn xóa task này không
      const isDelete = confirm("Are you sure you want to delete this task?");
      // Nếu người dùng đồng ý xóa task
      if (isDelete) {
        // Tìm vị trí của task cần xóa trong mảng `todoArr` (dựa vào owner và task)
        const index = todoArr.findIndex(
          (item) =>
            item.owner === userActive.username &&
            item.task === closeEl.parentElement.textContent.slice(0, -1),
          console.log(closeEl.parentElement.textContent)
        );
        // Xóa task khỏi mảng `todoArr`
        todoArr.splice(index, 1);
        // Lưu mảng `todoArr` vào localStorage
        saveToStorage("todoArr", todoArr);
        // Hiển thị lại danh sách các task sau khi xóa
        displayTodoList();
      }
    });
  });
}
