// variables

let workTittle = document.getElementById("work");
let breakTittle = document.getElementById("break");

let workTime = 25; // en minutos
let breakTime = 5; // en minutos

let totalTime; // en segundos

let endSound = document.getElementById("endSound");

window.onload = () => {
  totalTime = workTime * 60;
  document.getElementById("minutes").innerHTML = String(workTime).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").innerHTML = "00";
  document.getElementById("hours").innerHTML = "";
  workTittle.classList.add("active");
};

function start() {
  // cambiar botón de inicio
  document.getElementById("start").style.display = "none";
  document.getElementById("reset").style.display = "block";

  let breakCount = 0;

  let timerFunction = () => {
    // Cálculo de horas, minutos y segundos
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor((totalTime % 3600) / 60);
    let seconds = totalTime % 60;

    // Mostrar horas si son necesarias
    if (hours > 0) {
      document.getElementById("hours").innerHTML =
        hours.toString().padStart(2, "0") + ":";
    } else {
      document.getElementById("hours").innerHTML = "";
    }

    document.getElementById("minutes").innerHTML = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").innerHTML = seconds
      .toString()
      .padStart(2, "0");

    totalTime--;

    if (totalTime < 0) {
      endSound.play(); // Reproducir sonido al finalizar el tiempo
      if (breakCount % 2 === 0) {
        // Cambiar a descanso
        totalTime = breakTime * 60;
        breakCount++;
        workTittle.classList.remove("active");
        breakTittle.classList.add("active");
      } else {
        // Volver al trabajo
        totalTime = workTime * 60;
        breakCount++;
        breakTittle.classList.remove("active");
        workTittle.classList.add("active");
      }
    }
  };

  setInterval(timerFunction, 1000);
}
