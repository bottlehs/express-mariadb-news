import http from "@/common/http";
import authHeader from "@/common/auth.header";
const SERVICE_API_URL = "/api/carts";

class CartsService {
  findAll(params = {}) {
    return http.get(SERVICE_API_URL, {
      params: params,
      headers: authHeader()
    });
  }
  findOne(id) {
    return http.get(SERVICE_API_URL + "/" + id, {
      headers: authHeader()
    });
  }
  update(id, params = {}) {
    return http.put(SERVICE_API_URL + "/" + id, params, {
      headers: authHeader()
    });
  }
  delete(id) {
    return http.delete(SERVICE_API_URL + "/" + id, {
      headers: authHeader()
    });
  }
  deleteAll() {
    return http.delete(SERVICE_API_URL, {
      headers: authHeader()
    });
  }
  create(params) {
    return http.post(SERVICE_API_URL, params, {
      headers: authHeader()
    });
  }
}

export default new CartsService();
