
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';


class PostsNew extends Component {

    constructor(props) {
        super(props);  
        this.onSubmit = this.onSubmit.bind(this);
    }

    renderField(field) {
        const { touched, error } = field.meta;
        const isInvalid = touched && error? true: false;
      
        return (
            <FormGroup>
                <Label>{field.label}</Label>
                <Input
                    type="text" 
                    name={field.name}
                    placeholder={field.placeholder}
                    {...field.input}                   
                    invalid={isInvalid}
                />
                <FormFeedback>
                    {touched ? error: ''}
                </FormFeedback>
            </FormGroup>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => this.props.history.push('/'));
    }
    
    render() {

        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit)}>
                <Field
                    label="Título"
                    name="title"
                    placeholder="Ingrese un titulo ..."
                    component={this.renderField}
                />
                <Field
                    label="Categorias"
                    name="categories"
                    placeholder="Ingrese las categorias ..."
                    component={this.renderField}
                />
                <Field
                    label="Contenido"
                    name="content"
                    placeholder="Ingrese el contenido ..."
                    component={this.renderField}
                />
                <div className="margin: 10px;">
                    <Button outline color="primary">Enviar</Button>
                    <Button outline color="danger" tag={Link} to="/">Cancelar</Button>
                </div>
            </Form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "Ingrese un título!";
    }

    if (values.title && values.title.length < 3) {
        errors.title = "El título debe tener al menos tres caracteres!";
    }

    if (!values.categories) {
        errors.categories = "Ingrese al menos una categoria!";
    }

    if (!values.content) {
        errors.content = "Ingrese por favor algún contenido!";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);