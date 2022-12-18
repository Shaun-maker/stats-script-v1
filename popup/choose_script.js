var stats = [];

function getStats(stats) {
    stats.push(stats);
    console.log(stats);
}

browser.runtime.onMessage.addListener(getStats);

document.addEventListener('click', function(event) {
    if (event.target.id == 'script-1') {
        browser.tabs.executeScript({file: "/content_scripts/cpy_stats.js"});
    }
})


