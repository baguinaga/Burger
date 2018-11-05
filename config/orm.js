const connection = require("../config/connection.js");

function printQuestionMarks(num) {
  return (",?".repeat(num).replace(/(^,)|(,$)/g, ""));
}

function objToSql(obj) {
  const arr = [];

  for (const key in obj) {
    let value = obj[key];
    if (Object.hasOwnProperty.call(obj, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

const orm = {
  all: function (tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      
      cb(result);
    });
  },
  create: function (table, cols, vals, cb) {
    const queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)});`;
    
    console.log(queryString);
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  update: function (table, objColVals, condition, cb) {
    let queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition};`;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  delete: function (table, condition, cb) {
    const queryString = `DELETE FROM ${table} WHERE ${condition};`;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

module.exports = orm;
