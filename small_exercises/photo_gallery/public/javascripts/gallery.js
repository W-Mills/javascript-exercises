$(function() {
  const templates = {};
  let photos;

  $("script[type='text/x-handlebars']").each(function(){
    const $template = $(this);
    templates[$template.attr('id')] = Handlebars.compile($template.html());
  });

  $("[data-type=partial]").each(function() {
    const $partial = $(this);
    Handlebars.registerPartial($partial.attr('id'), $partial.html());
  });

  const slideshow = {
    $el: $('#slideshow'),
    duration: 500,
    prevSlide: function(e) {
      e.preventDefault();
      const $current = this.$el.find('figure:visible');
      let $prev = $current.prev('figure');

      if (!$prev.length) {
        $prev = this.$el.find('figure').last();
      }
      $current.fadeOut(this.duration);
      $prev.fadeIn(this.duration);
      this.renderPhotoContent($prev.attr('data-id'));
    },

    nextSlide: function(e) {
      e.preventDefault();
      const $current = this.$el.find('figure:visible');
      let $next = $current.next('figure');

      if (!$next.length) {
        $next = this.$el.find('figure').first();
      }
      $current.fadeOut(this.duration);
      $next.fadeIn(this.duration);
      this.renderPhotoContent($next.attr('data-id'));
    },
    renderPhotoContent: function(index) {
      $("[name=photo_id]").val(index);
      renderPhotoInformation(+index);
      getCommentsFor(index);
    },
    bind: function() {
      this.$el.find('a.prev').on('click', this.prevSlide.bind(this));
      this.$el.find('a.next').on('click', this.nextSlide.bind(this));
    },
    init: function() {
      this.bind();
    },
  };
  
  $.ajax({
    url: '/photos',
    success: function(json) {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      slideshow.init();
      getCommentsFor(photos[0].id);
    }
  });

  $('section > header').on('click', '.actions a', function(e) {
    e.preventDefault();
    const $e = $(e.target);
    const photo_index = slideshow.$el.find('figure:visible').index();
    const current_photo = photos[photo_index];

    $.ajax({
      url: $e.attr('href'),
      type: 'post',
      data: 'photo_id=' + $e.attr('data-id'),
      success: function(json) {
        $e.text(function(i, text) {
          return text.replace(/\d+/, json.total);
        });
        current_photo[$e.attr('data-property')] = json.total;
      }
    });
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    const $f = $(this);

    $.ajax({
      url: $f.attr('action'),
      type: $f.attr('method'),
      data: $f.serialize(),
      success: function(json) {
        $('#comments ul').append(templates.photo_comment(json));
        $f[0].reset();
      }
    });
  });

  function renderPhotos() {
    $('slides').html(templates.photos({ photos: photos }));
  }

  function renderPhotoInformation(index) {
    const photo = photos.filter(function(item) {
      return item.id === index;
    })[0];
    $('section > header').html(templates.photo_information(photo));
  }

  function getCommentsFor(index) {
    $.ajax({
      url: '/comments',
      data: "photo_id=" + index,
      success: function(comment_json){
        $('#comments ul').html(templates.photo_comments({comments: comment_json}));
      },
    });
  }
});
