const app = require('./src/app');

const PORT = process.env.PORT || 8080;

app.on('ready', () => {
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
});