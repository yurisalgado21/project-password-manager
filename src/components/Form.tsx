import React, { useState } from 'react';
import Swal from 'sweetalert2';

type Service = {
  name: string;
  login: string;
  senha: string;
  url: string;
};

type Props = {
  handleForm: (prop: boolean) => void
  handleServiceSubmit: (service: Service) => void;
};

export default function Form(props: Props) {
  const { handleForm, handleServiceSubmit } = props;

  const [formInfo, setFormInfo] = useState({
    name: '',
    login: '',
    senha: '',
    url: '',
  });
  const [registerButton, setRegisterButton] = useState(true);
  const displayInvalidPassword = 'invalid-password-check';
  const displayValidPassword = 'valid-password-check';
  const [hideOrShow, setHideOrShow] = useState(false);
  const [changehidePassword, setChangehidePassword] = useState('password');

  function hidePasswordOrShow() {
    if (hideOrShow === false) {
      setHideOrShow(true);
      setChangehidePassword('text');
    } else {
      setHideOrShow(false);
      setChangehidePassword('password');
    }
  }

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleServiceSubmit(formInfo);
    Swal.fire({
      icon: 'success',
      title: 'Serviço cadastrado com sucesso',
      timer: 1500,
    });
  }

  return (
    <form className="form" onSubmit={ handleSubmit }>
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
      <button
        data-testid="show-hide-form-password"
        onClick={ hidePasswordOrShow }
      >
        Hide/Show

      </button>
      <label htmlFor="senha">
        Senha
        <input
          id="senha"
          type={ changehidePassword }
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
      <div id="display">
        <p
          className={ formInfo.senha.length >= 8
            ? displayValidPassword
            : displayInvalidPassword }
        >
          Possuir 8 ou mais caracteres

        </p>
        <p
          className={ formInfo.senha.length <= 16
            ? displayValidPassword
            : displayInvalidPassword }
        >
          Possuir até 16 caracteres

        </p>
        <p
          className={ /[a-zA-Z]/.test(formInfo.senha) && /\d/.test(formInfo.senha)
            ? displayValidPassword
            : displayInvalidPassword }
        >
          Possuir letras e números

        </p>
        <p className={ /[!@#$%^&*]/.test(formInfo.senha) ? displayValidPassword : displayInvalidPassword }>Possuir algum caractere especial</p>
      </div>
    </form>
  );
}
