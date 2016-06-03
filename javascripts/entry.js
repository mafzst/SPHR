/**
 * Front Js File
 *
 * All the front logic, using ReactJs
 */

require('../less/main.less');
var io = require('socket.io-client')('http://localhost:3615');
var $ = require('jquery');

'use strict';

import React from "react";

/* React Component to handle Profiler Page */
var ProfileComponent = React.createClass({
  getInitialState: function() {
    return {
      profilerContent: '',
      url: '',
      token: '',
    };
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    /* Don't reload view if the token didn't change */
    if(this.state.url !== this.props.url || this.state.token !== this.props.token) {
      var url = this.props.url + '_profiler/' + this.props.token;
      console.log("[FRONT] : " + url);

      this.serverRequest = $.get(url, function(result) {
        this.setState({
          profilerContent: result,
          url: this.props.url,
          token: this.props.token
        });
      }.bind(this));
    }
    /* We don't want React escape HTML ! */
    return <div dangerouslySetInnerHTML={{__html: this.state.profilerContent}} />;
  }
});

/* When receiving message from server */
io.on('newConfig', function(opts) {
  /* Refresh Profiler component with new token */
  var url = opts.url;
  var token = opts.token;
  React.render(<ProfileComponent url={url} token={token} />, document.getElementById('profiler'));
});
