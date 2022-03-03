import i18Obj from './translate.js';
//Burger menu
const iconMenu = document.querySelector('.burger__menu');
const menuHeader = document.querySelector('.menu__list');
if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock')
        iconMenu.classList.toggle('_active');
        menuHeader.classList.toggle('_active');
    });
}
// Плавная прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock')
                iconMenu.classList.remove('_active');
                menuHeader.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}
//Смена изображений в portfolio
const portfolioBtns = document.querySelector('.profile__buttons-block');
const portfolioBtn = document.querySelectorAll('.portfolio-block__button');
const portfolioImages = document.querySelectorAll('.porfolio__img');

function changeImage(event) {
        let seasons = event.target.dataset.season;
        if(event.target.classList.contains('portfolio-block__button')) {
            portfolioImages.forEach((img, index) => img.src = `./assets/img/${seasons}/${index + 1}.jpg`);
            portfolioBtn.forEach( portfolioBtn => portfolioBtn.classList.remove('active'));
            event.target.classList.add('active');
        }
}
portfolioBtns.addEventListener('click', changeImage)
//-----Перевод страницы--------------------------------------------------------------------------------------------------
const ruLang = document.querySelector('.language__ru');
const enLang = document.querySelector('.language__en');
const words = document.querySelectorAll('[data-i18n]');

function getTranslate(language) {
    if(language === 'ru') {
        words.forEach((element) => {
            element.textContent = i18Obj[language][element.dataset.i18n];       
        });
        enLang.classList.remove('active');
        ruLang.classList.add('active');
        localStorage.lang = 'ru';
    } else {
        words.forEach((element) => {
            element.textContent = i18Obj[language][element.dataset.i18n];       
        });
        ruLang.classList.remove('active');
        enLang.classList.add('active');  
        localStorage.lang = 'en' 
    }
}

ruLang.addEventListener('click', () => getTranslate('ru'));
enLang.addEventListener('click', () => getTranslate('en'));
//-----Смена стиля dark / light--------------------------------------------------------------------------------------------------
const toggleThemeBth = document.querySelector('.toggle-theme-bth')
const toggleImg = document.querySelector('.toggle-theme-image')

function setLightTheme() {
    document.body.classList.add('light');
    toggleImg.src = 'assets/svg/sun.svg';
    localStorage.theme = 'light';
}

toggleThemeBth.addEventListener('click', () => {
    if(document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        toggleImg.src = 'assets/svg/moon.svg';
        localStorage.theme = 'dark';
    } else {
        setLightTheme();
    }
})

//------Local storage(сохранение параметров страницы перед перезагрузкой)----------------------------------------------------------------------------------------------
function getLocalStorage() {
    if (localStorage.theme === 'light') {
        setLightTheme();
    }
    if(localStorage.lang === 'ru') {
        getTranslate('ru')
    }
    if(localStorage.lang === 'en') {
        getTranslate('en')
    }
}
window.addEventListener('load', getLocalStorage)
//-----Оценка----------------------------------------------------------------------------------------------------
 