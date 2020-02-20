const Dinasaure = require('../entity/dinasaure.entity');
const dinasaureService = require('../service/dinasaure.service');
const mongoose = require('mongoose');
exports.add = (req,res)=>{
     dinasaureService.add(new Dinasaure({
        _id : new mongoose.Types.ObjectId(),
        username : req.body.username ,
        password : req.body.password ,
        race : req.body.race ,
        famille : req.body.famille ,
        norriture : req.body.norriture ,
        amis : []
    }))
    .then(result=>{
        res.status(result.status).json(result.body);
    })
    .catch(err=>{
        res.status(500).json({
            erreur: err
        });   
    });
}
exports.getAll = (req,res)=>{
    dinasaureService.getAll()
   .then(result=>{
       res.status(result.status).json(result.body);
   })
   .catch(err=>{
       res.status(500).json({
           erreur: err
       });   
   });
}
exports.getOneById = (req,res)=>{
    dinasaureService.getOneById(req.params.id)
   .then(result=>{
       res.status(result.status).json(result.body);
   })
   .catch(err=>{
       res.status(500).json({
           erreur: err
       });   
   });
}
exports.update = (req,res)=>{
    dinasaureService.update(new Dinasaure({
       _id : req.params.id ,
       race : req.body.race ,
       famille : req.body.famille ,
       norriture : req.body.norriture
   }))
   .then(result=>{
       res.status(result.status).json(result.body);
   })
   .catch(err=>{
       res.status(500).json({
           erreur: err
       });   
   });
}
exports.addFriend = (req,res)=>{
    dinasaureService.addFriend(req.params.id,req.params.friendId)
   .then(result=>{
       res.status(result.status).json(result.body);
   })
   .catch(err=>{
       res.status(500).json({
           erreur: err
       });   
   });
}
exports.deleteFriend = (req,res)=>{
    dinasaureService.deleteFriend(req.params.id,req.params.friendId)
   .then(result=>{
       res.status(result.status).json(result.body);
   })
   .catch(err=>{
       res.status(500).json({
           erreur: err
       });   
   });
}