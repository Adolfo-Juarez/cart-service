export class OutOfRangeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'OutOfRangeException';
    }
}