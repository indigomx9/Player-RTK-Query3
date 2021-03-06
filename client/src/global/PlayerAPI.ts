import { IPlayer } from "../models/IPlayer";
import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "http://localhost:9000/api/";
export const PlayerAPI = createApi({
    reducerPath: "PlayerAPI",
    baseQuery: fetchBaseQuery({ baseUrl: URL }),
    tagTypes: ["Players"],
    endpoints: (builder) => ({
        fetchAllPlayers: builder.query<IPlayer[], void>({
            query: () => "players",
            providesTags: (result) => result ?
            [...result.map(({ id }) => 
                ({ type: "Players" as const, id })),
                { type: "Players", id: "LIST" },
            ] : [{ type: "Players", id: "LIST" }],
        }),
        getOnePlayer: builder.query<IPlayer, string>({
            query: (id) => `players/${id}`,
            providesTags: (result, error, id) => 
                [{ type: "Players", id }],
        }),
        addPlayer: builder.mutation<IPlayer, IPlayer>({
            query: (player) => {
                return {
                    url: `players`,
                    method: "POST",
                    body: player,
                }
            },
            invalidatesTags: [{ type: "Players", id: "LIST" }],
        }),
        updatePlayer: builder.mutation<IPlayer, IPlayer>({
            query: ({ id, ...player }) => ({
                url: `players/${id}`,
                method: "PUT",
                body: player
            }),
            invalidatesTags: (result, error, {id}) => 
                [{ type: "Players", id }],
        }),
        deletePlayer: builder.mutation<IPlayer, string>({
            query: (id) => ({
                url: `players/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => 
                [{ type: "Players", id }],
        })
    }),
});




