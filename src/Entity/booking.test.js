const Booking = require('./Booking');
const BookingRepository = require('../Repository/BookingRepository');
describe('Booking toJson', function () {

    test('Test toJson of booking', () => {
        let booking = new Booking();
        booking.jetPackId = "1";
        booking.startDate = "2019-11-07";
        booking.endDate = "2019-11-08";
        expect(booking.toJson()).toMatchObject({
            jetPackId: "1",
            startDate: "2019-11-07",
            endDate: "2019-11-08"
        })
    });

});
describe('Reserver un Booking',() =>
{
   test('create Booking',() => {
       const dataMock= {
           get : jest.fn().mockReturnThis(),
           push : jest.fn().mockReturnThis(),
           write : jest.fn().mockReturnThis()
       }
       let reserver=new Booking();
       reserver.jetPackId="1";
       reserver.startDate="2019-11-07";
       reserver.endDate="2019-11-08";
      let booking = new BookingRepository(dataMock);
       booking.create(reserver);
        expect(dataMock.write.mock.calls.length).toBe(1);
   });
});