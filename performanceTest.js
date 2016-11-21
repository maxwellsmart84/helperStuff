//This is a performance tester for NODE - make sure you are running node LTS or higher because of the ES6 syntax


function benchmark (method) {
  var start = +(new Date);

  method && method(function (callback) {
    var end = +(new Date);
    var difference = end - start;
    callback && callback(start, end, {
      milliseconds: difference,
      ms: difference,
      seconds: (difference / 1000) % 60,
      minutes: (difference / (1000 * 60)) % 60,
      hours: (difference / (1000 * 60 * 60)) % 24
    });
  });
}


// FUNCTION CODE YOU WANT TO TEST GOES HERE!!

benchmark(function (next) {
  //functionImTesting(maybeAnArg);
  next(function (start, end, difference) {
    console.log('Processed in under: ' + difference.seconds + 's!');
  });
});
