(function () {
    'use strict';

    var Quiz = React.createClass({
        propTypes: {
            data: React.PropTypes.array.isRequired
        },
        getInitialState: function () {
            return _.extend({
                bgClass: 'neutral',
                showContinue: false,
            }, this.props.data.selectGame());
        },
        handleBookSelected: function(title) {
            var isCorrect = this.state.checkAnswer(title);
            this.setState({
                bgClass: isCorrect ? 'pass' : 'fail',
                showContinue: isCorrect
            });
        },
        handleContinue: function () {
            this.setState(this.getInitialState());
        },
        handleAddGame: function () {
            routie('add');
        },
        render: function () {
            return (<div>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={this.state.author.imageUrl} className="authorimage col-md-3" />
                        </div>
                        <div className={"col-md-7"}>
                            {this.state.books.map(function (b) {
                                return <Book onBookSelected={this.handleBookSelected} key={b} title={b} />;
                            },this)}
                        </div>
                        <div className={"col-md-1 " + this.state.bgClass} />
                    </div>
                    {this.state.showContinue ? (
                        <div className="row">
                            <div className="col-md-12">
                                <input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Continue" />
                            </div>
                        </div>) : <span/>
                    }
                    <div className="row">
                        <div className="col-md-12">
                            <input onClick={this.handleAddGame} id="addGameButton" type="button" value="Add Game" className="btn " />
                        </div>
                    </div>
                </div>
                );
        }
    });

    var Book = React.createClass({
        propTypes: {
            title: React.PropTypes.string.isRequired
        },
        handleClick: function () {
            this.props.onBookSelected(this.props.title);
        },
        render: function () {
            return  <div onClick={this.handleClick} className="answer">
                        <h4>{this.props.title}</h4>
                    </div>;
        }
    });

    var AddGameForm = React.createClass({
        propTypes: {
            onGameFormSubmitted: React.PropTypes.func.isRequired
        },
        handleSubmit: function (e) {
            this.props.onGameFormSubmitted(getRefs(this));
            e.preventDefault();
        },
        render: function () {
            return <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Add Game Form</h1>
                                <form role="form" onSubmit={this.handleSubmit}>
                                  <div className="form-group">
                                    <input ref="imageUrl" type="text" className="form-control" placeholder="Image Url" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer1" type="text" className="form-control" placeholder="Answer 1" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer2" type="text" className="form-control" placeholder="Answer 2" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer3" type="text" className="form-control" placeholder="Answer 3" />
                                  </div>
                                  <div className="form-group">
                                    <input ref="answer4" type="text" className="form-control" placeholder="Answer 4" />
                                  </div>
                                  <button type="submit" className="btn btn-default">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>;
        }
    });

    var data = [
        {
            name: 'Mark Twain',
            imageUrl: 'images/authors/marktwain.jpg',
            books: ['The Adventures of Huckleberry Finn']
        },
        {
            name: 'Joseph Conrad',
            imageUrl: 'images/authors/josephconrad.png',
            books: ['Heart of Darkness']
        },
        {
            name: 'J.K. Rowling',
            imageUrl: 'images/authors/jkrowling.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Daniel Ogren',
            books: ['Harry Potter and the Sorcerers Stone']
        },
        {
            name: 'Stephen King',
            imageUrl: 'images/authors/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Pinguino',
            books: ['The Shining','IT']
        },
        {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
        {
            name: 'William Shakespeare',
            imageUrl: 'images/authors/williamshakespeare.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
        },
        {
            name: 'Arundhati Roy',
            imageUrl: 'images/authors/roy.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['The God of Small Things', 'Capitalism: A Ghost Story']
        },
        {
            name: 'Michael Chabon',
            imageUrl: 'images/authors/chabon.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Kavalier and Clay', 'Wonder Boys']
        },
        {
            name: 'Fydor Dostoyevsky',
            imageUrl: 'images/authors/dostoyevsky.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['The Idiot','The Brothers Karamazov', 'Crime and Punishment']
        },
        {
            name: 'Nicole Krauss',
            imageUrl: 'images/authors/krauss.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['The History of Love']
        },
        {
            name: 'Jonothan Safran Foer',
            imageUrl: 'images/authors/foer.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Everything is Illuminated', 'Eating Animals', 'Extremely Loud and Incredibly Close']
        }
    ];

    var selectGame = function () {
        var books = _.shuffle(this.reduce(function (p, c, i) {
            return p.concat(c.books);
        }, [])).slice(0,4);

        var answer = books[_.random(books.length-1)];

        return {
            books: books,
            author: _.find(this, function (author) {
                return author.books.some(function (title) {
                    return title === answer;
                });
            }),
            checkAnswer: function (title) {
                return this.author.books.some(function (t) {
                    return t === title;
                });
            }
        };
    };

    data.selectGame = selectGame;

    routie({
        'add': function() {
            React.render(<AddGameForm onGameFormSubmitted={handleAddFormSubmitted} />,
                document.getElementById('app'));
        },
        '': function() {
            React.render(<Quiz data={data} />,
                document.getElementById('app'));
        }
    });

    function handleAddFormSubmitted(data) {
        var quizData = [{
            imageUrl: data.imageUrl,
            books: [data.answer1, data.answer2, data.answer3, data.answer4]
        }];
        quizData.selectGame = selectGame;
        React.render(<Quiz data={quizData} />,
                document.getElementById('app'));
    }

    function getRefs(component) {
        var result = {};
        Object.keys(component.refs).forEach(function(refName) {
            result[refName] = React.findDOMNode(component.refs[refName]).value;
        });
        return result;
    }

})();
