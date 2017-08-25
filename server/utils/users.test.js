const expect = require('expect');

const { Users } = require('./users');

describe('Users test', () => {
  var users;
  beforeEach(() => {
    users= new Users;
    users.users = [{
      id:'1',
      name:'Mike',
      room:'Node Course'
    },{
      id:'2',
      name:'Jen',
      room:'Node Course'
    },{
      id:'3',
      name:'John',
      room:'React Course'
    }];
  });

  it('shoud add new user', () => {
    var users = new Users;
    var newUser = {
      id: '123',
      name:'Jason',
      room: 'Office Fans'
    };
    var resUser = users.addUser(newUser.id, newUser.name, newUser.room);
    expect(users.users[0]).toEqual(newUser);
    expect(resUser).toEqual(newUser);
  });

  it('should remove a user', () => {
    var userId = '3';
    var john = users.removeUser(userId);
    expect(john.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var resUser = users.removeUser('5');
    expect(resUser).toNotExist();
  });

  it('should find a user with valid id', () => {
    var john = users.getUser('3');
    expect(john).toEqual(users.users[2]);
  });

  it('shoud not find a suer with invalid id', () => {
    var resUser = users.getUser('5');
    expect(resUser).toNotExist();
  })

  it('should return names of Node Course', () => {
    var nodeCourseUsers = users.getUserList('Node Course');
    expect(nodeCourseUsers).toEqual(['Mike', 'Jen'])
  });

  it('should return names of React Course', () => {
    var nodeCourseUsers = users.getUserList('React Course');
    expect(nodeCourseUsers).toEqual(['John'])
  });
})
