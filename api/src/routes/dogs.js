const express = require('express')
const axios = require('axios')
const app = require('express').Router()
const {Dog, Temper} = require('../db.js');
const e = require('express');



const getApiData = async () => {
    const dogApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    let apiData = await dogApi.data.map((dog) => {
        return {
            id : dog.id,
            name : dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            age: dog.life_span,
            image: dog.image.url,
            temperament: dog.temperament,
        }
    })
    return apiData
};

const getDbData = async () => {
    return await Dog.findAll({
        include: {
            model: Temper,
            attributes: ['name'],
            through:{
                attributes: [],
            }
        }
    })
}

const getAllDogs = async () => {
    const apiData = await getApiData(); //info api
    const dbData = await getDbData();   //info db

    const allData = apiData.concat(dbData); // api + db

    return allData;
}






app.get('/dogs', async(req, res, next)=>{
    
    try{
        const name = req.query.name; // name por query
        let allDogs = await getAllDogs();
        if (!name){// si la query.name no existe devuelve toda la info necesaria para /dogs
            res.status(200).send(allDogs)   
        } else { //si existe query.name pasa a buscar
            let dogName = await allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send({ info : 'no existe!'});
        }
    }   catch (err) {
        next(err)
    }

})

app.get('/dogs/:id', async function(req, res, next){
    try{
        const id = req.params.id;
        let allDogs = await getAllDogs();
        if(id){
            let dogId = await allDogs.filter((e) => e.id == id);
            dogId.length ? 
            res.status(200).send(dogId) :
            res.status(404).send({info : 'no existe!'});
        };
    } catch (err) {
        next(err)
    };
});



app.post('/dogs/create', async (req,res,next)=>{
      let {name, height, weight, age, temperaments, image} = req.body //destructuring m1
      let dogExists = await Dog.findOne({where:{name}})
      if(dogExists)return res.status(404).send('Already exists a dog with this name')  //si existe un perro apodado asi devuelve este mensaje
        Dog.create({//si no existe procede a crear un ejemplar en la db
            name,
            height,
            weight,
            age,
            image,
            temperaments
        }).then(async(dog)=>{
            console.log(temperaments)
            await dog.setTempers(temperaments)// genera la coneccion con temperamento
            res.status(200).send(dog)
        })
        .catch((e)=>{
            res.status(404).send('error /post dogs')
        });
});

// app.post('/dogs/create', async (req, res) => {
//     let { name, height, weight, age, image, temperaments } = req.body;
//     try{
//         const newDog = await Dog.create({
//           name, 
//           weight,
//           height, 
//           age,
//           image
//         });
//         console.log(tem)
//         await newDog.setTempers(temperaments);   
//          return res.json(newDog);
//         }
//         catch(e){
//            return res.send({msg: "Error de carga de perro"});
//     }
// });

  


app.get('/temperaments', async (req,res) => {
    await axios.get('https://api.thedogapi.com/v1/breeds')   //me traigo la info  
        .then(data => {
            let filteredTemps= [...new Set(data.data.reduce((t,e)=>t+e.temperament+',',[]).split(',').map(e=>e.replace(/\s+/g, '')))]
             filteredTemps.map(async e=>{
                let x = await Temper.findOne({where:{name:e}}) //me fijo si existe en la db
                if(!x)Temper.create({name:e}) //si no existe lo creo en la db
            }) 
            filteredTemps.length>0?res.send(filteredTemps):res.status(404).send('error /get temps')
        })
        .catch(e => {
            res.status(404).send('error /get temps')
        })   
})

app.delete('/dogs/delete/:id', async(req,res,next)=>{
    let {id} = req.params;
        try{
            await Dog.destroy({were:{id:id}})
            res.send('Perro eliminado correctamente')
        } catch (e){
            res.status(404).send('error /delete id:')
        }
})

module.exports = app
