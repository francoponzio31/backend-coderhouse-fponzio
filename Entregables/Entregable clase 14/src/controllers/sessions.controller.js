class SessionsController{
    async getCurrentUser(req, res){
        try {
            res.status(200).json({user: req.user})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error})
        }
    }

    async logout(req, res){
        try {
            req.logout((error) => {
                if (error) {
                    console.error(error)
                }
                req.session.destroy((error) => {
                    if (error) {
                        console.error(error)
                    } else {
                        res.redirect("/login")
                    }
                })
            })
        } catch (error) {
            console.error(error)
        }
    }

}

const sessionsController = new SessionsController()
export default sessionsController
