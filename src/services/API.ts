const baseUrl = "http://localhost:8080/api";

export default {
    apiLogin: baseUrl + "/oauth2/signin",
    apiLogout: baseUrl + "/oauth2/logout",
    apiCategory: baseUrl + "/product-category",

    apiClass: baseUrl + "/product-class",
    apiGroup: baseUrl + "/product-group"

}
