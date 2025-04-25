module.exports = {
  notFound: (msg = "Not found") => ({ error: msg }),
  badRequest: (msg = "Bad request") => ({ error: msg }),
};