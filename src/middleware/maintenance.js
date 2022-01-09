const isUnderMaintenance = false;
const maintenance = (req, res, next) => {
  if (isUnderMaintenance)
    return res.status(503).send("Server is under maintenance");
  next();
};
module.exports = maintenance;
