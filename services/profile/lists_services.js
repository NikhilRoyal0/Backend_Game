const dbConnection=require('../../db/dataMain')


module.exports.getGameList=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_list');
return data;
}

module.exports.addGameList=async(game)=>{
    const [data]=await dbConnection.query('INSERT INTO game_list SET ?',game)
    return data;
}

module.exports.deleteGameList=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_list WHERE game_id=?',[id])
    return data;
}

module.exports.updateGameList = async (game_id, gameData) => {
    const query = "UPDATE game_list SET ? WHERE game_id = ?";
    const [data] = await dbConnection.query(query, [gameData, game_id]);
    return data;
};
