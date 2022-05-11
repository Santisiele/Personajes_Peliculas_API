import { Router } from 'express';
import { personajeService } from '../services/personajeServices.js';
import { Authenticate } from "../common/jwt.js";

const router = Router();
const personaje = new personajeService()

router.get('/', Authenticate, async(req, res) => {
    let nombre = req.query.nombre;
    let edad = req.query.edad;
    try{
    const personajes = await personaje.getpersonaje(nombre, edad);
    return res.status(200).json(personajes);
    }catch(error){
        return res.send(error)
    }finally{
        console.log(`This is a get operation`);
    }
    
});

router.get('/:id', Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);

    const personajeElegido = await personaje.getpersonajeById(req.params.id);

    return res.status(200).json(personajeElegido);
});

router.post('', Authenticate, async(req, res) => {
    console.log(`This is a post operation`);

    const personajeCreado = await personaje.createpersonaje(req.body);

    return res.status(201).json(personajeCreado);
});

router.put('/:id',Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);

    const personajeEditado = await personaje.updatepersonajeById(req.params.id, req.body);

    return res.status(200).json(personajeEditado);
});

router.delete('/:id',Authenticate, async(req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);

    const personajeEliminado = await personaje.deletepersonajeById(req.params.id);

    return res.status(200).json(personajeEliminado);
});

export default router;