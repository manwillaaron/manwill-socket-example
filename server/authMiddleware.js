module.exports ={
    sessionCheck(req,res, next){
        if(!req.session.admin){
            req.session.admin = {
                id: 0,
                email: ''
            }
        }
        next()
    }
}