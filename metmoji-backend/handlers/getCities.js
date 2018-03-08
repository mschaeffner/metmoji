import axios from 'axios'
import ServiceError from '../lib/ServiceError'
import { success, failure } from '../lib/httpResponseUtils'


const getData = async (event) => {

  if(event.pathParameters.name.length < 3) {
    throw new ServiceError(`Name parameter must be at least 3 characteres`, 400)
  }

  const name = event.pathParameters.name.toLowerCase()

  // fetch from S3 bucket via cloudfront
  const key = name.charCodeAt(0) + '-' + name.charCodeAt(1) + '-' + name.charCodeAt(2) + '.json'
  const response = await axios.get('https://d19wo8ainzsn96.cloudfront.net/' + key)

  // filter list by requested name
  const filteredList = response.data.filter(city => city.n.toLowerCase().startsWith(name))
  return filteredList
}


export function main(event, context, callback) {
  getData(event)
    .then(result => {
      callback(null, success(result))
    })
    .catch(err => {
      console.error(err)
      callback(null, failure(err))
    })
}
