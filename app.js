/** @jsx React.DOM */

(function() {
  'use strict';

  var Quiz = React.createClass({
    propTypes: {
      books: React.PropTypes.array.isRequired
    },
    getInitialState: function(){
      return this.props.data.selectGame();
    },
    render: function() {
      return <div>
        <div className="row">
          <div className="col-md-4">
            <img src={this.state.author.image} className="author-image pull-left" />
          </div>
          <div className="col-md-7">
            {this.state.books.map(function(b){
              return <Book title={b} />
            }, this)}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>;
    }
  });

  var Book = React.createClass({
    propTypes: {
      title: React.PropTypes.string.isRequired
    },
    render: function() {
      return <div className="book-title pull-left"><h4>{this.props.title}</h4></div>;
    }
  })

  var data = [
    {
      name: 'Michael Chabon',
      image: '/images/chabon.jpg',
      books: ['Kavalier and Clay', 'Telegraph Avenue', 'Wonder Boys']
    },{
      name: 'Pyotr Dostoyevsky',
      image: '/images/dostoyevsky.jpg',
      books: ['Crime and Punishment', 'The Idiot', 'The Brothers Karamazov']
    },{
      name: 'Jonothan Sarfan Foer',
      image: '/images/foer.jpg',
      books: ['Everything is Illuminated', 'Eating Animals', 'Extremely Loud and Incredibly Close']
    },{
      name: 'Nicole Krauss',
      image: '/images/krauss.jpg',
      books: ['The History of Love']
    },{
      name: 'Philip Pullman',
      image: '/images/pullman.png',
      books: ['The Golden Compass', 'The Subltle Knife', 'The Amber Spyglass']
    },{
      name: 'Arundhati Roy',
      image: '/images/roy.jpg',
      books: ['The God of Small Things']
    }
  ]

  data.selectGame = function(){
    var books = _.shuffle(this.reduce(function(p, c, i){
      return p.concat(c.books)
    }, [])).slice(0,4);

    var answer = books[_.random(books.length-1)];

    return {
      books: books,
      author: _.find(this, function(author){
        return author.books.some(function(title){
          return title === answer;
        })
      })
    }
  }

  var button = React.createClass({
    render: function(){
      return <button className="btn btn-primary">Next</button>
    }
  });

  React.render((<Quiz data = {data} />),
  document.getElementById('app'));
})()
