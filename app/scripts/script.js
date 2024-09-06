document.querySelector('.search-input').addEventListener('input', function() {
    const label = document.querySelector('.search-label');
    if (this.value !== '') {
        label.classList.add('filled');
    } else {
        label.classList.remove('filled');
    }
});