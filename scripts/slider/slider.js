/*
  div[data-slider]
    ul
      li
        some content
      li
        some content
      ...
    button <prev>
    button <next>
*/

let slider = function() {
  /*
  0. найти все слайдеры /sliders
  1. найти все слайды всех слайдеров /slides
  2. найти элементы управления всех слайдеров /buttons
  3. определить количество элементов /count
  4. найти первый слайд /slide1
  5. добавить событие "клик" элементам управления
  6. реализовать код для перелистывания слайдов /active
  7. добавить автовоспроизведение слайдов в режиме ожидания /auto
  */
  let auto = function(slider, buttonNext) {
    let sI;

    let run = function() {
      sI = setInterval(function() {
        buttonNext.click();
      }, 3000);
    }
    run();
   
    slider.addEventListener('mouseenter', function() {
      clearInterval(sI);
    });
    slider.addEventListener('mouseleave', function() {
      run();
    });
  };

  let prev = function(slide1, count) {
    let marginLeft = slide1.style.marginLeft;
    if (!marginLeft) return;
    else marginLeft = +marginLeft.match(/\d+/)[0];
    if (isNaN(marginLeft)) return;
    marginLeft -= 100;
    slide1.style.marginLeft = `-${marginLeft}%`;
  };
  
  let next = function(slide1, count) {
    let marginLeft = slide1.style.marginLeft;

    if(!marginLeft) slide1.style.marginLeft = '-100%';
    else marginLeft = +marginLeft.match(/\d+/)[0];
    if (isNaN(marginLeft)) return;
    if ((count * 100) - 100 == marginLeft) return;
    marginLeft += 100;
    slide1.style.marginLeft = `-${marginLeft}%`;
  };

  let active = function(slider) {
    let slides = slider.querySelectorAll('ul > li');
    let buttons = slider.querySelectorAll('button');
    
    if (!slides || slides.length == 0) return;
    if (!buttons || buttons.length == 0) return;

    let slide1 = slides[0]

    let buttonPrev = buttons[0];
    let buttonNext = buttons[1];

    let count = slides.length;

    buttonPrev.addEventListener('click', function() {
      prev(slide1, count);
    });
    buttonNext.addEventListener('click', function() {
      next(slide1, count);
    });
    auto(slider, buttonNext);
  };

  let sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(function(slider) {
      active(slider);
    });
  
}