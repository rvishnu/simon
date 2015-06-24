(function (app) {

  app.service('SimonService', function () {

    var self = this;

    self.getNextNumber = function(){
      return self.generateRange(1, 0, 3)[0];
    }

    self.generateRange =   function (pCount, pMin, pMax) {
      min = pMin < pMax ? pMin : pMax;
      max = pMax > pMin ? pMax : pMin;
      var resultArr = [], randNumber;
      while (pCount > 0) {
        randNumber = Math.round(min + Math.random() * (max - min));
        if (resultArr.indexOf(randNumber) == -1) {
          resultArr.push(randNumber);
          pCount--;
        }
      }
      return resultArr;
    }
  })
})(angular.module('simon'));
