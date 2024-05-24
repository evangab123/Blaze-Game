function Segment (width, height, color) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.color = (color === undefined) ? "#ffffff" : utils.parseColor(color);
    this.lineWidth = 1;
  }
  
  Segment.prototype.draw = function (context) {
    var h = this.height,
        d = this.width + h, 
        cr = h / 2;         
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.beginPath();
    context.moveTo(0, -cr);
    context.lineTo(d-2*cr, -cr);
    context.quadraticCurveTo(-cr+d, -cr, -cr+d, 0);
    context.lineTo(-cr+d, h-2*cr);
    context.quadraticCurveTo(-cr+d, -cr+h, d-2*cr, -cr+h);
    context.lineTo(0, -cr+h);
    context.quadraticCurveTo(-cr, -cr+h, -cr, h-2*cr);
    context.lineTo(-cr, 0);
    context.quadraticCurveTo(-cr, -cr, 0, -cr);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
      context.stroke();
    }
  
    context.beginPath();
    context.arc(0, 0, 2, 0, (Math.PI * 2), true);
    context.closePath();
    context.stroke();
  
    context.beginPath();
    context.arc(this.width, 0, 2, 0, (Math.PI * 2), true);
    context.closePath();
    context.stroke();
    
    context.restore();
  };
  
  Segment.prototype.getPin = function () {
    return {
      x: this.x + Math.cos(this.rotation) * this.width,
      y: this.y + Math.sin(this.rotation) * this.width
    };
  };

  Segment.prototype.getBounds = function () {
    // Define the corners of the segment before transformation
    const corners = [
      { x: 0, y: -this.height / 2 },
      { x: this.width, y: -this.height / 2 },
      { x: this.width, y: this.height / 2 },
      { x: 0, y: this.height / 2 }
    ];
  
    // Apply rotation and translation to each corner
    const transformedCorners = corners.map(corner => {
      const x = corner.x * Math.cos(this.rotation) - corner.y * Math.sin(this.rotation);
      const y = corner.x * Math.sin(this.rotation) + corner.y * Math.cos(this.rotation);
      return {
        x: x + this.x,
        y: y + this.y
      };
    });
  
    // Find the min and max x and y values from the transformed corners
    const minX = Math.min(...transformedCorners.map(corner => corner.x));
    const minY = Math.min(...transformedCorners.map(corner => corner.y));
    const maxX = Math.max(...transformedCorners.map(corner => corner.x));
    const maxY = Math.max(...transformedCorners.map(corner => corner.y));
  
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  };
  
  
  