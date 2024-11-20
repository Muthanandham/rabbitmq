"use strict";

var amqp = require("amqplib");

var msg = {
  number: 19
};
main();

function main() {
  var connection, channel, result;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(amqp.connect("amqp://localhost:5672"));

        case 3:
          connection = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(connection.createChannel());

        case 6:
          channel = _context.sent;
          result = channel.assertQueue("jobs");
          channel.consume("jobs", function (message) {
            var input = JSON.parse(message.content.toString());
            console.log("received number ".concat(input.number));

            if (input.number == 98) {
              channel.ack(message);
            }
          });
          console.log("waiting for msg");
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}