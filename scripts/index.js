let api = new UthefAPI();

async function testApi() {
    let data;

    try {
        data = await api.fetch();
    } catch (reason) {
        console.error("Unable to reach API");
        console.error(reason);

        return;
    }

    let output = "Node version: " + data["node_version"] + "\n";
    let dateUtc = new Date(Date.parse(data["date_utc"]));

    output += "Current date: " + dateUtc.toLocaleDateString() + "\n";
    output += "Request IP: " + data["request_ip"] + "\n";
    output += "Local time: " + dateUtc.toTimeString() + "\n";
    output += "Server uptime: " + data["uptime"];

    console.info(output);
}

testApi();
