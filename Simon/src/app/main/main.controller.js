'use strict';

angular.module('simon')
  .controller('MainCtrl', ['$timeout','Button', 'SimonService', function ($timeout, Button, SimonService) {
    var self = this;

    var DELAY_BETWEEN_COMPUTER_CLICKS = 1000;

    self.button = [ new Button('red'), new Button('blue'), new Button('green'), new Button('yellow')];

/*    self.greenButton = new Button('green');
    self.yellowButton = new Button('yellow');*/

    self.userClickedArray = new Array();

    self.computerClickedArray = new Array();

    self.computerTurn = true;

    self.points  = 0;

    self.started = false;

    self.userEntryWrong = false;

    self.computerClicks = new Array();

    self.unClick = function(button)
    {
      button.unClick();
    }

    self.computerTurnClick = function(button)
    {
      self.computerClicks.push(button);
      button.click();
    }

    self.changeToUserTurn = function(){
      self.computerTurn = false;
    }

    self.computerPlayTurn = function(button, delayTime)
    {
        self.delay(button, delayTime);
    }

    self.delay = function(button, delayTime)
    {
      $timeout(function() {
        self.computerTurnClick(button);
      }, delayTime, true);
      $timeout(function() {
        self.unClick(button);
      }, delayTime + 500, true);
      //CHECK THE DELAY TIME. FIND IF ITS LAST CHANCE. IF SO TURN ON THE COMPUTER TURN TO FALSE.
      var maxDelayTime = (self.computerClickedArray.length - 1) * DELAY_BETWEEN_COMPUTER_CLICKS;
      if(delayTime === maxDelayTime)
      {
        $timeout(function() {
          self.changeToUserTurn();
        }, delayTime + 1000, true);
      }
    }

    self.computerPlaySimon  = function()
    {
      var playTimes = self.computerClickedArray.length;
      self.computerClickedArray[playTimes] = self.button[SimonService.getNextNumber()];
      self.computerClickedArray.forEach(function(value, index){
        self.computerPlayTurn(value, (index * DELAY_BETWEEN_COMPUTER_CLICKS));
      });
      $timeout(function(){self.computerClicks = new Array();
      }, playTimes * DELAY_BETWEEN_COMPUTER_CLICKS + 2000 );

    }

    self.startPlay = function()
    {
      self.started = true;
      $timeout(function () {
        self.computerPlaySimon();
      }, 1000, true);
      self.computerTurn = true;
      self.points = 0;
      self.userEntryWrong = false;
    }

    self.stopPlay = function()
    {
      self.started = false;
      self.userClickedArray = new Array();
      self.computerClickedArray = new Array();
    }

    self.userPlayCheck = function()
    {
      if(self.userClickedArray.length == self.computerClickedArray.length) {
        if (angular.equals(self.userClickedArray, self.computerClickedArray)) {
          self.points++;
          self.userClickedArray = new Array();

          //Call computer play simon after a delay.
          self.computerTurn = true;
          $timeout(function () {
            self.computerPlaySimon();
          }, 2000, true);        }
        else {
          self.computerClickedArray = new Array();
          self.started = false;
          self.userEntryWrong = true;
        }
      }
    }

    self.userPlaySimon = function (button)
    {
      button.click();
      //Add in the Array
      var length = self.userClickedArray.length;
      self.userClickedArray[length] = button;
      $timeout(function() {
        self.unClick(button);
      }, 300, true);
      $timeout(function() {
        self.userPlayCheck(button);
      }, 1000, true);

    }





  }]);


