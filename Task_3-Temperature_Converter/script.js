// ---------------- TEMPERATURE CONVERSION ----------------

function convertTemp() {

const tempInput = document.getElementById("temperature").value;
const unit = document.getElementById("unit").value;
const result = document.getElementById("result");

if (tempInput === "" || isNaN(tempInput)) {

result.innerHTML = "⚠ Please enter a valid temperature!";
result.style.color = "#ff4d4d";
return;

}

const temp = parseFloat(tempInput);

let c, f, k;

// Convert based on selected unit
if (unit === "celsius") {

c = temp;
f = (temp * 9/5) + 32;
k = temp + 273.15;

}

else if (unit === "fahrenheit") {

f = temp;
c = (temp - 32) * 5/9;
k = c + 273.15;

}

else if (unit === "kelvin") {

k = temp;
c = temp - 273.15;
f = (c * 9/5) + 32;

}

// Show results
result.innerHTML = `
<div class="result-box">
🌡 Celsius: <b>${c.toFixed(2)} °C</b><br>
🔥 Fahrenheit: <b>${f.toFixed(2)} °F</b><br>
❄ Kelvin: <b>${k.toFixed(2)} K</b>
</div>
`;

result.style.color = "#00e676";

}



// ---------------- AUTO CONVERT (LIVE) ----------------

document.getElementById("temperature").addEventListener("input", convertTemp);
document.getElementById("unit").addEventListener("change", convertTemp);



// ---------------- RESET FUNCTION ----------------

function resetFields(){

document.getElementById("temperature").value = "";
document.getElementById("result").innerHTML = "";

}



// ---------------- DARK MODE ----------------

function toggleMode(){

document.body.classList.toggle("dark");

const toggleBtn = document.querySelector(".toggle");

if(document.body.classList.contains("dark")){
toggleBtn.innerHTML = "☀ Light Mode";
}else{
toggleBtn.innerHTML = "🌙 Dark Mode";
}

}
