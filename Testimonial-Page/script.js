// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
let currentIndex = 0;

function getVisible() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
}

function updateCarousel() {
    const cardWidth = track.children[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

document.querySelector('.custom-prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

document.querySelector('.custom-next').addEventListener('click', () => {
    const maxIndex = track.children.length - getVisible();
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

window.addEventListener('resize', updateCarousel);

// ===== STAR RATING =====
const starBtns = document.querySelectorAll('.star-btn');
let selectedRating = 0;

starBtns.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-val'));
        updateStars(selectedRating);
    });
    star.addEventListener('mouseover', () => updateStars(parseInt(star.getAttribute('data-val'))));
    star.addEventListener('mouseout', () => updateStars(selectedRating));
});

function updateStars(count) {
    starBtns.forEach((s, i) => s.textContent = i < count ? '★' : '☆');
}

// ===== SLIDE ADD =====
function addSlide(data, index) {
    const stars = '★'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    const num = index < 10 ? '0' + index : '' + index;

    const div = document.createElement('div');
    div.classList.add('reviews-box');
    div.innerHTML = `
        <span class="no">${num}.</span>
        <div class="star">${stars}</div>
        <p>${data.review}</p>
        <div class="user">
            <h2>${data.name}</h2>
            <p>${data.location}</p>
        </div>
    `;

    track.appendChild(div);

    currentIndex = track.children.length - getVisible();
    if (currentIndex < 0) currentIndex = 0;
    updateCarousel();
}

// ===== SUBMIT =====
document.querySelector('.submit-btn').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const location = document.getElementById('location').value.trim();
    const review = document.getElementById('review').value.trim();

    if (!name || !location || !email || !review || selectedRating === 0) {
        alert('Please fill all fields and select a rating!');
        return;
    }

    const newReview = { name, email, location, review, rating: selectedRating };
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    reviews.push(newReview);
    localStorage.setItem('userReviews', JSON.stringify(reviews));

    addSlide(newReview, 3 + reviews.length);

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('location').value = '';
    document.getElementById('review').value = '';
    selectedRating = 0;
    updateStars(0);
});

// ===== PAGE LOAD =====
window.addEventListener('load', function () {
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '[]');
    reviews.forEach((r, i) => addSlide(r, 4 + i));
    if (reviews.length > 0) {
        currentIndex = 0;
        updateCarousel();
    }
});