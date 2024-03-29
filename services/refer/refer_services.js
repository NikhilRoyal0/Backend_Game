const dbConnection=require('../../db/dataMain')


module.exports.getAllRefers=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_refer_team');
return data;
}

module.exports.newRefer=async(refer)=>{
    const [data]=await dbConnection.query('INSERT INTO game_refer_team SET ?',refer)
    return data;
}

module.exports.deleteRefer=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_refer_team WHERE team_id=?',[id])
    return data;
}

module.exports.updateRefer = async (team_id, referData) => {
    const query = "UPDATE game_refer_team SET ? WHERE team_id = ?";
    const [data] = await dbConnection.query(query, [referData, team_id]);
    return data;
};
