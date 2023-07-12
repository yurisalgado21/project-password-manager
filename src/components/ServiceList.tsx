import React from 'react';

export type Service = {
  name: string,
  login: string,
  senha: string,
  url: string,
};

type Props = {
  services: Service[];
};

function ServiceList(props: Props) {
  const { services } = props;

  return (
    <div>
      {services.map((service, index) => (
        <div key={ index }>
          <a href={ service.url }>{service.name}</a>
          <p>
            Login:
            {' '}
            {service.login}
          </p>
          <p>
            Senha:
            {' '}
            {service.senha}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
