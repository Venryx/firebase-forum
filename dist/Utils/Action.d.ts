export default class Action<Payload> {
    constructor(payload: Payload);
    type: string;
    payload: Payload;
}
