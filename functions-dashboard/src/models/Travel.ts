export default interface Travel {
    community_id:String;
    destination:String;
    finished_at: string;//"13/01/2022 22:28:46"
    giveRide: "Não" | "Sim";
    id:string;//"-N31M5PTh6F89Sdq-RHy"
    initiated_at:string;//"13/01/2022 22:08:45"
    motivation_open_question:string;//"saude"
    on_going:false
    path:string;//"travels"
    problemsDuringRiding: "Não" | "Sim";
    problems_on_way_open_question:string;//"estradas"
    reason:string;//"Seu local de trabalho"
    time_on_way_open_question:string;//"1h:"
    user_id:string;//"-MjZx7cic02AXYevcRnt"
}

export const mapTravelsData = (data: any) => {
    return Object.keys(data).map(id => {
      return { id, ...data[id] };
    });
  };