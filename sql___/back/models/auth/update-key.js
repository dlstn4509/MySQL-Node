const { pool } = require('../../modules/mysql-init')
const { v4 } = require('uuid')

const updateKey = async (idx) => {
	let sql
	try {
		sql = `SELECT * FROM users_api WHERE fidx=?`
		let [rs] = await pool.execute(sql, [idx])
		if(rs.length === 1) sql = `UPDATE users_api SET apikey=? WHERE fidx=?`
		else sql = `INSERT INTO users_api SET apikey=?, fidx=?`
		
		let apikey = v4()
		let [rs2] = await pool.execute(sql, [apikey, idx])
		return rs2.affectedRows === 1 ? { success: true, apikey } : { success: false }
	}
	catch(err) {
		throw new Error(err)
	}
}

const updateDomain = async (domain, fidx) => {
	try {
		let sql = `UPDATE users_api SET domain=? WHERE fidx=?`
		const [rs] = await pool.execute(sql, [domain, fidx])
		return rs.affectedRows === 1
	}
	catch (err) {
		throw new Error(err)
	}
}

module.exports = { updateKey, updateDomain }