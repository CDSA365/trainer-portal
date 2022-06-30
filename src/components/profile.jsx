import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Table } from 'reactstrap'

const styles = {
    profileName: {
        font: 'bold',
        color: '#312e81',
    },
}

const Profile = () => {
    const user = useSelector((state) => state.user)
    return (
        <Col style={{ background: '#bae6fd' }} className="py-5">
            <Container className="px-5">
                <Col sm={12} md={12}>
                    <h1 style={styles.profileName}>
                        {user.first_name + ' ' + user.last_name}
                    </h1>
                    <Table borderless>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    {user.address_one +
                                        ', ' +
                                        user.address_two +
                                        ', ' +
                                        user.city +
                                        ', ' +
                                        user.district +
                                        ', ' +
                                        user.state}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Container>
        </Col>
    )
}

export default Profile
