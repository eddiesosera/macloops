import React from "react";
import { Roll, Slide } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';


export const Cart = () => {
  const cartItms = [
    {
      name: 'Grand Piano'
    },
    {
      name: 'Guitar'
    },
    {
      name: 'Grand Piano'
    },


  ]
  return (
    <div style={{ padding: '60px' }}>
      <div style={{ fontSize: '48px', fontFamily: 'Montserrat', fontWeight: '800', color: '#2f2e2d', textTransform: 'uppercase' }}>Cart</div>
      <ul style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexDirection: 'column' }}>
        <Slide cascade damping={0.01}>
          {
            cartItms.map((cartItm) => {
              return (
                <li key={uuidv1()} style={{ display: 'flex', border: 'solid 1px #E9E6E1', width: '100%', height: '140px', boxShadow: '0px 8px 16px -5px #6F6D6A', transition: 'all 0.48s cubic-bezier(0.25,0.75,0.5,1) 0s' }} >
                  <NavLink>
                    <div className="acc_nav_top wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#3b3119' }}>

                      <div className="acc_nav_top_title" style={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Montserrat', }}>{cartItm?.name}</div>
                    </div>
                    <hr style={{ width: '100%', border: "0", height: '0.5px', background: '#E9E6E1' }} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', fontFamily: 'Nunito Sans', color: '#2293B6', fontWeight: '600' }}>
                      <div>Checkout</div>
                      <i className="ri-arrow-right-line" />
                    </div>
                  </NavLink>
                </li>
              )
            })
          }
        </Slide>
      </ul>
    </div>)
};
