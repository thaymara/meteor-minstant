Chats = new Mongo.Collection("chats");

Chats.allow({
	insert: function(userId, doc){
		//console.log(userId + " " + doc.user2Id);
		if(Meteor.user()){		
			if(userId == undefined || doc.user2Id == undefined){
				return false;
			}else{
				return true;
			}
		} else{
			return false;
		}
	},
	update:function(userId){	
		if(Meteor.user()){
			if(userId != Meteor.userId()){
				return false;
			}else{
				return true;
			}
		} else{
			return false;
		}
	}
})
