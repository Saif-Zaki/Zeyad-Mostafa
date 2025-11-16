const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const icon = modeToggle.querySelector('i');

const savedMode = localStorage.getItem('mode');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('mode', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('mode', 'light');
    }
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        const targetWidth = bar.getAttribute('data-width');
        
        setTimeout(() => {
            bar.style.width = `${targetWidth}%`;
        }, 100);
    });
}
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
document.querySelectorAll('a[href="#skills"]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            animateSkills();
        }, 500);
    });
});