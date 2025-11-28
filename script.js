// Load existing progress
let daysCompleted = parseInt(localStorage.getItem("daysCompleted")) || 0;
localStorage.setItem("daysCompleted", daysCompleted);

// ---------------------------
// Detect which page we are on
// ---------------------------
document.addEventListener("DOMContentLoaded", function () {

    // If we are on the navigation page, update progress
    if (document.getElementById("progressText")) {
        updateProgressDisplay();
    }
});

// ---------------------------
// Update progress on navigation page
// ---------------------------
function updateProgressDisplay() {
    const progressText = document.getElementById("progressText");
    const progressBar = document.getElementById("progressBar");

    progressText.textContent = `Day ${daysCompleted} / 30 completed`;

    let percent = (daysCompleted / 30) * 100;
    progressBar.style.width = percent + "%";

    if (daysCompleted >= 30) {
        progressText.textContent = "🎉 Challenge Completed!";
        progressBar.style.background = "green";
    }
}

// ---------------------------
// YouTube API for video pages
// ---------------------------
function onYouTubeIframeAPIReady() {

    // Only run if video element exists
    if (document.getElementById("yogaVideo")) {
        new YT.Player("yogaVideo", {
            events: {
                "onStateChange": onPlayerStateChange
            }
        });
    }
}

function onPlayerStateChange(event) {

    // Video ended = 0
    if (event.data === YT.PlayerState.ENDED) {

        // Increase day count
        daysCompleted++;
        if (daysCompleted > 30) daysCompleted = 30;   // Max limit

        // Save it
        localStorage.setItem("daysCompleted", daysCompleted);

        // Show message
        if (daysCompleted >= 30) {
            alert("🎉 You completed the 30-day yoga challenge!");
        } else {
            alert(`✔ Good job! Day ${daysCompleted} completed.`);
        }

        // Update progress if navigation page is open
        if (document.getElementById("progressText")) {
            updateProgressDisplay();
        }
    }
}

