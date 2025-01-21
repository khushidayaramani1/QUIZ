 
let num = 5;  
let cat = "";  
let diff = "medium";  
let t = 5;  
let score=0;

const submit=document.querySelector("#submit");
const total_score = document.querySelector("#total-score")


const numOfQuestions = document.querySelector("#questions")
numOfQuestions.addEventListener('change',()=>{
    num=numOfQuestions.value;
    console.log(numOfQuestions.value)
 })

const category=document.querySelector("#category");
category.addEventListener('change',()=>{
    cat=category.value;
    console.log(category.value)
 })

const difficulty=document.querySelector("#difficulty");
difficulty.addEventListener('change',()=>{
    diff=difficulty.value;
    console.log(difficulty.value)
 })

const time=document.querySelector("#time");
time.addEventListener('change',()=>{
    t=time.value;
    console.log(time.value)
})
let restart=document.querySelector("#restart") 
let new_quiz=document.querySelector("#new-quiz") 

let data;
let mcq=document.querySelector("#mcq");
let opt1=document.querySelector("#opt1") 
let opt2=document.querySelector("#opt2") 
let opt3=document.querySelector("#opt3") 
let opt4=document.querySelector("#opt4") 
// console.log(option1.textContent)

let inner=document.querySelector("#inner") 
let option1=document.querySelector("#option1") 
let option2=document.querySelector("#option2") 
let option3=document.querySelector("#option3") 
let option4=document.querySelector("#option4") 

let current=document.querySelector(".question") 

// const url = 'http://localhost:5000/mcqs'
const url=`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`
// const url=`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`
async function getQuestion(){
    console.log("--function execution started--")
    const response=await fetch(url);
    data= await response.json();
    console.log(data);
    // console.log(data.results[0].question)
}
const start_quiz=document.querySelector("#start-quiz");
 function showQuestion(k){
    if(k<5){
    current.innerHTML=`Question ${k+1}/5`;
     
    mcq.innerHTML=data.results[k].question
    let correctAns=data.results[k].correct_answer;
    let myAnswers=[data.results[k].correct_answer,
                    data.results[k].incorrect_answers[0],
                    data.results[k].incorrect_answers[1],
                    data.results[k].incorrect_answers[2]
                ]
    opt1.textContent=myAnswers[0]
    opt2.textContent=myAnswers[1]
    opt3.textContent=myAnswers[2]
    opt4.textContent=myAnswers[3]

    let myOptions=[opt1,opt2,opt3,opt4]

    options2=[option1,option2,option3,option4]
     
    options2.forEach((elem)=>{
        elem.style.backgroundColor="transparent"
        elem.addEventListener('click',()=>{            
            if(elem.children[0].textContent==correctAns){
                elem.style.backgroundColor="green";
                score++;
                increaseProgress();
            }
            else{
                elem.style.backgroundColor="red";
            } 
        })
        options2.forEach((e)=>{
            e.style.backgroundColor="transparent";
        })
    })
    k++;
    myOptions.forEach((elem)=>{
        elem.style.backgroundColor="transparent"
    })
    say=t*1000;
    setTimeout(()=>showQuestion(k),say);
}
if(k>=5){
    setTimeout(()=>{
        submit.innerHTML='View Score'
    },say+3000)
}
console.log('score is'+score)
}
let i=0;
start_quiz.addEventListener('click', async ()=>{
    await getQuestion(); 
    console.log("---clicked-----")
    showQuestion(i);
})

submit.addEventListener('click',()=>{
    total_score.textContent=`${score}/5`
})

function increaseProgress() {
    let currentWidth = parseFloat(inner.style.width) || 0;
    if (currentWidth < 100) {
        inner.style.width = `${Math.min(currentWidth + 20, 100)}%`;  
    }
}

function restartQuiz(){
    mcq.innerHTML='this is a question';
    opt1.textContent="Answer"
    opt2.textContent="Answers"
    opt3.textContent="Answers"
    opt4.textContent="Answers"
    options2.forEach((elem)=>{
        elem.style.backgroundColor="transparent";
    })
}

restart.addEventListener('click',()=>{
    restartQuiz();
})
new_quiz.addEventListener('click',()=>{
    restartQuiz();
})

