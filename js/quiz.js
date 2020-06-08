window.onload = setQuiz();

$(document).ready(function() {
    $('input[type="radio"').change(function() {
        var sel = document.getElementsByName($(this).prop('name'));
        $(sel).closest('.answer').removeClass('highlighted');
        $(this.parentNode).addClass('highlighted');
    });
});

(function() {
    function buildQuiz() {
        var output = [];

        myQuestions.forEach((currentQuestion, questionNumber) => {
            output.push(window.TEMPLATES.NAVIGATION_NUMBER(questionNumber));
        });

        navigationContainer.innerHTML = output.join('');

        output = [];
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];

            for (const letter in currentQuestion.answers) {
                answers.push(window.TEMPLATES.ANSWER(letter, questionNumber, currentQuestion));
            }

            output.push(window.TEMPLATES.SLIDE_VIEW(questionNumber, currentQuestion, answers));
        });

        output.push(window.TEMPLATES.SCORE_VIEW());
        output.push(window.TEMPLATES.BUTTONS());

        quizContainer.innerHTML = output.join('');
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        slides[n].classList.add('active');
        navigators[currentSlide].classList.remove('navigation-number-active');

        if (n != myQuestions.length) {
            navigators[n].classList.add('navigation-number-active');
        }

        currentSlide = n;
        if (currentSlide === 0) {
            previousButton.style.display = 'none';
        } else {
            previousButton.style.display = 'block';
        }
        if (currentSlide === slides.length - 2) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitButton.style.display = 'none';
        }

        if (currentSlide === myQuestions.length) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'none';
            previousButton.style.display = 'none';
            navigationContainer.style.display = 'none';
        }
    }

    function checkAll() {
        var a = 0;
        for (var i = 0; i < myQuestions.length; i++) {
            var radio = document.getElementsByName('question' + i);
            for (var j = 0; j < radio.length; j++)
                if (radio[j].checked) {
                    a++;
                    break;
                }
        }
        if (a == myQuestions.length) return true;
    }

    function showResults() {
        if (!checkAll()) {
            $('.error-container').css('display', 'flex');
            $('.quiz').css('display', 'none');
            return;
        }
        const answerContainers = quizContainer.querySelectorAll('.answers-container');

        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            if (userAnswer === currentQuestion.correctAnswer) numCorrect++;
        });

        showSlide(myQuestions.length);
        const resultsContainer = document.getElementById('score-text');
        const scorePercentage = document.getElementById('score-percentage');

        var percentage = Math.trunc(numCorrect / myQuestions.length * 100);
        scorePercentage.innerHTML = ` ${percentage} % Score`;
        if (percentage < 50) {
            congrats[0].innerHTML = `Oh no! You should try again tomorrow`;
            scoreSuccess[0].innerHTML = `Sorry, You cannot affix the sticker yet`;
            $('.score-icon>img').attr('src', 'images/sad.svg');
        } else congrats[0].innerHTML = `You did it!`;
        resultsContainer.innerHTML = `You got ${numCorrect} correct out of ${myQuestions.length}`;
    }

    function home() {
        window.location = 'index.html';
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function showSlideNav() {
        var n = parseInt(this.id, 10);
        showSlide(n);
    }

    $('.error-box>img').click(function() {
        $('.error-container').css('display', 'none');
        $('.quiz').css('display', 'flex');
    });

    const myQuestions = window.QUESTIONS[localStorage.getItem('title')];
    const quizContainer = document.getElementById('quiz-container');
    const navigationContainer = document.getElementById('navigation-container');
    buildQuiz();

    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const homeButton = document.getElementById('home');
    const submitButton = document.getElementById('submit');
    const slides = document.querySelectorAll('.slide');
    const navigators = document.querySelectorAll('.navigation-number');
    const congrats = document.querySelectorAll('.score-congrats');
    const scoreSuccess = document.querySelectorAll('.score-success');

    var currentSlide = 0;
    showSlide(currentSlide);

    for (i = 0; i < navigators.length; i++) navigators[i].addEventListener('click', showSlideNav);
    homeButton.addEventListener('click', home);
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener('click', showPreviousSlide);
    nextButton.addEventListener('click', showNextSlide);
})();