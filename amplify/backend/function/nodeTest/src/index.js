const getItem = require('./tableInfo');


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const data = await getItem()
    try {
        const data = await getItem()
        return { body: JSON.stringify(data) }
      } catch (err) {
        return { error: err }
      }
};
