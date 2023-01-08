import React from 'react';
import './App.css';
import Axios from 'axios';

//function App() {
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'ここに日本語テキストを入力してください', output: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>日本語の言い換えツール</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea name="text" cols="90" rows="20" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br/>
            <input type="submit" value="実行" />
          </form>
          <br />
          <label>
              <textarea name="text" cols="90" rows="20" value={this.state.output} onChange={this.handleChange} />
            </label>
            <br/>
        </header>
      </div>
    );
  }


/*  paraphrase = text => {
    Axios.post('http://127.0.0.1:5000/paraphrase', {
      input_text: text
    }).then(function(res) {
      alert(res.data.output_text);
    })
  };
*/
  paraphrase = text => {
    Axios.post('http://127.0.0.1:5000/paraphrase', {
      input_text: text
    }).then(res => {
      this.setState({output:res.data.output_text});
    }
    )
  };

  handleSubmit = event => {
    this.paraphrase(this.state.value)
    event.preventDefault();
  };

  handleChange = event => {
    this.setState({ value: event.target.value })
  };
}

export default App;
