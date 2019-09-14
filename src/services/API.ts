// const baseUrl = "http://192.168.68.149:8080/api";
const baseUrl = "http://localhost:8080/api";

export default {
    apiLogin: baseUrl + "/oauth2/signin",
    apiLogout: baseUrl + "/oauth2/logout",
    apiCategory: baseUrl + "/product-category",
    apiProduct: baseUrl + "/product",
    apiClass: baseUrl + "/product-class",
    apiGroup: baseUrl + "/product-group",
    apiSupplier: baseUrl + "/supplier",
    apiSupplierProduct: baseUrl + "/supplier-product",
    apiSupplierProductDetail: baseUrl + "/product-detail"
}
