let Client = require("../model/Client");

class ClientController {

  postClients(request, response) {
    let client = new Client({
      name: request.body.name,
      id: request.body.id,
      secret: request.body.secret,
      userId: request.user._id
    });

    client.save(function(error) {
      if (error) response.send(error);
      response.json({ message: "Client added to the locker room!", data: client });
    });
  }

  getClients(request, response) {
    Client.find({ userId: request.user._id }, function(error, clients) {
      if (error) response.send(error);
      response.json(clients); 
    });
  }

  getClient(request, response) {
    Client.find({ userId: request.user._id, _id: request.params.client_id }, function(error, client) {
      if (error) response.send(error);
      response.json(client);
    });
  }

  putClient(request, response) {
    Client.update({ userId: request.user._id, _id: request.params.client_id }, { name: request.body.name }, function(error, modified, raw) {
      if (error) response.send(error);
      if (!modified.n) response.json({ message: "Client not found or it doesn't belongs to you." });
      else response.json({ message: "Client updated with success." });
    });
  }

  deleteClient(request, response) {
    Client.remove({ userId: request.user._id, _id: request.params.client_id }, function(error, removed) {
      if (error) response.send(error);
      if (!removed.result.n) response.json({ message: "Client not found or it doesn't belongs to you." });
      else response.json({ message: "Client removed from the locker room!" });
    });
  }
}

module.exports = ClientController;