/// <reference path="User.ts" />
/// <reference path="Message.ts" />
module GeoChat {

    export class Room {
        roomId: string;
        name: string;
        members: User[];
        messages: Message[];
    }

}