module.exports = app => {
    const { INTEGER, STRING,DATE } = app.Sequelize;
    const WorkOrderMessageModel = app.model.define('message', {
        message_id: { type: INTEGER, 
            primaryKey: true,
            allowNull:false,
            autoIncrement:true 
        },
        workorder_id: INTEGER(10),
        is_admin: {
            type: INTEGER,
            allowNull: false,
        },      
        content: STRING(2000),
        created_at:DATE,
        updated_at:DATE
    }, {
        timestamps: true,
        tableName: 'message',
    }
    );
    app.model.WorkOrderMessageModel = WorkOrderMessageModel;
    return WorkOrderMessageModel;
};
