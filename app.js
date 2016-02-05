/** @jsx React.DOM */
(function(){
  'use strict';

  var post = {
    title: 'Look at my Cat!',
    content: 'Really, look at my amazing cat. He is so adorable.',
    comments: ['Your cat is cute', 'I like your cat.', 'Sweet cat, yo.']
  };

  var Post = React.createClass({
    render: function(){
      return (<div>
          <h1>{this.props.data.title}</h1>
          <p>{this.props.data.content}</p>
          <h2>Comments</h2>

          <Comment content={this.props.data.comments[0]} />
          <Comment content={this.props.data.comments[1]} />
          <Comment content={this.props.data.comments[2]} />

        </div>);
    }
  });

  var Comment = React.createClass({
    render: function(){
      return (<div>{this.props.content}</div>)
    }
  })

  React.render(<Post data={post} />, document.body);

  var Quiz = React.createClass({
    render: function(){
      return <div>test</div>;
    }
  });


  React.render((<Quiz data = {"foo"} />), document.getElementById('app'));

  var Outer = React.createClass({
    render: function(){
      return <h3>This is the outer element
              <Inner />
              This is the rest of the otter \(typo and it stays) element
              </h3>
    }
  });

  var Inner = React.createClass({
    render: function(){
      return <p>This is an inner element</p>
    }
  });

  React.render(<Outer />, document.getElementById('app'));

})();
