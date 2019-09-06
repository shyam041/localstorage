import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  hydrateStateWithLocalStorage(){
    console.log('mounted');
    for(let key in this.state){
      if(localStorage.hasOwnProperty(key)){
        let value = localStorage.getItem(key);
        try{
          value = JSON.parse(value);
          this.setState(() => {
            return {[key]:value};
          });
        }catch(e){
          this.setState({[key]:value})
        }
      }
    }
  }

  saveStateToLocalStorage=()=>{
    console.log('in local storage');
    for(let key in this.state){
      localStorage.setItem(key,JSON.stringify(this.state[key]))
    }
  }

  componentDidMount(){
    //this.hydrateStateWithLocalStorage();
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage
    );
  }

  componentWillUnmount(){    
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
  updateInput(key, value) {
    // update react state
    console.log(key)
    this.setState({ [key]: value });
    //localStorage.setItem(key,value );
  }

  addItem() {
    //create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    //copy current list of items
    const list = [...this.state.list];
    //add the new item to the list
    list.push(newItem);
    //update state with new list, reset the new item input
    this.setState({
      list:list,
      newItem: ""
    });
    // localStorage.setItem('list',JSON.stringify(list));
    // localStorage.setItem('newItem','');
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
    //localStorage.setItem('list',JSON.stringify(updatedList));
  }

  render() {
    return (
      <div className="App">
        <div>
          Add an item to the list
          <br />
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}>
            &#43;Add
          </button>
          <br/><br/>
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;