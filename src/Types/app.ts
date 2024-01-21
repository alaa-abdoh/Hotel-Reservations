// this folder has all types

export type Reserve= {
    adults: number, 
    children: number, 
    rooms: number
}
export type ReserveBoxProps= {
    reserve: Reserve,
    setReserve: React.Dispatch<React.SetStateAction<Reserve>>;
}
export type ReserveBoxContentProps= {
    peopleClassification: string,
    amount: number
}