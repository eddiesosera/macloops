import React from "react";
import { useLocation } from "react-router-dom";

export const ProductPage = () => {
  // Declaring all variables
  const navigate = useLocation()


  console.log(navigate.pathname)

  // Get the full URL
  var url = "http://localhost:3000/page?param1=value1&param2=value2";

  // Parse the URL to extract the query string
  var queryString = url?.split('?')[1];

  // Split the query string into an array of parameter-value pairs
  var params = queryString?.split('&');

  // Create an object to store the parameter-value pairs
  var paramMap = {};

  // Loop through each parameter-value pair and store it in the paramMap object
  for (var i = 0; i < params?.length; i++) {
    var param = params[i]?.split('=');
    var paramName = decodeURIComponent(param[0]);
    var paramValue = decodeURIComponent(param[1]);
    paramMap[paramName] = paramValue;
  }

  // Now you can access the parameter values using the paramMap object
  console.log(paramMap.param1); // Output: "value1"
  console.log(paramMap.param2); // Output: "value2"
  return <div>productPage</div>;
};
