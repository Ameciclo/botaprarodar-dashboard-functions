import {getNewTravelsDone, getNewIncidentsHappened} from '../../src/service/mapper.ts';

function getMockTravels(){
    return [{
            finished_at: '2020-01-01',
            problemsDuringRiding: "Sim"
        },{
            finished_at: '2020-01-01',
            problemsDuringRiding: "Sim"
        },{
            finished_at: '2020-01-01',
            problemsDuringRiding: "Não"
        },{
            finished_at: ''
        }
    ];
}

describe('Migrate Travels LGPD', () => {

    it('Travels done', () => {
        const count = getNewTravelsDone(getMockTravels());
        expect(count).toBe(3);
    });

    it("Has incidentes", () => {
        const count = getNewIncidentsHappened(getMockTravels());
        expect(count).toBe(2);
    });
});