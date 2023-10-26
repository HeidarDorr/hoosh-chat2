var typed = new Typed(document.querySelector('#typedjs-fa'), {
    strings: ['پیشنهاد محصول', 'نوشتن کتاب', 'تولید صدای انسانی', 'مترجم هوشمند', 'راهنمای گردشگری', 'تولید عکس'],
    typeSpeed: 25,
    backSpeed: 10,
    backDelay: 1500,
    startDelay: 500,
    cursorChar: '|',
    loop: true,
    fadeOut: true,
})

document.querySelector('#theme-btn').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
})