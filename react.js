/** @jsx React.DOM */


var Result = React.createClass({
  render: function() {
    return (
      <div className="result">
        {this.props.children}
      </div>
    );
  }
});

var SearchBox = React.createClass({
  handleSearch: function (keys) {
    var filteredData = t9Tree.retrieve(keys)
    this.setState({data: filteredData});
    console.log(this.state.data);

  },

  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {

  },
  render: function() {
    return (
      <div className="searchBox">
        <h1>t9 word search</h1>
        <SearchForm onSearch={this.handleSearch} />
        <SearchResults data={this.state.data} />
      </div>
    );
  }
});

var SearchResults = React.createClass({
  render: function() {
    // debugger;
    var resultNodes = this.props.data.map(function (word, index) {
      return <Result key={index}>{word}</Result>;
    });
    return (<div className="resultsList">{resultNodes}</div>);
  }
});

var SearchForm = React.createClass({
  handleSearch: function() {
    var keyPresses = this.refs.keyPresses.getDOMNode().value.trim();
    
    this.props.onSearch(keyPresses);
    this.refs.keyPresses.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <input type="text" placeholder="press any key(s) from 2-9" ref="keyPresses" onKeyUp={this.handleSearch}/>
    );
  }
});

React.renderComponent(
  <SearchBox  />,
  document.getElementById('container')
);
