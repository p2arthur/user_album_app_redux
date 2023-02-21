import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Creating an API using RTK Query for things related to albums - createApi({options})
const albumsApi = createApi({
  //Key for our 'store'
  reducerPath: "albums",

  //Configuration property that in this case uses a pre created function called fetchBaseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),

  //Configuring the endpoints to our requests
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: ["Album"],
        query: (user) => {
          return {
            url: "/albums",
            params: {
              user_id: user.id,
            },
            method: "GET",
          };
        },
      }),

      addAlbum: builder.mutation({
        invalidatesTags: ["Album"],
        query: (album) => {
          return {
            url: "/albums",
            body: { title: album.title, user_id: album.userId },
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
