import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//DEV ONLY!--REMOVE FOR PRODUCTION
const pause = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

//Creating an API using RTK Query for things related to albums - createApi({options})
const albumsApi = createApi({
  //Key for our 'store'
  reducerPath: "albums",

  //Configuration property that in this case uses a pre created function called fetchBaseQuery
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",

    //DEV ONLY!--REMOVE FOR PRODUCTION
    fetchFn: async (...args) => {
      await pause(3000);
      return fetch(...args);
    },
  }),

  //Configuring the endpoints to our requests
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });

          tags.push({ type: "UserAlbums", id: user.id });

          return tags;
        },

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
        invalidatesTags: (result, error, user) => [
          { type: "UserAlbums", id: user.userId },
        ],
        query: (album) => {
          return {
            url: "/albums",
            body: { title: album.title, user_id: album.userId },
            method: "POST",
          };
        },
      }),

      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => [
          { type: "Album", id: album.userId },
        ],
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
