import AWS from 'aws-sdk'
import ServiceError from '../lib/ServiceError'
import { successJson, failure } from '../lib/httpResponseUtils'


//AWS.config.update({region: "us-east-1"})
const s3Client = new AWS.S3()
const BUCKET_NAME = 'metmoji-static-city-config'



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

  s3Client.getObject({ Bucket: BUCKET_NAME, Key: key}, (err, data) => {
    if (err) {
      throw new ServiceError(`No content found for this name`, 404)
    } else {
      return data.Body.toString('ascii')
    }
  })

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
