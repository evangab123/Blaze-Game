window.utils={};
window.utils.parseColor = function (color, toNumber) {
  if (toNumber === true) {
    if (typeof color === 'number') {
      return (color | 0); //chop off decimal
    }
    if (typeof color === 'string' && color[0] === '#') {
      color = color.slice(1);
    }
    return window.parseInt(color, 16);
  } else {
    if (typeof color === 'number') {
      color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
    }
    return color;
  }
};


// window.utils.captureMouse = function (element) {
//     var mouse = {x: 0, y: 0, event: null};
//     element.addEventListener('mousemove', function (event) {
//       var x, y;
//      if (event.pageX || event.pageY) {
//         x = event.pageX;
//         y = event.pageY;
//       } else {
//         x = event.clientX + body_scrollLeft + element_scrollLeft;
//         y = event.clientY + body_scrollTop + element_scrollTop;
//       }
//       x -= offsetLeft;
//       y -= offsetTop;
//       mouse.x = x;
//       mouse.y = y;
//       mouse.event = event;
//     }, false);
//     return mouse;
//   };

window.utils.captureMouse= function (element) {
  var mouse = { x: 0, y: 0, event: null },
    body_scrollLeft = document.body.scrollLeft,
    element_scrollLeft = document.documentElement.scrollLeft,
    body_scrollTop = document.body.scrollTop,
    element_scrollTop = document.documentElement.scrollTop,
    offsetLeft = element.offsetLeft,
    offsetTop = element.offsetTop;

  element.addEventListener(
    "mousemove",
    function (event) {
      var x, y;

      if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + body_scrollLeft + element_scrollLeft;
        y = event.clientY + body_scrollTop + element_scrollTop;
      }

      x -= offsetLeft;
      y -= offsetTop;

      mouse.x = x;
      mouse.y = y;
      mouse.event = event;
    },
    false
  );

  return mouse;
};

utils.intersects = function (rectA, rectB) { 
  return !(rectA.x + rectA.width < rectB.x || 
  rectB.x + rectB.width < rectA.x || 
  rectA.y + rectA.height < rectB.y || 
  rectB.y + rectB.height < rectA.y); 
 };
