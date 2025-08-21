class UthefAPI {
    #addr;
    #apiBaseUrl;

    constructor() {
        this.addr = { 
            dev: "http://localhost:3000", 
            prod: "https://api.uthef.icu",
            prodFallback: "https://uthef.vercel.app"
        };

        if (this.isDevEnv()) {
            this.apiBaseUrl = this.addr.dev;
        }
        else {
            this.apiBaseUrl = this.addr.prod;
        }
    }

    async fetchJson(endpoint) {
        let request = new XMLHttpRequest();
        request.timeout = 6000;

        request.open("get", this.apiBaseUrl + endpoint);
        request.send();

        let promise = new Promise((resolve, reject) => {
            request.onload = (e) => {
                if (request.status !== 200) {
                    reject("Unexpected status code: " + request.status);
                    return;
                }

                resolve(JSON.parse(request.response));
            };

            request.ontimeout = (e) => {
                reject("Request timeout");
            };

            request.onerror = (e) => {
                reject(e);
            };
        });

        return promise;
    }

    async fetchStats() {
        return await this.fetchJson("/stats");
    }

    isDevEnv() {
        const hostname = window.location.hostname;
        return hostname === "localhost" || hostname === "127.0.0.1";
    }

    switchToFallbackAddress() {
        this.apiBaseUrl = this.addr.prodFallback;
    }

    isFallback() {
        return this.apiBaseUrl === this.addr.prodFallback;
    }

    async logStats() {
        let data = null;

        try {
            data = await this.fetchStats();
        } 
        catch (reason) {
            console.error("Unable to reach API");
            console.error(reason);

            return null;
        }

        if (data === null) return null;
        
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

        return data;
    }
}

const api = new UthefAPI();
api.logStats().then(afterRequest);

function afterRequest(data) {
    if (data == null && !api.isDevEnv() && !api.isFallback()) {
        api.switchToFallbackAddress();
        api.logStats().then(afterRequest);
    }
}

function hasQueryParam(param) {
    let query = window.location.search;
    if (query.startsWith("?")) query = query.replace("?", "");

    let pairs = query.split("&");

    for (let i = 0; i < pairs.length; i++) {
        let pair = pairs[i];
        if (pair.startsWith(param + "=") || pair == param) return true;
    }

    return false;
}

if (Math.random() <= 0.001 || hasQueryParam("spookyMode")) {
    let comp = document.getElementById("comp");
    comp.src = "media/easter_egg.webm";
    comp.style.display = "block";

    document.body.removeChild(document.getElementById("artwork"));
    document.body.removeChild(document.getElementById("fog"));
}
