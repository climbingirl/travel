// adaptive menu + pop-up

const overlayEl = document.querySelector('.overlay');
const burgerMenuEl = document.querySelector('.burger-menu');
const adaptiveMenuEl = document.querySelector('.adaptive-menu');
const adaptiveMenuBtnCloseEl = document.querySelector('.adaptive-menu__close-btn');
const loginBtnEl = document.querySelector('.header__btn-login');
const registerHintEl = document.querySelector('.pop-up__hint_register');
const loginHintEl = document.querySelector('.pop-up__hint_login');
const popUpSingInEl = document.querySelector('.pop-up_sing-in');
const popUpSingUpEl = document.querySelector('.pop-up_sing-up');
const popUpSingInBtnEl = document.querySelector('.pop-up__form-btn_sing-in');
const popUpSingUpBtnEl = document.querySelector('.pop-up__form-btn_sing-up');

const popUpSingInInnerHtm = popUpSingInEl.innerHTML;
const popUpSingUpInnerHtm = popUpSingUpEl.innerHTML;

function openOverlay() {
    overlayEl.classList.add('open');
    setTimeout(() => overlayEl.classList.add('visible'), 0);
}

function closeOverlay() {
    overlayEl.classList.remove('visible');
    overlayEl.addEventListener('transitionend', () => overlayEl.classList.remove('open'), {once: true});
}

function openMenu() {
    adaptiveMenuEl.classList.add('open'); 
    openOverlay();
}

function closeMenu() {
    adaptiveMenuEl.classList.remove('open');
    closeOverlay();
}

function openPopUp() {
    popUpSingInEl.classList.add('open'); 
    openOverlay();
}

function closeSingInPopUp() {
    popUpSingInEl.classList.remove('open');
    closeOverlay();
}

function closeSingUpPopUp() {
    popUpSingUpEl.classList.remove('active');
    popUpSingUpEl.classList.remove('open');
    closeOverlay();
    popUpSingInEl.classList.add('active');
}

function changePopUpHtml(e) {
    if (e.target.classList.contains('pop-up__hint_register')) {
        popUpSingInEl.classList.remove('active');
        popUpSingInEl.classList.remove('open');
        popUpSingUpEl.classList.add('open');
        popUpSingUpEl.classList.add('active');
    } else if (e.target.classList.contains('pop-up__hint_login')) {
        popUpSingUpEl.classList.remove('active');
        popUpSingUpEl.classList.remove('open');
        popUpSingInEl.classList.add('open');
        popUpSingInEl.classList.add('active');
    }
}

function showPopUpData(e) {
    e.preventDefault();

    const emailValue = e.target.form.querySelector('.pop-up__field_email').value;
    const passwordlValue = e.target.form.querySelector('.pop-up__field_password').value;

    alert(`E-mail: ${emailValue}\nPaasowd: ${passwordlValue}`);
}

overlayEl.addEventListener('click', (e) => {
    const isClickOnOverlay = e.target.classList.contains('overlay');
    const isMenuOpen = adaptiveMenuEl.classList.contains('open');
    const isPopUpSingInOpen = popUpSingInEl.classList.contains('open');
    const isPopUpSingUpOpen = popUpSingUpEl.classList.contains('open');
    
    if (isClickOnOverlay) {
        if (isMenuOpen) {
            closeMenu();
        } else if (isPopUpSingInOpen) {
            closeSingInPopUp();
        } else if (isPopUpSingUpOpen) {
            closeSingUpPopUp();
        }
    }
});

burgerMenuEl.addEventListener('click', openMenu);
adaptiveMenuBtnCloseEl.addEventListener('click', closeMenu);
adaptiveMenuEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('adaptive-menu__link_account')) {
        closeMenu();
        openPopUp();
        overlayEl.classList.add('visible');
    } else if (e.target.classList.contains('adaptive-menu__link')) {
        closeMenu();
    }
});

loginBtnEl.addEventListener('click', openPopUp);
registerHintEl.addEventListener('click', changePopUpHtml);
loginHintEl.addEventListener('click', changePopUpHtml);
popUpSingInBtnEl.addEventListener('click', showPopUpData);
popUpSingUpBtnEl.addEventListener('click', showPopUpData);

// slider

const slides = [
    {
        id: 0,
        name: 'Spain',
        img: 'assets/img/spain.jpg',
        imgSmall: 'assets/img/spain-small.jpg'
    },
    {
        id: 1,
        name: 'Japan',
        img: 'assets/img/japan.jpg',
        imgSmall: 'assets/img/japan-small.jpg'
    },
    {
        id: 2,
        name: 'USA',
        img: 'assets/img/usa.jpg',
        imgSmall: 'assets/img/usa-small.jpg'
    },
];

const SLIDER = document.querySelector('.js-slider');
const SLIDER_INNER = SLIDER.querySelector('.destinations-slider__inner');
const DOTS_INNER = document.querySelector('.destinations-dots__inner');

let activeSlideId = 1;
const activeSlideClassName = 'destinations-slider__item_active';
const activeDotClassName = 'destinations-dots__item_active';

const createSlideTemplate = (slide) => {
    const slideEl = document.createElement('div');
    slideEl.classList.add('destinations-slider__item');
    slideEl.dataset.slideId = `${slide.id}`;
    slideEl.innerHTML = `<div class="destinations-slider__img-box">
                            <div class="destinations-slider__img destinations-slider__img_desc" style="background-image: url(${slide.img})";></div>
                            <div class="destinations-slider__img destinations-slider__img_small" style="background-image: url(${slide.imgSmall})";></div>
                        </div>
                        <span class="destinations-slider__name">${slide.name}</span>`;

    if(slide.id === activeSlideId) {
        slideEl.classList.add(activeSlideClassName);
    }
    
    return slideEl;
};

const createDots = () => {
    for (const slide of slides) {
        const dotEl = document.createElement('div');
        dotEl.classList.add('destinations-dots__item');
        dotEl.dataset.dotId = `${slide.id}`;
        
        if (slide.id === activeSlideId) {
            dotEl.classList.add(activeDotClassName);
        }

        DOTS_INNER.append(dotEl);
    }
}

const setSliderPosition = () => {
    const SLIDES = SLIDER_INNER.querySelectorAll('.destinations-slider__item');
    const activeSlideIndex = Array.from(SLIDES).findIndex(slide => slide.classList.contains(activeSlideClassName));
    const sliderWidth = SLIDER_INNER.offsetWidth;
    const slideWidth = SLIDES[0].offsetWidth;
    const gapWidth = parseInt(getComputedStyle(SLIDER_INNER).columnGap);

    const minOddSlideCount = activeSlideIndex * 2 + 1;
    const meredinaOddSliderTrackWidth = (minOddSlideCount * slideWidth) + ((minOddSlideCount - 1) * gapWidth);
    const translate = (sliderWidth / 2) - (meredinaOddSliderTrackWidth / 2);

    SLIDER_INNER.style.left = `${translate}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    slides.forEach(slide => SLIDER_INNER.append(createSlideTemplate(slide)));
    slides.forEach(slide => SLIDER_INNER.append(createSlideTemplate(slide)));

    if(activeSlideId === 0) {
        SLIDER_INNER.prepend(SLIDER_INNER.lastElementChild);
        SLIDER_INNER.prepend(SLIDER_INNER.lastElementChild);
    } else if (activeSlideId === 1) {
        SLIDER_INNER.prepend(SLIDER_INNER.lastElementChild);
    }

    const ACTIVE_SLIDES = SLIDER_INNER.querySelectorAll(`.${activeSlideClassName}`);
    ACTIVE_SLIDES[1].classList.remove(activeSlideClassName);
    
    createDots();
    DOTS_INNER.querySelector(`.destinations-dots__item[data-dot-id='${activeSlideId}']`).classList.add(activeDotClassName);

    setSliderPosition();

    window.addEventListener('resize', setSliderPosition);
});

const moveSlider = (direction) => {
    SLIDER.removeEventListener('click', sliderCkickHandler);
    const ACTIVE_SLIDE = SLIDER_INNER.querySelector(`.${activeSlideClassName}`);
    const ACTIVE_DOT = DOTS_INNER.querySelector(`.${activeDotClassName}`);
    const slideWidth = ACTIVE_SLIDE.offsetWidth;
    const gapWidth = parseInt(getComputedStyle(SLIDER_INNER).columnGap);
    const currentTranslate = parseInt(SLIDER_INNER.style.left);
    let newTranslate;

    if (direction === 'left') {
        newTranslate = currentTranslate + (slideWidth + gapWidth);
    } else if (direction === 'right') {
        newTranslate = currentTranslate - (slideWidth + gapWidth);
    }
    
    SLIDER_INNER.style.left = `${newTranslate}px`;
    
    SLIDER.addEventListener('transitionend', () => {
        let changedSlide;

        if (direction === 'left') {
            SLIDER_INNER.prepend(SLIDER_INNER.lastElementChild);
            changedSlide = ACTIVE_SLIDE.previousElementSibling;
        } else if (direction === 'right') {
            SLIDER_INNER.append(SLIDER_INNER.firstElementChild);
            changedSlide = ACTIVE_SLIDE.nextElementSibling;
        }

        ACTIVE_SLIDE.classList.remove(activeSlideClassName);
        changedSlide.classList.add(activeSlideClassName);

        activeSlideId = changedSlide.dataset.slideId;

        ACTIVE_DOT.classList.remove(activeDotClassName);
        DOTS_INNER.querySelector(`.destinations-dots__item[data-dot-id='${activeSlideId}']`).classList.add(activeDotClassName);

        SLIDER_INNER.style.transitionDuration = '0s';
        SLIDER_INNER.style.left = `${currentTranslate}px`;
        setTimeout(() => {
            SLIDER_INNER.style.transitionDuration = '';
            SLIDER.addEventListener('click', sliderCkickHandler);
        }, 0);
    }, {once: true});
};

const sliderCkickHandler = (e) => {
    const TARGET_SLIDE = e.target.closest('.destinations-slider__item');
    const ACTIVE_SLIDE = SLIDER_INNER.querySelector(`.${activeSlideClassName}`);
    const isClickedActiveSlide = !!TARGET_SLIDE && TARGET_SLIDE.matches(`.${activeSlideClassName}`); 
    
    if (isClickedActiveSlide) return;

    if (TARGET_SLIDE === ACTIVE_SLIDE.previousElementSibling || e.target.matches('.destinations-slider__arrow_left')) {
        moveSlider('left');
    } else if (TARGET_SLIDE === ACTIVE_SLIDE.nextElementSibling || e.target.matches('.destinations-slider__arrow_right')) {
        moveSlider('right');
    }
}

SLIDER.addEventListener('click', sliderCkickHandler);