const API_BASE_URL = "https://api.uthef.icu/";

class UthefAPI {
    async fetch() {
        var response = await fetch(API_BASE_URL);
        var jsonData = await response.json();
        return jsonData;
    }
}
