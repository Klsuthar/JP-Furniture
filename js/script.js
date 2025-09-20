document.addEventListener('DOMContentLoaded', () => {
    // Get the saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    createGallery('all');
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

const galleryImages = {
    'Bed': ['images/Gallery/Bed/1.jpg', 'images/Gallery/Bed/2.jpg', 'images/Gallery/Bed/3.jpg', 'images/Gallery/Bed/4.jpg', 'images/Gallery/Bed/5.jpg', 'images/Gallery/Bed/6.jpg', 'images/Gallery/Bed/7.jpg', 'images/Gallery/Bed/8.jpg', 'images/Gallery/Bed/9.jpg', 'images/Gallery/Bed/10.jpg', 'images/Gallery/Bed/11.jpg', 'images/Gallery/Bed/12.jpg', 'images/Gallery/Bed/13.jpg', 'images/Gallery/Bed/14.jpg', 'images/Gallery/Bed/15.jpg', 'images/Gallery/Bed/16.jpg', 'images/Gallery/Bed/17.jpg', 'images/Gallery/Bed/18.jpg', 'images/Gallery/Bed/19.jpg', 'images/Gallery/Bed/20.jpg', 'images/Gallery/Bed/21.jpg', 'images/Gallery/Bed/22.jpg', 'images/Gallery/Bed/23.jpg', 'images/Gallery/Bed/24.jpg', 'images/Gallery/Bed/25.jpg', 'images/Gallery/Bed/26.jpg', 'images/Gallery/Bed/27.jpg'],
    'Cupboard': ['images/Gallery/Cupboard/1.jpg', 'images/Gallery/Cupboard/2.jpg', 'images/Gallery/Cupboard/3.jpg', 'images/Gallery/Cupboard/4.jpg', 'images/Gallery/Cupboard/5.jpg', 'images/Gallery/Cupboard/6.jpg', 'images/Gallery/Cupboard/7.jpg', 'images/Gallery/Cupboard/8.jpg', 'images/Gallery/Cupboard/9.jpg'],
    'Dining_Table': ['images/Gallery/Dining_Table/1.jpg'],
    'Furniture': ['images/Gallery/Furniture/1.jpg', 'images/Gallery/Furniture/2.jpg', 'images/Gallery/Furniture/3.jpg', 'images/Gallery/Furniture/4.jpg', 'images/Gallery/Furniture/5.jpg', 'images/Gallery/Furniture/6.jpg'],
    'Kitchen': ['images/Gallery/Kitchen/1.jpg', 'images/Gallery/Kitchen/2.jpg', 'images/Gallery/Kitchen/3.jpg', 'images/Gallery/Kitchen/4.jpg'],
    'Pataisan': ['images/Gallery/Pataisan/1.jpg', 'images/Gallery/Pataisan/2.jpg', 'images/Gallery/Pataisan/3.jpg', 'images/Gallery/Pataisan/4.jpg', 'images/Gallery/Pataisan/5.jpg', 'images/Gallery/Pataisan/6.jpg', 'images/Gallery/Pataisan/7.jpg'],
    'Sofa': ['images/Gallery/Sofa/1.jpg', 'images/Gallery/Sofa/2.jpg', 'images/Gallery/Sofa/3.jpg', 'images/Gallery/Sofa/4.jpg', 'images/Gallery/Sofa/5.jpg', 'images/Gallery/Sofa/6.jpg'],
    'TV_Unit': ['images/Gallery/TV_Unit/1.jpg', 'images/Gallery/TV_Unit/2.jpg', 'images/Gallery/TV_Unit/3.jpg', 'images/Gallery/TV_Unit/4.jpg', 'images/Gallery/TV_Unit/5.jpg', 'images/Gallery/TV_Unit/6.jpg', 'images/Gallery/TV_Unit/7.jpg'],
    'Wooden_Ceiling': ['images/Gallery/Wooden_Ceiling/1.jpg', 'images/Gallery/Wooden_Ceiling/2.jpg', 'images/Gallery/Wooden_Ceiling/3.jpg', 'images/Gallery/Wooden_Ceiling/4.jpg', 'images/Gallery/Wooden_Ceiling/5.jpg', 'images/Gallery/Wooden_Ceiling/6.jpg', 'images/Gallery/Wooden_Ceiling/7.jpg', 'images/Gallery/Wooden_Ceiling/8.jpg', 'images/Gallery/Wooden_Ceiling/9.jpg', 'images/Gallery/Wooden_Ceiling/10.jpg', 'images/Gallery/Wooden_Ceiling/11.jpg']
};

let currentImageIndex = 0;
let currentCategoryImages = [];

function createGallery(filter = 'all') {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    let categories = (filter === 'all') ? Object.keys(galleryImages) : [filter];

    categories.forEach(category => {
        const images = galleryImages[category];
        if (images.length === 0) return;

        const col = document.createElement('div');
        col.className = `col gallery-item-col`;
        col.innerHTML = `
            <div class="card gallery-item" onclick="openModal('${category}')">
                <img src="${images[0]}" class="card-img-top" alt="${category}" data-category="${category}">
                <div class="card-body">
                    <h5 class="card-title">${category.replace('_', ' ')}</h5>
                </div>
            </div>
        `;
        galleryGrid.appendChild(col);
    });

    startSlideshows();
}

function filterGallery(category) {
    createGallery(category);

    const filterButtons = document.querySelectorAll('.btn-outline-primary');
    filterButtons.forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = Array.from(filterButtons).find(button => button.innerText.toLowerCase() === category.toLowerCase());
    if(activeButton){
        activeButton.classList.add('active');
    }
}

function openModal(category) {
    currentCategoryImages = galleryImages[category];
    currentImageIndex = 0;
    const modalImage = document.getElementById('modalImage');
    modalImage.src = currentCategoryImages[currentImageIndex];
    document.getElementById('galleryModalLabel').innerText = category.replace('_', ' ');
    const galleryModal = new bootstrap.Modal(document.getElementById('galleryModal'));
    galleryModal.show();
}

function startSlideshows() {
    const cards = document.querySelectorAll('.gallery-item');
    cards.forEach(card => {
        const img = card.querySelector('img');
        const category = img.dataset.category;
        const images = galleryImages[category];
        let currentIndex = 0;

        if (images.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                img.src = images[currentIndex];
            }, 3000);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if(prevBtn && nextBtn){
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length;
            document.getElementById('modalImage').src = currentCategoryImages[currentImageIndex];
        });

        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % currentCategoryImages.length;
            document.getElementById('modalImage').src = currentCategoryImages[currentImageIndex];
        });
    }
});