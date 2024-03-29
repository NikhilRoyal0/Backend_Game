const dbConnection=require('../../db/dataMain')


module.exports.getAllRechargeRequest=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM recharge_requests');
return data;
}

module.exports.newRechargeRequest=async(rechargeRequest)=>{
    const [data]=await dbConnection.query('INSERT INTO recharge_requests SET ?',rechargeRequest)
    return data;
}

module.exports.deleteRechargeRequest=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM recharge_requests WHERE recharge_id=?',[id])
    return data;
}

module.exports.updateRechargeRequest = async (recharge_id, rechargeRequestData) => {
    const query = "UPDATE recharge_requests SET ? WHERE recharge_id = ?";
    const [data] = await dbConnection.query(query, [rechargeRequestData, recharge_id]);
    return data;
};
