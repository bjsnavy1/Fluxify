/** @jsx React.DOM */
var React = require('react');
var Catalog = require('../components/app-catalog.js');
var Cart = require('../components/app-cart.js');
var APP =
  React.createClass({
    render:function(){
      return (
      		<div>
      			<h1>Build your Dream Team</h1>
      			<Catalog />
      			<h1>My Dream Team</h1>
      			<Cart />
      		</div>
      	)
    }
  });
module.exports = APP;