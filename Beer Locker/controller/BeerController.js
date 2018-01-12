let Beer = require("../model/Beer");

class BeerController {

  postBeers(request, response) {
    var beer = new Beer({
      name: request.body.name,
      type: request.body.type,
      quantity: request.body.quantity,
      userId: request.user._id
    });
  
    beer.save(function(error) {
      if (error) response.send(error);
      response.json({ message: "Beer added to the locker!", data: beer });
    });
  }

  getBeers(request, response) {
    Beer.find({ userId: request.user._id }, function(error, beers) {
      if (error) response.send(error);
      response.json(beers);
    });
  }

  getBeer(request, response) {
    Beer.find({ userId: request.user._id, _id: request.params.beer_id }, function(error, beer) {
      if (error) response.send(error);
      response.json(beer);
    });
  }

  putBeer(request, response) {
    Beer.update({ userId: request.user._id, _id: request.params.beer_id }, { quantity: request.body.quantity }, function(error, modified, raw) {
      if (error) response.send(error);
      if (!modified.n) response.json({ message: "Beer not found or it doesn't belongs to you. Get out!" });
      else response.json({ message: "Beer updated with success. Go drink!" });
    });
  }

  deleteBeer(request, response) {
    Beer.remove({ userId: request.user._id, _id: request.params.beer_id }, function(error, removed) {
      if (error) response.send(error);
      if (!removed.result.n) response.json({ message: "Beer not found or it doesn't belongs to you. Get out!" });
      else response.json({ message: "Beer removed from the locker!" });
    });
  }
}

module.exports = BeerController;