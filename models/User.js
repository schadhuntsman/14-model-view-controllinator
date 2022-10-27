const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


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
                unique: true,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [4, 15]
                },
            },

        },
    
{
    hooks: {
         beforeCreate: async (userDataNew) => {
        userDataNew.password = await bcrypt.hash(userDataNew.password, 14);
        return userDataNew;
        },

        beforeCreate: async (updatedUser) => {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 14);
            return updatedUser
        },
    },

    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;




