/** @jsx React.DOM */

var post = {
  title: 'Look at my Cat!',
  content: 'Really, look at my amazing cat. He is so adorable.',
  comments: ['Your cat is cute', 'I like your cat.', 'Sweet cat, yo.']
};

var Post = React.createClass({
  render: function(){
    return (
      <div>
        <h1>{this.props.data.title}</h1>
        <p>{this.props.data.content}</p>
        <h2>Comments</h2>

        {this.props.data.comments.map(function(comment){
          return <Comment content={comment} />;
        })}
      </div>);
  }
});

var Comment = React.createClass({
  render: function(){
    return (<div>{this.props.content}</div>)
  }
});

React.render(<Post data={post} />, document.getElementById('app'));


  // var Quiz = React.createClass({
  //   render: function(){
  //     return <div>test</div>;
  //   }
  // });
  //
  //
  // React.render((<Quiz data = {"foo"} />), document.getElementById('app'));
