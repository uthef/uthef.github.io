let api = new UthefAPI();

api.fetch().then(function(data) {
    let output = "Node version: " + data["node_version"] + "\n";
    let dateUtc = new Date(Date.parse(data["date_utc"]));
    output += "Current date: " + dateUtc.toLocaleDateString() + "\n";
    output += "Request IP: " + data["request_ip"] + "\n";
    output += "Local time: " + dateUtc.toTimeString();
    console.info(output);
}).catch(function(reason) {
    console.error("Unable to reach API");
    console.error(reason);
});
