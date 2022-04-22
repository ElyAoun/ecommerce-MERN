import bcrypt from 'bcryptjs'

const users = [
    {
       name: 'Admin User',
       email : 'admin@example.com',
       password: bcrypt.hashSync('12345', 10),
       isAdmin: true 
    },
    {
        name: 'Elie Aoun',
        email : 'elie@example.com',
        password: bcrypt.hashSync('elie123', 10)
    },
    {
        name: 'Mark Zuck ',
        email : 'mark@example.com',
        password: bcrypt.hashSync('mark123', 10)
    }
]

export default users