let progress=0;
const progressBar = document.getElementById("progressBar");

function doProgressBar() {
    
    if (progress <100) {
        progress += 10; // Increment progress by 10%
        progressBar.style.width = progress + "%"; // Update the width of the progress bar
        progressBar.textContent = progress + "%"; // Update the text inside the progress bar
        setTimeout(doProgressBar,500);
    }
    else {
        progressBar.textContent = "¡Proceso completo!"; 
       
    }
}

doProgressBar(); // Start the progress bar animation
