class LessonsController {
    async create(req, res) {
        try {
            res.json('ok')
        } catch (error) {
            return res.status(400).json({message: "error", error})
        }
    }
}

module.exports = new LessonsController()