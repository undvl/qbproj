module.exports = function(app){

    app.use('/q/:qb/pl/', (req, res, next) => {
      if (!req.srvRendParams) req.srvRendParams = {};
      req.srvRendParams.plThemesList = req.params.qb;
      next();
    });

    app.use('/q/:qb/pl/:themeID', (req, res, next) => {
      if (!req.srvRendParams) req.srvRendParams = {};
      req.srvRendParams.plThemeID = req.params.themeID;
      next();
    });

}
