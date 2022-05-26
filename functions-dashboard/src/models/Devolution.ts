import User from "./User";

export default interface Devolution {
  date: string;
  id: string;
  quiz: {
    destination: string;
    giveRide: "Não" | "Sim";
    problemsDuringRiding: "Não" | "Sim";
    reason: string;
  };
  user: User;
  withdrawId: string;
}
