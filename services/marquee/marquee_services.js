const dbConnection=require('../../db/dataMain')


module.exports.getAllMarquee=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_marquee');
return data;
}

module.exports.insertMarquee=async(marquee)=>{
    const [data]=await dbConnection.query('INSERT INTO game_marquee SET ?',marquee)
    return data;
}

module.exports.deleteMarquee=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_marquee WHERE marquee_id=?',[id])
    return data;
}

module.exports.updateMarquee = async (marquee_id, marqueeData) => {
    const query = "UPDATE game_marquee SET ? WHERE marquee_id = ?";
    const [data] = await dbConnection.query(query, [marqueeData, marquee_id]);
    return data;
};
