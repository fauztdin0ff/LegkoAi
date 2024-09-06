/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

         __webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWebp": () => (/* binding */ isWebp)
            /* harmony export */
});
         // проверка поддержки webp, добавление класса webp или no-webp
         function isWebp() {
            //проверка поддержки webp
            function testWebP(callback) {

               var webP = new Image();
               webP.onload = webP.onerror = function () {
                  callback(webP.height == 2);
               };
               webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }

            //добавление класса
            testWebP(function (support) {
               if (support == true) {
                  document.querySelector('body').classList.add('webp');
               } else {
                  document.querySelector('body').classList.add('no-webp');
               }
            });
         }

         /***/
})
/******/]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
         /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
         /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
      /******/
}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for (var key in definition) {
/******/ 				if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
               /******/
}
            /******/
}
         /******/
};
      /******/
})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
      /******/
})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
         /******/
};
      /******/
})();
   /******/
   /************************************************************************/
   var __webpack_exports__ = {};
   // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
   (() => {
      __webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


      _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();


      //-------------------------------Прелоадер и плавное появление блоков---------------------------------
      if (document.readyState === "complete") {
         init();
      } else {
         window.addEventListener("load", init);
      }

      function init() {
         let preloader = document.querySelector('.preloader');
         let body = document.body;

         if (preloader) {
            body.classList.add('preloading');

            setTimeout(() => {
               preloader.classList.add('loaded');
               body.classList.remove('preloading');

               function onEntry(entry) {
                  entry.forEach(change => {
                     if (change.isIntersecting) {
                        change.target.classList.add('element-show');
                     }
                  });
               }

               let options = { threshold: [0.1] };
               let observer = new IntersectionObserver(onEntry, options);
               let elements = document.querySelectorAll('.element-animation');
               for (let elm of elements) {
                  observer.observe(elm);
               }
            }, 1200);
         }
      }



      //-----------------Хедер меню плавающий фон---------------------------
      document.addEventListener('DOMContentLoaded', function () {
         const highlight = document.querySelector('.menu__highlight');
         const links = document.querySelectorAll('.menu__link');

         if (!highlight || !links.length) return;

         links.forEach(link => {
            link.addEventListener('mouseenter', function () {
               const linkRect = this.getBoundingClientRect();
               const menuRect = this.closest('.menu__list').getBoundingClientRect();

               const width = linkRect.width;
               const left = linkRect.left - menuRect.left;

               highlight.style.width = `${width}px`;
               highlight.style.transform = `translateX(${left}px)`;
               highlight.style.opacity = '1';
            });
         });

         const menuList = document.querySelector('.menu__list');
         if (menuList) {
            menuList.addEventListener('mouseleave', function () {
               highlight.style.width = '0';
               highlight.style.opacity = '0';
            });
         }
      });

      //-----------------БУРГЕР МЕНЮ---------------------------
      let iconMenu = document.querySelector('.menu__icon');
      let menuBody = document.querySelector('.menu__body');

      if (iconMenu) {
         iconMenu.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');

            if (menuBody.classList.contains('_active')) {
               menuBody.classList.remove('closed');
            } else {
               menuBody.classList.add('closed');
            }
         });
      }

      document.addEventListener('click', (event) => {
         if (!event.target.closest('.menu__body') && !event.target.closest('.menu__icon')) {
            closeMenu();
         }
      });

      menuBody.querySelectorAll('a').forEach(link => {
         link.addEventListener('click', () => {
            closeMenu();
         });
      });

      function closeMenu() {
         document.body.classList.remove('_lock');
         iconMenu.classList.remove('_active');
         menuBody.classList.remove('_active');
         menuBody.classList.add('closed');
      }

      /*------------------------------перенос мобильного меню---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const menuBody = document.querySelector('.menu__body');
         const main = document.querySelector('main');
         const container = document.querySelector('.menu');

         function moveMenu() {
            if (window.innerWidth < 980) {
               if (!main.contains(menuBody)) {
                  main.appendChild(menuBody);
                  menuBody.classList.add('closed')
               }
            } else {
               if (!container.contains(menuBody)) {
                  container.appendChild(menuBody);
               }
            }
         }

         moveMenu();
         window.addEventListener('resize', moveMenu);
      });


      /*------------------------------Анимация текста в hero---------------------------*/
      document.addEventListener('DOMContentLoaded', () => {
         const subtitles = document.querySelectorAll('.hero__subtitle');
         if (!subtitles.length) return;

         const container = document.querySelector('.hero__subtitles');
         if (!container) return;

         const duration = 8;
         const interval = duration / subtitles.length;

         subtitles.forEach((subtitle, index) => {
            subtitle.style.animationDelay = `${index * interval}s`;
            subtitle.style.animationDuration = `${duration}s`;
         });

         const calculateMaxHeight = () => {
            let maxHeight = 0;
            subtitles.forEach(subtitle => {
               const height = subtitle.getBoundingClientRect().height;
               if (height > maxHeight) {
                  maxHeight = height;
               }
            });
            container.style.height = `${maxHeight}px`;
         };

         window.addEventListener('resize', calculateMaxHeight);
         calculateMaxHeight();

         const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
               if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  if (container.classList.contains('element-show')) {
                     setTimeout(() => {
                        subtitles.forEach((subtitle) => {
                           subtitle.classList.add('animate');
                        });
                     }, 1600);
                  }
               }
            });
         });

         observer.observe(container, {
            attributes: true,
            attributeFilter: ['class'],
         });
      });

      /*------------------------------Наведение на кнопку---------------------------*/
      function initButtonEffect() {
         const buttons = document.querySelectorAll('.button');
         if (!buttons.length) return;

         buttons.forEach(button => {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            button.appendChild(circle);

            let mouseX = 0;
            let mouseY = 0;
            const delay = 0.04;
            let circleX = 0;
            let circleY = 0;

            button.addEventListener('mousemove', (event) => {
               const rect = button.getBoundingClientRect();
               mouseX = event.clientX - rect.left;
               mouseY = event.clientY - rect.top;
            });

            function updateCircle() {
               circleX += (mouseX - circleX) * delay;
               circleY += (mouseY - circleY) * delay;
               circle.style.left = `${circleX}px`;
               circle.style.top = `${circleY}px`;

               requestAnimationFrame(updateCircle);
            }

            updateCircle();

            button.addEventListener('mouseover', () => {
               circle.style.width = '20px';
               circle.style.height = '20px';
            });

            button.addEventListener('mouseout', () => {
               circle.style.width = '0';
               circle.style.height = '0';
            });
         });
      }

      function handleResize() {
         if (window.innerWidth > 1200) {
            initButtonEffect();
         }
      }

      handleResize();
      window.addEventListener('resize', handleResize);


      /*------------------------------Слайдеры ---------------------------*/
      // Инициализация внешнего слайдера
      let mainSwiper;

      function toggleMainSwiper() {
         const screenWidth = window.innerWidth;

         if (screenWidth <= 767) {
            if (mainSwiper && mainSwiper.initialized) {
               mainSwiper.destroy(true, true);
               document.querySelector('.services__main-slider').classList.remove('swiper');
               document.querySelector('.services__main-slider-wrapper').classList.remove('swiper-wrapper');
               const slides = document.querySelectorAll('.services__main-slide');
               slides.forEach(slide => slide.classList.remove('swiper-slide'));
            }
         } else {
            if (!mainSwiper || !mainSwiper.initialized) {
               document.querySelector('.services__main-slider').classList.add('swiper');
               document.querySelector('.services__main-slider-wrapper').classList.add('swiper-wrapper');
               const slides = document.querySelectorAll('.services__main-slide');
               slides.forEach(slide => slide.classList.add('swiper-slide'));

               mainSwiper = new Swiper('.services__main-slider', {
                  loop: true,
                  slidesPerView: 1,
                  simulateTouch: false,
                  spaceBetween: 20,
                  navigation: {
                     nextEl: '.slider-button-next',
                     prevEl: '.slider-button-prev',
                  },
                  parallax: true,
                  speed: 600,
                  effect: 'fade',
                  fadeEffect: {
                     crossFade: true,
                  },
                  autoplay: {
                     delay: 2500,
                     stopOnLastSlide: false,
                     disableOnInteraction: true,
                     pauseOnMouseEnter: true,
                  },
               });
            }
         }
      }

      toggleMainSwiper();

      window.addEventListener('resize', toggleMainSwiper);

      document.querySelectorAll('.services__subcontent').forEach((subcontent) => {
         const subSwiperInstance = new Swiper(subcontent.querySelector('.services__sub-slider'), {
            loop: true,
            slidesPerView: 1,
            grabCursor: true,
            navigation: {
               nextEl: subcontent.querySelector('.subslider-button-next'),
               prevEl: subcontent.querySelector('.subslider-button-prev'),
            },
            pagination: {
               el: subcontent.querySelector('.swiper-pagination'),
               clickable: false,
            },
            speed: 600,
            effect: "creative",
            creativeEffect: {
               prev: {
                  shadow: false,
                  translate: ["-20%", 0, -1],
               },
               next: {
                  translate: ["100%", 0, 0],
               },
            },
         });

         const links = subcontent.querySelectorAll('.services__subslider-links a');
         links.forEach((link, index) => {
            link.addEventListener('click', (e) => {
               e.preventDefault();

               subSwiperInstance.slideToLoop(index);

               links.forEach(l => l.classList.remove('active'));
               link.classList.add('active');
            });
         });

         links[0].classList.add('active');

         subSwiperInstance.on('slideChange', () => {
            links.forEach(l => l.classList.remove('active'));
            links[subSwiperInstance.realIndex].classList.add('active');
         });
      });


      /*------------------------------Calc range---------------------------*/
      const sliderContainer = document.querySelector('.slider-container');
      const minValue = parseInt(sliderContainer.getAttribute('data-min'));
      const maxValue = parseInt(sliderContainer.getAttribute('data-max'));
      const step = 100;
      const slider = document.querySelector('.range-slider');
      const thumb = document.querySelector('.range-slider__thumb');
      const tooltip = document.querySelector('.range-slider__tooltip');
      const resultValue = document.querySelector('.calculator__result-value');
      let isDragging = false;

      function updateSlider(position) {
         const sliderRect = slider.getBoundingClientRect();
         let percentage = (position - sliderRect.left) / sliderRect.width;
         percentage = Math.min(Math.max(percentage, 0), 1);
         let value = minValue + percentage * (maxValue - minValue);
         value = Math.round(value / step) * step;
         value = Math.min(Math.max(value, minValue), maxValue);
         thumb.style.left = `${percentage * 100}%`;
         let tooltipLeft = percentage * 100;
         tooltipLeft = Math.min(tooltipLeft, 80);
         tooltip.style.left = `${tooltipLeft}%`;
         tooltip.innerText = `${value.toLocaleString()} руб`;
         const savings = Math.round(value * 0.30);
         resultValue.innerText = `${savings.toLocaleString()} руб.`;
      }

      function onMove(e) {
         if (isDragging) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSlider(clientX);
         }
      }

      function startDragging(e) {
         isDragging = true;
         document.body.style.cursor = 'grabbing';
         e.preventDefault();
      }

      function stopDragging() {
         isDragging = false;
         document.body.style.cursor = 'default';
      }

      thumb.addEventListener('mousedown', startDragging);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', stopDragging);
      thumb.addEventListener('touchstart', startDragging);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('touchend', stopDragging);
      updateSlider(slider.getBoundingClientRect().left + (324900 - minValue) / (maxValue - minValue) * slider.clientWidth);

      /*------------------------------Label input---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const input = document.querySelector('.calculator__form-item input');
         if (!input) return;

         const formItem = input.closest('.calculator__form-item');
         if (!formItem) return;

         function checkInput() {
            if (input.value.trim() !== '') {
               formItem.classList.add('active');
            } else {
               formItem.classList.remove('active');
            }
         }

         input.addEventListener('focus', function () {
            formItem.classList.add('active');
         });

         input.addEventListener('input', checkInput);
         input.addEventListener('blur', checkInput);
         checkInput();
      });

      /*------------------------------Движение изображения---------------------------*/
      if (window.innerWidth > 1000) {
         document.addEventListener('mousemove', function (event) {
            const bgElement = document.querySelector('.more__bg');
            if (!bgElement) return;

            const rect = bgElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = event.clientX - centerX;
            const deltaY = event.clientY - centerY;
            const rotateX = deltaY / 70;
            const rotateY = -deltaX / 35;

            bgElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
         });
      }

      /*------------------------------Переносы---------------------------*/
      function handleSpeakerElements() {
         const speakerContainer = document.querySelector('.webinar__speaker');
         const speakerTitle = document.querySelector('.webinar__speaker-title');
         const mobContainer = document.querySelector('.speaker-mob');
         const webinarContent = document.querySelector('.webinar__content');
         const webinarInfo = document.querySelector('.webinar__info');

         if (window.innerWidth < 767) {
            if (!mobContainer.contains(speakerTitle)) {
               mobContainer.prepend(speakerTitle);
            }
            if (!webinarInfo.contains(speakerContainer)) {
               webinarInfo.appendChild(speakerContainer);
            }
         } else {
            if (!speakerContainer.contains(speakerTitle)) {
               speakerContainer.insertBefore(speakerTitle, speakerContainer.firstChild);
            }
            if (!webinarContent.contains(speakerContainer)) {
               webinarContent.appendChild(speakerContainer);
            }
         }
      }

      window.addEventListener('load', handleSpeakerElements);
      window.addEventListener('resize', handleSpeakerElements);

      /*------------------------------Popup---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const body = document.querySelector('body');
         const openPopupButtons = document.querySelectorAll('.open-popup');
         const popup = document.querySelector('.popup');
         if (!body || !openPopupButtons.length || !popup) return;

         const popupBody = popup.querySelector('.popup__body');
         const form = popup.querySelector('.popup__form');
         if (!popupBody || !form) return;

         openPopupButtons.forEach(button => {
            button.addEventListener('click', function () {
               popup.classList.add('opened');
               body.classList.add('no-scroll');
            });
         });

         popup.addEventListener('click', function (event) {
            if (!popupBody.contains(event.target)) {
               popup.classList.remove('opened');
               body.classList.remove('no-scroll');
            }
         });

         document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && popup.classList.contains('opened')) {
               popup.classList.remove('opened');
               body.classList.remove('no-scroll');
            }
         });

         form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (form.checkValidity()) {
               popupBody.classList.add('loading');

               setTimeout(function () {
                  popupBody.classList.remove('loading');
                  popupBody.classList.add('loaded');

                  setTimeout(function () {
                     popupBody.classList.remove('loaded');

                     const formData = new FormData(form);
                     fetch('send.php', {
                        method: 'POST',
                        body: formData
                     })
                        .then(response => response.text())
                        .then(result => {
                           console.log(result);
                           form.reset();
                           popup.classList.remove('opened');
                           body.classList.remove('no-scroll');
                        })
                        .catch(error => {
                           console.error('Ошибка:', error);
                        });
                  }, 3000);
               }, 3000);
            } else {
               form.reportValidity();
            }
         });
      });



      /*------------------------------Валидация первой формы---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const form = document.querySelector('.calculator__form');
         if (!form) return;

         const formItem = form.querySelector('.calculator__form-item');
         if (!formItem) return;

         form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (form.checkValidity()) {
               form.classList.add('loading');

               setTimeout(function () {
                  form.classList.remove('loading');
                  form.classList.add('loaded');

                  setTimeout(function () {
                     form.classList.remove('loaded');

                     const formData = new FormData(form);
                     fetch('send.php', {
                        method: 'POST',
                        body: formData
                     })
                        .then(response => response.text())
                        .then(result => {
                           console.log(result);
                           form.reset();
                        })
                        .catch(error => {
                           console.error('Ошибка:', error);
                        });
                  }, 3000);
               }, 3000);
            } else {
               form.reportValidity();
            }
         });
      });


      /*------------------------------Маска номера---------------------------*/
      document.addEventListener('DOMContentLoaded', function () {
         const maskOptions = {
            mask: '+{7}(000)000-00-00'
         };

         const elements = document.querySelectorAll('.tel-mask');
         elements.forEach(function (element) {
            IMask(element, maskOptions);
         });
      });

   })();

   /******/
})()
   ;