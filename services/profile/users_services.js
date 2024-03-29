const dbConnection=require('../../db/dataMain')


module.exports.getAllUsers=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_users');
return data;
}

module.exports.addUser=async(users)=>{
    const [data]=await dbConnection.query('INSERT INTO game_users SET ?',users)
    return data;
}

module.exports.deleteUser=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_users WHERE user_id=?',[id])
    return data;
}

module.exports.updateUser = async (user_id, usersData) => {
    const query = "UPDATE game_users SET ? WHERE user_id = ?";
    const [data] = await dbConnection.query(query, [usersData, user_id]);
    return data;
};
