function sujinko(radius, color) {
  this.radius = radius || 40;
  this.color = color || "#ffdd00";
  this.x = 0;
  this.y = 0;
  this.rotation = 0;
  this.mouthAngle = Math.PI / 4;
  this.mouthSpeed = 0.05;
  this.isMouthOpening = true;
  this.currentState = "idle"; // Default state is "idle"
  
  // Load sprite images for different states
  this.idleSpriteImage = new Image();
  this.idleSpriteImage.src = "./assets/idlezoom.png";
  
  this.walkSpriteImage = new Image();
  this.walkSpriteImage.src = "./assets/walk.png";
  
  this.flySpriteImage = new Image();
  this.flySpriteImage.src = "./assets/Walk.png";
  
  this.deathSpriteImage = new Image();
  this.deathSpriteImage.src = "./assets/Dead.png";
  
  this.spriteWidth = 128; // Width of each sprite frame
  this.spriteHeight = 130; // Height of each sprite frame
  this.spriteZoom = 5;
  this.frameCount = 6;
  this.currentFrame = 0;
  this.timePerFrame = 100;
  this.lastUpdateTime = 0;
}

sujinko.prototype.draw = function (context) {
  context.save();
  context.translate(this.x, this.y);
  context.rotate(this.rotation);

  this.updateFrame();
  
  // Determine the correct sprite image based on the current state
  let spriteImage;
  if (this.currentState === "death") {
    spriteImage = this.deathSpriteImage;
  } else if (this.currentState === "fly") {
    spriteImage = this.flySpriteImage;
  } else if (this.currentState === "walk") {
    spriteImage = this.walkSpriteImage;
  } else {
    spriteImage = this.idleSpriteImage;
  }
  
  if (spriteImage.complete) {
    context.drawImage(
      spriteImage,
      this.currentFrame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      -this.radius * this.spriteZoom,
      -this.radius * this.spriteZoom,
      this.radius * 2 * this.spriteZoom,
      this.radius * 2 * this.spriteZoom
    );
  } else {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      0,
      0,
      this.radius,
      this.mouthAngle,
      Math.PI * 2 - this.mouthAngle
    );
    context.lineTo(0, 0);
    context.closePath();
    context.fill();
  }

  context.restore();
};

sujinko.prototype.updateFrame = function () {
  var currentTime = Date.now();
  if (currentTime - this.lastUpdateTime >= this.timePerFrame) {
    this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    this.lastUpdateTime = currentTime;
  }
};

sujinko.prototype.getBounds = function () {
  return {
    x: this.x - this.radius,
    y: this.y - this.radius,
    width: this.radius * 2,
    height: this.radius * 2,
  };
};

// Example of how to set sujinko's state
// let mySujinko = new sujinko();
// mySujinko.currentState = "walk"; // Change state to walk
// mySujinko.currentState = "fly";  // Change state to fly
// mySujinko.currentState = "idle"; // Change state to idle
// mySujinko.currentState = "death"; // Change state to death
