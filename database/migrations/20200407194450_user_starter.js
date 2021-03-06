
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => 
    {
        tbl.increments()
        tbl.string('username', 255).notNullable().unique()
        tbl.string('password', 255).notNullable()
        tbl.string('email', 180).notNullable().unique()
        tbl.string('name', 255)        
    })

    .createTable('strains', tbl => 
    {
        tbl.increments()
        tbl.string('strain_name', 255).notNullable().unique()
        tbl.string('strain_type')
        tbl.string('product_type')
        tbl.binary('image')   
    })
    .createTable('user_strains', tbl => 
    {   
        tbl.increments()
        tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.integer('strain_id').unsigned().references('id').inTable('strains').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.boolean('favorite').defaultTo(false)
    })
    .createTable('effects', tbl => 
    {   
        tbl.increments()
        tbl.string('feeling', 180).notNullable()
        tbl.boolean('negative_effect').defaultTo(false)
        tbl.integer('user_strain_id').unsigned().references('id').inTable('user_strains').onDelete('CASCADE').onUpdate('CASCADE')
    })
    .createTable('sessions', tbl =>
    {
        tbl.increments()
        tbl.string('session_name', 255).notNullable()
        tbl.date('session_date')
        tbl.float('dose_size', [6, 3])
        tbl.string('dose_type')
        tbl.string('notes', 10000)
        tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')  
        tbl.integer('strain_id').unsigned().references('id').inTable('strains').onDelete('CASCADE').onUpdate('CASCADE')  
    })
    .createTable('categories', tbl => 
    {
        tbl.increments()
        tbl.string('category_name')
        tbl.integer('user_strain_id').unsigned().references('id').inTable('user_strains').onDelete('CASCADE').onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('categories')
        .dropTableIfExists('effects')
        .dropTableIfExists('user_strains')
        .dropTableIfExists('sessions')
        .dropTableIfExists('strains')
        .dropTableIfExists('users')
};
