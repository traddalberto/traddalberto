import React from 'react';
import Axios from 'axios';

import TextField from './TextField';

const ContactForm = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allIsValid: false,
      showResponseMsg: false,
      submitingError: false,
      isSending: false,
      name: {
        value: '',
        isValid: false,
      },
      email: {
        value: '',
        isValid: false,
      },
      msg: {
        value: '',
        isValid: false,
      },
    };
  }

  sendForm = (e) => {
    e.preventDefault();

    this.setState({ isSending: true });

    if (this.state.allIsValid) {
      Axios.post('https://usebasin.com/f/1d495b50c1cb.json', {
        name: this.state.name.value,
        email: this.state.email.value,
        mensagem: this.state.msg.value,
      }, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then(({ data }) => {
        this.setState({
          error: !data.success,
          showResponseMsg: true,
          isSending: false,
        });

        if (!data.success) console.error(data);
      }).catch((error, data) => {
        console.error(error);
        console.error(data);
        this.setState({
          error: true,
          isSending: false,
          showResponseMsg: true,
        });
      });
    }
  }

  handleChange = (field, value, isValid) => {
    this.setState({
      [field]: {
        value,
        isValid,
      },
    }, () => {
      this.setState({
        allIsValid: (
          this.state.name.isValid &&
          this.state.email.isValid &&
          this.state.msg.isValid
        ),
      });
    });
  }

  handleNameChange = (value, isValid) => this.handleChange('name', value, isValid);
  handleEmailChange = (value, isValid) => this.handleChange('email', value, isValid);
  handleMsgChange = (value, isValid) => this.handleChange('msg', value, isValid);

  render() {
    const {
      allIsValid,
      error,
      showResponseMsg,
      isSending,
    } = this.state;

    const emailValidations = [
      {
        regex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        errorMsg: 'Digite um email válido',
      },
    ];

    const msgValidations = [
      {
        validator: value => value.length >= 10,
        errorMsg: 'A mensagem deve ter no mínimo 10 caracteres',
      },
    ];

    return (
      <form className="form-container">
        <TextField
          label="Nome"
          handleChange={this.handleNameChange}
          required
          requiredErrorMsg="Digite seu nome"
        />
        <TextField
          label="Email"
          type="email"
          handleChange={this.handleEmailChange}
          validations={emailValidations}
          required
          requiredErrorMsg="Digite seu email"
        />
        <TextField
          label="Mensagem"
          handleChange={this.handleMsgChange}
          validations={msgValidations}
          multiLine
          requiredErrorMsg="Digite alguma mensagem"
          required
        />
        <button
          className={`button ${allIsValid ? '' : 'disabled'} ${isSending ? 'sending' : ''}`}
          onClick={this.sendForm}
        >
          {isSending ? 'Enviando...' : 'Enviar'}
        </button>
        <div className={`submitted-form-msg fill-container ${showResponseMsg ? 'show' : ''}`}>
          {error ? (
            <div>
              <h2>Ops! Aconteceu um erro ao enviar sua mensagem :(</h2>
              <span>Tente novamente mais tarde ou entre em contato via e-mail</span>
            </div>
          ) : (
            <div>
              <h1>Mensagem enviada :)</h1>
              <span>Assim que possível vamos responder sua mensagem</span>
            </div>
          )}
        </div>
      </form>
    );
  }
};

export default ContactForm;
