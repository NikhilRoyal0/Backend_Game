const dbConnection=require('../../db/dataMain')


module.exports.getAllCategories=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_categories');
return data;
}

module.exports.addCategory=async(category)=>{
    const [data]=await dbConnection.query('INSERT INTO game_categories SET ?',category)
    return data;
}

module.exports.deleteCategory=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_categories WHERE category_id=?',[id])
    return data;
}

module.exports.updateCategory = async (category_id, CategoryData) => {
    const query = "UPDATE game_categories SET ? WHERE category_id = ?";
    const [data] = await dbConnection.query(query, [CategoryData, category_id]);
    return data;
};
