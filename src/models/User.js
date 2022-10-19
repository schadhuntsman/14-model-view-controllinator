const sequelize = require('../config/connection');
const { STRING, DataTypes } = require("sequelize");
const { Model } = require("sequelize/types");
const bcrypt = require('bcrypt');
// const { init, beforeCreate, beforeSync, beforeUpdate, update } = require("./Post");

class User extends Model {
    //set method to run a instance data (per user) to check password
    checkPassword(loginPasword) {
        return bcrypt.compareSync(loginPasword, this.password)
    }
}
    //username and password attributes
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                AutoIncrement: true
            },

            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                DataTypes: STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },

            password: {
                DataTypes: STRING,
                allowNull: false,
                validate: {
                    len: [4, 15]
                }
            }

        },
    
{
    hooks: {
        async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 14);
        return newUser;
        },

        async beforeUpdate(updateUser) {
            updateUser.password = await bcrypt.hash(updateUser.password, 14);
            return updateUser
        }
    },

    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'user'
}
);

module.exports = User;




