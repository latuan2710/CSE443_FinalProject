document.querySelectorAll('#FacetFiltersForm input').forEach(function (input) {
    input.addEventListener('change', function () {
        // Save the current scroll position
        const scrollPosition = {
            top: window.scrollY,
            left: window.scrollX
        };

        // Save the scroll position in session storage
        sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));

        // Submit the form
        this.closest('form').submit();
    });
});