'use client'
import React from 'react'
import { Container, Image, List, Segment, } from 'semantic-ui-react';

const Footer = () => {
    return (
        <Segment style={{ margin: '5em 0em 0em', padding: '5em 0em', background: "rgb(8 2 83)" }}>
            <Container textAlign='center'>
                <Image centered size='mini' src='https://digiaccel.in/_next/static/media/digi_logo.f906b744.svg' />
                <List horizontal inverted divided link size='small'>
                    <List.Item as='a'>
                        Contact Us
                    </List.Item>
                    <List.Item as='a'>
                        Terms and Conditions
                    </List.Item>
                    <List.Item as='a'>
                        Privacy Policy
                    </List.Item>
                </List>
            </Container>
        </Segment>
    )
}
export default Footer