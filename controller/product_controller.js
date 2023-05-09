import Model from '../model/product_Model.js'

async function getAll(req, res, next) {
    try {
        const Admins = await Model.find({}).populate('category')
        res.status(200).send({ success: true, Admins })
    } catch (err) {
        res.status(500).send({ success: false, err: err })
    }
}

async function getByName(req, res, next) {
    try {
        const name = req.params.name

        const event = await Model.findOne({ name: name })
        if (!event) {
            return res.status(404).send({ success: false, error: 'Event not found' })
        }
        res.status(200).send({ success: true, event })
    } catch (err) {
        res.status(500).send({ success: false, error: err.message })
    }
}

function createAdmin(req, res, next) {
    let Add = new Model()
    Add.save()
        .then((response) => res.status(200).send({ success: true, response }))
        .catch((err) => {
            res.status(400).send(err)
        })
}

async function getById(req, res, next) {
    try {
        const id = req.params.id
        const event = await Model.findOne({ _id: id })
        if (!event) {
            return res.status(404).send({ success: false, error: 'Event not found' })
        }
        res.status(200).send({ success: true, event })
    } catch (err) {
        res.status(500).send({ success: false, error: err.message })
    }
}

function edit(req, res, next) {
    const id = req.params.id
    const body = req.body

    Model.updateOne({ _id: id }, { $set: body })
        .then((response) => {
            if (!response) {
                return res
                    .status(404)
                    .send({ success: false, message: 'No matching document found.' })
            }
            res
                .status(200)
                .send({
                    success: true,
                    message: 'Document updated successfully.',
                    body,
                    response,
                })
        })
        .catch((err) => {
            return next(err)
        })
}

function Delete(req, res, next) {
    const id = req.params.id
    {
        console.log(id)
    }
    Model.findByIdAndRemove(id)
        .then((response) => {
            if (!response) {
                return res
                    .status(404)
                    .send({ success: false, message: 'No matching document found.' })
            }
            res.status(200).send({
                success: true,
                message: 'Document deleted successfully.',
                response,
            })
        })
        .catch((err) => {
            return next(err)
        })
}

const product = { getAll, createAdmin, edit, Delete, getById, getByName }
export default product
