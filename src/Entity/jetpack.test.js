const Jetpack = require('./Jetpack');
const Booking = require('../Repository/BookingRepository');
const JetpackRepository=require('../Repository/JetpackRepository');
describe('Jetpack toJson', function () {

    test('Test toJson', () => {
    let jetpack = new Jetpack();
    jetpack.id = "1";
    jetpack.name = "X1982BD";
    jetpack.image = "base64...";
    expect(jetpack.toJson()).toMatchObject({
        id: "1",
        name: "X1982BD",
        image: "base64..."
    })
});
});
describe('Jetpack Create',function()
{
    test('Création de Jetpack',() =>
    {
        const dataMock= {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        let jetpack = new Jetpack();
        jetpack.id = "1";
        jetpack.name = "X1982BD";
        jetpack.image = "base64...";
        let jetPackRepository=new JetpackRepository(dataMock);
        jetPackRepository.create(jetpack);
        expect(dataMock.write.mock.calls.length).toBe(1);

    });
    test('Create jetPack with exception : Jetpack object is missing information (" Name IS NULL")',()=>{
       const dataMock= {
           get : jest.fn().mockReturnThis(),
           push : jest.fn().mockReturnThis(),
           write : jest.fn().mockReturnThis()
       };
        let jetpack = new Jetpack();
        jetpack.id = "1";
        jetpack.name = "";
        jetpack.image = "base64...";
        let jetPackRepository=new JetpackRepository(dataMock);
        expect(jetPackRepository.create(jetpack)).toBe('Jetpack object is missing information');
    });
    test('Create jetPack with exception : Jetpack object is missing information ("")',()=>{
        const dataMock= {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        let jetPackRepository=new JetpackRepository(dataMock);
        expect(jetPackRepository.create("")).toBe('Jetpack object is undefined');
    });
});
describe('Jetpack getSize', function () {

    test('Test getSize', () => {
        const dbMock =
            {
                get : jest.fn().mockReturnThis(),
                size : jest.fn().mockReturnThis(),
                value : jest.fn().mockReturnValue(1)
            };
        let jetpack = new JetpackRepository(dbMock);
        expect(jetpack.getSize()).toBe(1);
    });
});
describe('Jetpack : GET',function () {

    test('Test get(id)',()=> {
        const dataMock=
            {
                get : jest.fn().mockReturnThis(),
                find : jest.fn().mockReturnThis(),
                value : jest.fn().mockReturnValue({ "id" : "1" , "name": "ELBISSIS","image" : "SOSO.png"})
            };
            let RepositoryJet = new JetpackRepository(dataMock);
            expect(RepositoryJet.get(1)).toEqual({ "id" : "1" , "name": "ELBISSIS","image" : "SOSO.png"});
    });
    test('Test getAll()',()=> {
        const dataMock=
            {
                get : jest.fn().mockReturnThis(),
                value : jest.fn().mockReturnValue([{ "id" : "1" , "name": "ELBISSIS","image" : "SOSO.png"},{"id": "fb4c2a13-ac62-4996-9f3c-317e8f9d7942","name": "Jet Pack à fusion X98371","image" : "Base 64 ..."}])
            };
        let RepositoryJet = new JetpackRepository(dataMock);
        expect(RepositoryJet.getAll()).toEqual([{ "id" : "1" , "name": "ELBISSIS","image" : "SOSO.png"},{"id": "fb4c2a13-ac62-4996-9f3c-317e8f9d7942","name": "Jet Pack à fusion X98371","image" : "Base 64 ..."}]);
    });
    test('Test getAvailable(..) with exception',() =>
    {
        const dataMockJetpack=
            {
                get : jest.fn().mockReturnThis(),
                //find : jest.fn().mockReturnThis(),
                value : jest.fn().mockReturnValue([{ "id" : "4b499c2b-21d0-46d1-8078-964dfc4c3fcb" , "name": "ELBISSIS","image" : "SOSO.png"},{ "id" : "424f3a80-7b3c-4cd0-86d5-137d36fee747" , "name": "ELBISSIS","image" : "SOSO.png"}])
            };
        const dataMockBooking=
            {
                    get : jest.fn().mockReturnThis(),
                    find : jest.fn().mockReturnThis(),
                    value : jest.fn().mockReturnValue({"jetPackId" : "4b499c2b-21d0-46d1-8078-964dfc4c3fcb","startDate" : "2019-11-04" ,"endDate":"2019-11-05"})
            }
        let jetpack = new JetpackRepository(dataMockJetpack);
        let booking = new Booking(dataMockBooking);
        expect(jetpack.getAvailable('2019-11-054','2019-11-05',booking)).toBe('Invalid date format');
    });
    test('Test getAvailable(..) without Exception',() =>
    {
        const dataMockJetpack=
            {
                get : jest.fn().mockReturnThis(),
                Object : jest.fn().mockReturnThis(),
                keys : jest.fn().mockReturnThis(),
                length : jest.fn().mockReturnValue(2),
                value : jest.fn().mockReturnValue([{ "id" : "424f3a80-7b3c-4cd0-86d5-137d36fee747" , "name": "ELBISSIS","image" : "SOSO.png"}])
            };
        const dataMockBooking=
            {
                get : jest.fn().mockReturnThis(),
                find : jest.fn().mockReturnThis(),
                value : jest.fn().mockReturnValue(undefined)
            }
        let jetpack = new JetpackRepository(dataMockJetpack);
        let booking = new Booking(dataMockBooking);
        expect(jetpack.getAvailable('2019-11-01','2019-11-05',booking)).toEqual([{ "id" : "424f3a80-7b3c-4cd0-86d5-137d36fee747" , "name": "ELBISSIS","image" : "SOSO.png"}]);
    });

    test('Test getAvailable(..) NO available jetpack',() =>
    {
        const dataMockJetpack=
            {
                get : jest.fn().mockReturnThis(),
                Object : jest.fn().mockReturnThis(),
                keys : jest.fn().mockReturnThis(),
                length : jest.fn().mockReturnValue(2),
                value : jest.fn().mockReturnValue([{ "id" : "424f3a80-7b3c-4cd0-86d5-137d36fee747" , "name": "ELBISSIS","image" : "SOSO.png"}])
            };
        const dataMockBooking=
            {
                get : jest.fn().mockReturnThis(),
                find : jest.fn().mockReturnThis(),
                value : jest.fn().mockReturnValue([{"jetPackId": "424f3a80-7b3c-4cd0-86d5-137d36fee747","startDate": "2019-11-01", "endDate": "2019-11-05"}])
            }
        let jetpack = new JetpackRepository(dataMockJetpack);
        let booking = new Booking(dataMockBooking);
        expect(jetpack.getAvailable('2019-11-01','2019-11-05',booking)).toEqual([]);
    });

});
