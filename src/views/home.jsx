import React from 'react'
import { Container } from 'reactstrap'
import Announcements from '../components/announcements'
import ClassesGroup from '../components/classes-group'

const Home = () => {
    return (
        <Container fluid="lg">
            <Announcements />
            <ClassesGroup />
        </Container>
    )
}

export default Home
