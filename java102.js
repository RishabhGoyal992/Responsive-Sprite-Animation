$(document).ready(function() {
  divContainer = $("div"); 
  sprite = "bucket.png";
  bucket = infoSprite(divContainer, "bucket", sprite, "47%", "20%", 40, 40, 10);
  addHoverAnimToSprite("bucket", "animate")
});
function infoSprite(parentDiv, name, source, xCoordinate, yCoordinate, maxHeight, maxWidth, nF) {
  var height = yToPx(maxHeight),
    width = maxWidth, 
    imageH, imageW,
    spriteImage = imageSelection(source, function(w, h) {
      imageH = h, imageW = w;
      width = imageW / ((imageH / nF) / height);
      
	  while (xPxToPercent(width) > maxWidth) {
        height = height - 10;
        width = imageW / ((imageH / nF) / height);
      }
       $('.' + name).css({
        height: height + "px",
        width: width + "px"
      });
    });
 $(window).resize(function() {
    if (xPxToPercent(width) < maxWidth) {
      while (xPxToPercent(width) < maxWidth && height < yToPx(maxHeight)) {
        height = height + 10;
        width = imageW / ((imageH / nF) / height);
      }
    }
    if (xPxToPercent(width) > maxWidth) {
      while (xPxToPercent(width) > maxWidth && height <= yToPx(maxHeight)) {
        height = height - 10;
        width = imageW / ((imageH / nF) / height);
      }
    }
    if (height > yToPx(maxHeight)) {
      height = yToPx(maxHeight);
      width = imageW / ((imageH / nF) / height);
    }
    $('.' + name).css({
      height: height + "px",
      width: width + "px"
    });
  });
parentDiv.append('<div class="' + name + ' sprite"></div>');
   $('.' + name).css({
    background: 'url("' + spriteImage.src + '")',
    'background-size': "100%",
    position: 'absolute',
    top: yCoordinate,
    left: xCoordinate,
   });
  return $('.' + name);
}
 
 function addHoverAnimToSprite(name, anim) {
  $('.' + name).hover(function() {
    $(this).addClass(anim);
    }
  );
}

function yToPx(y) {
  return ($(window).outerHeight(true) / 100) * y;
}
function xToPx(x) {
  return ($(window).outerWidth(true) / 100) * x;
}

function xPxToPercent(x) {
  return x * 100 / $(window).outerWidth(true);
}

function imageSelection(imageURL, callback) {
  var img = new Image();
  img.onload = function() {
    if (callback) callback(img.width, img.height);
  };
  img.src = imageURL;
  return img;
}