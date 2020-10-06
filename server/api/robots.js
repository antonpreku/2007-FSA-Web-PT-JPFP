const express = require('express')
const router = express.Router()
const {Robot,Project} = require('../db/index')

router.get('/', async(req, res, next) => {
    try {
        const robots = await Robot.findAll()
        res.send(robots)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async(req, res, next) => {
    try {
        // const robot = await Robot.findOne({where:{id: req.params.id}}) 
        const robot = await Robot.findByPk(req.params.id,{include:[Project]})        
        res.send(robot)
    } catch (error) {
        next(error)
    }
})

router.post('/create', async(req, res, next) => {
    try {
        const robot = await Robot.create({name: req.body.name})        
        res.send(robot)
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:id',(req,res,next)=>{
    try{
        Robot.destroy({where:{id: req.params.id}})
        res.sendStatus(204);
    }catch(err){
        next(err)
    }
})

router.put('/edit/:id' ,async (req, res,next)=>{
    try{
        const data= await Robot.update(
            {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            fuelType: req.body.fuelType, 
            fuelLevel: req.body.fuelLevel
            },
            {
                where:{
                    id: req.params.id
                }
            })

        res.send(data)
    }catch(err){
        next(err)
    }
})
module.exports = router