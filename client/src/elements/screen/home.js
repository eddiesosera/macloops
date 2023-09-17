import React, { useContext, useEffect, useState } from "react";
import { Hero } from "../sections/hero";
import { Sale } from "../sections/home_sale";
import axios from "axios";
import { LoginContext } from "../../App";
import { DropDown } from "../components/dropDown";
import { Search } from "../components/search";
import { v1 as uuidv1 } from 'uuid';

export const Home = ({ allProducts, allUsers }) => {
  const [queryVal, setQueryVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterSelected, setFilterSelected] = useState("");
  const [sortSelected, setSortSelected] = useState("");


  // Product Categories
  const productCategories = [
    {
      category_id: 0,
      category_name: 'All'
    },
    {
      category_id: 0,
      category_name: 'Pianos'
    },
    {
      category_id: 0,
      category_name: 'Keyboard'
    },
    {
      category_id: 0,
      category_name: 'Guitars'
    },
    {
      category_id: 0,
      category_name: 'Drums'
    },
    {
      category_id: 0,
      category_name: 'Microphones'
    },
    {
      category_id: 0,
      category_name: 'Orchestral'
    }
  ];

  // Updating search input value
  const getQuery = q => {
    setQueryVal(q);
  };

  // Filter options dropdown
  const filter_options = [
    {
      option_element: <i className='ph-fill ph-tag' style={{ color: '#3a7c91' }} />,
      option_text: 'Price',
      option_value: 'price',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: <i className='ph-fill ph-star-half' style={{ color: '#3a7c91' }} />,
      option_text: 'Rating',
      option_value: 'rating',
      option_state: true,
      option_valueTooltipText: ''
    }
  ];


  // Sort options dropdown
  const sort_options = [
    {
      option_element: '',
      option_text: 'Most Recent',
      option_value: 'most_recent',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: '',
      option_text: 'Highest',
      option_value: 'highest',
      option_state: true,
      option_valueTooltipText: ''
    },
    {
      option_element: '',
      option_text: 'Lowest',
      option_value: 'lowest',
      option_state: true,
      option_valueTooltipText: ''
    }
  ];

  // Brands
  const importAll = (r) => { return r.keys().map(r); }
  const brandLogos = importAll(require.context("../../img/brands"))
  let brandsList = [...brandLogos]

  useEffect(() => {
    console.log(brandsList)
  })
  return (
    <div style={{ padding: "0px 0px" }}>
      <Hero />

      {/* ON SALE */}
      <div style={{ padding: '60px', paddingBottom: '0' }}>
        <div >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '700', color: '#2f2e2d', textTransform: 'uppercase' }}>On Sale</div>
          </div>
          <div className="search_query" style={{ marginBottom: '20px', display: queryVal !== "" ? 'block' : 'none' }}>
            {
              queryVal !== "" ? "Results for: " + queryVal : ""
            }
          </div>
        </div>
        <div>
          <div className="products_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* <Search query={getQuery} /> */}

            {/* <div className="categoryAndFilter_wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
            <ul className="products_top_category_wrap" style={{ padding: '20px 0', display: 'flex', gap: '10px', }}>
              {
                productCategories.map((category, index) => {
                  return (
                    <li className="product_category" key={uuidv1()} onClick={e => setSelectedCategory(category?.category_name)}
                      style={{
                        listStyle: 'none', padding: '12px', cursor: 'pointer', fontFamily: 'Nunito Sans', fontSize: '16px',
                        fontWeight: selectedCategory === category?.category_name ? "900" : '700', color: selectedCategory === category?.category_name ? '#111' : '#999'
                      }}
                    >{category?.category_name}</li>
                  )
                })
              }
            </ul>
            {/* </div> */}
            <div className="filter_wrap" style={{ display: 'flex', gap: '20px', color: '#3a7c91' }}>
              <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Filter by: " + filterSelected} options={filter_options} selectedValue={(opt) => { setFilterSelected(opt) }} index={0} />
              <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Sort by: " + sortSelected} options={sort_options} selectedValue={(opt) => { setSortSelected(opt) }} index={1} />
            </div>
          </div>
        </div>
      </div>
      <Sale sale_products={allProducts} />

      {/* TRENDING */}
      <div style={{ padding: '60px', paddingBottom: '0' }}>
        <div >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '700', color: '#2f2e2d', textTransform: 'uppercase' }}>Trending</div>
          </div>
          <div className="search_query" style={{ marginBottom: '20px', display: queryVal !== "" ? 'block' : 'none' }}>
            {
              queryVal !== "" ? "Results for: " + queryVal : ""
            }
          </div>
        </div>
        <div>
          <div className="products_top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* <Search query={getQuery} /> */}

            {/* <div className="categoryAndFilter_wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}> */}
            <ul className="products_top_category_wrap" style={{ padding: '20px 0', display: 'flex', gap: '10px', }}>
              {
                productCategories.map((category, index) => {
                  return (
                    <li className="product_category" key={uuidv1()} onClick={e => setSelectedCategory(category?.category_name)}
                      style={{
                        listStyle: 'none', padding: '12px', cursor: 'pointer', fontFamily: 'Nunito Sans', fontSize: '16px',
                        fontWeight: selectedCategory === category?.category_name ? "900" : '700', color: selectedCategory === category?.category_name ? '#111' : '#999'
                      }}
                    >{category?.category_name}</li>
                  )
                })
              }
            </ul>
            {/* </div> */}
            <div className="filter_wrap" style={{ display: 'flex', gap: '20px', color: '#3a7c91' }}>
              <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Filter by: " + filterSelected} options={filter_options} selectedValue={(opt) => { setFilterSelected(opt) }} index={0} />
              <DropDown placeholder={"Filter by:"} selectedOptionLabel={"Sort by: " + sortSelected} options={sort_options} selectedValue={(opt) => { setSortSelected(opt) }} index={1} />
            </div>
          </div>
        </div>
      </div>
      <Sale sale_products={allProducts?.slice(5)} />

      {/* BRANDS */}
      <div style={{ padding: '60px' }}>
        <div style={{ fontSize: '24px', fontFamily: 'Montserrat', fontWeight: '700', color: '#2f2e2d', textTransform: 'uppercase', margin: '60px 0' }}>Brands Featured</div>
        <ul style={{ display: 'flex', gap: '20px', justifyContent: "space-between", flexWrap: 'wrap', flexDirection: 'row', padding: '0' }}>
          {
            brandsList?.map((logo, i) => {
              return (<li key={i} style={{ listStyle: 'none' }}>
                <img src={logo} alt="Brand Logo" style={{ height: '30px', opacity: '0.6' }} />
              </li>)
            })
          }
        </ul>
      </div>

    </div>
  );
};
