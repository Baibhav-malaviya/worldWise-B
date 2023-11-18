| Status Code | Meaning                                   | Description                                      |
|-------------|-------------------------------------------|--------------------------------------------------|
| 200         | OK                                        | The request was successful.                      |
| 201         | Created                                   | The request has been fulfilled and a new resource has been created. |
| 204         | No Content                                | The server successfully processed the request, but there is no content to send. |
| 400         | Bad Request                               | The request cannot be fulfilled due to bad syntax or other client-side error. |
| 401         | Unauthorized                              | The request lacks valid authentication credentials. |
| 403         | Forbidden                                 | The server understood the request, but refuses to authorize it. |
| 404         | Not Found                                 | The requested resource could not be found on the server. |
| 405         | Method Not Allowed                        | The method specified in the request is not allowed for the resource. |
| 409         | Conflict                                  | Indicates that the request could not be completed due to a conflict with the current state of the target resource. |
| 500         | Internal Server Error                     | A generic error message returned when an unexpected condition was encountered. |
| 502         | Bad Gateway                               | The server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in attempting to fulfill the request. |
| 503         | Service Unavailable                       | The server is currently unable to handle the request due to temporary overloading or maintenance of the server. |


|Response with a suitable status code and an error/success message |
|res.status(500).json({ error/success: "Internal server error" });// It will always in json format with an key error or success.