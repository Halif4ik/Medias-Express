import {DataTypes, Model} from 'sequelize'
import {sequelize} from './indexDb';

export class Product extends Model {
}

Product.init(
    {
       id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.SMALLINT.UNSIGNED,
       },
       name: {allowNull: false, type: DataTypes.STRING(500)},
       costsId: {allowNull: true, type: DataTypes.SMALLINT.UNSIGNED},
       oldPricesId: {allowNull: true, type: DataTypes.SMALLINT.UNSIGNED},
    },
    {
       sequelize,
       timestamps: true,
       tableName: 'product'
    }
);

export class OldPrice extends Model {
}
OldPrice.init({
   id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.SMALLINT.UNSIGNED
   },
   restProduct: {allowNull: false, unique: true, type: DataTypes.INTEGER.UNSIGNED},
   price: {allowNull: false, type: DataTypes.DOUBLE.UNSIGNED},
   yearId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   monthId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   prodId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   month: {
      allowNull: false,
      type: DataTypes.TINYINT.UNSIGNED
   },
   year: {
      allowNull: false,
      type: DataTypes.TINYINT.UNSIGNED
   },
}, {
   timestamps: true,
   sequelize: sequelize,
   tableName: 'old_price',
});

export class Cost extends Model {
}
Cost.init({
   id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.SMALLINT.UNSIGNED
   },
   prodId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   yearId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   monthId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   costProduct: {allowNull: false, type: DataTypes.DOUBLE.UNSIGNED},

}, {sequelize, tableName: 'PostsList'});

export class Year extends Model {
}
Year.init(
    {
       id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.TINYINT.UNSIGNED,
       },
       yearNumber: {allowNull: false, type: DataTypes.TINYINT.UNSIGNED},
       costsId: {allowNull: true, type: DataTypes.SMALLINT.UNSIGNED},
       oldPriceId: {allowNull: true, type: DataTypes.SMALLINT.UNSIGNED},
    },
    {
       sequelize,
       timestamps: true,
       tableName: 'year'
    }
);
/*
export class Month extends Model {
}
Month.init(
    {
       id: {
          primaryKey: true,
          autoIncrement: true,
          type: DataTypes.TINYINT.UNSIGNED,
       },
       monthNumber: {allowNull: false, type: DataTypes.TINYINT.UNSIGNED},
       costsId: {allowNull: true, type: DataTypes.SMALLINT.UNSIGNED},
       oldPriceId: {allowNull: true, type: DataTypes.SMALLINT.UNSIGNED},
    },
    {
       sequelize,
       timestamps: true,
       tableName: 'year'
    }
);*/

/*relations one to many Product-> OldPrice*/
Product.hasMany(OldPrice);
OldPrice.belongsTo(Product, {as: 'oldPrices', foreignKey: 'prodId'});
/*relations one to many Product-> Cost*/
Product.hasMany(Cost, {foreignKey: 'costsId'});
Cost.belongsTo(Product, {as: 'costs', foreignKey: 'prodId'});

/*oldPrice table*/
Year.hasMany(OldPrice,{foreignKey: 'oldPriceId'});
OldPrice.belongsTo(Year, { foreignKey: 'yearId'});
/*Month.hasMany(OldPrice,{foreignKey: 'oldPriceId'});
OldPrice.belongsTo(Month, {targetKey: 'id', foreignKey: 'monthId'});*/

/*cost tab*/
Year.hasMany(Cost,{foreignKey: 'costsId'});
Cost.belongsTo(Year, {foreignKey: 'yearId'});
/*Month.hasMany(Cost,{foreignKey: 'costsId'});
Cost.belongsTo(Month, {targetKey: 'id', foreignKey: 'monthId'});*/




