import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PPInfo } from "../components/product_page/pp_info";
import { PPImageViewer } from "../components/product_page/pp_imagViewer";
import { PPSpecs } from "../components/product_page/pp_specs";
import { SimilarPicks } from "../sections/similarPicks";
import { YouMayAlsoLike } from "../sections/you_may_also_like";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import { UserModeContext } from "../../App";
import { Form } from "../components/form";
import { DropDown } from "../components/dropDown";
import { PRating } from "../components/product_page/pp_rating";
import { ProductQuantity } from "../components/product_page/productQuantity";


export const ProductPage = ({ products, userObj }) => {
  // Declaring all variables
  const navigate = useLocation();
  const navigateTo = useNavigate();
  const url = navigate.pathname;
  const [queryProductId, setQueryProductId] = useState(url?.split("/"));
  const [productId, setProductId] = useState(queryProductId[2]);
  const [product, setProduct] = useState(JSON.parse(localStorage.getItem('last_prod_viewed')));
  const [userMode, setUserMode] = useContext(UserModeContext);
  const [pageState, setPageState] = useState('view-product');
  const [formData, setFormData] = useState({})
  const { id } = useParams();


  // console.log(navigate.pathname)


  // Product Info Section
  const [infoForm, setInfoForm] = useState({});
  const colors = {
    name: 'role',
    type: 'dropdown',
    placeholder: 'Select Color',
    list: [
      {
        option_element: <i className='ph-fill ph-circle' style={{ color: 'black' }} />,
        option_text: 'Black',
        option_value: 'black',
        option_state: true,
        option_valueTooltipText: ''
      }, {
        option_element: <i className='ph-fill ph-circle' style={{ color: 'white' }} />,
        option_text: 'White',
        option_value: 'white',
        option_state: true,
        option_valueTooltipText: ''
      },
      {
        option_element: <i className='ph-fill ph-circle' style={{ color: 'brown' }} />,
        option_text: 'Wooden Brown',
        option_value: 'wooden_brown',
        option_state: true,
        option_valueTooltipText: ''
      },
      {
        option_element: <i className='ph-fill ph-circle' style={{ color: 'red' }} />,
        option_text: 'Red',
        option_value: 'red',
        option_state: false,
        option_valueTooltipText: 'Out of Stock'
      }
    ],
  };

  // Delete Product
  const deleteProduct = () => {
    // alert(productInfo?._id)
    axios.delete('http://localhost:5000/api/product/' + product?._id)
      .then((res) => {
        navigateTo("/products")
      })
  };


  useEffect(() => {

    // Initialize Status Mode
    // pageState === "view-product" ? sessionStorage.setItem('product_page_mode', "view-product") : sessionStorage.setItem('product_page_mode', "edit-product")

    navigate.pathname?.split("/")[2] !== productId && setProductId(navigate.pathname?.split("/")[2])
    products.map(prdct => {
      JSON.parse(localStorage.getItem('last_prod_viewed')) === "" && JSON.parse(localStorage.setItem('last_prod_viewed', prdct))
      return (
        prdct?.id === productId && setProduct(prdct)
      );
    })

    pageState === undefined && setPageState("product");

    localStorage.setItem('last_prod_viewed', JSON.stringify(product))

    console.log("PRODUCT", product)

    alert(userMode + " pp")

  }, [
    productId,
    url,
    pageState,
    userMode
  ]);


  const getFormEditStockObj = (form) => {
    setFormData(form)
  };


  const productInfo = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '480px' }}>
        <Fade cascade damping={0.3}>
          <div className='info_group_1' style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>{product?.name}</div>
            <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '800', color: '#6F6D6A', textTransform: 'uppercase' }}>{product?.slogan}</div>
          </div>
          <div className='info_group_2' >
            <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '500' }}>By {product?.manufacturer}</div>
            <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '500', color: '#6F6D6A', }}>{product?.type}</div>
          </div>
          <div className='info_group_3'>
            <div style={{ fontSize: '16px', fontFamily: 'Nunito Sans', fontWeight: '800', color: '#13120F' }}>R {product?.price}</div>
            {/* <div style={{ fontSize: '24px', fontFamily: 'Nunito Sans' }}>{productInfo?.year}</div> */}
          </div>
          <div className='info_group_4'>
            <PRating p_rating={product?.rating} />
          </div>
        </Fade>
        <div className='info_group_5'>
          <DropDown placeholder={colors?.placeholder} options={colors?.list} selectedValue={(opt) => { setInfoForm({ ...infoForm, color: opt }) }} />
        </div>
        <div className='info_group_6'>
          <ProductQuantity />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className='info_group_7_interaction' style={{ display: 'flex', gap: '20px' }}>

            <button className='add_btn' style={{ display: 'flex', border: '0.75px solid #E9DCC3', padding: '0 18px', width: 'fit content', height: '40px', background: '#F9F4EA', color: '#875E0C', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <i className='ph-fill ph-shopping-cart-simple' style={{ fontSize: '20px' }} />
              <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>Add to Cart</div>
            </button>
            <div className='like_btn_wrap' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7E9EA', border: "solid 0.75px #E9C3C6", color: '#e50e21', height: '40px', width: "40px", cursor: 'pointer' }}><i className='ph-fill ph-heart' style={{ fontSize: '20px' }} /></div>
          </div>
          {
            // Only admins can access this section
            userObj?.role === "admin" && userMode === "admin" &&
            <div className='info_group_7_admin' style={{ display: 'flex', gap: '20px' }}>
              <button style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', color: "#2293B6",
                background: '#EAF6F9', border: '0.75px solid #C3E1E9', width: 'fit-content', height: "40px",
                padding: '0 20px', gap: "10px"
              }}
                onClick={e => { setPageState("edit-product"); }}
              >
                <i className='ph ph-pencil-simple' style={{ fontSize: '20px', }} />
                <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>Edit Product</div>
              </button>
              <button style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: '#2293B6', background: '#EAF6F9', border: '0.75px solid #C3E1E9',
                width: 'fit-content', height: "40px", padding: '0 20px', gap: '10px'
              }}
                onClick={e => deleteProduct()}>
                <i className='ph ph-trash' style={{ fontSize: '20px', }} />
                <div style={{ fontFamily: 'Nunito Sans', fontWeight: '600' }}>
                  Delete Product
                </div>
              </button>
            </div>
          }
        </div >
      </div >
    )
  };


  const returnProductPage = () => {
    return (
      <div className="productPage_wrap" style={{ background: '#FFFBF6 !important', paddingBottom: '40px' }}>
        <div className="productPage_comp" style={{ display: 'flex', flexDirection: 'column', gap: '120px', padding: '30px 60px 120px 60px', background: '#FFFBF6', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '40px', paddingBottom: '30px' }}>
            <div className="pp_left_wrap" onClick={e => navigateTo(-1)} style={{ display: 'flex', border: '1px solid #2d2e2f', color: '#2d2e2f', borderRadius: '50px', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
              <i class="ri-arrow-left-line" />
            </div>
            <div className="pp_mid_wrap" style={{ display: 'flex', gap: '40px', width: '100%' }}>
              <PPImageViewer productImages={product} />
              {/* <div> */}
              {/* <div className='p_comp_divider' style={{ borderRight: '1px solid #EDEAE6' }}></div> */}
              {/* <PPInfo productInfo={product} userMode={userMode} userObj={userObj} pagestate={editState()} /> */}
              {productInfo()}
              {/* </div> */}
            </div>
          </div>
          <div className="pp_right_wrap"><PPSpecs specs={product} /></div>
        </div>

        <hr style={{ padding: 0, width: '100%', border: "0", height: '0.5px', background: '#E9E6E1', marginTop: 0, marginBottom: '90px' }} />


        {/*Similar Picks Section */}
        <div style={{ background: '#FAF6F2', padding: '30px 60px', display: 'flex', flexDirection: 'column', gap: '60px' }}>

          <SimilarPicks similar_picks={products} />

          {/* More by Manufacturer Section */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'Montserrat', textTransform: 'uppercase', fontSize: '24px', fontWeight: '700', color: '#13120f', height: '45px' }}>More by {product?.manufacturer}</div>
                <button style={{ background: 'none', border: 'solid 1px #2293B6', color: '#2293B6', fontFamily: 'Montserrat', fontWeight: '600', padding: '0 20px' }}>View More</button>
              </div>
            </div>
            <YouMayAlsoLike may_like_products={products} />
          </div>

        </div>
      </div>
    )
  };


  const changePageState = () => {
    sessionStorage.setItem('product_page_mode', "view-product");
    alert(userMode)
  }


  const returnEditProduct = () => {
    return (
      <div style={{ width: '-webkit-fill-available', padding: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <div className="pp_left_wrap"
          onClick={e => { changePageState() }}
          style={{ position: 'absolute', marginLeft: '60px', left: '0', top: '100px', marginTop: '60px', display: 'flex', border: '1px solid #D9E2E5', borderRadius: '50px', background: '#FFFBF6', padding: '12px', height: 'fit-content', width: 'fit-content', cursor: 'pointer' }}>
          <i class="ph-bold ph-arrow-left" style={{ fontSize: '20px', color: '' }} />
        </div>
        <Form formFields={inputFields} preFillValue={product} heading={'Edit Instrument'} btnAction={editProductAction} btnTitle={'Edit Instrument'} formObj={getFormEditStockObj} />
      </div>
    )
  };


  // NEW STOCK FIELDS
  const inputFields = [
    {
      name: 'image_cover',
      type: 'single_image',
      maxNumber: 4,
      placeholder: 'Upload Cover',
      value: product?.image_cover
    },
    {
      name: 'images',
      type: 'multiple_image',
      maxNumber: 4,
      placeholder: 'Images',
      value: product?.images
    },
    {
      name: 'name',
      type: 'text',
      placeholder: 'Name of Instrument',
      value: product?.name
    },
    {
      name: 'category',
      type: 'dropdown',
      placeholder: 'Category of Instrument',
      list: [
        {
          option_element: '',
          option_text: 'Piano',
          option_value: 'piano',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Guitar',
          option_value: 'guitar',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Drums',
          option_value: 'drums',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Orchestral',
          option_value: 'orchestral',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Keyboard',
          option_value: 'keyboard',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Microphone',
          option_value: 'microphone',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Speaker',
          option_value: 'speaker',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'Synthesizer',
          option_value: 'synthesizer',
          option_state: true,
          option_valueTooltipText: ''
        }
      ],
      value: product?.category
    },
    {
      name: 'price',
      type: 'text',
      placeholder: 'Price',
      value: product?.price
    },
    {
      name: 'type',
      type: 'text',
      placeholder: 'Type of ' + (formData?.category === undefined ? 'Instrument' : formData?.category),
      value: product?.type
    },
    {
      name: 'manufacturer',
      type: 'text',
      placeholder: 'Manufacturer',
      value: product?.type
    },
    {
      name: 'slogan',
      type: 'text',
      placeholder: 'Slogan',
      value: product?.slogan
    },
    {
      name: 'description',
      type: 'textarea',
      placeholder: 'Description',
      value: product?.description
    },
    {
      name: 'dimensions_unit',
      type: 'dropdown',
      placeholder: 'Dimensions Unit',
      list: [
        {
          option_element: '',
          option_text: 'cm',
          option_value: 'cm',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'mm',
          option_value: 'mm',
          option_state: true,
          option_valueTooltipText: ''
        }
      ],
      value: product?.specifications?.dimensions?.dimensions_unit
    },
    {
      name: 'weight_unit',
      type: 'dropdown',
      placeholder: 'Weight Unit',
      list: [
        {
          option_element: '',
          option_text: 'kg',
          option_value: 'kg',
          option_state: true,
          option_valueTooltipText: ''
        },
        {
          option_element: '',
          option_text: 'g',
          option_value: 'g',
          option_state: true,
          option_valueTooltipText: ''
        }
      ],
      value: product?.specifications?.dimensions?.weight_unit
    },
    {
      name: 'width',
      type: 'number',
      placeholder: 'Width',
      value: product?.specifications?.dimensions?.width
    },
    {
      name: 'height',
      type: 'number',
      placeholder: 'Height',
      value: product?.specifications?.dimensions?.height
    },
    {
      name: 'depth',
      type: 'number',
      placeholder: 'Depth',
      value: product?.specifications?.dimensions?.depth
    },
    {
      name: 'weight',
      type: 'number',
      placeholder: 'Weight',
      value: product?.specifications?.dimensions?.weight
    },
  ];


  const editProductAction = async () => {
    console.log(formData)
    await axios.patch('http://localhost:5000/api/product/' + product?._id, formData,
      { headers: { "Content-Type": "application/json" } })
      .then((productRes => {
        console.log(productRes)
        setPageState("view-product")
        setUserMode("user")
        // regRes && setRegStatus(true)
      }))

    alert(formData?.name + " and id: " + product?._id)
    // alert("Edit page set")
  };


  return (
    <div className="product_wrap" >
      {
        userMode === "user" ? returnProductPage() : returnEditProduct()
        // renderPage(pageState)
      }
    </div>
  );
};
