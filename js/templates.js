window.TEMPLATES = {
    NAVIGATION_NUMBER: (questionNumber) =>
        `<div class="navigation-number" id="${questionNumber}">
            <span class="number"> ${questionNumber + 1}</span>           
        </div>`,
    ANSWER: (letter, questionNumber, currentQuestion) =>
        `<label class="answer">
            <input type="radio" id="${letter}" name="question${questionNumber}" value="${letter}"/>

            <div class="answer-label">
                ${letter}
            </div>

            <p class="answer-text">
                ${currentQuestion.answers[letter]}
            </p>
            
            <div class="answer-label answer-label-x">
                ${letter}
            </div>
        </label>`,
    BUTTONS: () =>
        `<div class="button-container">
            <div class="button" id="home">EXIT</div>
            <div class="button" id="previous">GO BACK</div>
            <div class="button" id="next">NEXT</div>
            <div class="button" id="submit">SUBMIT</div>
        </div>`,
    SLIDE_VIEW: (questionNumber, currentQuestion, answers) =>
        `<div class="slide">
            <div class="slide-container">
                <p class="question">
                    ${questionNumber + 1}. ${currentQuestion.question}
                </p>
                
                <div class="answers-container">
                    ${answers.join('')}
                </div>
            </div>
        </div>`,
    SCORE_VIEW: () =>
        `<div class="slide">
            <div class="score-elements-container">
                <div class="score-icon">
                    <img src="images/happy.svg" alt="Face icon">
                </div>

                <p class="score-congrats"></p>
                <p class="score-percentage" id="score-percentage"></p>
                <p class="score-success">Wait for your friends before adding the sticker to the map</p>
                <p class="score-text" id="score-text"></p>
            </div>
        </div>`
};