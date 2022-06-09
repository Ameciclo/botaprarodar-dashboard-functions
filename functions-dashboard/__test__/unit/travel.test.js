import {getTravelsDone, getIncidentsHappened, getWithdrawalsReason, getDestinations, getTravelsWithRideGiven, getTimeInMinutesFromTravel} 
from '../../src/service/mapper.ts';

function getMockTravels(){
    return [{
            finished_at: '2020-01-01',
            reason:"Seu local de trabalho",
            problems_during_riding: "Sim",
            destination: 'SJC',
            give_ride: 'Sim',
            initiated_at:'03/01/2022 08:54:10',
            finished_at:'03/01/2022 16:54:10',
        },{
            finished_at: '2020-01-01',
            reason:"Seu local de trabalho",
            problems_during_riding: "Sim",
            destination: 'SJC',
            give_ride: 'Sim',
            initiated_at:'03/01/2022 08:54:10',
            finished_at:'03/01/2022 16:55:10',
        },{
            finished_at: '2020-01-01',
            reason:"Seu local de lazer / convivência social",
            problems_during_riding: "Não",
            destination: 'Recife',
            give_ride: 'Não',
            initiated_at:'03/01/2022 08:54:10',
            finished_at:'03/01/2022 16:54:10',
        },{
            destination: 'POA'
        }
    ];
}

describe('Migrate Travels LGPD', () => {

    it('Should return sum of travels done', () => {
        const count = getTravelsDone(getMockTravels());
        expect(count).toBe(3);
    });

    it("Should return sum of incidents", () => {
        const count = getIncidentsHappened(getMockTravels());
        expect(count).toBe(2);
    });

    it("Should return sum of Reason by map", () => {
        const map = getWithdrawalsReason(getMockTravels());
        expect(map[0].label).toBe("Seu local de trabalho");
        expect(map[0].quantity).toBe(2);
        expect(map[1].label).toBe("Seu local de lazer / convivência social");
        expect(map[1].quantity).toBe(1);
    });

    it('Should return destinations',() => {
        const map = getDestinations(getMockTravels());
        expect(map[0].label).toBe("Sjc");
        expect(map[0].quantity).toBe(2);
        expect(map[1].label).toBe("Recife");
        expect(map[1].quantity).toBe(1);
        expect(map[2].label).toBe("Poa");
        expect(map[2].quantity).toBe(1);
    })

    it('Should return number of rides', () =>{
        const num = getTravelsWithRideGiven(getMockTravels());
        expect(num).toBe(2);
    });
    
    it('Should return time of rides', () =>{
        const num = getTimeInMinutesFromTravel(getMockTravels());
        expect(num[0]).toBe(480); 
        expect(num[1]).toBe(481); 
        expect(num.length).toBe(4); 
    });
});

