const addr = { dev: "http://localhost:3000", prod: "https://api.uthef.icu" };
const API_BASE_URL = addr.prod;

class UthefAPI {
    async fetch() {
        var response = await fetch(API_BASE_URL);
        var jsonData = await response.json();
        return jsonData;
    }
}
