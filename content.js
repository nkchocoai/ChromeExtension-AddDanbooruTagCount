function readCSV() {
    return fetch(chrome.runtime.getURL("assets/tags.csv"))
        .then(response => response.text())
        .then(csvText => {
            return csvToDict(csvText);
        });
}

function csvToDict(csvText) {
    const rows = csvText.split('\n');
    let dict = new Object();
    rows.forEach(row => {
        const values = row.split(',');
        dict[values[0]] = values[1];
    });
    return dict;
}

readCSV().then(csvData => {
    const links = document.querySelectorAll('#content a');

    links.forEach(link => {
        const url = link.href;

        const result = url.match(/^https:\/\/danbooru\.donmai\.us\/wiki_pages\/~?(.*)/);
        if (result) {
            const tag = decodeURIComponent(result[1]);
            const countStr = tag in csvData ? ` <small>(${csvData[tag].trim()})</small>` : "";
            const currentTitle = link.innerText;

            link.innerHTML = currentTitle + countStr;
        }
    });
});
