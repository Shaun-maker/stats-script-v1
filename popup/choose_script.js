var all_stats = "";
var url = "";

/* navigator.clipboard.writeText(stats); */

function getStats(stats) {
    all_stats += stats;
}

function incrementUrl(url) {
    let index = url.length;
    let array_url = url.split('');
    index -= 6;
    let month = array_url[index];
    month++;
    array_url[index] = month;
    url = array_url.join('');
    return url;
}

async function updatePage(url) {
    let newUrl = incrementUrl(url);
    await browser.tabs.update({url: newUrl});
}

//TODO : rename function to getPage, and make it work small function by small function
async function getPage() {
    await browser.tabs.query({currentWindow: true, active: true})
    .then(function(tabs) {
        let currentUrl = tabs[0].url;
        url = currentUrl;
        return url;
    })
    .catch(function(err) {
        console.log("Une erreur s'est produite sur la récupération de l'url de la page active");
        console.log(err);
    })
}

async function injectScript() {
    await browser.tabs.executeScript({file: "/content_scripts/cpy_stats.js"});   
}

browser.runtime.onMessage.addListener(getStats);

document.addEventListener('click', function(event) {
    if (event.target.id == 'script-1') {
        injectScript();
        getPage()
        .then(function() {
            updatePage(url);
            setTimeout(function() {
                injectScript();
                getPage()
                .then(function() {
                    updatePage(url);
                    setTimeout(function() {
                        injectScript();
                        getPage()
                        .then(function() {
                            updatePage(url);
                            setTimeout(function() {
                                injectScript();
                                getPage()
                                .then(function() {
                                    updatePage(url);
                                    setTimeout(function() {
                                        injectScript();
                                    }, 1500);
                                })
                            }, 1500);
                        })
                    }, 1500);
                });
            }, 1500);
        });
    }
});

setTimeout(function() {
    navigator.clipboard.writeText(all_stats);
}, 7000);
