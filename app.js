const submitBtn = document.querySelector(".submitBtn");

const quetionForm = document.querySelector(".quetionsForm");

const Category = document.querySelector("#Category");
const Defficulty = document.querySelector("#Defficulty");

const body = document.querySelector("body");

let NOQ = 0;
let scoure = 0;

submitBtn.addEventListener("click", async function() {

    submitBtn.parentElement.classList.add("display");
    quetionForm.classList.remove("display");

    console.log(Category.value);
    console.log(Defficulty.value);

    req();
})

const req = async function() {
    const request = await axios.get(`https://opentdb.com/api.php?amount=1&category=${Category.value}&difficulty=${Defficulty.value}&type=multiple`);

    // console.log(request.data.results[0].question);
    // console.log(request.data.results[0].correct_answer);
    // console.log(request.data.results[0].incorrect_answers);

    const quetion = document.createElement("h1");
    quetion.innerHTML = request.data.results[0].question;
    quetion.classList.add("quesion")
    quetionForm.append(quetion);

    const opetionsDiv = document.createElement("div");

    const rand = Math.ceil(Math.random() * 4);

    const rightBtn = document.createElement("button");
    rightBtn.innerHTML = request.data.results[0].correct_answer;
    rightBtn.classList.add("opetions");
    rightBtn.classList.add("rightAns");

    if (rand == 1) {

        opetionsDiv.append(rightBtn);

        for (let i = 0; i < 3; i++) {
            const wrongBtn = document.createElement("button")
            wrongBtn.innerHTML = request.data.results[0].incorrect_answers[i];
            wrongBtn.classList.add("opetions");
            opetionsDiv.append(wrongBtn);
        }
    } else if (rand == 2) {

        for (let i = 0; i < 3; i++) {
            const wrongBtn = document.createElement("button")
            wrongBtn.innerHTML = request.data.results[0].incorrect_answers[i];
            wrongBtn.classList.add("opetions");
            if (i == 1) {
                opetionsDiv.append(rightBtn);
            }
            opetionsDiv.append(wrongBtn);
        }
    } else if (rand == 3) {

        for (let i = 0; i < 3; i++) {
            const wrongBtn = document.createElement("button")
            wrongBtn.innerHTML = request.data.results[0].incorrect_answers[i];
            wrongBtn.classList.add("opetions");
            if (i == 2) {
                opetionsDiv.append(rightBtn);
            }
            opetionsDiv.append(wrongBtn);
        }
    } else if (rand == 4) {

        for (let i = 0; i < 3; i++) {
            const wrongBtn = document.createElement("button")
            wrongBtn.innerHTML = request.data.results[0].incorrect_answers[i];
            wrongBtn.classList.add("opetions");
            opetionsDiv.append(wrongBtn);
        }
        opetionsDiv.append(rightBtn);
    }
    quetionForm.append(opetionsDiv);

    const nextQueBtn = document.createElement("button");
    nextQueBtn.innerText = "Next Quetion";
    nextQueBtn.classList.add("nextQue");

    quetionForm.append(nextQueBtn);

    await userInput();
}

const userInput = async function() {

    const ansBtns = document.querySelectorAll(".opetions")

    for (let btn of ansBtns) {
        btn.addEventListener("click", function() {
            if (btn.classList.contains("rightAns") == true) {
                btn.classList.add("correct");
                // Chake if any other button has incorrect property
                for (let i = 0; i < 4; i++) {
                    // If Opetion 1 is correct
                    if (i == 0) {

                        if (ansBtns[i].classList.contains("inncorrect") || ansBtns[i + 1].classList.contains("inncorrect") || ansBtns[i + 2].classList.contains("inncorrect") || ansBtns[i + 3].classList.contains("inncorrect") == true) {
                            console.log("Dubble Selected");
                        } else {
                            scoure++;
                            console.log("Score : " + scoure);
                        }
                    }
                }
            } else {
                btn.classList.add("inncorrect");
            }
        })
    }

    const nextBtn = document.querySelector(".nextQue")
    nextBtn.addEventListener("click", function next() {
        const h1s = document.querySelector(".quesion");
        h1s.remove();
        const p = document.querySelector(".opetions");
        p.parentElement.remove();
        nextBtn.remove();
        NOQ++;
        if (NOQ < 10) {
            req();
        } else {
            console.log("Results : " + scoure);
            const scoreBord = document.querySelector(".quetionsForm");
            scoreBord.classList.add("result");
            const totalScore = document.createElement("h2");
            if (scoure > 5) {
                totalScore.innerHTML = `Yor Score is <span class="green"> ${scoure} </span>  out of <span class="green"> 10 </span>`;
            } else {
                totalScore.innerHTML = `Yor Score is <span class="red"> ${scoure} </span>  out of <span class="green"> 10 </span>`;
            }
            scoreBord.append(totalScore);
            const replay = document.createElement("div");
            replay.classList.add("tryAgain");
            replay.innerHTML = `<a href="index.html"><button>Try Again</button></a>`
            scoreBord.append(replay);
        }
    })
}