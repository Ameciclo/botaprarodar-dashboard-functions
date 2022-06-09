import {getNewUsers, getWomenUsers, getRacialInfo, getGenderInfo, getSchoolingInfo, getAgeInfo, getIncomeInfo} from "../../src/service/mapper.ts";

import User from "../../src/models/User.ts";

var now = new Date()

function getMockUsers(){
  return [{
    name: "name",
    age: "01/10/" + (now.getFullYear()-10),
    income: "Até 150 reais",
    communityId: "0000",
    telephone: "",
    status: true,
    gender: "Feminino",
    profilePicture: "picture.png",
    id: "1",
    address: "Rua",
    docNumber: 123,
    isBlocked: false,
    racial: "Amarela",
    schooling: "Ensino superior",
    schoolingStatus: "Incompleto",
    userQuiz: {
      alreadyUseBPR: true
    }
  },
  {
    gender: "Masculino",
    racial: "Amarela",
    income: "Até 150 reais",
    age: "01/10/" + (now.getFullYear()-12),
    schooling: "Ensino superior",
    schoolingStatus: "Incompleto",
    userQuiz: {
      alreadyUseBPR: false
    }
  },
  {
    gender: "Feminino",
    racial: "",
    age: "01/10/" + (now.getFullYear()-18),
    schooling: "Ensino fundamental 1",
    schoolingStatus: "",
    userQuiz: {
      alreadyUseBPR: true
    }
  }]
}

describe('Migration User LGPD', () => {

  it('Should return length of people who use BPR', () => {
    const count = getNewUsers(getMockUsers());
    expect(count).toBe(2);
  });

  it('Should return length of woman in the users', () => {
    const count = getWomenUsers(getMockUsers());
    expect(count).toBe(2);
  });

  it('Should return sum of map per racial', () => {
    var map = getRacialInfo(getMockUsers());

    expect(map[0].label).toBe("Amarela");
    expect(map[0].quantity).toBe(2);
    expect(map[1].label).toBe("Outra/Não deseja informar");
    expect(map[1].quantity).toBe(1);
  });

  it('Should return sum of map per gender', () => {
    const map = getGenderInfo(getMockUsers());

    expect(map[0].label).toBe("Feminino");
    expect(map[0].quantity).toBe(2);
    expect(map[1].label).toBe("Masculino");
    expect(map[1].quantity).toBe(1);
  });

  it('Should return sum of map per schoolingInfo', () => {
    const map = getSchoolingInfo(getMockUsers());

    expect(map[0].label).toBe("Ensino superior Incompleto");
    expect(map[0].quantity).toBe(2);
    expect(map[1].label).toBe("Ensino fundamental 1 Completo");
    expect(map[1].quantity).toBe(1);
  });
  
  it('Should return sum of map per age', () => {
    const map = getAgeInfo(getMockUsers());

    expect(map[0].label).toBe("Entre 11 e 20 anos");
    expect(map[0].quantity).toBe(2);
    expect(map[1].label).toBe("Entre 0 e 10 anos");
    expect(map[1].quantity).toBe(1);
  });
  
  it('Should return sum of map per income', () => {
    const map = getIncomeInfo(getMockUsers());
    
    expect(map[0].label).toBe("Até 150 reais");
    expect(map[0].quantity).toBe(2);
    expect(map[1].label).toBe("Desejo não informar");
    expect(map[1].quantity).toBe(1);
  });

});
