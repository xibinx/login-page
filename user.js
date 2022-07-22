const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    age: {
     type:   Number,
     min: 1,
     max: 90
    },
    phone: String,
    adress: String,
    email: {
    type:    String,
    minLength: 3,
    maxLength: 30,
    required : true,
    lowercase: true
    },
    password: {
        type:    String,
        minLength: 3,
        maxLength: 30,
        required : true
        
        },
    dateCreated: {
        type: Date,
        immutable: true,
        
        default: () => Date.now()
    },
    dateUpdated: {
        type: Date,
        default: () => Date.now()
    },
    address: {
        street: String,
        house: Number
    },
    hobbies: [String],
    bestFriend :{
type: mongoose.SchemaTypes.ObjectId,
ref: "User"
    },
});
userSchema.methods.sayHi = function(){
    console.log("Hi my name is ", this.name);
}
userSchema.statics.findByName = function(name){
    return this.where({name: new RegExp(name,'i')});
}
module.exports = mongoose.model('user',userSchema);

