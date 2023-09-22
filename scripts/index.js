let api = new UthefAPI();

api.fetch().then(function(data) {
    let output = "API Python version: " + data["python_version"] + "\n";
    output += "Current date: " + data["date"] + "\n";
    output += "Request IP: " + data["request_ip"];
    output += "UTC time: " + data["utc_time"];
    console.info(output);
}).catch(function(reason) {
    console.error("Unable to reach API");
    console.error(reason);
});
