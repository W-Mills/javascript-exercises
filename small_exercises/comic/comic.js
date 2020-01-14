$(function() {
  const $blinds = $('[id^=blind]');
  const speed = 250;
  let delay = 1500;

  function startAnimation() {
    $blinds.each(function(i) {
      let $blind = $blinds.eq(i);
      
      $blind.delay(delay * i + speed).animate({
        top: "+=" + $blind.height(),
        height: 0, 
        }, speed);
    });
  }


  $('button').on('click', function(e) {
    $blinds.finish();
    $blinds.removeAttr("style");
    startAnimation();    
  });

  startAnimation();
});