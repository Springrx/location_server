module.exports = app => {
    const { INTEGER, STRING, } = app.Sequelize;
    const UserInfoModel = app.model.define('user', {
        user_id: {type: INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, },
        username: {
            type: STRING(16),
            allowNull: false,
            },
        password: {
            type: STRING(16),
            allowNull: false,
            },
        avatar_url: {
            type:STRING(45),
            defaultValue: 'https://www.y-droid.com/userStudy/ava.png',
        },
        is_manager: {
            type: INTEGER,
            allowNull: false,
        },
        }, 
        {
        timestamps: true,
        tableName: 'user',
    }
    );
    app.model.UserInfoModel = UserInfoModel;
    return UserInfoModel;
};