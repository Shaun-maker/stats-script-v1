var all_stats = [];

function getStats(stats) {
    all_stats.push(stats);
}

function incrementUrl(url) {
    let index = url.length;
    let array_url = url.split('');
    index -= 6;
    let month = array_url[index];
    month++;
    array_url[index] = month;
    url = array_url.join('');
    console.log(url);
    return url;
}

function getPage() {
    browser.tabs.query({currentWindow: true, active: true})
    .then(function(tabs) {
        let currentUrl = tabs[0].url;
        let newUrl = incrementUrl(currentUrl);
    })
}

browser.runtime.onMessage.addListener(getStats);

document.addEventListener('click', function(event) {
    if (event.target.id == 'script-1') {
        browser.tabs.executeScript({file: "/content_scripts/cpy_stats.js"});
        getPage();
    };
});


