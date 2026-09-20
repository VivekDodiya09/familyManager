const seedData = require('./seedData');

function getExceptionsAndRisks() {
  return {
    totalActiveExceptions: seedData.exceptionAlerts.reduce((acc, a) => acc + (a.count || 1), 0),
    alerts: seedData.exceptionAlerts,
    lastMileDeliveryExceptions: seedData.disbursements.filter(d => d.isDeliveryException)
  };
}

module.exports = { getExceptionsAndRisks };
