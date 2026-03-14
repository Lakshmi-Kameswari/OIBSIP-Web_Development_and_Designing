// TYPING ANIMATION

const roles = [
"Frontend Developer",
"Full Stack Developer",
"Web Designer"
];

let roleIndex = 0;
let charIndex = 0;
let typingElement = document.getElementById("typing");

function typeEffect(){

if(charIndex < roles[roleIndex].length){

typingElement.textContent += roles[roleIndex].charAt(charIndex);
charIndex++;

setTimeout(typeEffect,80);

}else{

setTimeout(eraseEffect,1500);

}

}

function eraseEffect(){

if(charIndex > 0){

typingElement.textContent = roles[roleIndex].substring(0,charIndex-1);
charIndex--;

setTimeout(eraseEffect,40);

}else{

roleIndex++;

if(roleIndex >= roles.length){
roleIndex = 0;
}

setTimeout(typeEffect,300);

}

}

document.addEventListener("DOMContentLoaded",function(){
setTimeout(typeEffect,500);
});


// COUNTER

function animateCounter(id,target){

let element = document.getElementById(id);
let count = 0;

let interval = setInterval(()=>{

count++;

element.innerText = count + "+";

if(count >= target){
clearInterval(interval);
}

},40);

}

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

animateCounter("exp",1);
animateCounter("projectsDone",6);
animateCounter("Languages",7);

observer.disconnect();

}

});

});

observer.observe(document.querySelector(".stats"));


// SMOOTH SCROLL

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior:"smooth"
});

});

});


// SCROLL TO TOP

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY > 400){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}

});

topBtn.addEventListener("click",()=>{
window.scrollTo({
top:0,
behavior:"smooth"
});
});


// NAVBAR CHANGE

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

if(window.scrollY > 80){
header.style.background = "rgba(0,0,0,0.95)";
}else{
header.style.background = "rgba(0,0,0,0.85)";
}

});


// SCROLL REVEAL

const revealElements = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.style.opacity = 1;
entry.target.style.transform = "translateY(0)";
}

});

});

revealElements.forEach(el=>{

el.style.opacity = 0;
el.style.transform = "translateY(40px)";
el.style.transition = "0.6s ease";

revealObserver.observe(el);

});
