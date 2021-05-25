import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { People } from './entities/People'
import { Planet } from './entities/Planet'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

//OBTIENE TODOS LOS PERSONAJES
export const getPeoples = async (req: Request, res: Response): Promise<Response> =>{
		const peoples = await getRepository(People).find();
		return res.json(peoples);
}

//OBTIENE UN PERSONAJE POR ID
export const getOnePeople = async (req: Request, res: Response): Promise<Response> =>{
        const people = await getRepository(People).findOne(req.params.id_people);
        if(!people) throw new Exception("People not exist");
		return res.json(people);
}

//CREA UN PERSONAJE
export const createPeople = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.name) throw new Exception("Please provide a name")

	const peopleRepo = getRepository(People)
	// fetch for any user with this email
	const people = await peopleRepo.findOne({ where: {name: req.body.name }})
	if(people) throw new Exception("People already exists with this name")

	const newPeople = getRepository(People).create(req.body); 
	const results = await getRepository(People).save(newPeople);
	return res.json(results);
}

//OBTIENE TODOS LOS PLANETAS
export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
		const planets = await getRepository(Planet).find();
		return res.json(planets);
}

//OBTIENE UN PLANETA POR ID
export const getOnePlanet = async (req: Request, res: Response): Promise<Response> =>{
        const planet = await getRepository(Planet).findOne(req.params.id_planet);
        if(!planet) throw new Exception("Planet not exist");
		return res.json(planet);
}

//CREA UN PLANETA
export const createPlanet = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.name) throw new Exception("Please provide a name")

	const planetRepo = getRepository(Planet)
	// fetch for any user with this email
	const planet = await planetRepo.findOne({ where: {name: req.body.name }})
	if(planet) throw new Exception("Planet already exists with this name");

	const newPlanet = getRepository(Planet).create(req.body); 
	const results = await getRepository(Planet).save(newPlanet);
	return res.json(results);
}