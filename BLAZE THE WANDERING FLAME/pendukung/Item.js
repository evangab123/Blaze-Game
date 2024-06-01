function Item(radius, color, isPickedUp = false) {
    if(radius == undefined){radius = 40;}
    if(color == undefined){color = "#ffff00";}
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.lineWidth = -1;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.radius = radius;
    this.color = color;
    this.isPickedUp = isPickedUp;

    this.itemSpriteImage = new Image();
    this.itemSpriteImage.src = "./assets/item.png"; 
    this.itemSpriteImagePick = new Image();
    this.itemSpriteImagePick.src = "./assets/itembw.png"; 
    this.spriteWidth = 12132/ 6; 
    this.spriteHeight = 1793; 
    this.spriteZoom = 5; 
    this.frameCount = 6;
    this.currentFrame = 0;
    this.timePerFrame = 100; 
    this.lastUpdateTime = 0;
}

Item.prototype.draw = function(context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);

    this.updateFrame();
    
    let spriteImage = this.itemSpriteImage;

    if(this.isPickedUp){
        spriteImage = this.itemSpriteImagePick;
    }else{
        spriteImage = this.itemSpriteImage;
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
    } 
    context.restore();
};

Item.prototype.getBounds = function() { 
    return { 
        x: this.x - this.radius, 
        y: this.y - this.radius, 
        width: this.radius * 2, 
        height: this.radius * 2 
    }; 
};

Item.prototype.updateFrame = function () {
    var currentTime = Date.now();
    if (currentTime - this.lastUpdateTime >= this.timePerFrame) {
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
      this.lastUpdateTime = currentTime;
    }
};
