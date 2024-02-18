import { openBtn, closeBtn, offcanvas, inputs, inputPhone, btnSendEmail, btnLinks, sections, cardPrimaryLibrary, toGoBack } from "./getElements";
import { clearInput, scrollToSection, cellPhoneMask, sendEmailFunction, closeModalLoading, updateCurrentSection, redirectRouteUrl, loadListeners } from "./functions";




export default function eventsListener() {
    /* OffCanvas */
    if (openBtn) openBtn.addEventListener('click', function () {
        offcanvas.classList.add('open');
    });
    if (closeBtn) closeBtn.addEventListener('click', function () {
        offcanvas.classList.remove('open');

    });
    document.addEventListener('click', function (event) {

        const clickedElement = event.target;

        if (offcanvas && clickedElement && !offcanvas.contains(clickedElement) && !openBtn.contains(clickedElement)) {
            offcanvas.classList.remove('open');
        }
    });


    /* Form */
    if (inputs) inputs.forEach((input) => { input.addEventListener('input', clearInput) });
    if (inputPhone) inputPhone.addEventListener('input', cellPhoneMask);


    /* Buttons */
    if (btnSendEmail) btnSendEmail.addEventListener('click', sendEmailFunction);
    if (btnLinks) btnLinks.forEach((link) => { if (link) link.addEventListener('click', scrollToSection) });


    /* Cards */
    if (cardPrimaryLibrary) cardPrimaryLibrary.forEach((cardsRedirect) => { if (cardsRedirect) cardsRedirect.addEventListener('click', redirectRouteUrl) });
    if (toGoBack) toGoBack.addEventListener('click', redirectRouteUrl);

    /* Loading */
    window.addEventListener('load', function () {
        closeModalLoading();

        if (document.querySelector('#login')) {
            loadListeners([
                { typeEvent: 'click', element: '#apiFull', alias: 'btnSaveSection', isASingleSelector: true },
                { typeEvent: 'input', element: 'input, textarea, select', alias: 'listenToInputs', isASingleSelector: false },
                { typeEvent: 'click', element: '.select-clear', alias: 'listenToSelects', isASingleSelector: false }

            ]);
        }


        if (document.querySelector('#routeLoading'))
            redirectRouteUrl();

        window.addEventListener('scroll', function () {
            updateCurrentSection(sections);
        });

        updateCurrentSection(sections);
    });

    window.onscroll = function () {
        let posicaoAtual = window.scrollY || window.pageYOffset;
        const menu = document.querySelector('#menu');
        if (menu) {
            if (posicaoAtual > 160) {
                if (menu.classList.contains('menu')) {
                    menu.classList.remove('menu');
                    menu.classList.add('menu-visible');
                }
                else {
                    menu.classList.add('menu-visible');
                }
            } else {
                if (menu.classList.contains('menu-visible')) {
                    menu.classList.remove('menu-visible');
                    menu.classList.add('menu');
                }
                else {
                    menu.classList.add('menu');
                }
            }
        }
    };

    window.addEventListener('resize', function () {
        let larguraAtual = window.innerWidth;
        if (larguraAtual >= 831) {
            const offcanvas = document.querySelector('#offcanvas');
            if (offcanvas && offcanvas.classList.contains('open'))
                offcanvas.classList.remove('open');
        }

    });

}

