import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loading: false,
      quotes: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ quotes: [], loading: true });
    fetch(`/api/quotes?query=${encodeURIComponent(this.state.query)}`)
      .then((response) => response.json())
      .then((queryResults) =>
        this.setState({
          quotes: queryResults.results,
          loading: false,
        })
      );
  }

  render() {
    const { quotes, loading, query } = this.state;
    console.log(quotes);
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Search for a quote...</label>
            <input
              id="name"
              type="text"
              value={query}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </header>
        <body>
          {quotes.length > 0 && !loading
            ? quotes.map((quote) => {
                return (
                  <div key={quote.id}>
                    {quote.quote}
                    {quote.attribution}
                  </div>
                );
              })
            : `No Results`}
        </body>
      </div>
    );
  }
}

export default App;
