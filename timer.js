// Tạo style động trong JavaScript
const style = document.createElement("style");
style.innerHTML = `
    .audio-timer-container {
        font-family: Arial, sans-serif;
        text-align: left;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 6px;
        width: 100%;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    .audio-timer-controls {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        width: 100%;
    }
    .audio-timer-container select {
        flex: 1;
        padding: 8px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        max-width: 200px;
    }
    .audio-timer-container .btn {
        padding: 8px 12px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .audio-timer-container .start-btn {
        background-color: #28a745;
        color: white;
    }
    .audio-timer-container .cancel-btn {
        background-color: #dc3545;
        color: white;
        display: none;
    }
    .audio-timer-container #countdown {
        font-size: 16px;
        font-weight: bold;
        margin-top: 8px;
        color: #555;
    }
`;
document.head.appendChild(style);

// Chèn HTML bộ hẹn giờ vào div #audioTimerContainer
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("audioTimerContainer");
    if (!container) return; // Nếu không có div này, không làm gì cả

    container.innerHTML = `
        <div class="audio-timer-container">
            <div class="audio-timer-controls">
                <select id="audioTimer">
                    <option value="1">1 phút</option>
                    <option value="5">5 phút</option>
                    <option value="10">10 phút</option>
                    <option value="30">30 phút</option>
                    <option value="60">1 giờ</option>  
                    <option value="90">1h30</option> 
                    <option value="120">2 giờ</option>
                </select>
                <button onclick="startCountdown()" class="btn start-btn">
                    <i class="fas fa-clock"></i> Hẹn giờ
                </button>
                <button onclick="cancelCountdown()" id="cancelBtn" class="btn cancel-btn">
                    <i class="fas fa-times"></i> Hủy
                </button>
            </div>
            <p id="countdown"></p>
        </div>
    `;

    let countdownDisplay = document.getElementById("countdown");
    let cancelBtn = document.getElementById("cancelBtn");
    let countdown;
    let timerValue;

    window.startCountdown = function () {
        clearInterval(countdown);
        timerValue = parseInt(document.getElementById("audioTimer").value) * 60;

        if (timerValue > 0) {
            cancelBtn.style.display = "flex";
            countdown = setInterval(updateCountdown, 1000);
        }
    };

    function updateCountdown() {
        timerValue--;
        let minutes = Math.floor(timerValue / 60);
        let seconds = timerValue % 60;
        countdownDisplay.innerHTML = `<i class="fas fa-hourglass-half"></i> ${minutes} phút ${seconds < 10 ? '0' : ''}${seconds} giây`;

        if (timerValue <= 0) {
            clearInterval(countdown);
            countdownDisplay.innerHTML = `<i class="fas fa-sync-alt"></i> Đang làm mới trang...`;
            cancelBtn.style.display = "none";
            setTimeout(() => location.reload(), 2000); // Làm mới trang sau 2 giây
        }
    }

    window.cancelCountdown = function () {
        clearInterval(countdown);
        countdownDisplay.innerHTML = `<i class="fas fa-pause-circle"></i> Đã hủy`;
        cancelBtn.style.display = "none";
    };
});

// Nạp Font Awesome nếu chưa có
if (!document.querySelector('script[src*="fontawesome.com"]')) {
    const faScript = document.createElement("script");
    faScript.src = "https://kit.fontawesome.com/a076d05399.js";
    faScript.crossOrigin = "anonymous";
    document.head.appendChild(faScript);
}
