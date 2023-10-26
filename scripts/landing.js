var typed = new Typed(document.querySelector('#typedjs'), {
    strings: ['Suggest Product', 'Book Writing', 'Recipe Maker', 'Translator', 'Tourist Spots', 'Business Name'],
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