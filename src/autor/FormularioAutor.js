import React, { Component } from 'react';
import InputCustomizado from './../componentes/InputCustomizado';
import BotaoCustomizado from './../componentes/BotaoCustomizado';
import $ from 'jquery';


export default class FormularioAutor extends Component {

	constructor() {
	    super();
	    this.state = {nome:'', email:'', senha:''};
	    this.enviaForm = this.enviaForm.bind(this);
	    this.setNome = this.setNome.bind(this);
	    this.setEmail = this.setEmail.bind(this);
	    this.setSenha = this.setSenha.bind(this);
    }

	enviaForm( evento ) {
		evento.preventDefault();
		console.log("dados sendo enviados")
		$.ajax({
	    	url:'http://cdc-react.herokuapp.com/api/autores',
	    	contentType: 'application/json',
	    	dataType: 'json',
	    	type: 'post',
	    	data: JSON.stringify({nome:this.state.nome, email:this.state.email, senha:this.state.senha}),
	    	success: function(resposta) {
	      		console.log("sucesso");
	    		this.props.setLista(resposta); //atualiza a lista
	    	}.bind(this),
	    	error: function(resposta) {
	    		console.log("erro");
			}.bind(this)
		})
	}

	setNome(evento){
		this.setState({nome:evento.target.value});
	}
	setEmail(evento){
		this.setState({email:evento.target.value});
	}
	setSenha(evento){
		this.setState({senha:evento.target.value});
	}

	render() {
		return (
			<div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm}>
	                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
	                <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
	                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
	                <BotaoCustomizado id="submitButton" type="submit" name="submitButton" className="pure-button pure-button-primary" title="Gravar" label="" />
                </form>             
            </div>
		);
	}
}