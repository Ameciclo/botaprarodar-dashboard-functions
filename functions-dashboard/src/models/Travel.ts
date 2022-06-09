export default interface Travel {
    community_id:string;
    destination:string;
    finished_at:string;
    give_ride: "Não" | "Sim";
    id:string;
    initiated_at:string;
    motivation_open_question:string;
    on_going:false;
    path:string;
    problems_during_riding: "Não" | "Sim";
    problems_on_way_open_question:string;
    reason:string;
    time_on_way_open_question:string;
    user_id:string;
}

export const mapTravelsData = (data: any) => {
    return Object.keys(data).map(id => {
      return { id, ...data[id] };
    });
  };