import { Request, Response } from 'express'
import { getRepository, ObjectLiteral } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { People } from './entities/People'
import { Planet } from './entities/Planet'
import jwt from 'jsonwebtoken'
import { Favorite } from './entities/Favorite'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

//OBTIENE UN USUARIO POR ID
export const getOneUser = async (req: Request, res: Response): Promise<Response> => {
    const user = await getRepository(Users).findOne(req.params.id_user);
    if (!user) throw new Exception("User not exist");
    return res.json(user);
}

//OBTIENE TODOS LOS PERSONAJES
export const getPeoples = async (req: Request, res: Response): Promise<Response> => {
    const peoples = await getRepository(People).find();
    return res.json(peoples);
}

//OBTIENE UN PERSONAJE POR ID
export const getOnePeople = async (req: Request, res: Response): Promise<Response> => {
    const people = await getRepository(People).findOne(req.params.id_people);
    if (!people) throw new Exception("People not exist");
    return res.json(people);
}

//CREA UN PERSONAJE
export const createPeople = async (req: Request, res: Response): Promise<Response> => {

    //VALIDO QUE EL BODY NO VENGA VACIO
    if(!req.body.length) throw new Exception("Please provide a body");
    const peopleRepo = getRepository(People);
    //RECORRO UNO A UNO LOS PERSONAJES DEL BODY
    for(let i=0; i<req.body.length; i++){
        //VALIDO QUE EL PERSONAJE DE LA POSICION i TENGA UN NOMBRE Y UNA DESCRIPCION
        if (!req.body[i].name) throw new Exception("Please provide a name");
        if (!req.body[i].description) throw new Exception("Please provide a description");
        //VALIDO QUE EL NOMBRE DEL PERSONAJE NO EXISTA EN LA BASE DE DATOS
        const people = await peopleRepo.findOne({ where: { name: req.body[i].name } });
        if (people) throw new Exception("People already exists with this name: "+req.body[i].name);
        //SI NO HAY ERRORES CREO EL NUEVO PERSONAJE CON LOS DATOS DE LA POSICION
        const newPeople = getRepository(People).create(req.body[i]);
        //GUARDO EN LA BASE DE DATOS EL PERSONAJE CREADO
        const results = await getRepository(People).save(newPeople);
    }
    return res.json({"message":"Peoples created"});
}

//OBTIENE TODOS LOS PLANETAS
export const getPlanets = async (req: Request, res: Response): Promise<Response> => {
    const planets = await getRepository(Planet).find();
    return res.json(planets);
}

//OBTIENE UN PLANETA POR ID
export const getOnePlanet = async (req: Request, res: Response): Promise<Response> => {
    const planet = await getRepository(Planet).findOne(req.params.id_planet);
    if (!planet) throw new Exception("Planet not exist");
    return res.json(planet);
}

//CREA UN PLANETA
export const createPlanet = async (req: Request, res: Response): Promise<Response> => {

    //VALIDO QUE EL BODY NO VENGA VACIO
    if(!req.body.length) throw new Exception("Please provide a body");
    const planetRepo = getRepository(Planet);
    //RECORRO UNO A UNO LOS PERSONAJES DEL BODY
    for(let i=0; i<req.body.length; i++){
        //VALIDO QUE EL PERSONAJE DE LA POSICION i TENGA UN NOMBRE Y UNA DESCRIPCION
        if (!req.body[i].name) throw new Exception("Please provide a name");
        if (!req.body[i].description) throw new Exception("Please provide a description");
        //VALIDO QUE EL NOMBRE DEL PERSONAJE NO EXISTA EN LA BASE DE DATOS
        const planet = await planetRepo.findOne({ where: { name: req.body[i].name } });
        if (planet) throw new Exception("Planet already exists with this name: "+req.body[i].name);
        //SI NO HAY ERRORES CREO EL NUEVO PERSONAJE CON LOS DATOS DE LA POSICION
        const newPlanet = getRepository(Planet).create(req.body[i]);
        //GUARDO EN LA BASE DE DATOS EL PERSONAJE CREADO
        const results = await getRepository(Planet).save(newPlanet);
    }
    return res.json({"message":"Planets created"});
}

//LOGIN- DEVUELVE UN TOKEN DE AUTORIZACION AL USUARIO
export const login = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Please specify an email on your request body", 400);
    if (!req.body.password) throw new Exception("Please specify a password on your request body", 400);

    const userRepo = await getRepository(Users);
    const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password } });
    if (!user) throw new Exception("Invalid email or password", 401);

    const token = jwt.sign({ user }, process.env.JWT_KEY as string);
    return res.json({ user, token });
}

//OBTIENE TODOS LOS FAVORITOS DE UN USUARIO
export const getFavorites = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(Users);
    const user_id = (req.user as ObjectLiteral).user.id;
    const user = await userRepo.findOne(user_id);
    const favorites = await getRepository(Favorite).find({ where: { user: user }, relations: ['people', 'planet']});
    return res.json(favorites);
}

//AGREGA UN PERSONAJE A FAVORITOS
export const addPeopleFavorite = async (req: Request, res: Response): Promise<Response> => {
    const peopleRepo = getRepository(People);
    const userRepo = getRepository(Users);
    const favoriteRepo = getRepository(Favorite);
    const user_id = (req.user as ObjectLiteral).user.id;
    const people = await peopleRepo.findOne(req.params.people_id);
    const user = await userRepo.findOne(user_id);
    const fav = await favoriteRepo.findOne({ where: {people: people, user:user} });
    if(!people) throw new Exception("Not People found");
    if(!user) throw new Exception("Not User found");
    if(fav) throw new Exception("Favorite already exists");

    const favorite = new Favorite();
    favorite.user = user;
    favorite.people = people;
    const newFavorite = getRepository(Favorite).create(favorite);  //Creo el favorito
    const results = await getRepository(Favorite).save(newFavorite); //Grabo el nuevo favorito
    return res.json(results);
}

//AGREGA UN PLANETA A FAVORITOS
export const addPlanetFavorite = async (req: Request, res: Response): Promise<Response> => {
    const planetRepo = getRepository(Planet);
    const userRepo = getRepository(Users);
    const favoriteRepo = getRepository(Favorite);
    const user_id = (req.user as ObjectLiteral).user.id;
    const planet = await planetRepo.findOne(req.params.planet_id);
    const user = await userRepo.findOne(user_id);
    const fav = await favoriteRepo.findOne({ where: {planet: planet, user:user} });
    if(!planet) throw new Exception("Not Planet found");
    if(!user) throw new Exception("Not User found");
    if(fav) throw new Exception("Favorite already exists");

    const favorite = new Favorite();
    favorite.user = user;
    favorite.planet = planet;
    const newFavorite = getRepository(Favorite).create(favorite);  //Creo el favorito
    const results = await getRepository(Favorite).save(newFavorite); //Grabo el nuevo favorito
    return res.json(results);
}

//BORRA PERSONAJE FAVORITO
export const deletePeopleFavorite = async (req: Request, res: Response): Promise<Response> => {
    const peopleRepo = getRepository(People);
    const userRepo = getRepository(Users);
    const favoriteRepo = getRepository(Favorite);
    const user_id = (req.user as ObjectLiteral).user.id;
    const people = await peopleRepo.findOne(req.params.people_id);
    const fav = await favoriteRepo.findOne({ where: {people: people} });
    const user = await userRepo.findOne(user_id);
    if(!people) throw new Exception("Not People found");
    if(!user) throw new Exception("Not User found");
    if(!fav) throw new Exception("Favorite not exists");

    const result = await getRepository(Favorite).delete(fav.id);
    return res.json(result);
}

//BORRA PLANETA FAVORITO
export const deletePlanetFavorite = async (req: Request, res: Response): Promise<Response> => {
    const planetRepo = getRepository(Planet);
    const userRepo = getRepository(Users);
    const favoriteRepo = getRepository(Favorite);
    const user_id = (req.user as ObjectLiteral).user.id;
    const planet = await planetRepo.findOne(req.params.planet_id);
    const fav = await favoriteRepo.findOne({ where: {planet: planet} });
    const user = await userRepo.findOne(user_id);
    if(!planet) throw new Exception("Not Planet found");
    if(!user) throw new Exception("Not User found");
    if(!fav) throw new Exception("Favorite not exists");

    const result = await getRepository(Favorite).delete(fav.id);
    return res.json(result);
}
