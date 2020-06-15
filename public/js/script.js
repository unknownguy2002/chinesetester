let clWords = [];
let meanings = [];

var app = new Vue({
    el: '#app',
    data: {
        word: '作文',
        answers: ["Essay", "Influence", "Precautions", "Dangerous"],
        correct: "Essay"
    }
})

updateInfo();

function updateInfo(){
    clWords = document.getElementById("clwords").value.split(", ")
    meanings = document.getElementById("meanings").value.split(", ")
    console.log(clWords, meanings)
}

updateQn()

function updateQn(){
    number = Math.abs(Math.round(Math.random()*clWords.length-1));
    word = clWords[number];
    meaning = meanings[number];

    axios.get(`/api/pinyin?word=${word}`).then((res)=>{
        console.log(res)
        app.word = word+" ["+res.data.text+"]"
        app.correct = meaning;

        app.answers = []
        for(let i = 0; i<3; i++){
            let chosen = meaning;
            while(chosen == meaning || app.answers.includes(chosen)){
                chosen = meanings[Math.abs(Math.round(Math.random()*clWords.length-1))]
            }
            app.answers.push(chosen);
        }

        app.answers.splice(Math.abs(Math.round(Math.random()*3)), 0, meaning);
    })
}

function correctAnswer(){
    document.getElementById("correct").classList.remove("red")
    document.getElementById("correct").classList.add("green")
    setTimeout(()=>{
        document.getElementById("correct").classList.remove("green")
        document.getElementById("correct").classList.add("red")
        updateQn()
    },800)
}