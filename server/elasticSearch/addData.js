const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();

module.exports =  insertData = async (array, tabel, single) => {

    const client = new Client({
    cloud: {
        id: process.env.SEARCH_ID,
    },
    auth: {
        username: process.env.SEARCH_USERNAME,
        password: process.env.SEARCH_PASSWORD,
    },
    });

    const body = array.flatMap(doc =>
        [{ index: { _index: tabel, _type: single } }, doc ]
        )
        const { body: bulkResponse } = await client.bulk({ refresh: true, body });
        if (bulkResponse.errors) {
            return res.json(bulkResponse.errors)
        }
        const { body: count } = await client.count({ index: tabel });
        return count
    }
    
    
    // const postByIndex = async (index, body) => {
    //   try {
    //     await client.index({
    //       index: index,
    //       body: body,
    //     });
    
    //     return { success: true };
    //   } catch (e) {
    //     console.log(e);
    //     return { success: false, message: e };
    //   }
// };
