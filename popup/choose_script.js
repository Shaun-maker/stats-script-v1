var stats = [];

document.addEventListener('click', function(event) {
    if (event.target.id == 'script-1') {
        browser.tabs.executeScript({file: "/content_scripts/cpy_stats.js"});
    }
})


