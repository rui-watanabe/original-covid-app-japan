module.exports = (app) => {
  app.use((req, res, next) => {
    console.log(process.env)
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
};
