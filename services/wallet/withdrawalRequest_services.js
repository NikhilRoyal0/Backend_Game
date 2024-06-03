const dbConnection=require('../../db/dataMain')


module.exports.getAllWithdrawRequest=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM withdrawal_requests');
return data;
}

module.exports.getRequestByUserId = async (user_id) => {
    const [data] = await dbConnection.query('SELECT * FROM withdrawal_requests WHERE user_id = ?', [user_id]);
    return data;
}

module.exports.newWithdrawRequest=async(withdrawRequest)=>{
    const [data]=await dbConnection.query('INSERT INTO withdrawal_requests SET ?',withdrawRequest)
    return data;
}

module.exports.deleteWithdrawRequest=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM withdrawal_requests WHERE withdrawal_id=?',[id])
    return data;
}

module.exports.updateWithdrawRequest = async (withdrawal_id, withdrawRequestData) => {
    const query = "UPDATE withdrawal_requests SET ? WHERE withdrawal_id = ?";
    const [data] = await dbConnection.query(query, [withdrawRequestData, withdrawal_id]);
    return data;
};
