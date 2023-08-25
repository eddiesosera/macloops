import React from 'react'
import { ReactComponent as Img404 } from "../../img/util/404_illustration.svg"
import { NavLink } from 'react-router-dom'

export const Error404 = () => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 'fit-content', padding: '60px', margin: '0 auto' }}>

            <Img404 />
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', width: 'fit-content', height: "fit-content", textAlign: 'center'
            }}>
                <div style={{
                    fontFamily: "Montserrat", fontSize: '36px', fontWeight: '700', height: "fit-content",
                    color: '#2f2e2d'
                }}>
                    PAGE NOT FOUND
                </div>
                <NavLink className="primarybtn" to="/" >Back Home</NavLink>
            </div>

        </div>
    )
}
