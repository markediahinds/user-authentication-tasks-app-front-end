import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'


const API = import.meta.env.VITE_BASE_URL

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password_hash: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('State', formData)
        fetch(`${API}/users`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                    if(res.user.user_id){
                    const { user, token } = res
                    setUser(user)
                    setToken(token)
                    setFormData(() => ({
                        username: '',
                        email: '',
                        password_hash: ''
                    }))
                    } else {
                    console.log(res)     
}          setFormData((prev) => ({
                    username: '',
                    email: '',
                    password_hash: ''
                }))
            })
            .catch(err => console.log(err))
    }



    return (
        <Container style={{ marginTop: '50px' }}>
            <Row>
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter your username'
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='username'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            type='email'
                            placeholder='Enter your email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='username'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            name='password_hash'
                            value={formData.password_hash}
                            onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}


export default Signup


