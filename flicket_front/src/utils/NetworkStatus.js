export function isInformational(code) {
  return code >= 100 && code <= 199;
}

export function isSuccess(code) {
  return code >= 200 && code <= 299;
}

export function isRedirect(code) {
  return code >= 300 && code <= 399;
}

export function isClientError(code) {
  return code >= 400 && code <= 499;
}
