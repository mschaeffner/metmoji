import ServiceError from './ServiceError'


export function success(result) {
  return buildResponse(result, 200)
}

export function failure(err) {
  if (err instanceof ServiceError) {
    return buildResponse(err.message, err.statusCode)
  } else {
    return buildResponse("Server error", 500)
  }
}

function buildResponse(body, statusCode) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  }
}
