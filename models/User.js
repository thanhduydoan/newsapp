"use strict";
class User {
  constructor(
    firstname,
    lastname,
    password,
    username,
    pageSize = 10,
    category = "Sports"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.username = username;
    this.pageSize = pageSize;
    this.category = category;
  }
}
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
