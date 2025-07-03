class apiResponse {
  constructor(statusCode, data) {
    this.statusCode = statusCode
    this.message = "Success"
    this.data = data
    this.success = true
  }

}

module.exports=apiResponse