import ServiceError from './ServiceError'


export function success(result) {
  return buildResponse(result, 200)
}

export function successJson(json) {
  return buildResponse(result, 200, true)
}

export function failure(err) {
  if (err instanceof ServiceError) {
    return buildResponse(err.message, err.statusCode)
  } else {
    return buildResponse("Server error", 500)
  }
}

function buildResponse(body, statusCode, isAlreadyJsonString=false) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: isAlreadyJsonString ? body : JSON.stringify(body)
  }
}
