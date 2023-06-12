import supertest from "supertest";
import { expect } from "chai";
import envConfig from "../src/config/envConfig.js";
import NewCartDTO from "../src/dto/CartsDTO/newCart.dto.js";
import SessionDTO from "../src/dto/UsersDTO/session.dto.js";

const requester = supertest('http://localhost:3000')

//Cart of matiasatzoridev@gmail.com
const testCart = "6433ab6d685299c09f9757d0"
//Product ID
const testProduct= "63ff8fc2819fb6dcc2d8fa2b"

//Product ID that creates on testing
let testProductGenerated

//Password for admin permissions
const password = envConfig.adminPassword 

//Product for testing
const productMock = {
    title: "Test product",
    description: "Product made for testint",
    price: 30,
    stock: 70,
    code: "0046",
    category: "Test",
    thumbnail: "https://alfaomegaeditor.com.ar/wp-content/uploads/2023/02/unnamed.png",
    status: true,
}

const productUpdatedMock = {
    description: "Product updated test1",
    price: 110
}

describe('Test Products API (/api/products)', function() {
    it('Create a product', async ()=>{
        const body = {
            password: password,
            product: productMock
        }
        const result = await requester.post('/api/products').send(body)
        expect(result._body).to.have.property('_id')
        expect(result._body).to.have.property('owner')
        testProductGenerated = result._body._id
    })

    it('Get all products', async () => {
        const result = await requester.get('/api/products')
        expect(result._body).to.have.property('status')
        expect(result._body).to.have.property('payload')
        expect(result._body.status).to.be.equal('success')
        expect(result._body.payload).to.be.an('array')
        expect(result._body.payload).to.not.have.lengthOf(0)
    })

    it('Update a product', async () => {
        const body = {
            password: password,
            product: productUpdatedMock
        }
        const result = await requester.put(`/api/products/${testProductGenerated}`).send(body)
        expect(result._body).to.have.property('acknowledged')
        expect(result._body).to.have.property('modifiedCount')
        expect(result._body).to.have.property('matchedCount')
        expect(result._body.matchedCount).to.not.be.equal(0)
        //Si se manda los mismos datos como update, modifiedCount va a ser 0, por lo tanto mientras se encuentre un producto que matchea, el teste deberia ser valido.
    })

    it('Get product by ID', async () => {
        const result = await requester.get(`/api/products/${testProductGenerated}`)
        expect(result._body).to.have.property('_id')
    })

    it('Delete a product', async () => {
        const body = {
            password: password
        }
        const result = await requester.delete(`/api/products/${testProductGenerated}`).send(body)
        expect(result._body).to.have.property('deletedCount')
        expect(result._body).to.have.property('acknowledged')
        expect(result._body.deletedCount).to.be.equal(1)
    })
})

describe('Test Carts API (/api/carts)', function(){
    it('Cart DTO', ()=> {
        const newCart = new NewCartDTO()
        expect(newCart).to.have.property('products')
        expect(newCart.products).to.be.an('array')
        expect(newCart.products).to.have.lengthOf(0)
    })

    it('Create a cart', async () => {
        const body = {
            password: password
        }
        const result = await requester.post('/api/carts').send(body)
        expect(result._body).to.have.property('_id')
        expect(result._body).to.have.property('products')
        expect(result._body.products).to.be.an('array')
        expect(result._body.products).to.have.lengthOf(0)
    })

    it('Add product to cart', async () => {
        const body = {
            password: password
        }
        const result = await requester.post(`/api/carts/${testCart}/product/${testProduct}`).send(body)
        expect(result._body).to.have.property('matchedCount')
        expect(result._body).to.have.property('modifiedCount')
        expect(result._body.matchedCount).to.be.equal(1)
        expect(result._body.modifiedCount).to.be.equal(1)
    })

    it('Empty cart', async () => {
        const body = {
            password: password
        }
        //Primero se borran los productos del carrito y despues se obtiene carrito para corroboar que este vacio
        await requester.delete(`/api/carts/${testCart}`).send(body)
        const result = await requester.get(`/api/carts/${testCart}`)
        expect(result._body).to.have.property('_id')
        expect(result._body).to.have.property('products')
        expect(result._body.products).to.be.an('array')
        expect(result._body.products).to.have.lengthOf(0)
    })
})

describe('Test Sessions API (/api/sessions)', function(){
    const fakeSession = {
        cookie: {
            path: '/',
            _expires: null,
            originalMaxAge: null,
            httpOnly: true
        },
        passport: {
            user: 'akfhj83ka91n993j103i'
        },
        user: {
            tickets: [],
            _id: "948519284jfsdj39",
            first_name: "Test",
            last_name: "Test",
            email: "test@mail.com",
            password: "091204sgdshq8h1ndf1937tg3984b9193b",
            age: 20,
            cart: "9358927fh82htgjn9",
            role: "user",
            __v: 0,
        }
    }

    it('Session DTO', async () => {
        const session = new SessionDTO(fakeSession)
        expect(session).to.have.property('full_name')
        expect(session).to.have.property('email')
        expect(session).to.have.property('cart')
        expect(session).to.have.property('role')
        expect(session).to.have.property('age')
        expect(session).to.not.have.property('tickets')
        expect(session).to.not.have.property('_id')
        expect(session).to.not.have.property('password')
        expect(session).to.not.have.property('role')
        expect(session).to.not.have.property('__v')
        expect(session.full_name).to.be.equal(`${fakeSession.user.first_name} ${fakeSession.user.last_name}`)
    })
})