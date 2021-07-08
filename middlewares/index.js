import User from '../models/user'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'

export const requireSignin = expressJwt({
    getToken: (req,res) => req.cookies.token,
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

export const checkToken = async(req,res) => {
    const req_token = req.cookies.token;
    let auth=false ;
    if(!req_token){
        return res.status(200).json(null);
    }
    try{
       if(!jwt.verify(req_token,process.env.JWT_SECRET)) throw 'token not valid'; 
        else{
            auth=true 
        }
       
    }
    catch(err){console.log('Invalid token')}

    if(!auth){
        return res.status(400).json({'message':'token verification failed'});
    }
    else{
        const data = jwt.verify(req_token,process.env.JWT_SECRET)
            User.findById(data._id).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'User not found'
                    });
                }
                
                const {_id, firstName, lastName, email, role} = user
                return res.status(200).json({user: {_id, firstName, lastName, email, role}});
            });
    }  

}

export const verifyTokenmiddleware = (req,res,next)=>{
    if(!req.cookies.token){
        return res.status(400).json({
            error:'Not authenticated'
        })
    }
    const token = req.cookies.token;
    try{
        if(!jwt.verify(token,process.env.JWT_SECRET)){
            return res.status(400).json({
                error:'token verification failed'
            })
        }
        const data  = jwt.verify(token,process.env.JWT_SECRET)
        User.findById(data._id).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'User not found'
                });
            }
            const {_id, role, firstName, lastName, status} = user;
            req.user = {_id, role, firstName, lastName, status};
            next()
        })
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            error:'something went wrong'
        })
    }
}

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(403).send('Access denied');
    }
    next();
};

export const isAdmin = (req, res, next) => {
    console.log("Role",req.user.role )
    if (req.user.role === 0 || res.locals.role === 1) {
        return res.status(403).json('Admin resource! Access denied');
    }
    next();
};