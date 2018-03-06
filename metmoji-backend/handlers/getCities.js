import ServiceError from '../lib/ServiceError'
import { successJson, failure } from '../lib/httpResponseUtils'


const getData = async (event) => {

  if(!event.queryStringParameters) {
    throw new ServiceError(`Name parameter required`, 400)
  }

  const name = event.queryStringParameters.name
  if(name.length < 3) {
    throw new ServiceError(`Name parameter must be at least 3 characteres`, 400)
  }

  const key = name.toLowerCase().charCodeAt(0)
    + '-' + name.toLowerCase().charCodeAt(1)
    + '-' + name.toLowerCase().charCodeAt(2)
    + '.json'

  const response = await axios.get('https://d19wo8ainzsn96.cloudfront.net/' + key)
  return response.data
}


export function main(event, context, callback) {
  getData(event)
    .then(result => {
      callback(null, successJson(result))
    })
    .catch(err => {
      console.error(err)
      callback(null, failure(err))
    })
}
