function Box(width, height, color, imageSrc) {
   if (width === undefined) { width = 50; }
   if (height === undefined) { height = 50; }
   if (color === undefined) { color = "#ff0000"; }
   this.x = 0;
   this.y = 0;
   this.width = width;
   this.height = height;
   this.vx = 0;
   this.vy = 0;
   this.rotation = 0;
   this.scaleX = 1;
   this.scaleY = 1;
   this.color = utils.parseColor(color);
   this.lineWidth = 100;

   // Load image if image source provided
   if (imageSrc) {
       this.image = new Image();
       this.image.src = imageSrc;
   }
}

Box.prototype.draw = function(context) {
   context.save();
   context.translate(this.x, this.y);
   context.rotate(this.rotation);
   context.scale(this.scaleX, this.scaleY);

   // Draw image if available, otherwise draw rectangle
   if (this.image) {
       context.drawImage(this.image, 0, 0, this.width, this.height);
   } else {
       context.fillStyle = this.color;
       context.fillRect(0, 0, this.width, this.height);
   }

   context.restore();
};

Box.prototype.getBounds = function() {
   return {
       x: this.x,
       y: this.y,
       width: this.width,
       height: this.height
   };
};
