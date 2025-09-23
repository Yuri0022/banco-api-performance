import http from 'k6/http'
import { check, sleep } from 'k6'
import { obterToken } from '../helpers/autenticacao.js'
import { pegarBaseURL } from '../utils/variaveis.js'

export const options = {
  iterations: 1,
}

export default function() {
  const token = obterToken()

  const url = pegarBaseURL() +'/transferencias'

  const payload = JSON.stringify({
    contaOrigem: 1,
    contaDestino: 2,
    valor: 11,
    token: ""
  })

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + token,
    },
  }

  let res = http.post(url, payload, params)

  check(res, {
    "Validar que o status é 201": (res) => res.status === 201,
  })

  sleep(1);
}
