import React, { useState } from 'react';

type Props = {
  handleForm: (prop: boolean) => void
};

export default function Form(props: Props) {
  const { handleForm } = props;

  const [formInfo, setFormInfo] = useState({
    name: '',
    login: '',
    senha: '',
    url: '',
  });
  const [registerButton, setRegisterButton] = useState(true);

  function handleChange(
    event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;
    setFormInfo({
      ...formInfo,
      [name]: value,
    });
    validateForm();
  }

  function validateForm() {
    const { name, login, senha } = formInfo;

    const fullName = name.trim() !== '';
    const fullLogin = login.trim() !== '';
    const fullPassword = senha !== '';
    const passwordMin = senha.length >= 8;
    const passwordMax = senha.length <= 16;
    const passwordHaveLettersAndNumbers = /[a-zA-Z]/.test(senha) && /\d/.test(senha);
    const passwordCaracterEspecial = /[!@#$%^&*]/.test(senha);

    const formValidYOrN = (fullName
       && fullLogin
       && fullPassword
       && passwordMin
       && passwordMax
       && passwordHaveLettersAndNumbers
       && passwordCaracterEspecial);
    setRegisterButton(!formValidYOrN);
  }

  return (
    <form>
      <label htmlFor="name">
        Nome do serviço
        <input
          id="name"
          type="text"
          name="name"
          value={ formInfo.name }
          onChange={ handleChange }
          required
        />
      </label>
      <label htmlFor="login">
        Login
        <input
          id="login"
          type="text"
          name="login"
          value={ formInfo.login }
          onChange={ handleChange }
          required
        />
      </label>
      <label htmlFor="senha">
        Senha
        <input
          id="senha"
          type="password"
          name="senha"
          value={ formInfo.senha }
          onChange={ handleChange }
          required
        />
      </label>
      <label htmlFor="url">
        URL
        <input
          id="url"
          type="text"
          name="url"
          value={ formInfo.url }
          onChange={ handleChange }
        />
      </label>
      <button disabled={ registerButton }>Cadastrar</button>
      <button onClick={ () => handleForm(false) }>Cancelar</button>
    </form>
  );
}
