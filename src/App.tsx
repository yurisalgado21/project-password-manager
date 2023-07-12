import { useState } from 'react';
import './App.css';
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
          {services.map((service, index) => (
            <li key={ index }>
              <a href={ service.url } target="_blank" rel="noopener noreferrer">
                {service.name}
              </a>
              <br />
              <span>
                Login:
                {' '}
                {service.login}
              </span>
              <br />
              <span>
                Senha:
                {' '}
                {service.senha}
              </span>
              <br />
              <button onClick={ () => handleServiceDelete(index) }>Excluir</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
