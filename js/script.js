var modal = document.querySelector(".modal");
var modalCloseButton = ".modal__close";
var modalShowClass = "modal--show";
var modalErrorClass = "modal--error";

function modalShow(button, modal, focusFields = []) {
    button.addEventListener("click", function (evt) {
        evt.preventDefault();
        modal.classList.add(modalShowClass);
        if (focusFields.length !== 0) {
            focusFields.focus();
        }
    });
}

function modalClose(button, modal) {
    button.addEventListener("click", function (evt) {
        evt.preventDefault();
        modal.classList.remove(modalShowClass);
        modal.classList.remove(modalErrorClass);
    });

    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (modal.classList.contains(modalShowClass)) {
                modal.classList.remove(modalShowClass);
                modal.classList.remove(modalErrorClass);
            }
        }
    });
}

var addedCartButtons = document.querySelectorAll(".button.button--buy"),
    addedCartModal = document.querySelector(".modal.modal--added-cart");

if (addedCartButtons !== null && addedCartModal !== null) {
    var addedCartCloseButton = addedCartModal.querySelector(modalCloseButton);
    modalClose(addedCartCloseButton, addedCartModal);

    Array.prototype.forEach.call(addedCartButtons, function (addedCartButton) {
        modalShow(addedCartButton, addedCartModal);
    });
}

var mapButton = document.querySelector(".map-link"),
    mapModal = document.querySelector(".modal.modal--map");

if (mapButton !== null && mapModal !== null) {
    var mapCloseButton = mapModal.querySelector(modalCloseButton);

    modalShow(mapButton, mapModal);
    modalClose(mapCloseButton, mapModal);
}

var feedbackButton = document.querySelector(".feedback-button");
var feedbackModal = document.querySelector(".modal.modal--feedback");

if (feedbackButton !== null && feedbackModal !== null) {
    var feedbackCloseButton = feedbackModal.querySelector(modalCloseButton);
    var feedbackForm = feedbackModal.querySelector(".feedback-form");
    var feedbackFormFields = feedbackForm.querySelectorAll("[name]");
    var feedbackFormName = feedbackForm.querySelector("[name='name']");
    var feedbackFormEmail = feedbackForm.querySelector("[name='email']");
    var feedbackFormMessage = feedbackForm.querySelector("[name='message']");

    modalShow(feedbackButton, feedbackModal, feedbackFormName);
    modalClose(feedbackCloseButton, feedbackModal);

    Array.prototype.forEach.call(feedbackFormFields, function (feedbackFormField) {
        if (feedbackFormField.required === true) {
            feedbackFormField.required = false;
        }
    });

    feedbackForm.addEventListener("submit", function (evt) {
        if (!feedbackFormName.value || !feedbackFormEmail.value || !feedbackFormMessage.value) {
            evt.preventDefault();

            feedbackModal.classList.remove(modalErrorClass);
            feedbackModal.offsetWidth = feedbackForm.offsetWidth;
            feedbackModal.classList.add(modalErrorClass);
        }
    });
}