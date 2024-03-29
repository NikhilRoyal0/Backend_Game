const dbConnection=require('../../db/dataMain')


module.exports.getAllUpiList=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_upi_list');
return data;
}

module.exports.addUpi=async(upi)=>{
    const [data]=await dbConnection.query('INSERT INTO game_upi_list SET ?',upi)
    return data;
}

module.exports.deleteUpi=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_upi_list WHERE upi_id=?',[id])
    return data;
}

module.exports.updateUpi = async (user_id, usersData) => {
    const query = "UPDATE game_upi_list SET ? WHERE upi_id = ?";
    const [data] = await dbConnection.query(query, [usersData, user_id]);
    return data;
};
