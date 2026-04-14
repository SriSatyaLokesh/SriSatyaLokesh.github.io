/* ============================================
   Cinematic Background Music Player
   Track: Interstellar Instrumental
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicController = document.getElementById('music-controller');
    const visualizer = musicController.querySelector('.visualizer');
    const icon = musicToggle.querySelector('i');
    
    if (!music || !musicToggle || !musicController) return;

    let isPlaying = false;
    let hasInteracted = false;

    // Initial Volume (Low as requested)
    const targetVolume = 0.15;
    music.volume = 0;

    const startMusic = () => {
        if (hasInteracted) return;
        hasInteracted = true;
        
        music.play().then(() => {
            isPlaying = true;
            visualizer.classList.add('playing');
            fadeVolume(music, targetVolume, 3000);
            updateIcon();
        }).catch(err => {
            console.warn("Autoplay blocked or audio error:", err);
            hasInteracted = false; // Reset to try again on next click
        });
    };

    const fadeVolume = (audio, target, duration) => {
        const startVolume = audio.volume;
        const diff = target - startVolume;
        const steps = 30;
        const stepTime = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            audio.volume = Math.max(0, Math.min(1, startVolume + (diff * (currentStep / steps))));
            if (currentStep >= steps) {
                audio.volume = target;
                clearInterval(interval);
            }
        }, stepTime);
    };

    const toggleMusic = (e) => {
        if (e) e.stopPropagation(); // Prevent controller click triggering twice
        
        if (!hasInteracted) {
            startMusic();
            return;
        }

        if (isPlaying) {
            music.pause();
            visualizer.classList.remove('playing');
            isPlaying = false;
        } else {
            music.play();
            visualizer.classList.add('playing');
            isPlaying = true;
        }
        updateIcon();
    };

    const updateIcon = () => {
        if (isPlaying) {
            icon.className = 'fas fa-volume-up';
        } else {
            icon.className = 'fas fa-volume-mute';
        }
    };

    // Listen for first interaction anywhere on the document
    const triggerEvents = ['click', 'keydown', 'touchstart', 'scroll'];
    triggerEvents.forEach(event => {
        document.addEventListener(event, startMusic, { once: true });
    });

    // Toggle on button click
    musicToggle.addEventListener('click', toggleMusic);
    
    // Also toggle when clicking the controller area
    musicController.addEventListener('click', (e) => {
        if (e.target !== musicToggle && !musicToggle.contains(e.target)) {
            toggleMusic(e);
        }
    });

    // Handle audio ending (loop backup)
    music.addEventListener('ended', () => {
        music.currentTime = 0;
        music.play();
    });

    console.log('%c✓ Cinematic Music System Ready', 'color: #FF5C00; font-weight: bold;');
});
