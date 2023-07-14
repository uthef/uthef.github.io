async function contactAPI() {
    var response = await fetch("https://dsss.new/");
    var jsonData = await response.json();
    return jsonData;
}

contactAPI().then(function(data) {
    console.log("API Python version: " + data["python_version"]);
    console.log("Current date: " + data["date"]);
}).catch(function(reason) {
    console.error("Unable to reach API");
    console.error(reason);
});