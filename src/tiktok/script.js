const videoData = [
    {
        id: 1,
        author: 'dance_queen',
        avatar: 'https://i.pravatar.cc/150?u=dance',
        caption: 'Dancing in the neon light! 💃✨',
        hashtags: ['#dance', '#neon', '#vibes'],
        music: 'Original sound - Dance Queen',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-2922-large.mp4',
        likes: '1.2M',
        comments: '12.5K',
        shares: '45K'
    },
    {
        id: 2,
        author: 'nature_explorer',
        avatar: 'https://i.pravatar.cc/150?u=nature',
        caption: 'Autumn is finally here. Look at these colors! 🍂',
        hashtags: ['#nature', '#autumn', '#peace'],
        music: 'Chill Lo-fi Beats',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-1305-large.mp4',
        likes: '850K',
        comments: '5.2K',
        shares: '12K'
    },
    {
        id: 3,
        author: 'family_moments',
        avatar: 'https://i.pravatar.cc/150?u=family',
        caption: 'Sweet moments with my little one ❤️',
        hashtags: ['#family', '#love', '#marshmallow'],
        music: 'Happy Acoustic Guitar',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-946-large.mp4',
        likes: '2.5M',
        comments: '45K',
        shares: '100K'
    }
];

const videoFeed = document.getElementById('video-feed');

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
        <img src="${video.avatar}" alt="${video.author}" class="author-avatar-top">
        <div class="video-content">
            <div class="video-header">
                <span class="author-nick">@${video.author}</span>
                <button class="follow-btn-main">Obserwuj</button>
            </div>
            <div class="video-caption">
                ${video.caption} ${video.hashtags.map(h => `<span class="hashtag">${h}</span>`).join(' ')}
            </div>
            <div class="music-tag">
                <i class="fas fa-music"></i> <span>${video.music}</span>
            </div>
            <div class="video-wrapper">
                <div class="video-player-container">
                    <video loop muted playsinline>
                        <source src="${video.videoUrl}" type="video/mp4">
                        Twoja przeglądarka nie wspiera wideo.
                    </video>
                    <div class="video-controls">
                        <div class="progress-bar">
                            <div class="progress-filled"></div>
                        </div>
                    </div>
                    <div class="play-pause-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="action-buttons">
                    <div class="action-btn creator-btn">
                        <div class="creator-avatar-wrapper">
                            <img src="${video.avatar}" alt="Avatar">
                            <div class="plus-icon"><i class="fas fa-plus"></i></div>
                        </div>
                    </div>
                    <div class="action-btn like-btn" data-id="${video.id}">
                        <div class="icon-wrapper"><i class="fas fa-heart"></i></div>
                        <span>${video.likes}</span>
                    </div>
                    <div class="action-btn comment-btn">
                        <div class="icon-wrapper"><i class="fas fa-comment-dots"></i></div>
                        <span>${video.comments}</span>
                    </div>
                    <div class="action-btn bookmark-btn">
                        <div class="icon-wrapper"><i class="fas fa-bookmark"></i></div>
                        <span>Zapisz</span>
                    </div>
                    <div class="action-btn share-btn">
                        <div class="icon-wrapper"><i class="fas fa-share"></i></div>
                        <span>${video.shares}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const videoEl = card.querySelector('video');
    const progressFilled = card.querySelector('.progress-filled');
    const playPauseOverlay = card.querySelector('.play-pause-overlay');
    const playerContainer = card.querySelector('.video-player-container');
    const followBtn = card.querySelector('.follow-btn-main');
    const plusIcon = card.querySelector('.plus-icon');

    // Video play/pause on click
    playerContainer.addEventListener('click', () => {
        if (videoEl.paused) {
            videoEl.play();
            playPauseOverlay.style.opacity = '0';
        } else {
            videoEl.pause();
            playPauseOverlay.style.opacity = '1';
        }
    });

    // Update progress bar
    videoEl.addEventListener('timeupdate', () => {
        const percent = (videoEl.currentTime / videoEl.duration) * 100;
        progressFilled.style.width = `${percent}%`;
    });

    // Like functionality
    const likeBtn = card.querySelector('.like-btn');
    const likeSpan = likeBtn.querySelector('span');
    let isLiked = false;

    likeBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        
        let currentText = likeSpan.textContent;
        let value = parseFloat(currentText);
        let suffix = currentText.replace(/[0-9.]/g, '');

        if (isLiked) {
            icon.style.color = '#fe2c55';
            value += suffix === 'M' ? 0.1 : 1;
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => icon.style.transform = 'scale(1)', 200);
        } else {
            icon.style.color = '';
            value -= suffix === 'M' ? 0.1 : 1;
        }
        
        likeSpan.textContent = value.toFixed(1) + suffix;
    });

    // Follow functionality
    const toggleFollow = () => {
        const isFollowing = followBtn.classList.toggle('following');
        if (isFollowing) {
            followBtn.textContent = 'Obserwujesz';
            followBtn.style.color = 'var(--tiktok-secondary-text)';
            followBtn.style.borderColor = 'var(--border-color)';
            plusIcon.style.display = 'none';
        } else {
            followBtn.textContent = 'Obserwuj';
            followBtn.style.color = 'var(--tiktok-red)';
            followBtn.style.borderColor = 'var(--tiktok-red)';
            plusIcon.style.display = 'flex';
        }
    };

    followBtn.addEventListener('click', toggleFollow);
    plusIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFollow();
    });

    return card;
}

function renderFeed() {
    videoData.forEach(video => {
        const card = createVideoCard(video);
        videoFeed.appendChild(card);
    });

    setupAutoplay();
}

function setupAutoplay() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7 // Play when 70% of video is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Autoplay blocked or failed:', e));
            } else {
                video.pause();
            }
        });
    }, options);

    document.querySelectorAll('.video-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', renderFeed);
