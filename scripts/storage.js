"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
}
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.password,
    userData.username,
    userData.pageSize,
    userData.category
  );
  return user;
}
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}
//Lấy dữ liệu userArr từ localStorage
const usersFromLocalStorage = getFromStorage("userArr") || [];
//Parse từ object thành class intance
const userArr = usersFromLocalStorage.map((user) => parseUser(user));
// Tạo biến lưu người dùng đăng nhập hiện tại nếu tồn tại thì parse từ object sang class
// instance nếu không có thì trả về undefined
let userActive = getFromStorage("userActive")
  ? parseUser(getFromStorage("userActive"))
  : undefined;

const todos = getFromStorage("todoArr") || [];
//Parse từ object thành class intance
const todoArr = todos.map((todo) => parseTask(todo));
