const logger = (request, response, next) => {
  console.log(request.method, request.path);
  console.log(request.body);
  console.log('--------------------------');
  next();
};

module.exports = logger;
