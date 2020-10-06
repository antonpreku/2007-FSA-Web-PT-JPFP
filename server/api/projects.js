const express = require('express')
const router = express.Router()
const {Project, Robot} = require('../db')

router.get('/', async(req, res, next) => {
    try {
        const projects = await Project.findAll()
        res.send(projects)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async(req, res, next) => {
    try {
        const data = await Project.findByPk(req.params.id,{include:[Robot]})        
        // const project = await Project.findOne({where:{id:req.params.id}})
        res.send(data)
    } catch (error) {
        next(error)
    }
})

router.put('/edit/:id' ,async (req, res,next)=>{
    try{
        const data= await Project.update(
            {
                title: req.body.title,
                completed: req.body.completed,
                priority: req.body.priority, 
                deadline: req.body.deadline
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
router.post('/create', async(req, res, next) => {
    try {
        const data = await Project.create({title: req.body.title})        
        res.send(data)
    } catch (error) {
        next(error)
    }
})

router.delete('/delete/:id',(req,res,next)=>{
    try{
        Project.destroy({where:{id: req.params.id}})
        res.sendStatus(204);
    }catch(err){
        next(err)
    }
})

module.exports = router