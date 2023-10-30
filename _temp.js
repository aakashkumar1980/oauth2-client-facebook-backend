const bcrypt = require('bcrypt');
const saltRounds = 10;  // You can adjust this value; 10 is a good default

const password = "apple26j";

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash);  // This is the hashed password, which you'd store in your database
});




const storedHash = "$2a$10$SOME_HASHED_VALUE_HERE";  // This would come from your database

bcrypt.compare(password, storedHash, function(err, result) {
  if (err) {
    console.error(err);
    return;
  }
  if (result) {
    console.log("Password is correct!");
  } else {
    console.log("Password is incorrect.");
  }
});
