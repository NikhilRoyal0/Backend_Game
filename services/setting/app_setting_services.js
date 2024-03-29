const dbConnection=require('../../db/dataMain')


module.exports.getAllSetting=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_app_settings');
return data;
}

module.exports.insertSetting=async(setting)=>{
    const [data]=await dbConnection.query('INSERT INTO game_app_settings SET ?',setting)
    return data;
}

module.exports.deleteSetting=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_app_settings WHERE setting_id=?',[id])
    return data;
}

module.exports.updateSetting = async (setting_id, settingData) => {
    const query = "UPDATE game_app_settings SET ? WHERE setting_id = ?";
    const [data] = await dbConnection.query(query, [settingData, setting_id]);
    return data;
};
