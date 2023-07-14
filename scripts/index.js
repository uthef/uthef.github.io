let api = new UthefAPI();

api.fetch().then(function(data) {
    console.info("API Python version: " + data["python_version"]);
    console.info("Current date: " + data["date"]);
}).catch(function(reason) {
    console.error("Unable to reach API");
    console.error(reason);
});