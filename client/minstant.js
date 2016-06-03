var otherUserId = "";

Meteor.subscribe("chats");
Meteor.subscribe("users");
  
  ///
  // helper functions 
  /// 

  Template.available_user_list.helpers({
    users:function(){
      return Meteor.users.find();
    }
  })
  
 Template.available_user.helpers({
    getUsername:function(userId){
      user = Meteor.users.findOne({_id:userId});
      return user.profile.username;
    }, 
    isMyUser:function(userId){
      if (userId == Meteor.userId()){
        return true;
      }
      else {
        return false;
      }
    }
  })

  Template.chat_page.helpers({
   chat_user:function(){
	var vUser = Meteor.users.findOne({_id:otherUserId});
	return vUser.profile.username;
   }, 
   messages:function(){
      var chat = Chats.findOne({_id:Session.get("chatId")});
      return chat.messages;
    }, 
    other_user:function(){
      return ""
    }, 
  })

 Template.chat_message.helpers({
	avatarUser: function(userid){
		var image = Meteor.users.findOne({_id: userid});
		return image.profile.avatar;
	},
	isSameUser: function(userid){
		if(userid == Meteor.userId()){
			return true;
		}
		else{
			return false;
		}
	},
 })

/// Events functions

Template.chat_page.events({
  // this event fires when the user sends a message on the chat page
  'submit .js-send-chat':function(event){
    // stop the form from triggering a page reload
    event.preventDefault();
    // see if we can find a chat object in the database
    // to which we'll add the message
    var chat = Chats.findOne({_id:Session.get("chatId")});
    if (chat){// ok - we have a chat to use
      var msgs = chat.messages; // pull the messages property
      if (!msgs){// no messages yet, create a new array
        msgs = [];
      }
      // is a good idea to insert data straight from the form
      // (i.e. the user) into the database?? certainly not. 
      // push adds the message to the end of the array
      msgs.push({text: event.target.chat.value, userid:Meteor.userId()});
      // reset the form
      event.target.chat.value = "";
      // put the messages array onto the chat object
      chat.messages = msgs;
      // update the chat object in the database.
      Chats.update({_id: chat._id}, { $set: {messages:chat.messages, userid: chat.userid}});
    }
  }
 })
