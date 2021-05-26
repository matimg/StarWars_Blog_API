"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deletePlanetFavorite = exports.deletePeopleFavorite = exports.addPlanetFavorite = exports.addPeopleFavorite = exports.getFavorites = exports.login = exports.createPlanet = exports.getOnePlanet = exports.getPlanets = exports.createPeople = exports.getOnePeople = exports.getPeoples = exports.getOneUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var People_1 = require("./entities/People");
var Planet_1 = require("./entities/Planet");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Favorite_1 = require("./entities/Favorite");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
//OBTIENE UN USUARIO POR ID
var getOneUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id_user)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not exist");
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getOneUser = getOneUser;
//OBTIENE TODOS LOS PERSONAJES
var getPeoples = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var peoples;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).find()];
            case 1:
                peoples = _a.sent();
                return [2 /*return*/, res.json(peoples)];
        }
    });
}); };
exports.getPeoples = getPeoples;
//OBTIENE UN PERSONAJE POR ID
var getOnePeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.id_people)];
            case 1:
                people = _a.sent();
                if (!people)
                    throw new utils_1.Exception("People not exist");
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getOnePeople = getOnePeople;
//CREA UN PERSONAJE
var createPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var peopleRepo, i, people, newPeople, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //VALIDO QUE EL BODY NO VENGA VACIO
                if (!req.body.length)
                    throw new utils_1.Exception("Please provide a body");
                peopleRepo = typeorm_1.getRepository(People_1.People);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < req.body.length)) return [3 /*break*/, 5];
                //VALIDO QUE EL PERSONAJE DE LA POSICION i TENGA UN NOMBRE Y UNA DESCRIPCION
                if (!req.body[i].name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body[i].description)
                    throw new utils_1.Exception("Please provide a description");
                return [4 /*yield*/, peopleRepo.findOne({ where: { name: req.body[i].name } })];
            case 2:
                people = _a.sent();
                if (people)
                    throw new utils_1.Exception("People already exists with this name: " + req.body[i].name);
                newPeople = typeorm_1.getRepository(People_1.People).create(req.body[i]);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(newPeople)];
            case 3:
                results = _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, res.json({ "message": "Peoples created" })];
        }
    });
}); };
exports.createPeople = createPeople;
//OBTIENE TODOS LOS PLANETAS
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
//OBTIENE UN PLANETA POR ID
var getOnePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.id_planet)];
            case 1:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet not exist");
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getOnePlanet = getOnePlanet;
//CREA UN PLANETA
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetRepo, i, planet, newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //VALIDO QUE EL BODY NO VENGA VACIO
                if (!req.body.length)
                    throw new utils_1.Exception("Please provide a body");
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < req.body.length)) return [3 /*break*/, 5];
                //VALIDO QUE EL PERSONAJE DE LA POSICION i TENGA UN NOMBRE Y UNA DESCRIPCION
                if (!req.body[i].name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body[i].description)
                    throw new utils_1.Exception("Please provide a description");
                return [4 /*yield*/, planetRepo.findOne({ where: { name: req.body[i].name } })];
            case 2:
                planet = _a.sent();
                if (planet)
                    throw new utils_1.Exception("Planet already exists with this name: " + req.body[i].name);
                newPlanet = typeorm_1.getRepository(Planet_1.Planet).create(req.body[i]);
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).save(newPlanet)];
            case 3:
                results = _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, res.json({ "message": "Planets created" })];
        }
    });
}); };
exports.createPlanet = createPlanet;
//LOGIN- DEVUELVE UN TOKEN DE AUTORIZACION AL USUARIO
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
//OBTIENE TODOS LOS FAVORITOS DE UN USUARIO
var getFavorites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user_id, user, favorites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(Users_1.Users);
                user_id = req.user.user.id;
                return [4 /*yield*/, userRepo.findOne(user_id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).find({ where: { user: user }, relations: ['people', 'planet'] })];
            case 2:
                favorites = _a.sent();
                return [2 /*return*/, res.json(favorites)];
        }
    });
}); };
exports.getFavorites = getFavorites;
//AGREGA UN PERSONAJE A FAVORITOS
var addPeopleFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var peopleRepo, userRepo, favoriteRepo, user_id, people, user, fav, favorite, newFavorite, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                peopleRepo = typeorm_1.getRepository(People_1.People);
                userRepo = typeorm_1.getRepository(Users_1.Users);
                favoriteRepo = typeorm_1.getRepository(Favorite_1.Favorite);
                user_id = req.user.user.id;
                return [4 /*yield*/, peopleRepo.findOne(req.params.people_id)];
            case 1:
                people = _a.sent();
                return [4 /*yield*/, userRepo.findOne(user_id)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, favoriteRepo.findOne({ where: { people: people, user: user } })];
            case 3:
                fav = _a.sent();
                if (!people)
                    throw new utils_1.Exception("Not People found");
                if (!user)
                    throw new utils_1.Exception("Not User found");
                if (fav)
                    throw new utils_1.Exception("Favorite already exists");
                favorite = new Favorite_1.Favorite();
                favorite.user = user;
                favorite.people = people;
                newFavorite = typeorm_1.getRepository(Favorite_1.Favorite).create(favorite);
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).save(newFavorite)];
            case 4:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addPeopleFavorite = addPeopleFavorite;
//AGREGA UN PLANETA A FAVORITOS
var addPlanetFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetRepo, userRepo, favoriteRepo, user_id, planet, user, fav, favorite, newFavorite, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                userRepo = typeorm_1.getRepository(Users_1.Users);
                favoriteRepo = typeorm_1.getRepository(Favorite_1.Favorite);
                user_id = req.user.user.id;
                return [4 /*yield*/, planetRepo.findOne(req.params.planet_id)];
            case 1:
                planet = _a.sent();
                return [4 /*yield*/, userRepo.findOne(user_id)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, favoriteRepo.findOne({ where: { planet: planet, user: user } })];
            case 3:
                fav = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Not Planet found");
                if (!user)
                    throw new utils_1.Exception("Not User found");
                if (fav)
                    throw new utils_1.Exception("Favorite already exists");
                favorite = new Favorite_1.Favorite();
                favorite.user = user;
                favorite.planet = planet;
                newFavorite = typeorm_1.getRepository(Favorite_1.Favorite).create(favorite);
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite).save(newFavorite)];
            case 4:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addPlanetFavorite = addPlanetFavorite;
//BORRA PERSONAJE FAVORITO
var deletePeopleFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var peopleRepo, userRepo, favoriteRepo, user_id, people, fav, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                peopleRepo = typeorm_1.getRepository(People_1.People);
                userRepo = typeorm_1.getRepository(Users_1.Users);
                favoriteRepo = typeorm_1.getRepository(Favorite_1.Favorite);
                user_id = req.user.user.id;
                return [4 /*yield*/, peopleRepo.findOne(req.params.people_id)];
            case 1:
                people = _a.sent();
                return [4 /*yield*/, favoriteRepo.findOne({ where: { people: people } })];
            case 2:
                fav = _a.sent();
                return [4 /*yield*/, userRepo.findOne(user_id)];
            case 3:
                user = _a.sent();
                if (!people)
                    throw new utils_1.Exception("Not People found");
                if (!user)
                    throw new utils_1.Exception("Not User found");
                if (!fav)
                    throw new utils_1.Exception("Favorite not exists");
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite)["delete"](fav.id)];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deletePeopleFavorite = deletePeopleFavorite;
//BORRA PLANETA FAVORITO
var deletePlanetFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetRepo, userRepo, favoriteRepo, user_id, planet, fav, user, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                userRepo = typeorm_1.getRepository(Users_1.Users);
                favoriteRepo = typeorm_1.getRepository(Favorite_1.Favorite);
                user_id = req.user.user.id;
                return [4 /*yield*/, planetRepo.findOne(req.params.planet_id)];
            case 1:
                planet = _a.sent();
                return [4 /*yield*/, favoriteRepo.findOne({ where: { planet: planet } })];
            case 2:
                fav = _a.sent();
                return [4 /*yield*/, userRepo.findOne(user_id)];
            case 3:
                user = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Not Planet found");
                if (!user)
                    throw new utils_1.Exception("Not User found");
                if (!fav)
                    throw new utils_1.Exception("Favorite not exists");
                return [4 /*yield*/, typeorm_1.getRepository(Favorite_1.Favorite)["delete"](fav.id)];
            case 4:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deletePlanetFavorite = deletePlanetFavorite;
