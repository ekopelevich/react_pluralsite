/** @jsx React.DOM */
(function(){
  'use strict';

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
