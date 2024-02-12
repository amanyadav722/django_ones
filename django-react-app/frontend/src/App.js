import React, { Component } from 'react';
import './App.css';
import CustomModal from './components/Modal';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }
  
  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
    .get("http://localhost:8000/api/tasks/")
    .then(res => this.state({ todoList: res.data }))
    .catch(err => console.log(err))
  };

  //Create toggle property

  toggle = () => {
    this.setstate({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    alert('Saved!' + JSON.stringify(item));
  };
  handleDelete = item => {
    alert ('Deleted!' + JSON.stringify(item));
  };

  createItem = () => {
    const item = { title: "", modal: !this.state.modal };
    this.setState({ activeItem: item, modal: !this.state.modal });
  }
  
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal})
  }




  displayCompleted = status => {
    if (status) {
      return this.setstate({ viewCompleted:true });
    }
    return this.setstate({ viewCompleted:true });
  }
  
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={()=> this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed 
        </span>

        <span 
          onClick={()=> this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    )
  }

  //Rendering items in the lists (completed or incompleted)
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      item => item.completed === viewCompleted
    );

  return newItems.map(item => (
    <li key={item.id} className="list-group-item d-flex justify-content-between
    align-items-center">

      <span className={'todo-tiltle mr-2 ${this.viewCompleted ? "completed-todo" :  ""}'}
      title = {item.title}>
      {item.title}
        <span>
          <button className="btn btn-info mr-2">Edit</button>
          <button className="btn btn-danger mr-2">Delete</button>
        </span>

      </span>
    </li>
  ))

  };

  render() {
    return (
      <main className="content p-3 mb-2 bg-info">
        <h1 className="text-black text-upperscase text-center my-4">
          Task manager
        </h1>
        <div className="row">
          <div className="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-warning">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>

        </div>
        <footer className="my-3 mb-2 bg-info text-white text-center">Copyright 2021 &copy; All Rights Reserved.</footer>
        {this.state.model ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} 
          onSave={this.handleSubmit} />
        ) : null }
      </main>
  )
  }




}

export default App;
