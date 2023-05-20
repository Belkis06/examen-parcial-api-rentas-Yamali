const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, imagen, precio, direccion, camas, Baños
    FROM rentas LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(rentas){
  const result = await db.query(
    `INSERT INTO rentas 
    (imagen, precio, direccion, camas, Baños) 
    VALUES 
    ('${rentas.imagen}', '${rentas.precio}', '${rentas.direccion}', '${rentas.camas}', '${rentas.Baños}')`
  );

  let message = 'Error in creating rentas';

  if (result.affectedRows) {
    message = 'rentas created successfully';
  }

  return {message};
}
async function update(id, rentas){
  const result = await db.query(
    `UPDATE rentas 
    SET imagen="${rentas.imagen}", precio="${rentas.precio}", direccion="${rentas.direccion}", camas="${rentas.camas}", Baños="${rentas.Baños}" 
    WHERE id=${id}` 
  );

  let message = 'Error in updating rentas';

  if (result.affectedRows) {
    message = 'rentas updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM rentas WHERE id=${id}`
  );

  let message = 'Error in deleting rentas';

  if (result.affectedRows) {
    message = 'rentas deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}