const defaultTheme = () => {
   alert('switch to default theme');
   document.querySelector(".container").className = "default";
};

const oceanTheme = () => {
   alert('switch to ocean theme');
   document.querySelector(".container").className = "ocean";

};

const desertTheme = () => {
   alert('switch to desert theme');
   document.querySelector(".container").className = "desert";

};


document.querySelector("#default").onclick = defaultTheme;
document.querySelector("#ocean").onclick = oceanTheme;
document.querySelector("#desert").onclick = desertTheme;

