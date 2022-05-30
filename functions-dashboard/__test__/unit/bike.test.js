import {getBikesInUseQuantity} from "../../src/service/mapper.ts";

function getMockBikes(){
    return [
        {
            inUse: true
        },
        {
            inUse: false
        }
    ];
}

describe("Migrate Bike LGPD", () =>{

    it("Bike in use",() => {
        const count = getBikesInUseQuantity(getMockBikes());
        expect(count).toBe(1);
    });
});