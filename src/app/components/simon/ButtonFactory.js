(function(app) {

  app.factory('Button', function(){

    function Button(color) {
      this.color = color
      this.clicked = false;
      this.clickedColor = color + 'Clicked';
      this.name = this.color.toUpperCase();
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

    return Button;
  })

})(angular.module('simon'));
