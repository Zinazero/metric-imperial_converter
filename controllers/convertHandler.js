function ConvertHandler() {
  
  this.getNum = function(input) {
    let initNum;
    let inputArray = input.match(/\d+(\.\d+)?|\/|\D+/g);
    if (inputArray.length > 4) {
      throw new Error("invalid number")
    } else if (inputArray.length === 4) {
      inputArray.slice(0, 3);
      initNum = parseFloat(inputArray[0] / inputArray[2]);
    } else if (inputArray.length === 1) {
      initNum = 1;
    } else {
      initNum = parseFloat(inputArray[0]);
    };
    return Number(initNum.toFixed(5));
  };
  
  this.getUnit = function(input) {
    let conversionSet = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    let unit = input.match(/\d+(\.\d+)?|\/|\D+/g).pop();
    let initUnit;
    if (unit === "l" || unit === "L") {
      initUnit = unit.toUpperCase();
    }  else {
      initUnit = unit.toLowerCase();
    }
    
    if (conversionSet.includes(initUnit)) {
      return initUnit;
    } else {
      throw new Error("invalid unit")
    };
  };
  
  this.getReturnUnit = function(initUnit) {
    let returnUnit;
    let unitTable = {
      "gal": "L",
      "L": "gal",
      "lbs": "kg",
      "kg": "lbs",
      "mi": "km",
      "km": "mi"
    };
    returnUnit = unitTable[initUnit];
    return returnUnit;
  };

  this.spellOutUnit = function(unit) {
    let result;
    let unitSpelledOut = {
      "gal": "gallons",
      "L": "liters",
      "lbs": "pounds",
      "kg": "kilograms",
      "mi": "miles",
      "km": "kilometers"
    };
    result = unitSpelledOut[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let returnNum;
  
    if (initUnit === "gal") {
      returnNum = initNum * galToL;
    } else if (initUnit === "L") {
      returnNum = initNum / galToL;
    } else if (initUnit === "lbs") {
      returnNum = initNum * lbsToKg;
    } else if (initUnit === "kg") {
      returnNum = initNum / lbsToKg;
    } else if (initUnit === "mi") {
      returnNum = initNum * miToKm;
    } else if (initUnit === "km") {
      returnNum = initNum / miToKm;
    }
    return Number(returnNum.toFixed(5));
  };
  
  this.getString = function(initNum, fullInitUnit, returnNum, fullReturnUnit) {
    let string = initNum + " " + fullInitUnit + " converts to " + returnNum + " " + fullReturnUnit;
    return string;
    };
}

module.exports = ConvertHandler;