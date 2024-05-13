

$(document).ready(function(){  
  $('.carousel__inner').slick({

      infinite: true,
      speed: 1200,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      dots: true,
      dotsClass: 'custom-dots',
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 1, // Показывать только 1 слайд
      variableWidth: true, // Включить переменную ширину слайдов



      responsive: [
          {
              breakpoint: 768,
              settings: {
                  dots: true,
                  arrows: false
              }
          }
      ]

    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
      $(this)
        .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    }); 

    // $('.catalog-item__link').each(function(i) {
    //   $(this).on('click', function(e){
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //   })
    // })

    // $('.catalog-item__back').each(function(i) {
    //   $(this).on('click', function(e){
    //     e.preventDefault();
    //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //   })
    // })

    function toggleSlide(item){
      $(item).each(function(i) {
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
      })
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modals
    $('[data-modals=consultation]').on('click', function(){
      $('.overlay,#consultation').fadeIn('slow');
    });
    $('.modals__close').on('click',function(){
      $('.overlay,#consultation,#thanks,#order').fadeOut('slow');
    });

    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modals__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay,#order').fadeIn('slow');

      })
    });

    function validateForms (form){
      $(form).validate({
        rules: {
          name: {
              required: true,
              minlength: 2
          },
          phone: "required",
          email: {
              required: true,
              email: true
          }
      },
      messages: {
          name: {
              required: "Пожалуйста, введите своё имя",
              minlength: jQuery.validator.format("Введите {0} символа!")
            },
          phone: "Пожалуйста, введите свой номер телефона",
          email: {
            required: "Пожалуйста, введите свою почту",
            email: "Неправильно введён адрес почты"
          }
      }
      });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    //mask
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    //если форма будет пустой, то не будет отправляться 
    // if (!$(this).valid()){
    //   return;
    //   }

      
    $('form').submit(function(e) {
      e.preventDefault();
      if (!$(this).valid()){
      return;
      }
      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });

  // Smooth scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$("a[href=#up]").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top});
    return false;
});

new WOW().init();
});


window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  const catalog = document.querySelector('.catalog');
  const carouselSection = document.querySelector('.carousel');
  const navHeight = nav.offsetHeight;
  const scrollPosition = window.scrollY;

  // Проверяем, проходит ли пользователь через nav
  if (scrollPosition >= nav.offsetTop) {
      // Если пользователь проходит через nav, задаем фиксированное положение для nav
      nav.style.position = 'fixed';
      nav.style.top = '0';
      nav.classList.add('scrolled');
      catalog.classList.add('scrolled');
  } else {
      // Если пользователь не проходит через nav, возвращаем нормальное положение для nav
      nav.style.position = 'static';
      nav.classList.remove('scrolled');
      catalog.classList.remove('scrolled');
  }

  // Проверяем, достиг ли пользователь верхней границы секции с каруселью при скролле вверх
  if (scrollPosition <= carouselSection.offsetTop + carouselSection.offsetHeight) {
      // Если пользователь скроллит вверх и достиг верхней границы секции с каруселью, возвращаем нормальное положение для nav
      nav.style.position = 'static';
      nav.classList.remove('scrolled');
      catalog.classList.remove('scrolled');
  }
});

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  const navMenu = document.querySelector('.nav__menu');
  const scrollPosition = window.scrollY;

  if (scrollPosition >= nav.offsetTop) {
      navMenu.classList.add('scrolled');
  } else {
      navMenu.classList.remove('scrolled');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach((link, index) => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const targetIndex = index; // Получаем индекс ссылки
          const targetTab = document.querySelectorAll('.catalog__tab')[targetIndex];
          const targetTabContent = document.querySelectorAll('.catalog__content')[targetIndex];

          // Показываем выбранный таб и его содержимое
          if (targetTab && targetTabContent) {
              // Делаем активным выбранный таб
              document.querySelectorAll('.catalog__tab').forEach(tab => {
                  tab.classList.remove('catalog__tab__active');
              });
              targetTab.classList.add('catalog__tab__active');

              // Показываем содержимое выбранного таба
              document.querySelectorAll('.catalog__content').forEach(content => {
                  content.classList.remove('catalog__content_active');
              });
              targetTabContent.classList.add('catalog__content_active');
          }
      });
  });
});































