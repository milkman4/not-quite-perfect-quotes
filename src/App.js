import React, { Component } from 'react';
import './App.css';
import ClipLoader from 'react-spinners/ClipLoader';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      loading: false,
      quotes: [],
      error: '',
      hasSearchedAtLeastOnce: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ quotes: [], loading: true, error: '' });
    fetch(`/api/quotes?query=${encodeURIComponent(this.state.query)}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else throw new Error(response.message);
      })
      .then((queryResults) =>
        this.setState({
          quotes: queryResults.results,
          loading: false,
          hasSearchedAtLeastOnce: true,
        })
      )
      .catch((error) => {
        this.setState({
          loading: false,
          error: 'An Error Occured',
        });
      });
  }

  render() {
    const {
      quotes,
      loading,
      query,
      hasSearchedAtLeastOnce,
      error,
    } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Search for a quote...</label>
            <input
              id="name"
              type="text"
              className="App-search-input"
              value={query}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </header>
        <article>
          {quotes.length > 0 &&
            !loading &&
            _.sortBy(quotes, ['quote']).map((quote) => {
              return (
                <div key={quote.id} className="App-result-item">
                  <div className="App-result-quote">{quote.quote}</div>
                  <div className="App-result-attribution">
                    - {quote.attribution}
                  </div>
                  <div className="App-result-source">
                    Api Source: {quote.apiSource}
                  </div>
                </div>
              );
            })}
          {loading && (
            <ClipLoader size={150} color={'#123abc'} loading={loading} />
          )}
          {!loading &&
            quotes.length === 0 &&
            hasSearchedAtLeastOnce &&
            'No Results found ☹️'}
          {!loading && error}
        </article>
      </div>
    );
  }
}

export default App;
