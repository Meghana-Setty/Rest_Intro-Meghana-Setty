/*
* OVERVIEW: Implement a CalculatorService that supports the following http operations:
* 		GET /calculator/sum?op1=<num>&op2=<num>
*		POST /calculator/sum and response body is a json object {"op1":"<num1>","op2":"<num2>"}
*		
*		Both GET/POST opertions should return 200 code on success and the response body should be the
*		sum of the 2 numbers
*
* ERROR CASES: Handle all error cases including:
*		Any Url other than /calculator/sum should return 404. 
*		Return bad request if op1 and op2 are not numbers.

* NOTES: Ensure you are starting the nodejs http server by running node CalculatorHttpServer.js before running the tests.
*/

var http = require('http');
var querystring = require('querystring');
var PORT = 3000;

// Add your code to startup http server and process request here.
function handleRequest(request,response)
{
	var bodystr="";
	request.on('data',function(chunk)
		{
			bodystr+=chunk.toString();
		});
	request.on('end',function()
		{
			if(request.method=='GET')
			{
				var url_split=request.url.split('?');
				if(url_split[0]=='/calculator/sum')
				{
					var parameters=querystring.parse(url_split[1]);
					var num1=Number(parameters.op1);
					var num2=Number(parameters.op2);
					if(isNaN(num1)||isNaN(num2))
					{
						response.statusCode=500;
						response.statusMessage="Bad Request";
					}
					else
					{
						response.statusCode=200;
						response.statusMessage="OK";
						response.end(String(num1+num2));
					}
				}
				else
				{
					response.statusCode=404;
					response.statusMessage="Not Found";
				}
			}	
			else if(request.method=='POST')
			{
				if(request.url!='/calculator/sum')
				{
					response.statusCode=404;
					response.statusMessage="Not Found";
				}
				else
				{
					if(bodystr!="")
					{
						var parameters=JSON.parse(bodystr);
						var num1=Number(parameters.op1);
						var num2=Number(parameters.op2);
						if(isNaN(num1)||isNaN(num2))
					{
						response.statusCode=500;
						response.statusMessage="Bad Request";
					}
					else
					{
						response.statusCode=200;
						response.statusMessage="OK";
						response.end(String(num1+num2));
					}
					}
				}
			}
		});
}

var server=http.createServer(handleRequest);
server.listen(PORT,function(){
	console.log("server is listening on port:"+PORT);
});
