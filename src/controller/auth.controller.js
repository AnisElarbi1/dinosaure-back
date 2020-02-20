const authService = require('../service/auth.service');
exports.login = (req,res)=>{
    authService.login(req.body.username,req.body.password)
    .then(result=>{
        res.status(result.status).json(result.body);
    })
    .catch(err=>{
        res.status(500).json({
            erreur: err
        });   
    });
}