import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Title from './components/Title';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [hiddenButton, setHiddenButton] = useState(false);

  function handleForm(prop: boolean) {
    setShowForm(prop);
    setHiddenButton(prop);
  }

  return (
    <div>
      <Title />
      {!hiddenButton
      && <button onClick={ () => handleForm(true) }>Cadastrar nova senha</button>}
      {showForm && <Form handleForm={ () => handleForm(false) } />}
    </div>
  );
}

export default App;
