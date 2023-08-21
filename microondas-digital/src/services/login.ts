import api from "./api";

type LoginResponse = {
  "id": string
  "nome": string
  "token": string
}

function setToken(response : LoginResponse) {
  console.log(response)
  localStorage.setItem("SavedTokenMicroondas", 'Bearer ' + response.token);
  localStorage.setItem("SavedUserMicroondas", response.nome);
  api.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;

  window.location.href = '/'
}

export async function Login(nome: string, senha: string) {
  api.post('/Usuario/Login', {
    nome: nome,
    senha: senha,
  })
  .then((response) => setToken(response.data))
  .catch((err) => {
    console.error("Ops! ocorreu um erro" + err);
  });
}