module.exports = app => {
    const { INTEGER, STRING,DATE } = app.Sequelize;
    const CommentModel = app.model.define('comment', {
        comment_id: { type: INTEGER, 
            primaryKey: true,
            allowNull:false,
            autoIncrement:true 
        },
        post_id: INTEGER(10),
        user_id: INTEGER(10),
        text: STRING(2000),
        media_url: STRING(45),
        media_type: STRING(45),    
        created_at:DATE,
        updated_at:DATE
    }, {
        timestamps: true,
        tableName: 'comment',
    }
    );
    app.model.CommentModel = CommentModel;
    return CommentModel;
};
