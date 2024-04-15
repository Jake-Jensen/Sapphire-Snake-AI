document.getElementById("version1").addEventListener("click", function () {
    loadScript("static/snakegame_V1.js");
});

document.getElementById("version2").addEventListener("click", function () {
    loadScript("static/snakegame_V2.js");
});

function loadScript(scriptPath, callback) {
    let script = document.createElement('script');
    script.src = scriptPath;
    script.onload = callback; // Run the game initialization after the script is loaded
    document.body.appendChild(script);
}