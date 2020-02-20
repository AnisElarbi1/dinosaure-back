const dinasaureService = require('./dinasaure.service');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
exports.login = async (username,password)=>{
    try{
        let findresult = await dinasaureService.getOneByUsername(username) ;
        console.log(findresult);
        if(!findresult.body){
            return await {
                status : 422 ,
                body : {
                    message : "invalid username"
                }
            }
        }
        compaireResult = await bcrypt.compare(password,findresult.body.password);
        console.log(compaireResult);
        if(!compaireResult){
            return await {
                status : 422 ,
                body : {
                    message : "Invalid password"
                }
            }
        }
        return await {
            status : 200 ,
            body : {
                dinasaure : findresult.body ,
                token : await jwt.sign({data : findresult.body},process.env.JWT_KEY, { expiresIn: "1h" })
            }
        }
    }catch(err){
        console.log(err);
        throw err ;
    }
}
