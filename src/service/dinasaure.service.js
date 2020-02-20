const bcrypt = require("bcrypt");
const Dinasaure = require('../entity/dinasaure.entity');
exports.add = dinasaure=>{
    return getOneByUsername(dinasaure.username).then(result=>{
        console.log(result);
        if(result.body){
            return {
                status : 422 ,
                body : {
                    message : "username is used by another dinasaure"
                }
            }
        }else{
           return bcrypt.hash(dinasaure.password,10)
            .then(passhash=>{
                dinasaure.password = passhash ;
                return dinasaure.save()
                    .then(result=>{
                        let res = result.toObject() ;
                        delete res.__v ;
                        return {
                            status : 201 ,
                            body :  res
                        };
                }).catch(err=>{ throw err; });
            }).catch(err=>{ throw err; });
        }
    }) 
    .catch(err=>{
        throw err ;
    });
}
exports.getAll = ()=>{
    return Dinasaure.find({}).
    populate('amis')
    .then(result =>{ 
        return {
            status : 200 ,
            body :  {
                count : result.length ,
                dinasaures : result 
            }
        };
    })
    .catch(err=>{ throw err; }); 
}
exports.update = (dinasaure)=>{
    return Dinasaure.updateOne({ _id : dinasaure._id} ,{ $set: {race : dinasaure.race , famille: dinasaure.famille , norriture : dinasaure.norriture }})
    .then(result =>{ 
        return {
            status : 200 ,
            body :  {
                message : "Dinasure updated"
            }
        };
    })
    .catch(err=>{ throw err; });    
}
exports.addFriend = async (id,friendId)=>{
    try{
        let me = await getOneById(id)
        if(!me){
            return await {
                status : 422 ,
                message :  "dinasaure id is wrong"
            }
        }
        let friend = await getOneById(friendId)
        if(!friend){
            return await {
                status : 422 ,
                message :  "friend id is wrong"
            }
        }
        let result = await Dinasaure.updateOne({ _id : id} ,{$push: {  'amis' : friendId }})
        return {
            status : 200 ,
            body :  result
        }
    }catch(err){
        console.log(err);
        throw err ;
    }
}
exports.deleteFriend = async (id,friendId)=>{
    try{
        let me = await getOneById(id)
        if(!me){
            return await {
                status : 422 ,
                message :  "dinasaure id is wrong"
            }
        }
        let friend = await getOneById(friendId)
        if(!friend){
            return await {
                status : 422 ,
                message :  "friend id is wrong"
            }
        }
        let result = await Dinasaure.updateOne({ _id : id} ,{$pullAll: {  'amis' : [friendId] }})
        return {
            status : 200 ,
            body :  result
        }
    }catch(err){
        console.log(err);
        throw err ;
    }
}
function getOneByUsername(username){    
    return Dinasaure.findOne({ username : username })
    .then(result=>{
        return {
            status : 200 ,
            body :  result
        }
    })
    .catch(err=>{throw err ;});
}
exports.getOneByUsername = getOneByUsername ;
function getOneById(id){    
    return Dinasaure.findOne({ _id : id })
    .then(result=>{
        return {
            status : 200 ,
            body :  result
        }
    })
    .catch(err=>{throw err ;});
}
exports.getOneById = getOneById ;