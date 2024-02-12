import { render } from '@testing-library/react';
import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

class CustomModal extends Component {
    constructor(props);
    super(props);
    this.state = {
        activeItem: this.props.activeItem
    
    };
}

//to check if the checkbox is checked or not
handlechange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
        value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value};
    this.setState({ activeItem })
};

render() {
    const { toggle, onSave } = this.props;
    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Task Item</ModalHeader>
            <ModalBody>
                <form>
                    <FormGroup>
                        <label for="title">Title</label>
                        <Input
                          type="text"
                          name="title"
                          value={this.state.activeItem.title}
                          onChange={this.handlechange}
                          placeholder="enter Task Title"
                        />
                    </FormGroup>

                    <FormGroup>
                        <label for="description">Description</label>
                        <Input
                          type="text"
                          name="description"
                          value={this.state.activeItem.description}
                          onChange={this.handlechange}
                          placeholder="enter Task Description"
                        />
                    </FormGroup>

                    <FormGroup>
                        <label for="completed">
                        <Input
                          type="checkbox"
                          name="completed"
                          value={this.state.activeItem.completed}
                          onChange={this.handlechange}
                        />
                        Completed
                        </label>
                    </FormGroup>

                </form>
            </ModalBody>

            <ModalFooter>
                <button color="success" onClick={() => onSave(this.state.activeItem)}>
                    Save to the list
                </button>
              
            </ModalFooter>
        </Modal>
    )
}


export default Modal;
