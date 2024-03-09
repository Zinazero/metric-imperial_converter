'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
app.route('/api/convert')
  .get((req, res) => {
  const input = req.query.input;
  const convertHandler = new ConvertHandler();

  let hasNumberError = false;
  let hasUnitError = false;

  let initNum;
 try { 
   initNum = convertHandler.getNum(input);
 } catch (error) {
   hasNumberError = true;
 };

    let initUnit;
 try {  
  initUnit = convertHandler.getUnit(input);
 } catch (error) {
   hasUnitError = true;
 };

 if (hasNumberError && hasUnitError) {
   res.json({ error: "invalid number and unit" });
 } else if (hasNumberError) {
   res.json({ error: "invalid number" });
 } else if (hasUnitError) {
   res.json({ error: "invalid unit" });
 } else {
   const returnNum = convertHandler.convert(initNum, initUnit);
   const returnUnit = convertHandler.getReturnUnit(initUnit);
   const fullInitUnit = convertHandler.spellOutUnit(initUnit);
   const fullReturnUnit = convertHandler.spellOutUnit(returnUnit);
   const string = convertHandler.getString(initNum, fullInitUnit, returnNum, fullReturnUnit);

   res.json({ initNum, initUnit, returnNum, returnUnit, string });
  };
 });
};

