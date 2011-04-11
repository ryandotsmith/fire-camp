var Message = Backbone.Model.extend({});

var MessageStore = Backbone.Collection.extend({
 model: Message,
   url: 'http://localhost:4567/messages'
});
var messages = new MessageStore;

var MessageView = Backbone.View.extend({

   events: { "submit #chatForm" : "handleNewMessage" }

  , handleNewMessage: function(data) {
    var inputField = $('input[name=newMessageString]');
    messages.create({content: inputField.val()});
    inputField.val('');
  }

  , render: function() {
    var data = messages.map(function(message) { return message.get('content') + '\n'});
    var result = data.reduce(function(memo,str) { return memo + str }, '');
    $("#chatHistory").text(result);
    return this;
  }

});

messages.bind('add', function(message) {
  messages.fetch({success: function(){view.render();}});
});

var view = new MessageView({el: $('#chatArea')});

setInterval(function(){
  messages.fetch({success: function(){view.render();}});
},1000)
