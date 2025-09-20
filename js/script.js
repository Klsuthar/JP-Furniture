document.addEventListener('DOMContentLoaded', () => {
    // Get the saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
});

function setLanguage(lang) {
    // Save the selected language to localStorage
    localStorage.setItem('language', lang);

    // Get all elements with data-lang-key attribute
    const elements = document.querySelectorAll('[data-lang-key]');

    elements.forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
}
