//alert
window.onload = function () {
    function slideOut(element) {
        element.classList.add('hide');
        setTimeout(function () {
            element.style.display = 'none';
        }, 3000);
    }

    var successAlert = document.querySelector('.alert-success');
    var errorAlert = document.querySelector('.alert-error');

    if (successAlert) {
        successAlert.style.display = 'block';
        setTimeout(function () {
            successAlert.classList.add('show');
        }, 100);

        setTimeout(function () {
            slideOut(successAlert);
        }, 3000);
    }

    if (errorAlert) {
        errorAlert.style.display = 'block';
        setTimeout(function () {
            errorAlert.classList.add('show');
        }, 100);

        setTimeout(function () {
            slideOut(errorAlert);
        }, 3000);
    }
};
//end alert