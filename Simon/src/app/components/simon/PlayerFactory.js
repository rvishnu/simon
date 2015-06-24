(function(app) {

  app.factory('Player', function(){

    function Player() {
      this.clickedArray = new Array();
    }

    Button.prototype.click = function()
    {
      this.clicked = true;
      console.log("Inside Click Method " + this.color);
    }

    Button.prototype.unClick = function()
    {
      this.clicked = false;
      console.log("Inside UnClick Method " + this.color);
    }

    return Player;
  })

})(angular.module('simon'));
