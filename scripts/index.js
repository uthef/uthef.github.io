class UthefAPI {
    #addr;
    #apiBaseUrl;

    constructor() {
        this.addr = { 
            dev: "http://localhost:3000", 
            prod: "https://api.uthef.icu",
            prodFallback: "https://api-drab-five-66.vercel.app"
        };

        if (this.isDevEnv()) {
            this.apiBaseUrl = this.addr.dev;
        }
        else {
            this.apiBaseUrl = this.addr.prod;
        }
    }

    async fetchStats() {
        var response = await fetch(this.apiBaseUrl + "/stats");
        var jsonData = await response.json();
        return jsonData;
    }

    isDevEnv() {
        const hostname = window.location.hostname;
        return hostname === "localhost" || hostname === "127.0.0.1";
    }

    switchToFallbackAddress() {
        this.apiBaseUrl = this.addr.prodFallback;
    }

    async logStats() {
        let data = null;

        try {
            data = await this.fetchStats();
        } 
        catch (reason) {
            console.error("Unable to reach API");
            console.error(reason);

            return false;
        }

        if (data === null) return false;
        
        let output = "Node version: " + data.nodeVersion + "\n";
        let dateUtc = new Date(Date.parse(data.dateUtc));

        if ("uptime" in data) {
            output += "Server uptime: " + data.uptime + "\n";
        }

        output += "Current date: " + dateUtc.toLocaleDateString() + "\n";
        output += "Local time: " + dateUtc.toTimeString() + "\n";
        output += "Request IP: " + data.requestIp + "\n";
        output += "User Agent: " + data.userAgent;

        console.info(output);

        return true;
    }
}

const api = new UthefAPI();

api.logStats().then((success) => {
    if (!success && !api.isDevEnv()) {
        api.switchToFallbackAddress();
        api.logStats();
    }
});
