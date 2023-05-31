
module.exports = app => {
    const { INTEGER, STRING } = app.Sequelize;
    const PostPhotoModel = app.model.define('photo', {
        photo_id: { 
            type: INTEGER, 
            primaryKey: true,            
            allowNull:false,
            autoIncrement:true  },
        post_id: {
            allowNull:false,
            type:INTEGER
        },
        url: STRING(200),
    }, {
        timestamps: true,
        tableName: 'photo',
    }
    );
    app.model.PostPhotoModel = PostPhotoModel;
    return PostPhotoModel;
};
