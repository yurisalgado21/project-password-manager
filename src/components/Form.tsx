import React from 'react';

export default function Form() {
  return (
    <form>
      <label htmlFor="nome">
        Nome do serviço
        <input id="nome" type="text" />
      </label>
      <label htmlFor="Login">
        Login
        <input id="Login" type="text" />
      </label>
      <label htmlFor="Senha">
        Senha
        <input id="Senha" type="password" />
      </label>
      <label htmlFor="URL">
        URL
        <input id="URL" type="text" />
      </label>
      <button>Cadastrar</button>
      <button>Cancelar</button>
    </form>
  );
}
