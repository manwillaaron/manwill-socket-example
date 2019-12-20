module.exports = {
    async login(req, res){
        const db = req.app.get('db')
        const {email, password} = req.body
        let admin= await db.get_admin([email,password])
        if(!admin[0]) return res.sendStatus(401)
        req.session.admin = {
            email: email,
            id: admin[0].id,
            name: admin[0].name
        }
        res.status(200).send(req.session.admin)
    },
    async getAllAdmin(req,res){
        
        const db = req.app.get('db')
        const {id} = req.session.admin
        const allAdmin = await db.get_all_admin(+id)
        res.status(200).send(allAdmin)
    },
    loggedInCheck(req,res){
        if(req.session.admin){
              res.status(200).send(req.session.admin)
        } 
    },
    async logout(req,res){
        await req.session.destroy()
        res.sendStatus(200)
    }
}