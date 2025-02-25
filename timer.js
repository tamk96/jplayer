document.addEventListener("DOMContentLoaded", function () {
    // Tạo giao diện hẹn giờ
    let container = document.createElement("div");
    container.style.width = "100%";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    container.style.padding = "10px 0";
    
    container.innerHTML = `
        <select id="audioTimer">
            <option value="1">1 phút</option>
            <option value="5">5 phút</option>
            <option value="10">10 phút</option>
            <option value="30">30 phút</option>
            <option value="60">1 giờ</option>  
            <option value="90">1h30</option> 
            <option value="120">2 giờ</option>
        </select>
        <button id="startBtn" class="btn">
            <i class="fas fa-clock"></i> Hẹn giờ
        </button>
        <button id="cancelBtn" class="btn" style="display: none;">
            <i class="fas fa-times"></i> Hủy
        </button>
        <p id="countdown" style="margin-left: 10px;"></p>
    `;
    document.body.prepend(container);

    let timerValue, countdownInterval;
    const countdownDisplay = document.getElementById("countdown");
    const startBtn = document.getElementById("startBtn");
    const cancelBtn = document.getElementById("cancelBtn");

    startBtn.addEventListener("click", function () {
        if (countdownInterval) clearInterval(countdownInterval);
        timerValue = document.getElementById("audioTimer").value * 60;
        startBtn.style.display = "none";
        cancelBtn.style.display = "inline-block";
        
        countdownInterval = setInterval(function () {
            let minutes = Math.floor(timerValue / 60);
            let seconds = timerValue % 60;
            countdownDisplay.textContent = `Thời gian còn lại: ${minutes} phút ${seconds} giây`;
            
            if (timerValue <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = "Hết giờ!";
                location.reload(); // Làm mới trang
            }
            timerValue--;
        }, 1000);
    });

    cancelBtn.addEventListener("click", function () {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = "";
        startBtn.style.display = "inline-block";
        cancelBtn.style.display = "none";
    });
});
