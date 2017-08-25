
class Users {
  constructor() {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    var deletedUser = this.getUser(id);
    if(deletedUser) {
      this.users = this.users.filter(user => user.id !== id);
    }
    return deletedUser;
  }
  getUser(id) {
    var userTobeFind = this.users.filter(user => user.id === id)[0];
    return userTobeFind;
  }
  getUserList(room) {
    var filteredUsers = this.users.filter((user) => user.room === room );
    var namesArray = filteredUsers.map(user => user.name);
    return namesArray;
  }
}

module.exports = {Users};
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Kaso', 23);
//
// console.log(me.getUserDescription())
