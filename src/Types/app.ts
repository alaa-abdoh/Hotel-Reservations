// this folder has all types

export type Reserve= {
    adults: number, 
    children: number, 
    rooms: number,
    [key: string]: number; // this line added to make TS allow dynamic access to object property 
}
export type ReserveBoxProps= {
    reserve: Reserve,
    setReserve: React.Dispatch<React.SetStateAction<Reserve>>;
}
export type ReserveBoxContentProps= {
    peopleClassification: string,
    amount: number,
    updateReserveAmount(classification: string, operation: "+" | "-"):void;
}