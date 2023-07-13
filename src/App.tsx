import { useState } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import Form from './components/Form';
import Title from './components/Title';

type Service = {
  name: string;
  login: string;
  senha: string;
  url: string;
};

function App() {
  const [showForm, setShowForm] = useState(false);
  const [hiddenButton, setHiddenButton] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [checkedPassword, setCheckedPassword] = useState(false);

  function handleChecked() {
    if (!checkedPassword) {
      setCheckedPassword(true);
    } else {
      setCheckedPassword(false);
    }
  }

  function handleForm(prop: boolean) {
    setShowForm(prop);
    setHiddenButton(prop);
  }

  function handleServiceSubmit(service: Service) {
    setServices([...services, service]);
    handleForm(false);
  }

  function handleServiceDelete(index: number) {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
  }

  return (
    <div>
      <Title />
      {!hiddenButton
      && <button onClick={ () => handleForm(true) }>Cadastrar nova senha</button>}
      <hr />
      {showForm && <Form
        handleForm={ () => handleForm(false) }
        handleServiceSubmit={ (service) => handleServiceSubmit(service) }
      />}
      {services.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        <ul>
          <label>
            Esconder senhas
            <input
              type="checkbox"
              checked={ checkedPassword }
              onChange={ handleChecked }
            />
          </label>
          {services.map((service, index) => (
            <li key={ index }>
              <a href={ service.url } target="_blank" rel="noopener noreferrer">
                {service.name}
              </a>
              <br />
              <span>
                {service.login}
              </span>
              <br />
              <span>
                {checkedPassword ? (service.senha.replace(/./g, '*')) : service.senha}
              </span>
              <br />
              <button
                data-testid="remove-btn"
                onClick={ () => handleServiceDelete(index) }
              >
                Excluir

              </button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
