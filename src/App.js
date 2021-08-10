import './App.css';
import contacts from './contacts.json';
import { React, Component } from 'react';
import './css/contacts.css';

const copy = contacts.splice(0, 5);

export class App extends Component {
  state = {
    contacts: copy,
  };

  addRandomContact = () => {
    const currentIds = this.state.contacts.map((a) => a.id);
    const pseudoRandom = contacts.filter((contact) => {
      if (!currentIds.includes(contact.id)) {
        return contact;
      }
    });
    const index = Math.floor(Math.random() * pseudoRandom.length);
    let temp = [...this.state.contacts];
    temp.push(pseudoRandom[index]);
    this.setState({
      contacts: temp,
    });
  };

  sortByName = () => {
    const copy = [...this.state.contacts]
    copy.sort((a,b) => {
      return a.name.localeCompare(b.name)
    })
    this.setState({
      contacts: copy,
    })
  }

  sortByPopularity = () => {
    const copy = [...this.state.contacts]
    copy.sort((a, b) => {
      return b.popularity - a.popularity
    })
    this.setState({
      contacts: copy,
    })
  }

  handleDelete = (id) => {
    const copy = this.state.contacts.filter(c => c.id !== id)
    this.setState({
      contacts: copy,
    })
  }

  getRandomColorImproved = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    const rgb = `rgb(${r},${g},${b})`
    const a = (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000' : '#fff'
    return [rgb, a]
  }

  render() {
    const [bColor, bLum] = this.getRandomColorImproved()
    return (
      <>
        <div className="container">
          <h1>IronContacts</h1>
          <div className="buttonContainer">
          <button style={{
            backgroundColor: bColor,
            color: bLum,
          }} onClick={this.addRandomContact}>Add random contact</button>
          <button style={{
            backgroundColor: bColor,
            color: bLum,
          }} onClick={this.sortByName}>Sort by name</button>
          <button style={{
            backgroundColor: bColor,
            color: bLum,
          }} onClick={this.sortByPopularity}>Sort by popularity</button>
          </div>
          
          <table>
            <thead>
              <tr>
                <td>Picture</td>
                <td>Name</td>
                <td>Popularity</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {this.state.contacts.map((contact) => {
                const [color, luminance] = this.getRandomColorImproved()
                return (
                  <tr key={contact.id} style={{
                    backgroundColor: color,
                    color: luminance,
                  }}>
                    <td>
                      <img src={contact.pictureUrl} alt="" />
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity.toFixed(2)}</td>
                    <td><button style={{
                      backgroundColor: bColor,
                      color: bLum,
                    }} onClick={() => this.handleDelete(contact.id)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default App;
