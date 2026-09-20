const seedData = require('./seedData');

function getProactiveOutreach(schemeId) {
  return seedData.proactiveOutreach;
}

module.exports = { getProactiveOutreach };
