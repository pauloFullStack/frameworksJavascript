

/* * * * Apis Start * * * */

export const sendEmailFunction = async () => {

    openModal('loading');
    const formData = new FormData();
    formData.append("name", document.querySelector("#name").value);
    formData.append("phone", document.querySelector("#phone").value);
    formData.append("email", document.querySelector("#email").value);
    formData.append("description", document.querySelector("#description").value);

    const data = Object.fromEntries(formData);

    fetch(`${getUrlCurrent()}api/v1/sendEmail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        if (response.status == "success") {
            closeModal();
            setModalNotification("#5800ff", "Email enviado com sucesso", "OK", true, "success", ['#name', '#email', '#phone', '#description']);
        } else if (response.status == "error") {
            closeModal();
            setModalNotification(
                "red",
                response.message,
                "OK",
                false,
                "danger"
            );
        } else if (response.status == "warning") {

            closeModal();
            if (response.isNullOrEmptyName) {
                document.querySelector("#name").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#nameNotification").textContent =
                    "O campo nome é obrigatório";
            } else if (!response.nameLength) {
                document.querySelector("#name").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#nameNotification").textContent =
                    "Deve conter mais de 3 caracteres";
            }

            if (response.isNullOrEmptyEmail) {
                document.querySelector("#email").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#emailNotification").textContent =
                    "O campo email é obrigatório";
            } else if (!response.validateEmail) {
                document.querySelector("#email").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#emailNotification").textContent =
                    "O email não é valido";
            }

            if (response.isNullOrEmptyPhone) {
                document.querySelector("#phone").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#phoneNotification").textContent =
                    "O campo telefone é obrigatório";
            } else if (!response.phoneLength) {
                document.querySelector("#phone").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#phoneNotification").textContent =
                    "O telefone não é valido";
            }

            if (response.existDescription && !response.descriptionLength) {
                document.querySelector("#description").style =
                    "border: 1px solid #ff0000 ";
                document.querySelector("#descriptionNotification").textContent =
                    "Deve conter mais de 10 caracteres";
            }

            setModalNotification("red", response.message, "OK", response.isClearFields, "warning");
        }
    });
}

/* * * * Apis End * * * */






/* * * * Utility Start * * * */

const getUrlCurrent = () =>
    new URL(
        `${window.location.protocol}//${window.location.hostname}${window.location.port ? ":" + window.location.port : ""
        }`
    );


export const scrollToSection = (event) => {
    const targetElement = document.getElementById(event.target.getAttribute('data-route'));
    const elementSelect = document.querySelector(`#${event.target.getAttribute('data-route')}Offcanvas`);

    ['homeOffcanvas', 'aboutOffcanvas', 'serviceOffcanvas', 'experienceOffcanvas', 'contactOffcanvas'].forEach((id) => {

        if (elementSelect && elementSelect.id == id) {
            if (!elementSelect.classList.contains('btn-menu-txt-offcanvas')) {
                elementSelect.classList.add('btn-menu-txt-offcanvas');
            }
        } else if (elementSelect && elementSelect.id != id && document.querySelector(`#${id}`).classList.contains('btn-menu-txt-offcanvas')) {
            document.querySelector(`#${id}`).classList.remove('btn-menu-txt-offcanvas');
        }
    });

    if (event.target.hasAttribute('data-offcavas')) {
        const offcanvas = document.getElementById('offcanvas');
        offcanvas.classList.remove('open');
    }


    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Ajuste para o recuo desejado
            behavior: "smooth",
        });
    }
}

/* * * * Utility End * * * */






/* * * * Masks Start * * * */

export const cellPhoneMask = (event) => {
    const input = event.target;
    let valor = input.value;

    clearInput(event);

    valor = valor.replace(/\D/g, "");

    if (valor.length > 2 && valor.length <= 6) {
        valor = "(" + valor.slice(0, 2) + ") " + valor.slice(2, 6);
    } else if (valor.length > 6) {
        valor =
            "(" +
            valor.slice(0, 2) +
            ") " +
            valor.slice(2, 7) +
            "-" +
            valor.slice(7, 11);
    }

    input.value = valor;
}

/* * * * Masks End * * * */






/* * * * Notification Start * * * */

function setModalNotification(
    colorSvg = "#5800ff",
    message = "Email enviado com sucesso",
    btnText = "OK",
    isClearFields = true,
    typeSvg = "success",
    arraySelectors = ""
) {
    if (isClearFields) {
        clearFields(arraySelectors);
    }

    openModal();

    document.querySelector(".div-main-modal").innerHTML = `<div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            "
            >
            <div style="margin-bottom: 1.3rem;color: ${colorSvg}" class="text-center">
              <h5>${message}</h5>
            </div>
            <div style="margin-bottom: 1rem;" >
              ${svgNotifications(typeSvg, colorSvg)}
            </div>
            <div style="width:100%" >
              <button class="btn btn-hover-${typeSvg == "success"
            ? "primary"
            : typeSvg == "warning"
                ? "danger"
                : typeSvg
        }" style="width:100%" id="btnCloseModal" >${btnText}</button>
            </div>
            </div>`;

    const btnsCloseModal = document.querySelectorAll('#btnCloseModal, #iconCloseModal');
    btnsCloseModal.forEach((btnCloseModal) => {
        btnCloseModal.addEventListener('click', closeModal)
    });
}

function svgNotifications(typeSvg, colorSvg) {
    if (typeSvg == "success") {
        return `<svg xmlns="http://www.w3.org/2000/svg" style="color: ${colorSvg};" width="50" height="50" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
      </svg>`;
    } else if (typeSvg == "warning") {
        return `<svg xmlns="http://www.w3.org/2000/svg" style="color: ${colorSvg};" width="50" height="50" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
      </svg>`;
    } else if (typeSvg == "danger") {
        return `<svg xmlns="http://www.w3.org/2000/svg" style="color: ${colorSvg};" width="50" height="50" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>`;
    } else {
        return "";
    }
}

/* * * * Notification End * * * */






/* * * * Inputs Start * * * */

export const clearInput = (event) => {

    if (event.target.nextElementSibling) {
        if (event.target.nextElementSibling.id !== '') {
            document.querySelector(`#${event.target.nextElementSibling.id}`).textContent = "";
            if (event.target.id) {
                const input = document.querySelector(`#${event.target.id}`);
                input.removeAttribute('style');
                input.classList.add('input-purple');
            }
        }
    }
}

function clearFields(selectors) {

    if (selectors && selectors !== '') {
        selectors.forEach((selector) => {

            if (document.querySelector(selector).getAttribute('select')) {
                for (let i = 0; i < document.querySelector(selector).options.length; i++) {
                    if (document.querySelector(selector).options[i].value === "") {
                        document.querySelector(selector).selectedIndex = i;
                        break;
                    }
                }
            } else {
                document.querySelector(selector).value = "";
            }

        });
    }
}

/* * * * Inputs End * * * */






/* * * * Modal Start * * * */

export const openModal = (loading) => {
    const modal = document.getElementById("modal");
    const openModalContent = document.getElementById("modal-content");
    modal.style.display = "block";
    openModalContent.style.display = 'block';
    document.body.classList.add('modal-open');

    if (loading) {
        document.querySelector(".div-main-modal").innerHTML = `
      <div class="spinner" role="status">
        <span class="sr-only"></span>
      </div>    `;
        document.querySelector('.div-main-modal').style = 'background-color: transparent;';
    }
}

export const closeModal = () => {
    if (document.querySelector('.div-main-modal').hasAttribute('style')) {
        document.querySelector('.div-main-modal').style = 'background-color: #fff;';
    }

    const modal = document.getElementById("modal");
    const openModalContent = document.getElementById("modal-content");
    modal.style.display = "none";
    openModalContent.style.display = 'none';
    document.body.classList.remove('modal-open');

    document.querySelector(".div-main-modal").innerHTML = '';

}

export const closeModalLoading = () => {
    const modal = document.getElementById("modal-loading");
    if (modal) {
        const openModalContent = document.getElementById("modal-content-loading");
        modal.style.display = "none";
        openModalContent.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
}

/* * * * Modal End * * * */





/* * * * Section Start * * * */

export const updateCurrentSection = (sections) => {

    sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= (section.id === 'contact' ? 200 : 150) && rect.bottom >= (section.id === 'contact' ? 200 : 150)) {
            document.querySelectorAll('.link-menu').forEach((link) => {
                if (section.id == link.getAttribute('data-route'))
                    link.style = 'border-bottom: solid 1px #ffffff';
                else
                    link.style = 'border-bottom: solid 1px transparent';

            });

            const elementSelect = document.querySelector(`#${section.id}Offcanvas`);

            ['homeOffcanvas', 'aboutOffcanvas', 'serviceOffcanvas', 'experienceOffcanvas', 'contactOffcanvas'].forEach((id) => {

                if (elementSelect && elementSelect.id == id) {
                    if (!elementSelect.classList.contains('btn-menu-txt-offcanvas')) {
                        elementSelect.classList.add('btn-menu-txt-offcanvas');
                    }
                } else if (elementSelect && elementSelect.id != id && document.querySelector(`#${id}`).classList.contains('btn-menu-txt-offcanvas')) {
                    document.querySelector(`#${id}`).classList.remove('btn-menu-txt-offcanvas');
                }
            });
        }
    });
}

export const redirectRouteUrl = (event = "") => {

    try {
        let isEventRedirect = true;
        if (event.target && event.target.tagName && event.target.tagName.toLowerCase() === 'input') {
            isEventRedirect = false;
        }

        if (isEventRedirect) {

            const data = createDataStructure(event);
            const endpoint = createEndpoint(event);
            toggleBackgroundColor(event);

            if (!endpoint.includes('null')) {

                fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {

                    if (response.redirect) {
                        window.location.href = `${getUrlCurrent().href}${response.route}`;
                        return;
                    }

                    document.querySelector('#root').innerHTML = response.html;
                    if (response.loadListener) {
                        loadListeners(response.loadListener);
                    }
                });
            }

        }

    } catch (error) {
        console.log('erro api redirect' + error);
    }


}

let count = 0;
const accordionEventListener = (event) => {

    const divPai = document.querySelector(`#${event.currentTarget.getAttribute('id')}`);

    if (divPai && count == 0) {


        let elementoFilho;

        if (divPai.getElementsByClassName('accordion-content')[0]) {
            elementoFilho = divPai.getElementsByClassName('accordion-content')[0];
        } else {
            elementoFilho = divPai.getElementsByClassName('accordion-content-open')[0];
        }


        if (elementoFilho && divPai.getAttribute('close') === '0') {
            elementoFilho.classList.remove('accordion-content');
            elementoFilho.classList.add('accordion-content-open');
            divPai.setAttribute('close', '1');
        } else if (elementoFilho) {
            elementoFilho.classList.remove('accordion-content-open');
            elementoFilho.classList.add('accordion-content');
            divPai.setAttribute('close', '0');
        }

    }

    if (count === 3)
        count = 0;
    else
        count++;
}

export const loadListeners = (dataLoadListener) => {

    dataLoadListener.forEach((listener) => {

        if (listener.isASingleSelector) {

            try {

                const selector = document.querySelector(listener.element);
                const kindOfEvent = listener.typeEvent;

                let isExistRedirectRouterUrl = false;
                let isExistApiFull = false;
                let isExistAccordionEventListener = false;

                if (selector.addEventListener(kindOfEvent, redirectRouteUrl) === redirectRouteUrl) {
                    isExistRedirectRouterUrl = true;
                }

                if (selector.addEventListener(kindOfEvent, apiFull) === apiFull) {
                    isExistApiFull = true;
                }

                if (selector.addEventListener(kindOfEvent, accordionEventListener) === accordionEventListener) {
                    isExistAccordionEventListener = true;
                }

                selector.addEventListener(kindOfEvent, async (event) => {

                    if (listener.alias === 'redirect' && !isExistRedirectRouterUrl) {
                        redirectRouteUrl(event);
                    }
                    else if (listener.alias === 'collapse' && !isExistAccordionEventListener) {
                        accordionEventListener(event);
                    } else if (!isExistApiFull && event.target.addEventListener.length !== 2) {
                        await apiFull(event);
                    }

                });

            } catch (error) {
                console.log('erro foreach 1: ' + error);
            }


        } else {


            try {

                const selector = document.querySelectorAll(listener.element);
                const kindOfEvent = listener.typeEvent;

                selector.forEach((element) => {


                    element.addEventListener(kindOfEvent, async (event) => {

                        let isExistRedirectRouteUrl = false;
                        let isExistClearInput = false;

                        if (event.target.addEventListener(kindOfEvent, redirectRouteUrl) === redirectRouteUrl) {
                            isExistRedirectRouteUrl = true;
                        }

                        if (event.target.addEventListener(kindOfEvent, clearInput) === clearInput) {
                            isExistClearInput = true;
                        }

                        if (listener.alias === 'redirect' && !isExistRedirectRouteUrl) {
                            redirectRouteUrl(event);
                        }
                        else if (!isExistClearInput) {
                            clearInput(event);
                        }
                    });
                });

            } catch (error) {
                console.log('erro foreach 2 all: ' + error)
            }


        }
    })

}

export const apiFull = async (event) => {
    
    let selectors = "";

    if (event.target.getAttribute('selectors') && event.target.getAttribute('selectors').replace(/[\[\]\s]/g, '').includes('#')) {
        selectors = event.target.getAttribute('selectors').replace(/[\[\]\s]/g, '').split(',');
    }
    const data = selectors !== '' ? createDataStructure(selectors) : {};
    const endpoint = createEndpoint(event.target.getAttribute('url'), false);

    try {

        const requestSettings = {
            method: event.target.getAttribute('method'),
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }

        if (requestSettings.method === 'GET')
            delete requestSettings.body;

        if (endpoint && !endpoint.includes('null')) {

            fetch(endpoint, requestSettings).then(function (response) {
                return response.json();
            }).then(function (res) {
                if (res.redirect) {
                    openModal(true);
                    window.location.href = `${getUrlCurrent().href}${res.route}`;
                    return;
                }

                handlesRequestReturn(res, selectors);
            });
        }

    } catch (erro) {
        console.log(erro);
    }

}

const handlesRequestReturn = (res, selectors) => {

    if (res.hasOwnProperty('error')) {

        if (!res.hasOwnProperty('doNotNotifyFields')) {
            res.error.forEach((itemError) => {
                document.querySelector(`#${itemError.incorrectFieldName}`).style = 'border: 1px solid red';
                document.querySelector(`#${itemError.incorrectFieldName}Notification`).innerHTML = itemError.message;
            });
        }

        setModalNotification(res.color, res.message, "OK", res.isClearFields, res.statusColor);
        return;
    }

    clearFields(selectors);
    setModalNotification(res.color, res.message, "OK", res.isClearFields, res.statusColor);
}

const toggleBackgroundColor = (event) => {


    if (event === "") {
        document.querySelectorAll('.menuEdit').forEach((element) => {
            if (element.getAttribute('isSelected')) {

                document.querySelector('#routeCurrentMenu').value = element.getAttribute('typeRedirect');

                if (element.querySelector('.flex-row-left-style')) {
                    element.querySelector('.flex-row-left-style').style = 'border: 1px solid #000';
                } else {
                    element.style = 'border: 1px solid #000';
                }
                element.removeAttribute('isSelected');
            }
            else {
                if (element.querySelector('.flex-row-left-style')) {
                    element.querySelector('.flex-row-left-style').style = 'background: transparent';
                } else {
                    element.style = 'background: transparent';
                }
            }
        });

        document.querySelectorAll('.subMenuEdit').forEach((element) => {

            if (element.getAttribute('isSelected')) {
                if (element.querySelector('.flex-row-left-style')) {
                    element.querySelector('.flex-row-left-style').style = 'border: 1px solid #000';
                } else {
                    element.style = 'border: 1px solid #000';
                }
                element.removeAttribute('isSelected');
            }
            else {
                if (element.querySelector('.flex-row-left-style')) {
                    element.querySelector('.flex-row-left-style').style = 'background: transparent';
                } else {
                    element.style = 'background: transparent';
                }
            }
        });


    }
    else {

        event.currentTarget.classList.forEach((classItem) => {
            if (classItem === 'menuEdit') {

                document.querySelectorAll('.subMenuEdit').forEach((element) => {

                    if (element.getAttribute('typeRedirect') === 'list') {
                        element.setAttribute('redirect', `library/edit/${event.currentTarget.getAttribute('typeRedirect')}/list`);

                        if (element.querySelector('.flex-row-left-style')) {
                            element.querySelector('.flex-row-left-style').style = 'border: 1px solid #000';
                        } else {
                            element.style = 'border: 1px solid #000';
                        }
                    }

                    if (element.getAttribute('typeRedirect') === 'add') {
                        element.setAttribute('redirect', `library/edit/${event.currentTarget.getAttribute('typeRedirect')}/add`);

                        if (element.querySelector('.flex-row-left-style')) {
                            element.querySelector('.flex-row-left-style').style = 'background: transparent';
                        } else {
                            element.style = 'background: transparent';
                        }
                    }
                });


                document.querySelectorAll(`.${classItem}`).forEach((element) => {
                    if (element.querySelector('.flex-row-left-style')) {
                        element.querySelector('.flex-row-left-style').style = 'background: transparent';
                    } else {
                        element.style = 'background: transparent';
                    }
                });
            }

            if (classItem === 'subMenuEdit') {

                document.querySelectorAll(`.${classItem}`).forEach((element) => {
                    if (element.querySelector('.flex-row-left-style')) {
                        element.querySelector('.flex-row-left-style').style = 'background: transparent';
                    } else {
                        element.style = 'background: transparent';
                    }
                });
            }
        });
        if (event.currentTarget.querySelector('.flex-row-left-style')) {
            event.currentTarget.querySelector('.flex-row-left-style').style = 'border: 1px solid #000';
        } else {

            if (!event.currentTarget.classList.contains('accordion-item') && !event.currentTarget.classList.contains('bi-arrow-left')) {
                event.currentTarget.style = 'border: 1px solid #000';
            }
        }
    }

}

const createEndpoint = (event, isRedirect = true) => {

    const endpoint = event !== "" && isRedirect ? `${getUrlCurrent()}${event.currentTarget.getAttribute('redirect')}` : isRedirect ? `${getUrlCurrent()}${document.querySelector('#routeLoading').value}` : event;

    if (document.querySelector('#routeLoading'))
        document.querySelector('#routeLoading').value = '';

    return endpoint;
}

const createDataStructure = (event) => {

    const formData = new FormData();



    if (Array.isArray(event)) {
        event.forEach((element) => {
            if (document.querySelector(element)) formData.append(element.slice(1), document.querySelector(element).value);
        });

    } else if (event !== '') {


        if (document.querySelector('#arrayToGoBack')) {

            let arrayToGoBack = JSON.parse(document.querySelector('#arrayToGoBack').value);

            arrayToGoBack.push(event.currentTarget.getAttribute('returnToPreviousPosition') ? event.currentTarget.getAttribute('returnToPreviousPosition') : event.currentTarget.getAttribute('position'));

            document.querySelector('#arrayToGoBack').value = JSON.stringify(arrayToGoBack);
            let ultimoElemento = parseInt(arrayToGoBack[arrayToGoBack.length - 1]);

            formData.append('returnToPreviousPosition', --ultimoElemento);

            formData.append('pageId', event.currentTarget.getAttribute('pageId') ? event.currentTarget.getAttribute('pageId') : '');
            formData.append('routeParameter', event.currentTarget.getAttribute('routeParameter') ? event.currentTarget.getAttribute('routeParameter') : '');

            let position = 0;

            if (event.currentTarget.getAttribute('pageId') === null) {
                position = parseInt(event.currentTarget.getAttribute('position'));
                position++;

                let enteredPositionTwo = false;

                let bugPositionCount = document.querySelector('#bugPositionCount').value;

                if (position === 1 && parseInt(bugPositionCount) > 0) {
                    formData.append('position', 1);
                    document.querySelector('#bugPositionCount').value = "0";
                    enteredPositionTwo = true;
                } else {
                    formData.append('position', position);
                }

                if (position === 1 && !enteredPositionTwo) {
                    let postionCount = parseInt(bugPositionCount);
                    postionCount++
                    document.querySelector('#bugPositionCount').value = postionCount;
                }




            } else {
                formData.append('position', event.currentTarget.getAttribute('position') ? event.currentTarget.getAttribute('position') : '');
            }

            if (arrayToGoBack[arrayToGoBack.length - 1] == '1') {
                document.querySelector('#arrayToGoBack').value = JSON.stringify([]);
            }

        }

        formData.append('redirect', event.currentTarget.getAttribute('redirect') ? event.currentTarget.getAttribute('redirect') : '');

    }

    return Object.fromEntries(formData);
}

