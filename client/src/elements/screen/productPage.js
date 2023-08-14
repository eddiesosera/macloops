import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PPInfo } from "../components/product_page/pp_info";
import { PPImageViewer } from "../components/product_page/pp_imagViewer";
import { PPSpecs } from "../components/product_page/pp_specs";

export const ProductPage = ({ product }) => {
  // Declaring all variables
  const navigate = useLocation()
  const navigateTo = useNavigate()


  console.log(navigate.pathname)

  // Get the full URL
  var url = "http://localhost:3000/product-page/64cda741ada6611bf071e13a";

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
  return (
    <div className="productPage_wrap" style={{ display: 'flex', gap: '40px', padding: '20px 60px' }}>
      <div className="pp_left_wrap" onClick={e => navigateTo(-1)} style={{ display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', padding: '12px', cursor: 'pointer' }}>
        <i class="ri-arrow-left-line" />
      </div>
      <div className="pp_mid_wrap" style={{ display: 'flex', gap: '20px' }}><PPInfo /><PPImageViewer /></div>
      <div className="pp_right_wrap"><PPSpecs /></div>

    </div>
  )
};
