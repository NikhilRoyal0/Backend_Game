const dbConnection=require('../../db/dataMain')


module.exports.getAllPlayRecords=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM gameplay_records');
return data;
}

module.exports.newPlayRecord=async(playRecords)=>{
    const [data]=await dbConnection.query('INSERT INTO gameplay_records SET ?',playRecords)
    return data;
}

module.exports.deletePlayRecord=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM gameplay_records WHERE play_record_id=?',[id])
    return data;
}

module.exports.updatePlayRecord = async (play_record_id, playRecordsData) => {
    const query = "UPDATE gameplay_records SET ? WHERE play_record_id = ?";
    const [data] = await dbConnection.query(query, [playRecordsData, play_record_id]);
    return data;
};
