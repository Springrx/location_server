module.exports = app => {
    const { INTEGER, STRING,DATE,DECIMAL } = app.Sequelize;
    const PostModel = app.model.define('post', {
        post_id: { type: INTEGER, 
            primaryKey: true,
            allowNull:false,
            autoIncrement:true 
        },
        user_id: INTEGER(10),
        // location:POINT,
        location_x:DECIMAL(8,5),
        location_y:DECIMAL(7,5),
        text: STRING(2000),
        video_url: STRING(45),       
        created_at:DATE,
        updated_at:DATE
    }, {
        timestamps: true,
        tableName: 'post',
    }
    );
    app.model.PostModel = PostModel;
    return PostModel;
};
