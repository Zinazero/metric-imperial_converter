const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
suite('Unit Tests', function(){
  test('Whole number input', function (done) {
    var input = '2mi';
    assert.equal(convertHandler.getNum(input),2);
    done();
  });
  test('Decimal number input', function (done) {
    var input = '2.4mi';
    assert.equal(convertHandler.getNum(input),2.4);
    done();
  });
  test('Fractional input', function (done) {
    var input = '1/2mi';
    assert.equal(convertHandler.getNum(input),0.5);
    done();
  });
  test('Fracional + Decimal input', function (done) {
    var input = '1.2/2.4mi';
    assert.equal(convertHandler.getNum(input),0.5);
    done();
  });
  test('Double fraction error', function (done) {
    var input = '3/2/3mi';
    assert.throws(() => { convertHandler.getNum(input) }, Error, "invalid number");
    done();
  });
  test('Default to 1 if only unit', function (done) {
    var input = 'mi';
    assert.equal(convertHandler.getNum(input),1);
    done();
  });
  test('Correctly read each valid input unit', function (done) {
    assert.equal(convertHandler.getUnit("1mi"),"mi");
    assert.equal(convertHandler.getUnit("1km"),"km");
    assert.equal(convertHandler.getUnit("1gal"),"gal");
    assert.equal(convertHandler.getUnit("1L"),"L");
    assert.equal(convertHandler.getUnit("1lbs"),"lbs");
    assert.equal(convertHandler.getUnit("1kg"),"kg");
    done();
  });
  test('Invalid input error', function (done) {
    var input = 'min';
    assert.throws(() => { convertHandler.getUnit(input) }, Error, "invalid unit");
    done();
  });
  test('Correct return unit for each input unit', function (done) {
    assert.equal(convertHandler.getReturnUnit("gal"),"L");
    assert.equal(convertHandler.getReturnUnit("L"),"gal");
    assert.equal(convertHandler.getReturnUnit("mi"),"km");
    assert.equal(convertHandler.getReturnUnit("km"),"mi");
    assert.equal(convertHandler.getReturnUnit("lbs"),"kg");
    assert.equal(convertHandler.getReturnUnit("kg"),"lbs");
    done();
  });
  test('Spelled out string correctly', function (done) {
    assert.equal(convertHandler.spellOutUnit("gal"),"gallons");
    assert.equal(convertHandler.spellOutUnit("L"),"liters");
    assert.equal(convertHandler.spellOutUnit("mi"),"miles");
    assert.equal(convertHandler.spellOutUnit("km"),"kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"),"pounds");
    assert.equal(convertHandler.spellOutUnit("kg"),"kilograms");
    done();
  });
  test('gal to L', function (done) {
    var initNum = 1
    var initUnit = 'gal'
    assert.equal(convertHandler.convert(initNum, initUnit),3.78541)
    done();
  });
  test('L to gal', function (done) {
    var initNum = 3.78541
    var initUnit = 'L'
    assert.equal(convertHandler.convert(initNum, initUnit),1)
    done();
  });
  test('mi to km', function (done) {
    var initNum = 1
    var initUnit = 'mi'
    assert.equal(convertHandler.convert(initNum, initUnit),1.60934)
    done();
  });
  test('km to mi', function (done) {
    var initNum = 1.60934
    var initUnit = 'km'
    assert.equal(convertHandler.convert(initNum, initUnit), 1)
    done();
  });
  test('lbs to kg', function (done) {
    var initNum = 1
    var initUnit = 'lbs'
    assert.equal(convertHandler.convert(initNum, initUnit),0.45359)
    done();
  });
  test('kg to lbs', function (done) {
    var initNum = 0.45359
    var initUnit = 'kg'
    assert.equal(convertHandler.convert(initNum, initUnit), 1)
    done();
  });
});