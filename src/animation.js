// Lottie Animation
lottie.loadAnimation({
    container: document.getElementById('heart-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'lottie-anim/heart.json'
});

// Music Player Controls
const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('playPause');
const volumeSlider = document.getElementById('volume');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        audio.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
});

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
});

// Set initial volume
audio.volume = volumeSlider.value / 100;

// Add loading state handler
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    const notification = document.querySelector('.notification');
    const closeNotification = document.querySelector('.notification-close');
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 500);

    // Handle notification close
    closeNotification.addEventListener('click', () => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    });

    // Auto-hide notification after 6 seconds
    setTimeout(() => {
        if (!notification.classList.contains('hide')) {
            notification.classList.add('hide');
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }
    }, 6000);
});

// Add smooth scroll for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href !== '#') {
            window.scrollTo({
                top: document.querySelector(href).offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add music player interaction hint
const musicPlayer = document.querySelector('.music-player');
const controlBtn = document.querySelector('.control-btn');

controlBtn.addEventListener('mouseenter', () => {
    musicPlayer.style.transform = 'translateX(-50%) scale(1.05)';
});

controlBtn.addEventListener('mouseleave', () => {
    musicPlayer.style.transform = 'translateX(-50%) scale(1)';
});

// Update video click handler
const findBtn = document.querySelector('.find-btn');
const videoOverlay = document.querySelector('.video-overlay');
const video = document.querySelector('#fullscreen-video');
const videoNotification = document.querySelector('.video-notification');

findBtn.addEventListener('click', () => {
    videoOverlay.classList.add('active');
    video.play();
    
    // Show notification after a short delay
    setTimeout(() => {
        videoNotification.classList.add('show');
    }, 500);
});

// Function to close video and hide notification
function closeVideo() {
    videoOverlay.classList.remove('active');
    video.pause();
    video.currentTime = 0;
    videoNotification.classList.remove('show');
}

// Close video on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoOverlay.classList.contains('active')) {
        closeVideo();
    }
});

// Close video on overlay click
videoOverlay.addEventListener('click', (e) => {
    if (e.target === videoOverlay) {
        closeVideo();
    }
});

// Hide notification when video ends
video.addEventListener('ended', () => {
    closeVideo();
});

// Replace createConfetti function with createFallingHearts
function createFallingHearts() {
    const hearts = ['💖', '💗', '💓', '💝', '💕'];
    for(let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heart.style.fontSize = (Math.random() * 0.5 + 1) + 'rem';
        document.body.appendChild(heart);
        
        // Remove heart after animation
        heart.addEventListener('animationend', () => {
            heart.remove();
            createSingleHeart();
        });
    }
}

function createSingleHeart() {
    const hearts = ['💖', '💗', '💓', '💝', '💕'];
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 0.5 + 1) + 'rem';
    document.body.appendChild(heart);
    
    heart.addEventListener('animationend', () => {
        heart.remove();
        createSingleHeart();
    });
}

// Start creating hearts instead of confetti
createFallingHearts();
