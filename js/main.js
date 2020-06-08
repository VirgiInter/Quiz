(function() {
    const e = document.querySelectorAll('.quiz-location');
    const locations = ['Forest', 'Lake', 'Windmill', 'Farm', 'Market', 'Hotel', 'Green', 'Factory', 'Train', 'Tech'];
    for (i = 0; i < e.length; i++) {
        e[i].id = locations[i];
        e[i].addEventListener('click', selectQuiz);
    }
})();

function selectQuiz() {
    localStorage.setItem('title', $(this).children('.quiz-text')[0].innerText);
    localStorage.setItem('icon', $(this).children('.quiz-icon').children('img')[0].src);
    window.location = 'quiz.html';
}

function setQuiz() {
    document.title = localStorage.getItem('title');
    document.getElementById('title').innerHTML = localStorage.getItem('title');
    document.getElementById('icon').src = localStorage.getItem('icon');
}

function home() {
    window.location = 'index.html';
}