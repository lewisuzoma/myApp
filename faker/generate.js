var faker = require('faker');

var database = { users: []};

for (var i = 1; i<= 20; i++) {
  database.users.push({
  	id: i,
    fullname: faker.name.firstName() +' '+ faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    pwd: faker.internet.password()
  });
}

console.log(JSON.stringify(database));