import React from 'react';

type Props = {
  handleForm: (prop: boolean) => void
};

export default function Form(props: Props) {
  const { handleForm } = props;
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
      <button onClick={ () => handleForm(false) }>Cancelar</button>
    </form>
  );
}
