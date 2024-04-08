document.getElementById("version1").addEventListener("click", function () {
    loadScript("snakegame_V1.js", startGame);
});

document.getElementById("version2").addEventListener("click", function () {
    loadScript("snakegame_V2.js", startGame);
});

function loadScript(scriptPath, callback) {
    let script = document.createElement('script');
    script.src = scriptPath;
    script.onload = callback; // Run the game initialization after the script is loaded
    document.body.appendChild(script);
}