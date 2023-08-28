import React from 'react'
//import { capgLogo as Img } from '../../assets/imageUrls'; 
import Img from '../../assets/logo.png'
import { FooterContainer, FooterWrap, SocialMedia, SocialMediaWrap, SocialLogo, WebsiteRights } from './FooterElements';

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo>
                            <img src={Img} alt=''/>
                        </SocialLogo>
                        <WebsiteRights>
                            Rahul © {new Date().getFullYear()}
                            &nbsp;All Rights Reserved
                        </WebsiteRights>
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    );
}

export default Footer
