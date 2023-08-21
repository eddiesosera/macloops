import React from 'react'
import { NavLink } from 'react-router-dom'
import { MacloopsLogo } from '../components/svgs'

export const Footer = () => {
    const footer_links_abt = [
        {
            name: 'Legal Information',
            url: '/legal',
            border: true
        },
        {
            name: 'Privacy Policy',
            url: '/privacy',
            border: true
        },
        {
            name: 'Contact',
            url: '/contact',
            border: false
        }
    ]

    const social_link = [
        {
            social_app: 'ph-bold ph-paper-plane-tilt',
            url: 'https://www.gmail.com'
        },
        {
            social_app: 'ph-bold ph-instagram-logo',
            url: 'https://www.instagram.com'
        },
        {
            social_app: 'ph-bold ph-facebook-logo',
            url: 'https://www.facebook.com'
        },
        {
            social_app: 'ri-twitter-x-line',
            url: 'https://www.twitter.com'
        }
    ]


    return (
        <div style={{ background: '#222120', color: '#f4e6d8', display: 'flex', padding: '10px 60px', bottom: '0', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className='footer_left_wrap' style={{ fontFamily: 'Montserrat', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MacloopsLogo height={24} width={'123px'} color={'#ff9932'} />
                <div>© 2023. Rights Reserved. </div>
            </div>

            <ul className='footer_mid_wrap' style={{ display: 'flex', padding: '0', gap: '15px', fontFamily: '' }}>
                {
                    footer_links_abt.map(link_abt => {
                        return (
                            <li key={link_abt.name} style={{ listStyle: 'none', fontFamily: 'Nunito Sans', color: '#f4e6d8' }}>
                                <NavLink className='' to={link_abt.url} style={{ display: 'flex', gap: '15px' }}>
                                    <div>{link_abt.name}</div>
                                    <div style={{ display: link_abt.border ? 'flex' : 'none' }}>|</div>
                                </NavLink>
                            </li>

                        )
                    })
                }
            </ul>

            <ul className='footer_mid_wrap' style={{ display: 'flex', padding: '0', gap: '15px' }}>
                {
                    social_link.map(social => {
                        return (
                            <li key={social.social_app} style={{ listStyle: 'none', fontFamily: 'Nunito Sans', fontSize: '20px' }}>
                                <NavLink to={social.url}>
                                    <i className={social.social_app} />
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
