const dbConnection=require('../../db/dataMain')


module.exports.getAllBankAccounts=async()=> {
    const [data] =await dbConnection.query('SELECT * FROM game_bank_accounts');
return data;
}

module.exports.addBankAccount=async(bank)=>{
    const [data]=await dbConnection.query('INSERT INTO game_bank_accounts SET ?',bank)
    return data;
}

module.exports.deleteBankAccount=async(id)=>{
    const [data]=await dbConnection.query('DELETE FROM game_bank_accounts WHERE bank_id=?',[id])
    return data;
}

module.exports.updateBankAccount = async (bank_id, bankAccountData) => {
    const query = "UPDATE game_bank_accounts SET ? WHERE bank_id = ?";
    const [data] = await dbConnection.query(query, [bankAccountData, bank_id]);
    return data;
};
