const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' 
});


const Class = sequelize.define('Class', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Model pro žáka
const Student = sequelize.define('Student', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


const Grade = sequelize.define('Grade', {
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
});


Class.hasMany(Student);
Student.belongsTo(Class);
Student.hasMany(Grade);
Grade.belongsTo(Student);


(async () => {
    await sequelize.sync();
})();

module.exports = { Class, Student, Grade, sequelize };
