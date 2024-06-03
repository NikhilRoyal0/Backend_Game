const dbConnection=require('../../db/dataMain')


module.exports.getWalletHistory=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM color_game_wallet_history');
return data;
}

module.exports.getWallethistoryByUserId = async (user_id) => {
    const [data] = await dbConnection.query('SELECT * FROM color_game_wallet_history WHERE user_id = ?', [user_id]);
    return data;
}

module.exports.newWalletHistory=async(walletHistory)=>{
    const [data]=await dbConnection.query('INSERT INTO color_game_wallet_history SET ?',walletHistory)
    return data;
}

module.exports.deleteWalletHistory=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM color_game_wallet_history WHERE wallet_id=?',[id])
    return data;
}

module.exports.updateWalletHistory = async (wallet_id, walletHistoryData) => {
    const query = "UPDATE color_game_wallet_history SET ? WHERE wallet_id = ?";
    const [data] = await dbConnection.query(query, [walletHistoryData, wallet_id]);
    return data;
};
