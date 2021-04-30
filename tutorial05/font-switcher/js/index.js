const makeBigger = () => {
   alert('make bigger!');
   document.querySelector(".content").style.fontSize = "larger";
};

const makeSmaller = () => {
   alert('make smaller!');
   document.querySelector(".content").style.fontSize = "smaller";
};


document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;

