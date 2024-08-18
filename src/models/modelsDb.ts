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
   postId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
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
   postId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   yearId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   monthId: {allowNull: false, type: DataTypes.SMALLINT.UNSIGNED},
   costProduct: {allowNull: false, type: DataTypes.DOUBLE.UNSIGNED},

}, {sequelize, tableName: 'PostsList'});

OldPrice.hasMany(Product);
OldPrice.hasMany(Cost);


Cost.hasMany(Product, {as: 'Commits', foreignKey: 'post_id'});
Cost.belongsTo(OldPrice, {as: 'Customers', foreignKey: 'CustomerId'});

Product.belongsTo(Cost, {as: 'Posts', foreignKey: 'post_id'});
Product.belongsTo(OldPrice, {as: 'Customers', foreignKey: 'CustomerId'});
Product.belongsTo(Product, {foreignKey: 'children_comment_id', as: 'Parent'});
Product.hasMany(Product, {foreignKey: 'children_comment_id', as: 'Children'});
