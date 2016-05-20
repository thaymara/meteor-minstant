Meteor.startup(function () {
    if (!Meteor.users.findOne()){
      for (var i=1;i<9;i++){
        var email = "user"+i+"@test.com";
        var username = "user"+i;
        var avatar = "ava"+i+".png"
        //console.log("creating a user with password 'test123' and username/ email: "+email);
        Meteor.users.insert({profile:{username:username, avatar:avatar}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }
    } 
  });

Meteor.publish("users", function(){
	var filter = {$or:[
                {user1Id:this.userId}, 
                {user2Id:this.userId}
                ]};
	
    	var chat = Chats.find(filter);
	var users = [];
	chat.forEach(function(item){
		users.push(item.user1Id, item.user2Id);
	});

	return Meteor.users.find({_id:{$in:users}});	
	//return Meteor.users.find();
});

Meteor.publish("chats", function(){
//	return Chats.find().forEach(function(chat){
//		chat.user1Id == this.userId || chat.user2Id == this.userId;
//	});

	var filter = {$or:[
                {user1Id:this.userId}, 
                {user2Id:this.userId}
                ]};

	return Chats.find(filter);
});