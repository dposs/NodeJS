let User = require("../model/User");

class UserController {

  postUsers(request, response) {
    var user = new User({
      username: request.body.username,
      password: request.body.password
    });

    user.save(function(error) {
      if (error) response.send(error);
      response.json({ message: "New beer drinker added to the locker room!", data: user });
    });
  }

  getUsers(request, response) {
    User.find(function(error, users) {
      if (error) response.send(error);
      response.json(users);
    });
  }

  getUser(request, response) {
    User.findById(request.params.user_id, function(error, user) {
      if (error) response.send(error);
      response.json(user);
    });
  }

  putUser(request, response) {
    User.findById(request.params.user_id, function(error, user) {
      if (error) response.send(error);
      user.password = request.body.password;
  
      user.save(function(error) {
        if (error) response.send(error);
        response.json(user);
      });
    });
  }

  deleteUser(request, response) {
    User.findByIdAndRemove(request.params.user_id, function(error) {
      if (error) response.send(error);
      response.json({ message: "Beer drinker kicked out from the locker room!" });
    });
  }
}

module.exports = UserController;