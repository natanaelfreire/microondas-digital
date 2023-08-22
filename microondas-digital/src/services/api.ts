import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7044",
});

// api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.common['Content-Type'] = 'application/json'

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    alert('Faça o login para usar o microondas');

    api.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem("SavedTokenMicroondas");
    localStorage.removeItem("SavedUserMicroondas");

    return
  }
  else if (!error.response) {
    alert('Erro na conexão com o servidor')
    return
  }

  return error;
})

export default api;