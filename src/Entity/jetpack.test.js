const Jetpack = require('./Jetpack');
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
describe('Jetpack Create',function() {
    test('Création de Jetpack', () => {
        const dataMock = {
            get: jest.fn().mockReturnThis(),
            push: jest.fn().mockReturnThis(),
            write: jest.fn().mockReturnThis()
        };
        let jetpack = new Jetpack();
        jetpack.id = "1";
        jetpack.name = "X1982BD";
        jetpack.image = "base64...";
        let jetPackRepository = new JetpackRepository(dataMock);
        jetPackRepository.create(jetpack);
        expect(dataMock.write.mock.calls.length).toBe(1);

    });
});
    describe('Jetpack : GET', function () {
        test('Test getAll()', () => {
            const dataMock =
                {
                    get: jest.fn().mockReturnThis(),
                    value: jest.fn().mockReturnValue([{
                        "id": "1",
                        "name": "ELBISSIS",
                        "image": "SOSO.png"
                    }, {
                        "id": "fb4c2a13-ac62-4996-9f3c-317e8f9d7942",
                        "name": "Jet Pack à fusion X98371",
                        "image": "Base 64 ..."
                    }])
                };
            let RepositoryJet = new JetpackRepository(dataMock);
            expect(RepositoryJet.getAll()).toEqual([{
                "id": "1",
                "name": "ELBISSIS",
                "image": "SOSO.png"
            }, {
                "id": "fb4c2a13-ac62-4996-9f3c-317e8f9d7942",
                "name": "Jet Pack à fusion X98371",
                "image": "Base 64 ..."
            }]);
        });
        test('Test get(id)', () => {
            const dataMock =
                {
                    get: jest.fn().mockReturnThis(),
                    find: jest.fn().mockReturnThis(),
                    value: jest.fn().mockReturnValue({"id": "1", "name": "ELBISSIS", "image": "SOSO.png"})
                };
            let RepositoryJet = new JetpackRepository(dataMock);
            expect(RepositoryJet.get(1)).toEqual({"id": "1", "name": "ELBISSIS", "image": "SOSO.png"});
        });
        test('Test getSize', () => {
            const dbMock =
                {
                    get: jest.fn().mockReturnThis(),
                    size: jest.fn().mockReturnThis(),
                    value: jest.fn().mockReturnValue(1)
                };
            let jetpack = new JetpackRepository(dbMock);
            expect(jetpack.getSize()).toBe(1);
        });
    });