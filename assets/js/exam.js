const workplace = document.querySelector(".qanda");
const helpplace = document.querySelector(".help_wrapper>.num_qa");
const timer = document.querySelector("#time");
const selectedPart = document.querySelector(".selected-part").innerHTML;
const partBtns = document.querySelectorAll(".part");


creatQA2 = (stt, question, options)=>{
  workplace.innerHTML += `<form class="qanda">
        <div class = "sentences">
          <p class="question">${stt}. ${question}</p>
          <input type="radio" class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[1]}"> ${options[1]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[2]}"> ${options[2]}<br>
          <input type="radio" class="answer" name = "${stt}" value="${options[3]}"> ${options[3]}<br> 
        </div>

      </form>`
}

creatQA1 = (stt, question, options)=>{
    workplace.innerHTML += `<form class="qanda">
          <div class = "sentences">
            <p class="question">${stt}. ${question}</p>
            <input type="radio" class="answer" name = "${stt}" value="${options[0]}"> ${options[0]}<br>
            <input type="radio" class="answer" name = "${stt}" value="${options[1]}"> ${options[1]}<br>
          </div>
  
        </form>`
}

creatQA3 = (stt, question, options)=>{
    workplace.innerHTML += `<form class="qanda">
          <div class = "sentences">
            <p class="question">${stt}. ${question}</p>
            <input type="checkbox" class="answer" value="${options[0]}"> ${options[0]}<br>
            <input type="checkbox" class="answer" value="${options[1]}"> ${options[1]}<br>
            <input type="checkbox" class="answer" value="${options[2]}"> ${options[2]}<br>
            <input type="checkbox" class="answer" value="${options[3]}"> ${options[3]}<br> 
          </div>
        </form>`
}

creatQA4 = (stt, question, options)=>{
    workplace.innerHTML += `<form class="qanda">
          <div class = "sentences">
            <p class="question">${stt}. ${question}</p>
            <textarea type = "text" placeholder = "Nhập câu trả lời"></textarea>
          </div>
  
        </form>`
}


// Time counter
var count = 3600;
const interval = 1000; // 1 giây

function counter() {
    count--; // Tăng biến đếm lên mỗi lần hàm được gọi
    timer.innerHTML = convertSecond2Minutes(count);
    if (count === 0){
      window.alert("Đã hết giờ làm bài");
      clearInterval(timerr);
    }
}

const timerr = setInterval(counter, interval);

convertSecond2Minutes = (second)=>{
  let minutes = Math.floor(second / 60);
  let seconds = second % 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}

      
// Nộp bài thi

const submit_btn = document.querySelector(".submit-btn");
const form = document.querySelector("#form");
submit_btn.addEventListener('click', (event) => {
  event.preventDefault();
  form.submit();
  window.alert("Nộp bài thành công")
  window.location.href = "result.html";
  
})



// Display QA
getQA = (path)=>{
    fetch(path)
    .then(response => response.json())
    .then(data => {
      if(path.includes("yes-no")){
        for (let i = 0; i<data.length;i++){
            creatQA1(i+1, data[i].question, data[i].options);
          }      
      }
      else if (path.includes("tracnghiem")){
        for (let i = 0; i<data.length;i++){
            creatQA2(10+i+1, data[i].question, data[i].options);
          }      
      }
      else if (path.includes("multi")){
        for (let i = 0; i<data.length;i++){
            creatQA3(20+i+1, data[i].question, data[i].options);
          }      
      }
      else if (path.includes("tuluan")){
        for (let i = 0; i<data.length;i++){
            creatQA4(30+i+1, data[i].question, data[i].options);
          }           
        }
    })
    .catch(error => console.error('Error fetching JSON:', error))
}

getQA("./assets/json/yes-no.json");

partBtns.forEach(partBtn => {
    partBtn.addEventListener('click', () => {
        partBtns.forEach(partBtn => {
            partBtn.classList.remove('selected-part');
        });

        partBtn.classList.add('selected-part');
    });
});

partBtns.forEach(item =>{
    item.addEventListener("click", ()=>{
        workplace.innerHTML = "";
        if (item.innerHTML === "Part 2"){
            getQA("./assets/json/tracnghiem.json");
        }
        else if (item.innerHTML === "Part 1"){
            getQA("./assets/json/yes-no.json");
        }
        else if (item.innerHTML == "Part 3"){
            getQA("./assets/json/multi.json")
        }
        else if (item.innerHTML == "Part 4"){
            getQA("./assets/json/tuluan.json")
        }
    })
})

