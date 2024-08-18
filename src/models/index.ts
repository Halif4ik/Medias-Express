const Sequelize = require("sequelize");
import {sequelize} from './indexDb'
import {Product,Cost,OldPrice} from './modelsDb';

export const db = {
    Sequelize : Sequelize,
    sequelize,
    posts : new Cost(sequelize, Sequelize),
    commits : new Product(sequelize, Sequelize),
    customers : new OldPrice(sequelize, Sequelize),
};

