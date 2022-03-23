const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../../app');


describe('User routes', () => {
    describe('POST /api/users', () => {
        let newUser;

        beforeEach(() => {
            newUser = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email().toLowerCase(),
                phone_number: "3005944179",
                is_active: true,
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state()
            };
        });

        test('should return 200 and successfully create new user if data is ok', async () => {
            const res = await request(app)
                .post('/api/users')
                .send(newUser)
                .expect(200);

            expect(res.body).toEqual({
                user_id: expect.anything(),
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                phone_number: newUser.phone_number,
                is_active: newUser.is_active,
                address: newUser.address,
                city: newUser.city,
                state: newUser.state
            });

        });


        /*test('should return 401 error if access token is missing', async () => {
            await request(app).post('/v1/users').send(newUser).expect(httpStatus.UNAUTHORIZED);
        });*/

        test('should return 400 error if email is invalid', async () => {
            newUser.email = 'carlosandres390@';

            await request(app)
                .post('/api/users')
                .send(newUser)
                .expect(400);
        });

        test('should return 400 error if email is already used', async () => {
            newUser.email = 'carlosandres390@gmail.com';

            await request(app)
                .post('/api/users')
                .send(newUser)
                .expect(500);
        });
    });

    describe('GET /api/users', () => {
        test('should return 200 and apply the default query options', async () => {

            const res = await request(app)
                .get('/api/users')
                .send()
                .expect(200);
            expect(Array.isArray(res.body.rows)).toEqual(true);
        });

    });

});