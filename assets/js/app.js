// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"

var channel = socket.channel('room:lobby', {}); // connect to chat room

channel.on('shout', function(payload){
  var ul = document.getElementById('msg-list');
  var li = document.createElement('li');
  li.setAttribute('class','collection-item avatar');
  var name = payload.name || 'guest'; //get name or set default
  li.innerHTML = '<p>' + name + payload.message + '</p>';

  // create a tag
  var newAlink = document.createElement("a"); 
  newAlink.setAttribute('href','#!');
  newAlink.setAttribute('class','secondary-content');
  // create icon tag
  var icon = document.createElement("i"); 
  icon.setAttribute('class', 'material-icons'); 
  newAlink.appendChild(icon);
  //var gradleLink = createGradle();
  li.appendChild(newAlink);
  ul.appendChild(li);
});

function createGradle(){
  var newAlink = document.createElement("a"); 
  newAlink.setAttribute('href','#!');
  newAlink.setAttribute('class','secondary-content');
  var icon = document.createElement("i"); 
  icon.setAttribute('class', 'material-icons'); 
  let generatedElem = newAlink.appendChild(icon);
  return generatedElem;
}
channel.join(); //join the channel

var ul = document.getElementById('msg-list');
var name = document.getElementById('name');
var msg = document.getElementById('msg');


msg.addEventListener('keypress', function(event){
   if(event.keyCode == 13 && msg.value.length > 0){
      channel.push('shout',
	     {name: name.value,
	      message: msg.value 
	     });
      msg.value = '';
   }
});


